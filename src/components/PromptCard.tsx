'use client';

import { Prompt } from '@/types';
import { RefreshCw, Sparkles } from 'lucide-react';

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  philosophy: { bg: '#8B5CF618', text: '#A78BFA', border: '#8B5CF630' },
  creative:   { bg: '#10B98118', text: '#34D399', border: '#10B98130' },
  opinion:    { bg: '#F59E0B18', text: '#FCD34D', border: '#F59E0B30' },
  absurd:     { bg: '#F9731618', text: '#FB923C', border: '#F9731630' },
  technical:  { bg: '#3B82F618', text: '#60A5FA', border: '#3B82F630' },
  emotional:  { bg: '#EC489918', text: '#F472B6', border: '#EC489930' },
};

const difficultyDots = { easy: 1, medium: 2, hard: 3 };

interface Props {
  prompt: Prompt;
  onRefresh?: () => void;
  compact?: boolean;
}

export default function PromptCard({ prompt, onRefresh, compact }: Props) {
  const cat = categoryColors[prompt.category] ?? categoryColors.creative;
  const dots = difficultyDots[prompt.difficulty];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #18181B 0%, #1C1C1F 100%)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 14,
      padding: compact ? '16px 20px' : '22px 26px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Left accent */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: `linear-gradient(180deg, ${cat.text}, transparent)`,
        borderRadius: '3px 0 0 3px',
      }} />

      {/* Subtle top glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${cat.text}44, transparent)`,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span className="badge" style={{
              background: cat.bg, color: cat.text,
              border: `1px solid ${cat.border}`,
              fontSize: 10, padding: '2px 8px',
            }}>
              {prompt.category}
            </span>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: i <= dots ? cat.text : '#3F3F46',
                  opacity: i <= dots ? 1 : 0.4,
                }} />
              ))}
            </div>
          </div>

          <p style={{
            color: '#FAFAFA',
            fontSize: compact ? 14 : 17,
            lineHeight: 1.65,
            fontStyle: 'italic',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}>
            <span style={{ color: cat.text, marginRight: 4, opacity: 0.7 }}>&ldquo;</span>
            {prompt.text}
            <span style={{ color: cat.text, marginLeft: 4, opacity: 0.7 }}>&rdquo;</span>
          </p>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="btn btn-ghost"
            style={{ padding: '8px', flexShrink: 0, borderRadius: 8 }}
            title="New prompt"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
