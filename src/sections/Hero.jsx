import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const textRef = useRef(null);
  const portraitRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Prevent page scrolling during intro animation
    document.body.style.overflow = 'hidden';

    const targetText = 'PORTFOLIO';
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

    const ctx = gsap.context(() => {
      // Set initial states for animation elements
      gsap.set(portraitRef.current, { y: '100vh', opacity: 0 });
      gsap.set(subtitleRef.current, { y: 25, opacity: 0 });
      gsap.set(ctaRef.current, { y: 25, opacity: 0 });
      gsap.set(textRef.current, { y: 40, opacity: 0.8 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Restore normal page scrolling after animation finishes
          document.body.style.overflow = '';
        }
      });

      // Step 1: Wait ~1 second after page load
      tl.to({}, { duration: 1 });

      // Step 2: Letter-by-letter scramble effect on PORTFOLIO typography
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

      // Step 3: Brief pause after scramble
      tl.to({}, { duration: 0.3 });

      // Step 4: Move typography upward and animate portrait upward simultaneously
      tl.to(
        textRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        },
        'rise'
      );

      tl.to(
        portraitRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out'
        },
        'rise'
      );

      // Step 5: Reveal subtitle
      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.4'
      );

      // Step 6: Reveal Contact CTA button
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
    <section className="relative min-h-screen w-full bg-neutral-950 text-white flex flex-col justify-between items-center overflow-hidden px-4 py-8 md:py-12 select-none">
      {/* Background Typography: PORTFOLIO */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0"
      >
        <h1
          ref={textRef}
          className="text-[17vw] leading-none font-black tracking-tight uppercase bg-gradient-to-b from-white via-neutral-300 to-neutral-600 bg-clip-text text-transparent opacity-25 sm:opacity-30 inline-block"
        >
          PORTFOLIO
        </h1>
      </div>

      {/* Spacer for top vertical balance */}
      <div className="w-full h-8 sm:h-12 z-10"></div>

      {/* Central Portrait & Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-6xl">
        {/* Portrait Image */}
        <div ref={portraitRef} className="relative flex justify-center items-end">
          <img
            src="/images/hero-person.png"
            alt="Hero Portrait"
            className="w-[280px] xs:w-[320px] sm:w-[420px] md:w-[500px] lg:w-[580px] xl:w-[620px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-none"
          />
        </div>

        {/* Subtitle and Contact CTA Below Portrait */}
        <div className="relative z-20 flex flex-col items-center gap-4 text-center mt-6 sm:mt-8">
          <div ref={subtitleRef}>
            <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-neutral-300">
              AI/ML Student &amp; Developer
            </p>
          </div>

          <div ref={ctaRef}>
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
      </div>

      {/* Bottom padding balance */}
      <div className="w-full h-4 sm:h-8 z-10"></div>
    </section>
  );
}
