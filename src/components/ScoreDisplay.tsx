'use client';

import { RoundScores, GameMode } from '@/types';
import { useEffect, useState } from 'react';
import { Brain, Heart, Sparkles, AlertTriangle, Zap } from 'lucide-react';

interface Props {
  scores: RoundScores;
  mode: GameMode;
  humanResponse: string;
  aiResponse: string;
}

export default function ScoreDisplay({ scores, mode, humanResponse, aiResponse }: Props) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 100);
    return () => clearTimeout(t);
  }, []);

  const modeLabel = mode === 'pretend-human'
    ? { human: 'Humanness Score', ai: 'AI fooled the judge' }
    : { human: 'AI-ness Score', ai: 'Human fooled the judge' };

  const verdict = mode === 'pretend-human'
    ? scores.guessedHumanWasHuman
      ? { text: 'HUMAN DETECTED', color: '#4a7c6a', emoji: '🔍' }
      : { text: 'AI FOOLED THE JUDGE', color: '#c9a84c', emoji: '🎭' }
    : scores.aiScore > scores.humanScore
      ? { text: 'CONVINCINGLY ROBOTIC', color: '#c9a84c', emoji: '🤖' }
      : { text: 'TOO HUMAN TO HIDE', color: '#7a5c45', emoji: '💫' };

  const breakdownItems = [
    { label: 'Creativity', value: scores.breakdown.creativity, icon: Sparkles },
    { label: 'Emotional Depth', value: scores.breakdown.emotionalDepth, icon: Heart },
    { label: 'Coherence', value: scores.breakdown.coherence, icon: Brain },
    { label: 'AI Patterns', value: scores.breakdown.aiPatterns, icon: Zap },
    { label: 'Surprise Factor', value: scores.breakdown.surpriseFactor, icon: AlertTriangle },
  ];

  return (
    <div
      className="slide-up"
      style={{
        background: 'linear-gradient(135deg, #1a1410 0%, #251e18 100%)',
        border: '1px solid #3a2e24',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Verdict header */}
      <div
        style={{
          padding: '20px 24px',
          background: `linear-gradient(135deg, ${verdict.color}18, transparent)`,
          borderBottom: '1px solid #3a2e24',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>{verdict.emoji}</div>
        <div style={{ color: verdict.color, fontSize: '13px', letterSpacing: '0.2em', fontWeight: 700 }}>
          {verdict.text}
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Humanness bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
            <span style={{ color: '#7a5c45' }}>🧑 Fig (Human)</span>
            <span style={{ color: '#8a7a6a' }}>{scores.humanPercentage}% human</span>
            <span style={{ color: '#4a7c6a' }}>Beans (AI) 🤖</span>
          </div>
          <div style={{ height: '12px', background: '#251e18', borderRadius: '6px', overflow: 'hidden', border: '1px solid #3a2e24' }}>
            <div
              className="score-bar"
              style={{
                height: '100%',
                background: `linear-gradient(90deg, #7a5c45, #c9a84c ${scores.humanPercentage}%, #4a7c6a)`,
                '--target-width': `${scores.humanPercentage}%`,
                borderRadius: '6px',
              } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Judge's commentary */}
        <div
          style={{
            background: '#0f0b08',
            border: '1px solid #3a2e24',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ color: '#8a7a6a', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
            JUDGE&apos;S COMMENTARY
          </div>
          <p style={{ color: '#e8dcc8', fontSize: '14px', lineHeight: 1.7, fontStyle: 'italic' }}>
            &ldquo;{scores.judgement}&rdquo;
          </p>
        </div>

        {/* Score breakdown */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: '#8a7a6a', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '12px' }}>
            BREAKDOWN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {breakdownItems.map(({ label, value, icon: Icon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={12} style={{ color: '#8a7a6a', flexShrink: 0 }} />
                <span style={{ color: '#8a7a6a', fontSize: '12px', width: '120px', flexShrink: 0 }}>{label}</span>
                <div style={{ flex: 1, height: '6px', background: '#251e18', borderRadius: '3px', overflow: 'hidden' }}>
                  {shown && (
                    <div
                      className="score-bar"
                      style={{
                        height: '100%',
                        background: value > 60 ? '#c9a84c' : value > 40 ? '#7a5c45' : '#3a2e24',
                        borderRadius: '3px',
                        '--target-width': `${value}%`,
                      } as React.CSSProperties}
                    />
                  )}
                </div>
                <span style={{ color: '#e8dcc8', fontSize: '12px', width: '32px', textAlign: 'right' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Responses side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div
            style={{
              background: '#0f0b08',
              border: '1px solid rgba(122, 92, 69, 0.4)',
              borderRadius: '10px',
              padding: '14px',
            }}
          >
            <div style={{ color: '#7a5c45', fontSize: '11px', marginBottom: '8px' }}>🧑 FIG (HUMAN)</div>
            <p style={{ color: '#8a7a6a', fontSize: '12px', lineHeight: 1.6 }}>{humanResponse}</p>
          </div>
          <div
            style={{
              background: '#0f0b08',
              border: '1px solid rgba(74, 124, 106, 0.4)',
              borderRadius: '10px',
              padding: '14px',
            }}
          >
            <div style={{ color: '#4a7c6a', fontSize: '11px', marginBottom: '8px' }}>🤖 BEANS (AI)</div>
            <p style={{ color: '#8a7a6a', fontSize: '12px', lineHeight: 1.6 }}>{aiResponse}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
