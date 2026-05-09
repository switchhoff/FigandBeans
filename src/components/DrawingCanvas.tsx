'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Trash2, Download, Circle } from 'lucide-react';

const COLORS = ['#e8dcc8', '#c9a84c', '#7a5c45', '#4a7c6a', '#6a5a7a', '#7a4a4a', '#4a5a7a', '#c0392b'];
const SIZES = [2, 4, 8, 14];

interface Props {
  onExport?: (dataUrl: string) => void;
  height?: number;
}

export default function DrawingCanvas({ onExport, height = 320 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#e8dcc8');
  const [size, setSize] = useState(4);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0f0b08';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const touch = e.touches[0];
      return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
    }
    return { x: ((e as React.MouseEvent).clientX - rect.left) * scaleX, y: ((e as React.MouseEvent).clientY - rect.top) * scaleY };
  };

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setDrawing(true);
    lastPos.current = getPos(e);
  }, []);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e);
    if (!lastPos.current) { lastPos.current = pos; return; }

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? '#0f0b08' : color;
    ctx.lineWidth = tool === 'eraser' ? size * 4 : size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    lastPos.current = pos;
  }, [drawing, color, size, tool]);

  const endDraw = useCallback(() => {
    setDrawing(false);
    lastPos.current = null;
  }, []);

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#0f0b08';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const exportCanvas = () => {
    const dataUrl = canvasRef.current!.toDataURL('image/png');
    if (onExport) onExport(dataUrl);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'fig-and-beans-doodle.png';
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 14px',
          background: '#1a1410',
          border: '1px solid #3a2e24',
          borderRadius: '10px',
          flexWrap: 'wrap',
        }}
      >
        {/* Colors */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => { setColor(c); setTool('pen'); }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: c,
                border: color === c && tool === 'pen' ? '2px solid #c9a84c' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'transform 0.1s',
              }}
            />
          ))}
        </div>

        <div style={{ width: '1px', height: '24px', background: '#3a2e24' }} />

        {/* Sizes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                width: `${s * 3}px`,
                height: `${s * 3}px`,
                maxWidth: '24px',
                maxHeight: '24px',
                minWidth: '6px',
                minHeight: '6px',
                borderRadius: '50%',
                background: size === s ? color : '#8a7a6a',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.1s',
              }}
            />
          ))}
        </div>

        <div style={{ width: '1px', height: '24px', background: '#3a2e24' }} />

        {/* Eraser */}
        <button
          onClick={() => setTool(t => t === 'eraser' ? 'pen' : 'eraser')}
          style={{
            padding: '4px 10px',
            background: tool === 'eraser' ? 'rgba(201, 168, 76, 0.15)' : 'transparent',
            border: `1px solid ${tool === 'eraser' ? '#c9a84c' : '#3a2e24'}`,
            borderRadius: '6px',
            color: tool === 'eraser' ? '#c9a84c' : '#8a7a6a',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Eraser
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button
            onClick={clear}
            style={{
              padding: '4px 8px',
              background: 'transparent',
              border: '1px solid #3a2e24',
              borderRadius: '6px',
              color: '#8a7a6a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
            }}
          >
            <Trash2 size={12} /> Clear
          </button>
          <button
            onClick={exportCanvas}
            style={{
              padding: '4px 8px',
              background: 'rgba(201, 168, 76, 0.1)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: '6px',
              color: '#c9a84c',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
            }}
          >
            <Download size={12} /> Save
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        style={{
          border: '1px solid #3a2e24',
          borderRadius: '10px',
          overflow: 'hidden',
          cursor: tool === 'eraser' ? 'cell' : 'crosshair',
        }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={height}
          style={{ width: '100%', height: `${height}px`, display: 'block', touchAction: 'none' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
    </div>
  );
}
