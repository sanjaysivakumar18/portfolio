import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const headlineRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          once: true
        }
      });

      // Main SANCHBUILDS typography reveal
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out'
          }
        );
      }

      // Bottom legal & copyright links reveal
      if (bottomRef.current) {
        tl.fromTo(
          bottomRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          },
          '-=0.6'
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative min-h-[60vh] w-full bg-neutral-950 text-white flex flex-col justify-between px-6 pt-16 pb-8 md:px-16 lg:px-24 border-t border-neutral-900 overflow-hidden select-none"
    >
      {/* Cinematic Dark Gradient Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-neutral-950/80 pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between flex-grow">
        {/* Main Footer Typography */}
        <div className="my-auto py-12 text-center">
          <h2
            ref={headlineRef}
            className="text-4xl sm:text-7xl md:text-8xl lg:text-[12vw] font-black uppercase tracking-tight leading-none bg-gradient-to-b from-white via-neutral-300 to-neutral-700 bg-clip-text text-transparent opacity-90 inline-block"
          >
            SANCHBUILDS
          </h2>
        </div>

        {/* Bottom Area */}
        <div
          ref={bottomRef}
          className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500"
        >
          <p>© 2026 SANCHBUILDS. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
