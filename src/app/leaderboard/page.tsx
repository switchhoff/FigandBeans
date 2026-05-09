'use client';

import { useGameStore } from '@/store/gameStore';
import { Trophy, Flame, User } from 'lucide-react';

export default function LeaderboardPage() {
  const { leaderboard, user } = useGameStore();

  const sorted = [...leaderboard].sort((a, b) => b.totalPoints - a.totalPoints);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Trophy size={22} style={{ color: '#c9a84c' }} />
          <h1 style={{ color: '#e8dcc8', fontSize: '28px', fontWeight: 800 }}>Leaderboard</h1>
        </div>
        <p style={{ color: '#8a7a6a', fontSize: '14px' }}>
          The most convincingly human humans. And the most robot-brained humans.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
        {[
          { label: 'Total Players', value: leaderboard.length + 1, emoji: '✍️' },
          { label: 'Most Human Points', value: Math.max(...leaderboard.map(e => e.humanPoints)).toLocaleString(), emoji: '🧑' },
          { label: 'Longest Streak', value: Math.max(...leaderboard.map(e => e.bestStreak)), emoji: '🔥' },
        ].map(({ label, value, emoji }) => (
          <div
            key={label}
            style={{
              background: '#1a1410',
              border: '1px solid #3a2e24',
              borderRadius: '10px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '22px', marginBottom: '6px' }}>{emoji}</div>
            <div style={{ color: '#e8dcc8', fontSize: '20px', fontWeight: 800 }}>{value}</div>
            <div style={{ color: '#5a4a3a', fontSize: '11px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
          background: '#1a1410',
          border: '1px solid #3a2e24',
          borderRadius: '14px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 80px 80px 80px 60px',
            padding: '12px 20px',
            borderBottom: '1px solid #3a2e24',
            color: '#5a4a3a',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>#</span>
          <span>Player</span>
          <span style={{ textAlign: 'right' }}>Total</span>
          <span style={{ textAlign: 'right' }}>Human</span>
          <span style={{ textAlign: 'right' }}>Games</span>
          <span style={{ textAlign: 'right' }}>Streak</span>
        </div>

        {/* My rank if I have points */}
        {user.totalPoints > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 80px 80px 80px 60px',
              padding: '14px 20px',
              borderBottom: '1px solid #251e18',
              background: 'rgba(201, 168, 76, 0.06)',
            }}
          >
            <span style={{ color: '#c9a84c', fontSize: '13px' }}>YOU</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>{user.avatar}</span>
              <span style={{ color: '#c9a84c', fontSize: '14px', fontWeight: 600 }}>{user.username}</span>
            </div>
            <span style={{ color: '#e8dcc8', fontSize: '14px', fontWeight: 700, textAlign: 'right' }}>
              {user.totalPoints.toLocaleString()}
            </span>
            <span style={{ color: '#7a5c45', fontSize: '13px', textAlign: 'right' }}>
              {user.humanPoints.toLocaleString()}
            </span>
            <span style={{ color: '#8a7a6a', fontSize: '13px', textAlign: 'right' }}>{user.gamesPlayed}</span>
            <span style={{ color: '#8a7a6a', fontSize: '13px', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              {user.bestStreak > 0 && <Flame size={12} style={{ color: '#c9a84c' }} />}
              {user.bestStreak}
            </span>
          </div>
        )}

        {sorted.map((entry, i) => (
          <div
            key={entry.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 80px 80px 80px 60px',
              padding: '14px 20px',
              borderBottom: i < sorted.length - 1 ? '1px solid #1f1812' : 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#251e18'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <span style={{ color: i < 3 ? '#c9a84c' : '#5a4a3a', fontSize: '16px' }}>
              {medals[i] ?? i + 1}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>{entry.avatar}</span>
              <span style={{ color: '#e8dcc8', fontSize: '14px' }}>{entry.username}</span>
            </div>
            <span style={{ color: '#e8dcc8', fontSize: '14px', fontWeight: 700, textAlign: 'right' }}>
              {entry.totalPoints.toLocaleString()}
            </span>
            <span style={{ color: '#7a5c45', fontSize: '13px', textAlign: 'right' }}>
              {entry.humanPoints.toLocaleString()}
            </span>
            <span style={{ color: '#8a7a6a', fontSize: '13px', textAlign: 'right' }}>{entry.gamesPlayed}</span>
            <span style={{ color: '#8a7a6a', fontSize: '13px', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              {entry.bestStreak >= 5 && <Flame size={12} style={{ color: '#c9a84c' }} />}
              {entry.bestStreak}
            </span>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#3a2e24', fontSize: '12px', marginTop: '20px' }}>
        Leaderboard updates after each game. May Beans never beat you.
      </p>
    </div>
  );
}
