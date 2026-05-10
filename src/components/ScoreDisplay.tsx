'use client';

import { RoundScores, GameMode } from '@/types';
import { useEffect, useState } from 'react';
import { Brain, Heart, Sparkles, Zap, BarChart2 } from 'lucide-react';

interface Props {
  scores: RoundScores;
  mode: GameMode;
  humanResponse: string;
  aiResponse: string;
  humanName?: string;
}

export default function ScoreDisplay({ scores, mode, humanResponse, aiResponse, humanName = 'Fig' }: Props) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, []);

  const humanWins = scores.humanScore >= scores.aiScore;
  const total = scores.humanScore + scores.aiScore;
  const humanPct = Math.round((scores.humanScore / total) * 100);
  const aiPct = 100 - humanPct;

  const modeLabel = mode === 'pretend-human' ? 'Most Human Wins' : 'Most AI Wins';

  const breakdownItems = [
    { label: 'Creativity',      value: scores.breakdown.creativity,     icon: Sparkles, color: '#F59E0B' },
    { label: 'Emotional depth', value: scores.breakdown.emotionalDepth, icon: Heart,    color: '#EC4899' },
    { label: 'Coherence',       value: scores.breakdown.coherence,      icon: Brain,    color: '#8B5CF6' },
    { label: 'AI patterns',     value: scores.breakdown.aiPatterns,     icon: Zap,      color: '#3B82F6' },
    { label: 'Surprise',        value: scores.breakdown.surpriseFactor, icon: BarChart2,color: '#10B981' },
  ];

  return (
    <div className="slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Side-by-side response cards with crown ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Fig card */}
        <ResponseCard
          name={humanName}
          emoji="🫒"
          label="Human"
          response={humanResponse}
          score={scores.humanScore}
          pct={humanPct}
          isWinner={humanWins}
          color="#F97316"
          glowColor="#F9731622"
          barColor="linear-gradient(90deg, #F97316, #FB923C)"
          revealed={revealed}
        />

        {/* Beans card */}
        <ResponseCard
          name="Beans"
          emoji="🫘"
          label="AI"
          response={aiResponse}
          score={scores.aiScore}
          pct={aiPct}
          isWinner={!humanWins}
          color="#8B5CF6"
          glowColor="#8B5CF622"
          barColor="linear-gradient(90deg, #8B5CF6, #A78BFA)"
          revealed={revealed}
        />
      </div>

      {/* ── Judge commentary ── */}
      <div style={{
        background: '#18181B',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '20px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} className="pulse-glow" />
          <span style={{ color: '#52525B', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Judge&apos;s verdict · {modeLabel}
          </span>
        </div>
        <p style={{ color: '#E4E4E7', fontSize: 15, lineHeight: 1.75, fontStyle: 'italic' }}>
          &ldquo;{scores.judgement}&rdquo;
        </p>
      </div>

      {/* ── Breakdown ── */}
      <div style={{
        background: '#18181B',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '20px 24px',
      }}>
        <div style={{ color: '#52525B', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
          Score breakdown
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {breakdownItems.map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon size={13} style={{ color, flexShrink: 0 }} />
              <span style={{ color: '#71717A', fontSize: 12, width: 120, flexShrink: 0 }}>{label}</span>
              <div style={{ flex: 1, height: 5, background: '#27272A', borderRadius: 99, overflow: 'hidden' }}>
                {revealed && (
                  <div
                    className="fill-bar"
                    style={{
                      height: '100%',
                      background: color,
                      borderRadius: 99,
                      '--w': `${value}%`,
                      opacity: 0.85,
                    } as React.CSSProperties}
                  />
                )}
              </div>
              <span style={{ color: '#A1A1AA', fontSize: 12, width: 28, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResponseCard({
  name, emoji, label, response, score, pct,
  isWinner, color, glowColor, barColor, revealed,
}: {
  name: string; emoji: string; label: string;
  response: string; score: number; pct: number;
  isWinner: boolean; color: string; glowColor: string;
  barColor: string; revealed: boolean;
}) {
  return (
    <div style={{
      background: '#18181B',
      border: `1px solid ${isWinner ? color + '44' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      boxShadow: isWinner ? `0 0 24px ${glowColor}` : 'none',
      position: 'relative',
    }}>

      {/* Crown */}
      {isWinner && (
        <div style={{
          position: 'absolute',
          top: -2,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 22,
          lineHeight: 1,
          zIndex: 10,
          filter: 'drop-shadow(0 2px 8px #F59E0B88)',
        }} className="crown-drop">
          👑
        </div>
      )}

      {/* Header */}
      <div style={{
        padding: '18px 18px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: isWinner ? `linear-gradient(135deg, ${glowColor}, transparent)` : 'transparent',
        marginTop: isWinner ? 8 : 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>{emoji}</span>
            <div>
              <div style={{ color: '#FAFAFA', fontSize: 13, fontWeight: 700 }}>{name}</div>
              <div style={{ color, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
            </div>
          </div>

          {/* Score circle */}
          <div style={{
            width: 48, height: 48,
            borderRadius: '50%',
            background: isWinner ? `linear-gradient(135deg, ${color}, ${color}99)` : '#27272A',
            border: `2px solid ${isWinner ? color : '#3F3F46'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
          }}>
            <span style={{ color: isWinner ? '#fff' : '#A1A1AA', fontSize: 15, fontWeight: 800, lineHeight: 1 }}>{score}</span>
            <span style={{ color: isWinner ? '#ffffff88' : '#52525B', fontSize: 9, fontWeight: 500 }}>pts</span>
          </div>
        </div>

        {/* Score bar */}
        <div style={{ height: 4, background: '#27272A', borderRadius: 99, overflow: 'hidden' }}>
          {revealed && (
            <div
              className="fill-bar"
              style={{
                height: '100%',
                background: barColor,
                borderRadius: 99,
                '--w': `${pct}%`,
              } as React.CSSProperties}
            />
          )}
        </div>
        <div style={{ color: '#52525B', fontSize: 10, marginTop: 4, textAlign: 'right' }}>{pct}%</div>
      </div>

      {/* Response text */}
      <div style={{ padding: '14px 18px' }}>
        <p style={{
          color: '#A1A1AA',
          fontSize: 13,
          lineHeight: 1.7,
          display: '-webkit-box',
          WebkitLineClamp: 6,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {response}
        </p>
      </div>
    </div>
  );
}
