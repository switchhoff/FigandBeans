'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { ChevronRight, Brain, Palette, Trophy, Users, Zap, ArrowRight } from 'lucide-react';
import TermsModal from '@/components/TermsModal';

const AVATARS = ['✏️','📝','🖊️','🌿','🫒','🫘','🍃','🌰','🌾','📖','🔮','🧭'];

export default function HomePage() {
  const router = useRouter();
  const { user, setUsername, acceptTerms } = useGameStore();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('✏️');
  const [showTerms, setShowTerms] = useState(false);
  const [step, setStep] = useState<'landing' | 'register'>('landing');

  const handleStart = () => {
    if (!user.termsAccepted || !user.username) setStep('register');
    else router.push('/play');
  };

  const handleRegister = () => { if (name.trim()) setShowTerms(true); };

  const handleAcceptTerms = () => {
    setUsername(name.trim());
    acceptTerms();
    setShowTerms(false);
    router.push('/play');
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>

      {step === 'landing' && (
        <>
          {/* ── Hero ── */}
          <div style={{ textAlign: 'center', padding: '72px 20px 56px' }}>

            {/* Emoji pair */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 28 }}>
              <div className="float" style={{ fontSize: 56, filter: 'drop-shadow(0 8px 24px #F9731644)' }}>🫒</div>
              <div className="float" style={{ fontSize: 56, filter: 'drop-shadow(0 8px 24px #8B5CF644)', animationDelay: '0.5s' }}>🫘</div>
            </div>

            {/* Pill badge */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <span style={{
                background: '#F59E0B12', border: '1px solid #F59E0B30',
                borderRadius: 100, padding: '5px 14px',
                color: '#FCD34D', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
              }}>
                ✦ Human vs AI Writing Game
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(44px, 7vw, 80px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: 20,
              color: '#FAFAFA',
            }}>
              Who writes more<br />
              <span className="gradient-text">like a human?</span>
            </h1>

            <p style={{ fontSize: 18, color: '#71717A', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>
              One prompt. One human. One AI. A third AI judges.
              <br />
              <span style={{ color: '#A1A1AA' }}>Fool the judge. Earn your humanity.</span>
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={handleStart} className="btn btn-primary" style={{ fontSize: 16, padding: '13px 28px', borderRadius: 12 }}>
                Start Playing <ArrowRight size={16} />
              </button>
              <a href="/about" className="btn btn-ghost" style={{ fontSize: 15, padding: '13px 24px', borderRadius: 12 }}>
                How it works
              </a>
            </div>

            {/* Trust indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
              {['AI-powered judge', 'Live leaderboard', 'Open canvas doodle'].map(t => (
                <span key={t} style={{ color: '#3F3F46', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#10B981' }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Mode cards ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
            <ModeCard
              emoji="🎭"
              title="Pretend to be Human"
              desc="The AI tries to sound like you. You try to sound like you. The Judge picks who did it better."
              color="#F97316"
              glow="#F9731618"
              tag="Hardest mode"
            />
            <ModeCard
              emoji="🤖"
              title="Pretend to be AI"
              desc="Embrace your inner language model. Bullet points. Transitional phrases. Hollow precision."
              color="#8B5CF6"
              glow="#8B5CF618"
              tag="Fan favourite"
            />
          </div>

          {/* ── Feature grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 72 }}>
            {[
              { icon: Brain, label: 'AI Judge', desc: 'Real Gemini scores every round', color: '#8B5CF6' },
              { icon: Palette, label: 'Open Canvas', desc: 'Doodle to escape the algorithm', color: '#10B981' },
              { icon: Trophy, label: 'Leaderboard', desc: 'Global ranks. Human supremacy.', color: '#F59E0B' },
              { icon: Users, label: 'Community', desc: 'Read others. Guess if human.', color: '#F97316' },
            ].map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="card card-hover" style={{ padding: 18, cursor: 'default' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: color + '18', border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 12,
                }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <div style={{ color: '#FAFAFA', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#52525B', fontSize: 12, lineHeight: 1.55 }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', color: '#27272A', fontSize: 12 }}>
            Named after a fig and a bean. No figs or beans were harmed.
          </div>
        </>
      )}

      {step === 'register' && (
        <div style={{ maxWidth: 440, margin: '64px auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>{avatar}</div>
            <h2 style={{ color: '#FAFAFA', fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
              Pick your pen name
            </h2>
            <p style={{ color: '#71717A', fontSize: 14, lineHeight: 1.6 }}>
              The AI already has one. Now it&apos;s your turn.
            </p>
          </div>

          {/* Avatar grid */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
            {AVATARS.map(a => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                style={{
                  width: 44, height: 44, borderRadius: 10, fontSize: 22,
                  background: avatar === a ? '#F59E0B12' : '#18181B',
                  border: `1px solid ${avatar === a ? '#F59E0B' : '#27272A'}`,
                  cursor: 'pointer', transition: 'all 0.15s',
                  transform: avatar === a ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {a}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 14 }}>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your pen name..."
              maxLength={20}
              className="input"
              onKeyDown={e => e.key === 'Enter' && handleRegister()}
              style={{ background: '#18181B', fontSize: 16 }}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={!name.trim()}
            className="btn btn-primary"
            style={{ width: '100%', fontSize: 15, padding: '13px', borderRadius: 10 }}
          >
            Continue to Terms <ChevronRight size={16} />
          </button>

          <button
            onClick={() => setStep('landing')}
            style={{ width: '100%', marginTop: 10, background: 'none', border: 'none', color: '#52525B', fontSize: 13, cursor: 'pointer' }}
          >
            ← Back
          </button>
        </div>
      )}

      {showTerms && (
        <TermsModal username={name} onAccept={handleAcceptTerms} onDecline={() => setShowTerms(false)} />
      )}
    </div>
  );
}

function ModeCard({ emoji, title, desc, color, glow, tag }: {
  emoji: string; title: string; desc: string; color: string; glow: string; tag: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? glow : '#18181B',
        border: `1px solid ${hovered ? color + '55' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16, padding: '28px 24px',
        transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? `0 8px 32px ${glow}` : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 36 }}>{emoji}</span>
        <span style={{
          background: color + '18', border: `1px solid ${color}30`,
          borderRadius: 100, padding: '3px 10px',
          color, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
        }}>
          {tag}
        </span>
      </div>
      <div style={{ color: '#FAFAFA', fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>
        {title}
      </div>
      <div style={{ color: '#71717A', fontSize: 13, lineHeight: 1.65 }}>{desc}</div>
    </div>
  );
}
