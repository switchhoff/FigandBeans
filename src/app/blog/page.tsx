'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getRandomPrompt } from '@/lib/prompts';
import { CanvasPost } from '@/types';
import PromptCard from '@/components/PromptCard';
import DrawingCanvas from '@/components/DrawingCanvas';
import { Heart, Palette, PenLine, RefreshCw, X, Send } from 'lucide-react';

export default function BlogPage() {
  const { posts, addPost, likePost, user } = useGameStore();
  const [view, setView] = useState<'feed' | 'compose'>('feed');
  const [prompt, setPrompt] = useState(getRandomPrompt());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const handleLike = (id: string) => {
    if (likedIds.has(id)) return;
    likePost(id);
    setLikedIds(prev => new Set([...prev, id]));
  };

  const handleSubmit = () => {
    if (!content.trim() || !user.username) return;
    addPost({
      prompt,
      title: title.trim() || 'Untitled',
      content,
      author: user.username,
    });
    setTitle('');
    setContent('');
    setView('feed');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: '#e8dcc8', fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
            Open Canvas
          </h1>
          <p style={{ color: '#8a7a6a', fontSize: '14px' }}>
            Write. Doodle. Respond. Be human about it.
          </p>
        </div>
        <button
          onClick={() => setView(view === 'feed' ? 'compose' : 'feed')}
          style={{
            padding: '10px 18px',
            background: view === 'compose' ? 'transparent' : 'linear-gradient(135deg, #c9a84c, #e8c96a)',
            border: view === 'compose' ? '1px solid #3a2e24' : 'none',
            borderRadius: '10px',
            color: view === 'compose' ? '#8a7a6a' : '#0f0b08',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {view === 'compose' ? <><X size={14} /> Cancel</> : <><PenLine size={14} /> Write</>}
        </button>
      </div>

      {view === 'compose' && (
        <div
          className="slide-up"
          style={{
            background: '#1a1410',
            border: '1px solid #3a2e24',
            borderRadius: '14px',
            padding: '24px',
            marginBottom: '32px',
          }}
        >
          <PromptCard
            prompt={prompt}
            onRefresh={() => setPrompt(getRandomPrompt([prompt.id]))}
            compact
          />

          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Give it a title (optional)..."
            maxLength={80}
            style={{
              width: '100%',
              padding: '12px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #3a2e24',
              outline: 'none',
              color: '#e8dcc8',
              fontSize: '18px',
              fontWeight: 700,
              marginTop: '20px',
              fontFamily: 'Georgia, serif',
            }}
          />

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your response here. As human as possible. Or not..."
            style={{
              width: '100%',
              minHeight: '180px',
              padding: '16px 0',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              color: '#e8dcc8',
              fontSize: '15px',
              lineHeight: 1.8,
              fontFamily: 'Georgia, serif',
              marginBottom: '16px',
            }}
          />

          {/* Canvas toggle */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={() => setShowCanvas(!showCanvas)}
              style={{
                padding: '8px 14px',
                background: showCanvas ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
                border: `1px solid ${showCanvas ? '#c9a84c' : '#3a2e24'}`,
                borderRadius: '8px',
                color: showCanvas ? '#c9a84c' : '#8a7a6a',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Palette size={13} />
              {showCanvas ? 'Hide canvas' : 'Add a doodle'}
            </button>
          </div>

          {showCanvas && <DrawingCanvas height={240} />}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px', borderTop: '1px solid #251e18', paddingTop: '16px' }}>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              style={{
                padding: '10px 22px',
                background: content.trim() ? 'linear-gradient(135deg, #c9a84c, #e8c96a)' : '#251e18',
                border: 'none',
                borderRadius: '8px',
                color: content.trim() ? '#0f0b08' : '#5a4a3a',
                fontWeight: 700,
                fontSize: '14px',
                cursor: content.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Send size={14} /> Publish
            </button>
          </div>
        </div>
      )}

      {/* Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            liked={likedIds.has(post.id)}
            onLike={() => handleLike(post.id)}
          />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, liked, onLike }: { post: CanvasPost; liked: boolean; onLike: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = post.content.length > 320;

  return (
    <div
      style={{
        background: '#1a1410',
        border: '1px solid #3a2e24',
        borderRadius: '14px',
        padding: '24px',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#5a4a3a'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#3a2e24'}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span style={{ color: '#8a7a6a', fontSize: '12px' }}>
            by <span style={{ color: '#e8dcc8' }}>{post.author}</span>
          </span>
          <span style={{ color: '#3a2e24', fontSize: '12px', margin: '0 6px' }}>·</span>
          <span style={{ color: '#5a4a3a', fontSize: '12px' }}>
            {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
        </div>
        <span
          style={{
            background: 'rgba(201, 168, 76, 0.08)',
            border: '1px solid rgba(201, 168, 76, 0.15)',
            borderRadius: '100px',
            padding: '3px 10px',
            color: '#8a7a6a',
            fontSize: '11px',
          }}
        >
          {post.prompt.category}
        </span>
      </div>

      {post.title && post.title !== 'Untitled' && (
        <h3 style={{ color: '#e8dcc8', fontSize: '17px', fontWeight: 700, marginBottom: '10px', fontStyle: 'italic' }}>
          {post.title}
        </h3>
      )}

      <p style={{ color: '#8a7a6a', fontSize: '14px', lineHeight: 1.8, marginBottom: '12px' }}>
        <em style={{ color: '#5a4a3a', fontSize: '12px' }}>&ldquo;{post.prompt.text}&rdquo;</em>
      </p>

      <p
        style={{
          color: '#c8b89a',
          fontSize: '14px',
          lineHeight: 1.8,
          marginBottom: '16px',
          overflow: isLong && !expanded ? 'hidden' : 'visible',
          maxHeight: isLong && !expanded ? '4.5em' : 'none',
          position: 'relative',
        }}
      >
        {post.content}
        {isLong && !expanded && (
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2em',
              background: 'linear-gradient(transparent, #1a1410)',
            }}
          />
        )}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: 'none',
            color: '#c9a84c',
            cursor: 'pointer',
            fontSize: '13px',
            marginBottom: '12px',
            padding: 0,
          }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onLike}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: liked ? '#c0392b' : '#5a4a3a',
            cursor: 'pointer',
            fontSize: '13px',
            transition: 'color 0.15s',
          }}
        >
          <Heart size={14} fill={liked ? '#c0392b' : 'none'} />
          {post.likes + (liked ? 1 : 0)}
        </button>
      </div>
    </div>
  );
}
