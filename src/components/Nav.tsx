'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { Feather, Trophy, BookOpen, Palette, Zap, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/play', label: 'Play', icon: Zap },
  { href: '/blog', label: 'Canvas', icon: Palette },
  { href: '/leaderboard', label: 'Ranks', icon: Trophy },
  { href: '/about', label: 'About', icon: BookOpen },
];

export const GEMINI_MODELS = [
  { id: 'gemini-2.5-flash',       label: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.5-pro',         label: 'Gemini 2.5 Pro' },
  { id: 'gemini-2.5-flash-lite',  label: 'Gemini 2.5 Flash Lite' },
  { id: 'gemini-2.0-flash',       label: 'Gemini 2.0 Flash' },
  { id: 'gemini-2.0-flash-lite',  label: 'Gemini 2.0 Flash Lite' },
  { id: 'gemini-3-flash-preview',  label: 'Gemini 3 Flash ✦' },
  { id: 'gemini-3.1-flash-lite',  label: 'Gemini 3.1 Flash Lite ✦' },
];

export default function Nav() {
  const pathname = usePathname();
  const { user, selectedModel, setModel } = useGameStore();
  const [modelOpen, setModelOpen] = useState(false);

  const currentModel = GEMINI_MODELS.find(m => m.id === selectedModel) ?? GEMINI_MODELS[0];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(9, 9, 11, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #F59E0B, #F97316)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Feather size={14} color="#09090B" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#FAFAFA', letterSpacing: '-0.02em' }}>
            Fig<span style={{ color: '#F59E0B' }}>&</span>Beans
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 8,
                fontSize: 13, fontWeight: 500,
                color: active ? '#F59E0B' : '#A1A1AA',
                background: active ? '#F59E0B12' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#FAFAFA'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#A1A1AA'; }}
              >
                <Icon size={13} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right: model picker + user */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* Model picker */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setModelOpen(!modelOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 8,
                background: '#27272A', border: '1px solid #3F3F46',
                color: '#A1A1AA', fontSize: 12, fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F59E0B66'; (e.currentTarget as HTMLElement).style.color = '#FAFAFA'; }}
              onMouseLeave={e => { if (!modelOpen) { (e.currentTarget as HTMLElement).style.borderColor = '#3F3F46'; (e.currentTarget as HTMLElement).style.color = '#A1A1AA'; } }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              {currentModel.label}
              <ChevronDown size={11} style={{ transform: modelOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
            </button>

            {modelOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: '#18181B', border: '1px solid #3F3F46',
                borderRadius: 10, overflow: 'hidden', minWidth: 200,
                boxShadow: '0 16px 48px #00000066',
                zIndex: 100,
              }}>
                {GEMINI_MODELS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => { setModel(m.id); setModelOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      width: '100%', padding: '9px 14px',
                      background: m.id === selectedModel ? '#F59E0B12' : 'transparent',
                      border: 'none', color: m.id === selectedModel ? '#F59E0B' : '#A1A1AA',
                      fontSize: 13, cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => { if (m.id !== selectedModel) (e.currentTarget as HTMLElement).style.background = '#27272A'; }}
                    onMouseLeave={e => { if (m.id !== selectedModel) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    {m.id === selectedModel && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F59E0B' }} />}
                    {m.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User */}
          {user.username && (
            <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: '#27272A', border: '1px solid #3F3F46',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>
                {user.avatar}
              </div>
              <div>
                <div style={{ color: '#FAFAFA', fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>{user.username}</div>
                <div style={{ color: '#F59E0B', fontSize: 11, fontWeight: 500 }}>{user.totalPoints.toLocaleString()} pts</div>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Click-outside to close model dropdown */}
      {modelOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 49 }}
          onClick={() => setModelOpen(false)}
        />
      )}
    </nav>
  );
}
