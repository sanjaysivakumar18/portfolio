import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Prevent page scrolling during intro animation
    document.body.style.overflow = 'hidden';

    const targetText = 'PORTFOLIO';
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

    const ctx = gsap.context(() => {
      // Set initial states for animation elements
      gsap.set(textRef.current, { y: 30, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 25, opacity: 0 });
      gsap.set(ctaRef.current, { y: 25, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Restore normal page scrolling after animation finishes
          document.body.style.overflow = '';
        }
      });

      // Step 1: Wait ~0.5 second after page load
      tl.to({}, { duration: 0.5 });

      // Step 2: Fade in PORTFOLIO typography container
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Step 3: Letter-by-letter scramble effect on PORTFOLIO typography
      const scrambleObj = { progress: 0 };
      tl.to(scrambleObj, {
        progress: 1,
        duration: 1.2,
        ease: 'power1.inOut',
        onUpdate: () => {
          const p = scrambleObj.progress;
          const resolvedLength = Math.floor(p * targetText.length);
          let result = '';
          for (let i = 0; i < targetText.length; i++) {
            if (i < resolvedLength) {
              result += targetText[i];
            } else {
              const randChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              result += randChar;
            }
          }
          if (textRef.current) {
            textRef.current.innerText = result;
          }
        },
        onComplete: () => {
          if (textRef.current) {
            textRef.current.innerText = targetText;
          }
        }
      });

      // Step 4: Reveal subtitle
      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.2'
      );

      // Step 5: Reveal Contact CTA button
      tl.to(
        ctaRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.4'
      );
    });

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative z-10 min-h-[85vh] sm:min-h-screen w-full bg-transparent text-white flex flex-col justify-between items-center overflow-hidden px-4 py-8 md:py-12 select-none">
      {/* Spacer for top balance */}
      <div className="w-full h-4 sm:h-8 z-10"></div>

      {/* Central Clean Stack: PORTFOLIO, Subtitle, CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-6xl text-center px-4">
        {/* Scramble Typography: PORTFOLIO */}
        <h1
          ref={textRef}
          className="text-[13vw] sm:text-[14vw] md:text-[15vw] leading-none font-black tracking-tight uppercase bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent inline-block drop-shadow-lg"
        >
          PORTFOLIO
        </h1>

        {/* Subtitle / Handle */}
        <div ref={subtitleRef} className="mt-4 sm:mt-6">
          <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-wider text-neutral-300 font-mono">
            sanchbuilds
          </p>
        </div>

        {/* Contact CTA Button */}
        <div ref={ctaRef} className="mt-5 sm:mt-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm sm:text-base hover:bg-white/20 hover:border-white/30 transition-all duration-300 group shadow-lg cursor-pointer"
          >
            <span>Contact</span>
            <span className="w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center group-hover:scale-105 group-hover:bg-neutral-100 transition-all duration-300">
              <svg
                className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="w-full flex justify-center pb-2 z-10 opacity-60 hover:opacity-100 transition-opacity">
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-xs tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
        >
          <span>Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
