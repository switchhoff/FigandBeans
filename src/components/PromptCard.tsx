'use client';

import { Prompt } from '@/types';
import { RefreshCw, Tag } from 'lucide-react';

const categoryColors: Record<string, string> = {
  philosophy: '#7a5c45',
  creative: '#4a7c6a',
  opinion: '#6a5a7a',
  absurd: '#7a4a4a',
  technical: '#4a5a7a',
  emotional: '#7a6a4a',
};

const difficultyLabels = { easy: '◉○○', medium: '◉◉○', hard: '◉◉◉' };

interface Props {
  prompt: Prompt;
  onRefresh?: () => void;
  compact?: boolean;
}

export default function PromptCard({ prompt, onRefresh, compact }: Props) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a1410 0%, #251e18 100%)',
        border: '1px solid #3a2e24',
        borderRadius: '12px',
        padding: compact ? '16px' : '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative corner */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: `linear-gradient(180deg, ${categoryColors[prompt.category]}, transparent)`,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Tag size={12} style={{ color: '#8a7a6a' }} />
            <span style={{ color: '#8a7a6a', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {prompt.category}
            </span>
            <span style={{ color: '#3a2e24', fontSize: '11px' }}>·</span>
            <span style={{ color: '#c9a84c', fontSize: '11px' }}>{difficultyLabels[prompt.difficulty]}</span>
          </div>
          <p
            style={{
              color: '#e8dcc8',
              fontSize: compact ? '15px' : '18px',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            &ldquo;{prompt.text}&rdquo;
          </p>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            style={{
              padding: '8px',
              background: 'rgba(201, 168, 76, 0.1)',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              borderRadius: '8px',
              color: '#c9a84c',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s',
            }}
            title="New prompt"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
