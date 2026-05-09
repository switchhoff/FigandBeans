'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { Feather, Trophy, BookOpen, Palette, Zap } from 'lucide-react';

const links = [
  { href: '/play', label: 'Play', icon: Zap },
  { href: '/blog', label: 'Canvas', icon: Palette },
  { href: '/leaderboard', label: 'Ranks', icon: Trophy },
  { href: '/about', label: 'About', icon: BookOpen },
];

export default function Nav() {
  const pathname = usePathname();
  const { user } = useGameStore();

  return (
    <nav
      style={{
        background: 'rgba(15, 11, 8, 0.9)',
        borderBottom: '1px solid #3a2e24',
        backdropFilter: 'blur(12px)',
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Feather
            size={20}
            style={{ color: '#c9a84c' }}
            className="transition-transform group-hover:rotate-12"
          />
          <span style={{ color: '#e8dcc8' }} className="font-bold text-lg tracking-tight">
            Fig<span style={{ color: '#c9a84c' }}>&</span>Beans
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  color: active ? '#c9a84c' : '#8a7a6a',
                  background: active ? 'rgba(201, 168, 76, 0.08)' : 'transparent',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#e8dcc8'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#8a7a6a'; }}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* User badge */}
        {user.username && (
          <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>{user.avatar}</span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#e8dcc8', fontSize: '13px', lineHeight: 1 }}>{user.username}</div>
              <div style={{ color: '#c9a84c', fontSize: '11px', marginTop: '2px' }}>{user.totalPoints.toLocaleString()} pts</div>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
