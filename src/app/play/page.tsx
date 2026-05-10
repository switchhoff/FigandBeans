'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { getRandomPrompt } from '@/lib/prompts';
import { GameMode, GameRound } from '@/types';
import PromptCard from '@/components/PromptCard';
import ScoreDisplay from '@/components/ScoreDisplay';
import { Zap, User, Bot, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

const MODE_INFO = {
  'pretend-human': {
    title: 'Pretend to be Human',
    emoji: '🎭',
    color: '#4a7c6a',
    humanInstruction: 'Write as naturally, messily, and humanly as you can. Use your instincts. Be yourself — or hide yourself. The Judge is watching.',
    aiInstruction: 'Beans will try to write like a human. The Judge will decide who\'s more convincing.',
    scoreLabel: 'Humanness',
  },
  'pretend-ai': {
    title: 'Pretend to be AI',
    emoji: '🤖',
    color: '#7a5c45',
    humanInstruction: 'Write like a language model. Use bullet points. Be helpful. Be hollow. Impress us with your robotic precision. Bonus for "furthermore" and "it\'s worth noting".',
    aiInstruction: 'Beans will try to write like an AI. So will you. One of you will fail.',
    scoreLabel: 'AI-ness',
  },
};

type Step = 'select-mode' | 'write' | 'scoring' | 'result';

export default function PlayPage() {
  const router = useRouter();
  const { user, addPoints, addRound, incrementStreak, resetStreak } = useGameStore();
  const [mode, setMode] = useState<GameMode | null>(null);
  const [step, setStep] = useState<Step>('select-mode');
  const [prompt, setPrompt] = useState(getRandomPrompt());
  const [humanResponse, setHumanResponse] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [round, setRound] = useState<GameRound | null>(null);
  const [charCount, setCharCount] = useState(0);

  if (!user.termsAccepted || !user.username) {
    router.push('/');
    return null;
  }

  const info = mode ? MODE_INFO[mode] : null;

  const handleWrite = (val: string) => {
    setHumanResponse(val);
    setCharCount(val.length);
  };

  const handleSubmit = async () => {
    if (!mode || humanResponse.trim().length < 20) return;
    setStep('scoring');

    // Generate Beans response
    const genRes = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.text, mode }),
    });
    const { text: ai } = await genRes.json();
    setAiResponse(ai);

    // Score both responses
    const scoreRes = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.text, humanResponse, aiResponse: ai, mode }),
    });
    const scores = await scoreRes.json();

    const newRound: GameRound = {
      id: `round-${Date.now()}`,
      mode,
      prompt,
      humanResponse,
      aiResponse: ai,
      scores,
      completedAt: new Date(),
    };

    setRound(newRound);
    addRound(newRound);

    const won = mode === 'pretend-human'
      ? !scores.guessedHumanWasHuman
      : scores.aiScore > scores.humanScore;

    if (won) {
      addPoints(won ? 100 : 25, 0);
      incrementStreak();
    } else {
      addPoints(25, 0);
      resetStreak();
    }

    setStep('result');
  };

  const handlePlayAgain = () => {
    setPrompt(getRandomPrompt([prompt.id]));
    setHumanResponse('');
    setAiResponse('');
    setRound(null);
    setCharCount(0);
    setStep('select-mode');
    setMode(null);
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px' }}>
      {step === 'select-mode' && (
        <>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ color: '#e8dcc8', fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
              Choose Your Mode
            </h1>
            <p style={{ color: '#8a7a6a', fontSize: '14px' }}>
              Hello, <span style={{ color: '#c9a84c' }}>{user.avatar} {user.username}</span>. Choose your deception.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            {(Object.keys(MODE_INFO) as GameMode[]).map(m => {
              const info = MODE_INFO[m];
              const selected = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    background: selected ? `${info.color}18` : '#1a1410',
                    border: `1px solid ${selected ? info.color : '#3a2e24'}`,
                    borderRadius: '14px',
                    padding: '24px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '14px' }}>{info.emoji}</div>
                  <div style={{ color: selected ? info.color : '#e8dcc8', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                    {info.title}
                  </div>
                  <div style={{ color: '#8a7a6a', fontSize: '13px', lineHeight: 1.6 }}>
                    {info.humanInstruction}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <PromptCard prompt={prompt} onRefresh={() => setPrompt(getRandomPrompt([prompt.id]))} />
          </div>

          <button
            onClick={() => mode && setStep('write')}
            disabled={!mode}
            style={{
              width: '100%',
              padding: '14px',
              background: mode ? `linear-gradient(135deg, ${MODE_INFO[mode!].color}, ${MODE_INFO[mode!].color}cc)` : '#251e18',
              border: 'none',
              borderRadius: '10px',
              color: mode ? '#e8dcc8' : '#5a4a3a',
              fontSize: '15px',
              fontWeight: 700,
              cursor: mode ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            {mode ? `Start Writing — ${MODE_INFO[mode].emoji} ${MODE_INFO[mode].title}` : 'Select a mode to continue'}
            {mode && <ArrowRight size={16} style={{ display: 'inline', marginLeft: '8px' }} />}
          </button>
        </>
      )}

      {step === 'write' && info && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div style={{ color: info.color, fontSize: '12px', letterSpacing: '0.1em', marginBottom: '4px' }}>
                {info.emoji} {info.title.toUpperCase()}
              </div>
              <h2 style={{ color: '#e8dcc8', fontSize: '22px', fontWeight: 800 }}>Your Response</h2>
            </div>
            <button
              onClick={() => { setStep('select-mode'); setMode(null); setHumanResponse(''); setCharCount(0); }}
              style={{ background: 'none', border: 'none', color: '#5a4a3a', cursor: 'pointer', fontSize: '13px' }}
            >
              ← Back
            </button>
          </div>

          <PromptCard prompt={prompt} compact />

          <div
            style={{
              marginTop: '16px',
              background: '#1a1410',
              border: '1px solid #3a2e24',
              borderRadius: '12px',
              padding: '4px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderBottom: '1px solid #251e18',
              }}
            >
              <User size={14} style={{ color: '#7a5c45' }} />
              <span style={{ color: '#7a5c45', fontSize: '12px' }}>{user.username} (You, {mode === 'pretend-ai' ? 'pretending to be AI' : 'being human'})</span>
            </div>
            <textarea
              value={humanResponse}
              onChange={e => handleWrite(e.target.value)}
              placeholder={
                mode === 'pretend-ai'
                  ? 'Commence structured response generation. Begin with a numbered list. Use "Furthermore" at least once...'
                  : 'Just write. Don\'t think too hard. Or do. Humans do both...'
              }
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '16px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                color: '#e8dcc8',
                fontSize: '15px',
                lineHeight: 1.8,
                fontFamily: 'Georgia, serif',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderTop: '1px solid #251e18',
              }}
            >
              <span style={{ color: charCount < 20 ? '#c0392b' : '#5a4a3a', fontSize: '12px' }}>
                {charCount} chars {charCount < 20 && `(min 20)`}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={12} style={{ color: '#4a7c6a' }} />
                <span style={{ color: '#4a7c6a', fontSize: '12px' }}>Beans is ready</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={humanResponse.trim().length < 20}
            style={{
              marginTop: '16px',
              width: '100%',
              padding: '14px',
              background: humanResponse.trim().length >= 20
                ? 'linear-gradient(135deg, #c9a84c, #e8c96a)'
                : '#251e18',
              border: 'none',
              borderRadius: '10px',
              color: humanResponse.trim().length >= 20 ? '#0f0b08' : '#5a4a3a',
              fontSize: '15px',
              fontWeight: 700,
              cursor: humanResponse.trim().length >= 20 ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Zap size={16} />
            Submit & Judge
          </button>
        </>
      )}

      {step === 'scoring' && (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }} className="float-anim">⚖️</div>
          <h2 style={{ color: '#e8dcc8', fontSize: '22px', marginBottom: '12px' }}>Judge is deliberating...</h2>
          <p style={{ color: '#8a7a6a', fontSize: '14px', marginBottom: '32px' }}>
            Weighing syntax, soul, and the faint smell of training data.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader2 size={24} style={{ color: '#c9a84c', animation: 'spin 1s linear infinite' }} />
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {step === 'result' && round?.scores && (
        <>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ color: '#e8dcc8', fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>
              Judge&apos;s Verdict
            </h2>
            <p style={{ color: '#8a7a6a', fontSize: '14px' }}>Round complete. The numbers have spoken.</p>
          </div>

          <ScoreDisplay
            scores={round.scores}
            mode={mode!}
            humanResponse={humanResponse}
            aiResponse={aiResponse}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
            <button
              onClick={handlePlayAgain}
              style={{
                padding: '13px',
                background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                border: 'none',
                borderRadius: '10px',
                color: '#0f0b08',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <RefreshCw size={14} /> Play Again
            </button>
            <button
              onClick={() => router.push('/leaderboard')}
              style={{
                padding: '13px',
                background: 'transparent',
                border: '1px solid #3a2e24',
                borderRadius: '10px',
                color: '#8a7a6a',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              View Leaderboard
            </button>
          </div>
        </>
      )}
    </div>
  );
}
