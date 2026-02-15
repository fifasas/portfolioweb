import * as React from 'react';
import { cn } from '../lib/utils';

const GravityStars = ({
  starsCount = 200,
  starsSize = 2,
  starsOpacity = 0.5,
  glowIntensity = 10,
  glowAnimation = 'ease',
  movementSpeed = 0.2,
  mouseInfluence = 200,
  mouseGravity = 'attract',
  gravityStrength = 50,
  starsInteraction = true,
  starsInteractionType = 'bounce',
  className,
  ...props
}) => {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const animRef = React.useRef(null);
  const starsRef = React.useRef([]);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });
  const isVisibleRef = React.useRef(true);
  const [dpr, setDpr] = React.useState(1);
  const [canvasSize, setCanvasSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  const readColor = React.useCallback(() => {
    return '#ffffff';
  }, []);

  const initStars = React.useCallback(
    (w, h) => {
      if (!w || !h) return;
      starsRef.current = Array.from({ length: starsCount }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = movementSpeed * (0.5 + Math.random() * 0.5);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * starsSize + 0.5,
          opacity: starsOpacity,
          baseOpacity: starsOpacity,
          mass: Math.random() * 0.5 + 0.5,
          glowMultiplier: 1,
          glowVelocity: 0,
        };
      });
    },
    [starsCount, movementSpeed, starsOpacity, starsSize],
  );

  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    const nextDpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    setDpr(nextDpr);
    
    canvas.width = Math.floor(w * nextDpr);
    canvas.height = Math.floor(h * nextDpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    
    setCanvasSize({ width: w, height: h });
    initStars(w, h);
  }, [initStars]);

  const handlePointerMove = React.useCallback(
    (e) => {
      let clientX = 0;
      let clientY = 0;
      if (e.touches && e.touches.length > 0) {
        const t = e.touches[0];
        clientX = t.clientX;
        clientY = t.clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      mouseRef.current = { x: clientX, y: clientY };
    },
    [],
  );

  const updateStars = React.useCallback(() => {
    const { width: w, height: h } = canvasSize;
    const mouse = mouseRef.current;

    for (let i = 0; i < starsRef.current.length; i++) {
      const p = starsRef.current[i];

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);

      if (dist < mouseInfluence && dist > 0) {
        const force = (mouseInfluence - dist) / mouseInfluence;
        const nx = dx / dist;
        const ny = dy / dist;
        const g = force * (gravityStrength * 0.001);

        if (mouseGravity === 'attract') {
          p.vx += nx * g;
          p.vy += ny * g;
        } else if (mouseGravity === 'repel') {
          p.vx -= nx * g;
          p.vy -= ny * g;
        }

        p.opacity = Math.min(1, p.baseOpacity + force * 0.4);
        p.glowMultiplier = 1 + force * 2;
      } else {
        p.opacity = Math.max(p.baseOpacity * 0.3, p.opacity - 0.01);
        p.glowMultiplier = Math.max(1, (p.glowMultiplier || 1) - 0.05);
      }

      if (starsInteraction) {
        for (let j = i + 1; j < starsRef.current.length; j++) {
          const o = starsRef.current[j];
          const dx2 = o.x - p.x;
          const dy2 = o.y - p.y;
          const d = Math.hypot(dx2, dy2);
          const minD = p.size + o.size + 10;
          if (d < minD && d > 0) {
            if (starsInteractionType === 'bounce') {
              const nx = dx2 / d;
              const ny = dy2 / d;
              const rvx = p.vx - o.vx;
              const rvy = p.vy - o.vy;
              const speed = rvx * nx + rvy * ny;
              if (speed < 0) continue;
              const impulse = (2 * speed) / (p.mass + o.mass);
              p.vx -= impulse * o.mass * nx;
              p.vy -= impulse * o.mass * ny;
              o.vx += impulse * p.mass * nx;
              o.vy += impulse * p.mass * ny;
            }
          }
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    }
  }, [
    canvasSize,
    mouseInfluence,
    mouseGravity,
    gravityStrength,
    starsInteraction,
    starsInteractionType,
  ]);

  const drawStars = React.useCallback(
    (ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const color = readColor();
      
      for (const p of starsRef.current) {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = color;
        
        // Use a simple circle instead of expensive shadowBlur for performance
        ctx.beginPath();
        ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, Math.PI * 2);
        ctx.fill();

        // Optional: very light second pass for interactive stars only
        if (p.glowMultiplier > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr * 2, 0, Math.PI * 2);
          ctx.globalAlpha = p.opacity * 0.3;
          ctx.fill();
        }
      }
    },
    [dpr, readColor],
  );

  const animate = React.useCallback(function animateFrame() {
    if (!isVisibleRef.current) {
      animRef.current = null;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    updateStars();
    drawStars(ctx);
    animRef.current = requestAnimationFrame(animateFrame);
  }, [updateStars, drawStars]);

  React.useEffect(() => {
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [resizeCanvas, handlePointerMove]);

  React.useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
    };
  }, [animate]);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';

      if (!isVisibleRef.current && animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }

      if (isVisibleRef.current && !animRef.current) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [animate]);

  React.useEffect(() => {
    if (starsRef.current.length === 0) {
      initStars(window.innerWidth, window.innerHeight);
    }
  }, [initStars]);

  return (
    <div
      ref={containerRef}
      className={cn('fixed inset-0 w-full h-full overflow-hidden pointer-events-none', className)}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default GravityStars;
