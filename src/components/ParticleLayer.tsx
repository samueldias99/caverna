"use client";

import { useEffect, useRef } from "react";

export default function ParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Optionally fade particles out if not on home page, but user said cinematic feel so let's keep them across scenes or fade them gently.
  // For now, keep them everywhere.

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;
      type: 'spark' | 'smoke';

      constructor(w: number, h: number) {
        this.type = Math.random() > 0.85 ? 'smoke' : 'spark';
        // Spawn near the right side (where the fire usually is)
        const spawnX = w * 0.70 + (Math.random() * w * 0.20);
        const spawnY = h * 0.85 + (Math.random() * h * 0.15);
        
        this.x = spawnX;
        this.y = spawnY;
        
        if (this.type === 'spark') {
          this.size = Math.random() * 2 + 0.5;
          this.speedX = Math.random() * -1.5 - 0.2;
          this.speedY = Math.random() * -3 - 1;
          this.maxLife = Math.random() * 120 + 50;
        } else {
          // Smoke
          this.size = Math.random() * 15 + 10;
          this.speedX = Math.random() * -0.5 - 0.2;
          this.speedY = Math.random() * -1.5 - 0.5;
          this.maxLife = Math.random() * 200 + 100;
        }
        this.life = this.maxLife;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        if (this.type === 'smoke') {
          this.size += 0.2; // Expand smoke
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = Math.max(0, this.life / this.maxLife);
        ctx.beginPath();
        if (this.type === 'spark') {
          ctx.fillStyle = `rgba(255, 165, 0, ${opacity})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(255, 69, 0, 1)';
        } else {
          ctx.fillStyle = `rgba(100, 100, 100, ${opacity * 0.15})`;
          ctx.shadowBlur = 0;
        }
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn new particles (fewer if not on home, but let's keep it steady for now)
      if (Math.random() < 0.25) {
        particles.push(new Particle(width, height));
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0" 
    />
  );
}
