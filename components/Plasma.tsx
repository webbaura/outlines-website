'use client';

import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  intensity?: number; // 0..1
};

// One seamless noise tile, generated once per mount. We then translate two
// stacked copies in opposing directions to get a slow, organic drift without
// per-frame noise generation. Pure value-noise (smoothstep'd bilinear) —
// readable as a soft cloud, no shader required.
const TILE = 128;
const GRID = 16; // control points per tile edge — lower = larger blobs

function generateNoiseTile(): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = c.height = TILE;
  const ctx = c.getContext('2d')!;

  // Seamless control-point grid: wrap last row/col back to the first.
  const points: number[][] = [];
  for (let gy = 0; gy <= GRID; gy++) {
    points[gy] = [];
    for (let gx = 0; gx <= GRID; gx++) {
      points[gy][gx] =
        gy < GRID && gx < GRID
          ? Math.random()
          : points[gy % GRID][gx % GRID];
    }
  }

  const img = ctx.createImageData(TILE, TILE);
  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      const fx = (x / TILE) * GRID;
      const fy = (y / TILE) * GRID;
      const x0 = Math.floor(fx);
      const y0 = Math.floor(fy);
      const tx = fx - x0;
      const ty = fy - y0;
      // smoothstep
      const sx = tx * tx * (3 - 2 * tx);
      const sy = ty * ty * (3 - 2 * ty);
      const v00 = points[y0][x0];
      const v10 = points[y0][x0 + 1];
      const v01 = points[y0 + 1][x0];
      const v11 = points[y0 + 1][x0 + 1];
      const a = v00 * (1 - sx) + v10 * sx;
      const b = v01 * (1 - sx) + v11 * sx;
      const v = a * (1 - sy) + b * sy;
      const grey = Math.round(v * 255);
      const i = (y * TILE + x) * 4;
      img.data[i] = grey;
      img.data[i + 1] = grey;
      img.data[i + 2] = grey;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export default function Plasma({ className = '', intensity = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const tile = generateNoiseTile();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let frame = 0;
    const tileSize = TILE * 6 * dpr; // upscale so the tile reads as a soft cloud

    const drawLayer = (ox: number, oy: number, alpha: number) => {
      ctx.globalAlpha = alpha;
      const W = canvas.width;
      const H = canvas.height;
      const startX = ((ox % tileSize) + tileSize) % tileSize - tileSize;
      const startY = ((oy % tileSize) + tileSize) % tileSize - tileSize;
      for (let y = startY; y < H + tileSize; y += tileSize) {
        for (let x = startX; x < W + tileSize; x += tileSize) {
          ctx.drawImage(tile, x, y, tileSize, tileSize);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = frame * 0.0008;
      const breath = 0.5 + 0.5 * Math.sin(frame * 0.004);

      ctx.globalCompositeOperation = 'source-over';
      drawLayer(t * 40, -t * 25, 0.10 + breath * 0.06);
      ctx.globalCompositeOperation = 'screen';
      drawLayer(-t * 30, t * 50, 0.07 + breath * 0.05);

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      frame++;
      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw(); // single static frame
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity: intensity, mixBlendMode: 'screen' }}
    />
  );
}
