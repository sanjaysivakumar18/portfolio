import React, { useEffect, useRef } from 'react';

/**
 * High-quality interactive galaxy background effect running globally across
 * the entire portfolio website.
 *
 * Features:
 * - Fixed deep space dark background (#050816) covering full viewport.
 * - Subtle violet/purple (#6C63FF) and cyan-blue (#00BFFF) cosmic nebula highlights.
 * - Multi-layered starfield with dynamic size pulsation, brightness variations, and soft twinkling.
 * - Interactive Cursor Force Field: Nearby stars gently wobble, drift, and repel from cursor
 *   with a soft ripple reaction across all sections, smoothly floating back when cursor moves away.
 * - Non-blocking pointer events (pointer-events: none) and 60 FPS performance optimization.
 */
export default function GalaxyEffect() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Mouse & Touch Tracking with smooth lerp
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      targetCanvasX: -9999,
      targetCanvasY: -9999,
      canvasX: -9999,
      canvasY: -9999,
      isHovered: false,
    };

    // Scroll Tracking
    const scroll = {
      targetY: typeof window !== 'undefined' ? window.scrollY : 0,
      currentY: typeof window !== 'undefined' ? window.scrollY : 0,
      initialY: typeof window !== 'undefined' ? window.scrollY : 0,
    };

    let stars = [];
    let nebulae = [];

    const initStarsAndNebulae = (w, h) => {
      // Density calculation based on viewport dimensions
      const starDensityFactor = Math.min(w, 1920) * Math.min(h, 1200) * 0.00015;
      const actualCount = Math.max(140, Math.min(340, Math.floor(starDensityFactor)));

      stars = [];
      for (let i = 0; i < actualCount; i++) {
        // 3 Depth Layers: 0 (background distant), 1 (midground), 2 (foreground)
        const randLayer = Math.random();
        const layer = randLayer < 0.55 ? 0 : randLayer < 0.85 ? 1 : 2;

        let baseRadius = 0.5;
        let speedMult = 0.02;
        if (layer === 1) {
          baseRadius = 1.1;
          speedMult = 0.045;
        } else if (layer === 2) {
          baseRadius = 1.8;
          speedMult = 0.08;
        }

        // Color subtle variations: Soft white, cyan-blue highlight, violet highlight
        const colorType = Math.random();
        let colorPrefix = 'rgba(255, 255, 255, ';
        if (colorType > 0.75) {
          colorPrefix = 'rgba(0, 191, 255, '; // Cyan-blue (#00BFFF)
        } else if (colorType > 0.55) {
          colorPrefix = 'rgba(175, 160, 255, '; // Violet/Purple (#6C63FF tint)
        }

        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          dispX: 0,
          dispY: 0,
          radius: baseRadius * (0.65 + Math.random() * 0.7),
          layer,
          speedMult,
          colorPrefix,
          baseAlpha: 0.15 + Math.random() * 0.7,
          twinkleSpeed: 0.008 + Math.random() * 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.5 + Math.random() * 1.5,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Cosmic nebula clouds distributed across viewport
      nebulae = [
        {
          xRatio: 0.2,
          yRatio: 0.25,
          radiusRatio: 0.45,
          colorInner: 'rgba(108, 99, 255, 0.14)', // Violet cloud top-left
          colorOuter: 'rgba(108, 99, 255, 0)',
          parallax: 0.015,
        },
        {
          xRatio: 0.8,
          yRatio: 0.35,
          radiusRatio: 0.48,
          colorInner: 'rgba(0, 191, 255, 0.12)', // Cyan-blue cloud top-right
          colorOuter: 'rgba(0, 191, 255, 0)',
          parallax: 0.03,
        },
        {
          xRatio: 0.3,
          yRatio: 0.75,
          radiusRatio: 0.45,
          colorInner: 'rgba(138, 90, 240, 0.12)', // Violet cloud bottom-left
          colorOuter: 'rgba(138, 90, 240, 0)',
          parallax: 0.02,
        },
        {
          xRatio: 0.85,
          yRatio: 0.85,
          radiusRatio: 0.42,
          colorInner: 'rgba(0, 191, 255, 0.11)', // Cyan cloud bottom-right
          colorOuter: 'rgba(0, 191, 255, 0)',
          parallax: 0.025,
        },
      ];
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initStarsAndNebulae(width, height);
    };

    const handleMouseMove = (e) => {
      mouse.isHovered = true;

      const centerX = width / 2;
      const centerY = height / 2;
      mouse.targetX = (e.clientX - centerX) / centerX;
      mouse.targetY = (e.clientY - centerY) / centerY;

      mouse.targetCanvasX = e.clientX;
      mouse.targetCanvasY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetCanvasX = -9999;
      mouse.targetCanvasY = -9999;
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            lastTime = performance.now();
            render();
          }
        });
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const render = () => {
      if (!isVisible) return;
      const currentTime = performance.now();
      const delta = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;
      const time = currentTime * 0.001;

      const lerpFactor = 1 - Math.pow(0.001, delta);
      const starLerpFactor = 1 - Math.pow(0.0001, delta);

      // Smooth mouse lerp
      mouse.currentX += (mouse.targetX - mouse.currentX) * lerpFactor;
      mouse.currentY += (mouse.targetY - mouse.currentY) * lerpFactor;
      mouse.canvasX += (mouse.targetCanvasX - mouse.canvasX) * lerpFactor;
      mouse.canvasY += (mouse.targetCanvasY - mouse.canvasY) * lerpFactor;

      // Smooth scroll lerp
      scroll.currentY += (scroll.targetY - scroll.currentY) * lerpFactor;
      const scrollDelta = (scroll.currentY - scroll.initialY) * 0.08;

      // Deep space dark background (#050816)
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, width, height);

      // Draw Nebulae Clouds
      nebulae.forEach((neb) => {
        const nx = neb.xRatio * width + mouse.currentX * neb.parallax * 90;
        const ny =
          neb.yRatio * height +
          mouse.currentY * neb.parallax * 90 +
          scrollDelta * neb.parallax;
        const radius = neb.radiusRatio * Math.max(width, height);

        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius);
        grad.addColorStop(0, neb.colorInner);
        grad.addColorStop(1, neb.colorOuter);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Cursor force field configuration
      const influenceRadius = 170;
      const influenceRadiusSq = influenceRadius * influenceRadius;

      // Draw Stars
      stars.forEach((star) => {
        // Parallax displacement
        const offsetX = mouse.currentX * star.speedMult * 50;
        const offsetY =
          mouse.currentY * star.speedMult * 50 + scrollDelta * star.speedMult * 15;

        let baseSx = (star.x + offsetX) % width;
        if (baseSx < 0) baseSx += width;
        let baseSy = (star.y + offsetY) % height;
        if (baseSy < 0) baseSy += height;

        // Calculate cursor proximity & soft organic repulsion force
        let targetDispX = 0;
        let targetDispY = 0;
        let proximityGlow = 0;

        if (mouse.isHovered) {
          const currentSx = baseSx + star.dispX;
          const currentSy = baseSy + star.dispY;
          const dx = currentSx - mouse.canvasX;
          const dy = currentSy - mouse.canvasY;
          const distSq = dx * dx + dy * dy;

          if (distSq < influenceRadiusSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const forceFactor = 1 - dist / influenceRadius;
            const rippleCurve = Math.sin(forceFactor * Math.PI * 0.5);

            const maxPush = 34 * (0.6 + star.layer * 0.35);

            targetDispX = (dx / dist) * rippleCurve * maxPush;
            targetDispY = (dy / dist) * rippleCurve * maxPush;
            proximityGlow = rippleCurve * 0.35;
          }
        }

        // Interpolate star displacement
        star.dispX += (targetDispX - star.dispX) * starLerpFactor;
        star.dispY += (targetDispY - star.dispY) * starLerpFactor;

        const finalSx = baseSx + star.dispX;
        const finalSy = baseSy + star.dispY;

        // Twinkle & Size pulse
        const twinkle = Math.sin(time * star.twinkleSpeed * 100 + star.twinklePhase);
        const sizePulse = 1 + Math.sin(time * star.pulseSpeed + star.pulsePhase) * 0.16;
        const currentRadius = Math.max(0.3, star.radius * sizePulse);

        const alpha = Math.max(
          0.08,
          Math.min(1, star.baseAlpha + twinkle * 0.22 + proximityGlow)
        );

        ctx.fillStyle = `${star.colorPrefix}${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(finalSx, finalSy, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Soft outer aura glow
        if ((star.layer === 2 && currentRadius > 1.3) || proximityGlow > 0.15) {
          const auraAlpha = (alpha * (0.2 + proximityGlow * 0.4)).toFixed(3);
          ctx.fillStyle = `${star.colorPrefix}${auraAlpha})`;
          ctx.beginPath();
          ctx.arc(finalSx, finalSy, currentRadius * 2.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    handleResize();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
}

