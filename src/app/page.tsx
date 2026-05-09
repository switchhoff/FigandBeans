'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { ChevronRight, Brain, Palette, Trophy, Users } from 'lucide-react';
import TermsModal from '@/components/TermsModal';

const AVATARS = ['✏️', '📝', '🖊️', '🌿', '🫒', '🫘', '🍃', '🌰', '🌾', '📖', '🔮', '🧭'];

export default function HomePage() {
  const router = useRouter();
  const { user, setUsername, acceptTerms } = useGameStore();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('✏️');
  const [showTerms, setShowTerms] = useState(false);
  const [step, setStep] = useState<'landing' | 'register'>('landing');

  const handleStart = () => {
    if (!user.termsAccepted || !user.username) {
      setStep('register');
    } else {
      router.push('/play');
    }
  };

  const handleRegister = () => {
    if (!name.trim()) return;
    setShowTerms(true);
  };

  const handleAcceptTerms = () => {
    setUsername(name.trim());
    acceptTerms();
    setShowTerms(false);
    router.push('/play');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      {step === 'landing' && (
        <>
          <div style={{ textAlign: 'center', padding: '60px 20px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div
                className="float-anim"
                style={{ fontSize: '64px', lineHeight: 1, filter: 'drop-shadow(0 8px 24px rgba(201, 168, 76, 0.3))' }}
              >
                🫒🫘
              </div>
            </div>

            <h1
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '16px',
                color: '#e8dcc8',
              }}
            >
              Fig <span style={{ color: '#c9a84c' }}>&</span> Beans
            </h1>

            <p style={{ fontSize: '18px', color: '#8a7a6a', maxWidth: '500px', margin: '0 auto 16px', lineHeight: 1.7 }}>
              One human. One AI. Same prompt. One judge.
              <br />
              <em style={{ color: '#e8dcc8' }}>Who writes more like a human?</em>
            </p>

            <p style={{ color: '#5a4a3a', fontSize: '14px', maxWidth: '400px', margin: '0 auto 40px' }}>
              Fig is human. Beans is AI. Sometimes you can&apos;t tell. That&apos;s the game.
            </p>

            <button
              onClick={handleStart}
              style={{
                padding: '14px 36px',
                background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                border: 'none',
                borderRadius: '10px',
                color: '#0f0b08',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.02em',
                boxShadow: '0 4px 24px rgba(201, 168, 76, 0.35)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(201, 168, 76, 0.45)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(201, 168, 76, 0.35)';
              }}
            >
              Start Playing <ChevronRight size={16} style={{ display: 'inline', marginLeft: '4px' }} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
            <ModeCard emoji="🎭" title="Pretend to be Human" desc="AI tries to write like a human. You try to spot it. Or be it." color="#4a7c6a" />
            <ModeCard emoji="🤖" title="Pretend to be AI" desc="Human tries to write like an AI. The more robotic, the better." color="#7a5c45" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '60px' }}>
            {[
              { icon: Brain, label: 'AI Scoring', desc: 'Real-time judge rates every response' },
              { icon: Palette, label: 'Open Canvas', desc: 'Doodle your thoughts, fight the algorithm' },
              { icon: Trophy, label: 'Leaderboards', desc: 'Compete globally for human supremacy' },
              { icon: Users, label: 'Community', desc: 'Read what others wrote — human or not' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} style={{ background: '#1a1410', border: '1px solid #3a2e24', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <Icon size={20} style={{ color: '#c9a84c', margin: '0 auto 8px' }} />
                <div style={{ color: '#e8dcc8', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{label}</div>
                <div style={{ color: '#5a4a3a', fontSize: '11px', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', color: '#3a2e24', fontSize: '12px' }}>
            Named after a fig and a bean. We are not affiliated with any figs or beans.
          </div>
        </>
      )}

      {step === 'register' && (
        <div style={{ maxWidth: '480px', margin: '60px auto', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>{avatar}</div>
          <h2 style={{ color: '#e8dcc8', fontSize: '28px', marginBottom: '8px' }}>Who are you?</h2>
          <p style={{ color: '#8a7a6a', marginBottom: '32px', fontSize: '14px' }}>
            Pick a name and an avatar. The AI already has one.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
            {AVATARS.map(a => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                style={{
                  fontSize: '24px',
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: avatar === a ? 'rgba(201, 168, 76, 0.15)' : '#1a1410',
                  border: `1px solid ${avatar === a ? '#c9a84c' : '#3a2e24'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {a}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your pen name..."
            maxLength={20}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#1a1410',
              border: '1px solid #3a2e24',
              borderRadius: '10px',
              color: '#e8dcc8',
              fontSize: '16px',
              outline: 'none',
              marginBottom: '16px',
              fontFamily: 'Georgia, serif',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#c9a84c')}
            onBlur={e => (e.currentTarget.style.borderColor = '#3a2e24')}
            onKeyDown={e => e.key === 'Enter' && handleRegister()}
          />

          <button
            onClick={handleRegister}
            disabled={!name.trim()}
            style={{
              width: '100%',
              padding: '13px',
              background: name.trim() ? 'linear-gradient(135deg, #c9a84c, #e8c96a)' : '#251e18',
              border: 'none',
              borderRadius: '10px',
              color: name.trim() ? '#0f0b08' : '#5a4a3a',
              fontSize: '15px',
              fontWeight: 700,
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s',
            }}
          >
            Continue to Terms →
          </button>
        </div>
      )}

      {showTerms && (
        <TermsModal
          username={name}
          onAccept={handleAcceptTerms}
          onDecline={() => setShowTerms(false)}
        />
      )}
    </div>
  );
}

function ModeCard({ emoji, title, desc, color }: { emoji: string; title: string; desc: string; color: string }) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a1410, #251e18)',
        border: '1px solid #3a2e24',
        borderRadius: '12px',
        padding: '24px',
        transition: 'transform 0.2s, border-color 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.borderColor = color;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.borderColor = '#3a2e24';
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{emoji}</div>
      <div style={{ color, fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{title}</div>
      <div style={{ color: '#8a7a6a', fontSize: '13px', lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}
