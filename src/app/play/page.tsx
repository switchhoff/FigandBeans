'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { getRandomPrompt } from '@/lib/prompts';
import { GameMode, GameRound } from '@/types';
import PromptCard from '@/components/PromptCard';
import ScoreDisplay from '@/components/ScoreDisplay';
import { Zap, ArrowRight, Loader2, RefreshCw, Trophy, ChevronLeft } from 'lucide-react';

const MODE_INFO = {
  'pretend-human': {
    title: 'Pretend to be Human',
    emoji: '🎭',
    color: '#F97316',
    glow: '#F9731618',
    placeholder: 'Write naturally. Be messy. Be yourself. Or try to hide yourself...',
    badge: 'Humanness',
  },
  'pretend-ai': {
    title: 'Pretend to be AI',
    emoji: '🤖',
    color: '#8B5CF6',
    glow: '#8B5CF618',
    placeholder: 'Furthermore, it is worth noting that this response will be comprehensive and structured. In conclusion...',
    badge: 'AI-ness',
  },
};

type Step = 'select-mode' | 'write' | 'scoring' | 'result';

export default function PlayPage() {
  const router = useRouter();
  const { user, selectedModel, addPoints, addRound, incrementStreak, resetStreak } = useGameStore();
  const [mode, setMode] = useState<GameMode | null>(null);
  const [step, setStep] = useState<Step>('select-mode');
  const [prompt, setPrompt] = useState(getRandomPrompt());
  const [humanResponse, setHumanResponse] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [round, setRound] = useState<GameRound | null>(null);

  if (!user.termsAccepted || !user.username) {
    router.push('/');
    return null;
  }

  const info = mode ? MODE_INFO[mode] : null;
  const minChars = 20;
  const ready = humanResponse.trim().length >= minChars;

  const handleSubmit = async () => {
    if (!mode || !ready) return;
    setStep('scoring');

    const genRes = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.text, mode, model: selectedModel }),
    });
    const genData = await genRes.json();
    if (!genRes.ok || genData.error) {
      alert(`Beans failed: ${genData.error ?? 'unknown'}`);
      setStep('write');
      return;
    }
    const ai = genData.text;
    setAiResponse(ai);

    const scoreRes = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.text, humanResponse, aiResponse: ai, mode, model: selectedModel }),
    });
    const scoreData = await scoreRes.json();
    if (!scoreRes.ok || scoreData.error) {
      alert(`Judge failed: ${scoreData.error ?? 'unknown'}`);
      setStep('write');
      return;
    }

    const newRound: GameRound = {
      id: `round-${Date.now()}`,
      mode,
      prompt,
      humanResponse,
      aiResponse: ai,
      scores: scoreData,
      completedAt: new Date(),
    };

    setRound(newRound);
    addRound(newRound);

    const won = mode === 'pretend-human' ? !scoreData.guessedHumanWasHuman : scoreData.aiScore > scoreData.humanScore;
    addPoints(won ? 100 : 25, 0);
    if (won) incrementStreak(); else resetStreak();
    setStep('result');
  };

  const handlePlayAgain = () => {
    setPrompt(getRandomPrompt([prompt.id]));
    setHumanResponse('');
    setAiResponse('');
    setRound(null);
    setStep('select-mode');
    setMode(null);
  };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 20px' }}>

      {/* ── Mode select ── */}
      {step === 'select-mode' && (
        <>
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 22 }}>{user.avatar}</span>
              <h1 style={{ color: '#FAFAFA', fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em' }}>
                Choose your deception
              </h1>
            </div>
            <p style={{ color: '#52525B', fontSize: 14 }}>
              Hi <span style={{ color: '#F59E0B' }}>{user.username}</span> · {user.gamesPlayed} games played · {user.totalPoints} pts
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {(Object.keys(MODE_INFO) as GameMode[]).map(m => {
              const mi = MODE_INFO[m];
              const selected = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    background: selected ? mi.glow : '#18181B',
                    border: `1px solid ${selected ? mi.color + '66' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 14, padding: '24px 22px',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.18s',
                    boxShadow: selected ? `0 0 20px ${mi.glow}` : 'none',
                    transform: selected ? 'translateY(-1px)' : 'none',
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{mi.emoji}</div>
                  <div style={{ color: selected ? mi.color : '#FAFAFA', fontSize: 15, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em' }}>
                    {mi.title}
                  </div>
                  <div style={{ color: '#71717A', fontSize: 13, lineHeight: 1.6 }}>
                    {m === 'pretend-human'
                      ? 'Write naturally. Beans will try to match you. The Judge picks who\'s more human.'
                      : 'Write like a model. Beans will too. The Judge picks who\'s more robotic.'}
                  </div>
                  {selected && (
                    <div style={{
                      marginTop: 14, padding: '6px 12px',
                      background: mi.color + '18', border: `1px solid ${mi.color}30`,
                      borderRadius: 8, color: mi.color, fontSize: 11, fontWeight: 600,
                      display: 'inline-block',
                    }}>
                      ✓ Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ marginBottom: 20 }}>
            <PromptCard prompt={prompt} onRefresh={() => setPrompt(getRandomPrompt([prompt.id]))} />
          </div>

          <button
            onClick={() => mode && setStep('write')}
            disabled={!mode}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: 15, borderRadius: 12 }}
          >
            {mode ? `Start Writing · ${MODE_INFO[mode!].emoji} ${MODE_INFO[mode!].title}` : 'Select a mode to continue'}
            {mode && <ArrowRight size={16} />}
          </button>
        </>
      )}

      {/* ── Write ── */}
      {step === 'write' && info && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => { setStep('select-mode'); setMode(null); setHumanResponse(''); }}
                className="btn btn-ghost"
                style={{ padding: '8px 12px', borderRadius: 8 }}
              >
                <ChevronLeft size={15} />
              </button>
              <div>
                <div style={{ color: info.color, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {info.emoji} {info.title}
                </div>
                <h2 style={{ color: '#FAFAFA', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>Your Response</h2>
              </div>
            </div>
            <div style={{
              background: '#18181B', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8, padding: '6px 12px',
              color: humanResponse.length < minChars ? '#EF4444' : '#10B981',
              fontSize: 12, fontWeight: 600,
              transition: 'color 0.2s',
            }}>
              {humanResponse.length} {humanResponse.length < minChars && `/ ${minChars} min`}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <PromptCard prompt={prompt} compact />
          </div>

          {/* Text input card */}
          <div style={{
            background: '#18181B',
            border: `1px solid ${humanResponse.length >= minChars ? info.color + '44' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 14, overflow: 'hidden',
            transition: 'border-color 0.2s',
            marginBottom: 14,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{ fontSize: 16 }}>{user.avatar}</span>
              <span style={{ color: '#71717A', fontSize: 12 }}>
                {user.username} · writing as {mode === 'pretend-ai' ? 'an AI' : 'a human'}
              </span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>🫘</span>
                <span style={{ color: '#52525B', fontSize: 11 }}>Beans is ready</span>
              </div>
            </div>

            <textarea
              value={humanResponse}
              onChange={e => setHumanResponse(e.target.value)}
              placeholder={info.placeholder}
              className="input"
              style={{
                border: 'none', borderRadius: 0,
                minHeight: 200, background: 'transparent',
                boxShadow: 'none', padding: '16px',
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!ready}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: 15, borderRadius: 12 }}
          >
            <Zap size={16} /> Submit & Judge
          </button>
        </>
      )}

      {/* ── Scoring ── */}
      {step === 'scoring' && (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: 52, marginBottom: 20 }} className="float">⚖️</div>
          <h2 style={{ color: '#FAFAFA', fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.02em' }}>
            Judge is deliberating...
          </h2>
          <p style={{ color: '#52525B', fontSize: 14, marginBottom: 32 }}>
            Weighing syntax, soul, and the faint smell of training data.
          </p>
          <Loader2 size={22} style={{ color: '#F59E0B', margin: '0 auto' }} className="spin" />
        </div>
      )}

      {/* ── Result ── */}
      {step === 'result' && round?.scores && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ color: '#FAFAFA', fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>
                Judge&apos;s Verdict
              </h2>
              <p style={{ color: '#52525B', fontSize: 13 }}>Round complete · {info?.badge} mode</p>
            </div>
            <div style={{
              background: '#F59E0B12', border: '1px solid #F59E0B30',
              borderRadius: 10, padding: '8px 14px', textAlign: 'center',
            }}>
              <div style={{ color: '#F59E0B', fontSize: 20, fontWeight: 800 }}>+{round.scores.humanScore}</div>
              <div style={{ color: '#52525B', fontSize: 10, fontWeight: 600 }}>PTS EARNED</div>
            </div>
          </div>

          <ScoreDisplay
            scores={round.scores}
            mode={mode!}
            humanResponse={humanResponse}
            aiResponse={aiResponse}
            humanName={user.username}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
            <button onClick={handlePlayAgain} className="btn btn-primary" style={{ padding: '13px', borderRadius: 12 }}>
              <RefreshCw size={14} /> Play Again
            </button>
            <button onClick={() => router.push('/leaderboard')} className="btn btn-ghost" style={{ padding: '13px', borderRadius: 12 }}>
              <Trophy size={14} /> Leaderboard
            </button>
          </div>
        </>
      )}
    </div>
  );
}
