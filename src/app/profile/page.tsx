'use client';

import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'next/navigation';
import { Trophy, Flame, Zap, User, Brain } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useGameStore();
  const router = useRouter();

  if (!user.username) {
    router.push('/');
    return null;
  }

  const humanPct = user.totalPoints > 0 ? Math.round((user.humanPoints / user.totalPoints) * 100) : 0;

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Profile header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1410 0%, #251e18 100%)',
          border: '1px solid #3a2e24',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div style={{ fontSize: '56px' }}>{user.avatar}</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ color: '#e8dcc8', fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>
            {user.username}
          </h1>
          <p style={{ color: '#5a4a3a', fontSize: '13px', marginBottom: '16px' }}>
            {user.gamesPlayed === 0 ? 'New writer. The page is blank.' : `${user.gamesPlayed} games played`}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <StatBadge icon={Trophy} label="Total" value={user.totalPoints} color="#c9a84c" />
            <StatBadge icon={User} label="Human" value={user.humanPoints} color="#7a5c45" />
            <StatBadge icon={Brain} label="AI" value={user.aiPoints} color="#4a7c6a" />
            <StatBadge icon={Flame} label="Streak" value={user.bestStreak} color="#c0392b" />
          </div>
        </div>
      </div>

      {/* Humanity meter */}
      {user.totalPoints > 0 && (
        <div
          style={{
            background: '#1a1410',
            border: '1px solid #3a2e24',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#8a7a6a', fontSize: '13px' }}>Your humanity index</span>
            <span style={{ color: '#c9a84c', fontSize: '13px', fontWeight: 700 }}>{humanPct}%</span>
          </div>
          <div style={{ height: '8px', background: '#251e18', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${humanPct}%`,
                background: humanPct > 60 ? '#7a5c45' : humanPct > 40 ? '#c9a84c' : '#4a7c6a',
                borderRadius: '4px',
                transition: 'width 1s',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ color: '#4a7c6a', fontSize: '11px' }}>robot</span>
            <span style={{ color: '#7a5c45', fontSize: '11px' }}>human</span>
          </div>
        </div>
      )}

      {/* Recent games */}
      {user.history.length > 0 ? (
        <div
          style={{
            background: '#1a1410',
            border: '1px solid #3a2e24',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #3a2e24' }}>
            <h2 style={{ color: '#e8dcc8', fontSize: '15px', fontWeight: 700 }}>Recent Games</h2>
          </div>
          {user.history.slice(0, 10).map((round, i) => (
            <div
              key={round.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 20px',
                borderBottom: i < Math.min(user.history.length, 10) - 1 ? '1px solid #1f1812' : 'none',
              }}
            >
              <span style={{ fontSize: '20px' }}>
                {round.mode === 'pretend-human' ? '🎭' : '🤖'}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#e8dcc8', fontSize: '13px', marginBottom: '2px' }}>
                  {round.prompt.text.slice(0, 60)}...
                </p>
                <p style={{ color: '#5a4a3a', fontSize: '11px' }}>
                  {round.mode === 'pretend-human' ? 'Pretend to be Human' : 'Pretend to be AI'}
                </p>
              </div>
              {round.scores && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#c9a84c', fontSize: '13px', fontWeight: 700 }}>
                    {round.scores.humanPercentage}%
                  </div>
                  <div style={{ color: '#5a4a3a', fontSize: '11px' }}>human</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: '#1a1410',
            border: '1px solid #3a2e24',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>✏️</div>
          <p style={{ color: '#8a7a6a', fontSize: '14px', marginBottom: '16px' }}>No games yet.</p>
          <Link
            href="/play"
            style={{
              padding: '10px 22px',
              background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
              borderRadius: '8px',
              color: '#0f0b08',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            Play your first game
          </Link>
        </div>
      )}
    </div>
  );
}

function StatBadge({ icon: Icon, label, value, color }: { icon: typeof Trophy; label: string; value: number; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Icon size={16} style={{ color, marginBottom: '4px' }} />
      <div style={{ color: '#e8dcc8', fontSize: '16px', fontWeight: 800 }}>{value.toLocaleString()}</div>
      <div style={{ color: '#5a4a3a', fontSize: '11px' }}>{label}</div>
    </div>
  );
}
