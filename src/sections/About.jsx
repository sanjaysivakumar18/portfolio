import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const paragraphRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const marquee3Ref = useRef(null);
  const marquee4Ref = useRef(null);

  const frontendSkills = [
    'React.js',
    'Next.js',
    'React Native',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Bootstrap',
    'Material UI',
    'HTML5'
  ];

  const backendSkills = [
    'Python',
    'FastAPI',
    'Node.js',
    'Express.js',
    'REST APIs',
    'Databases',
    'MongoDB',
    'PostgreSQL'
  ];

  const aiSkills = [
    'Machine Learning',
    'PyTorch',
    'scikit-learn',
    'OpenCV',
    'LLMs',
    'LangChain',
    'RAG',
    'MCP',
    'Prompt Engineering',
    'Agentic AI'
  ];

  const toolSkills = ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code'];

  const highlightTech = [
    'React',
    'FastAPI',
    'Node.js',
    'Python',
    'Machine Learning',
    'LLMs',
    'LangChain',
    'MCP'
  ];

  const descriptionText =
    'An enthusiastic AI/ML student and developer focused on building practical intelligent applications and learning through real-world projects.';

  const descriptionWords = descriptionText.split(' ');

  // Repeat skill arrays to guarantee seamless infinite scrolling on all screen sizes
  const repeatedFrontend = [
    ...frontendSkills,
    ...frontendSkills,
    ...frontendSkills,
    ...frontendSkills
  ];
  const repeatedBackend = [
    ...backendSkills,
    ...backendSkills,
    ...backendSkills,
    ...backendSkills
  ];
  const repeatedAI = [...aiSkills, ...aiSkills, ...aiSkills, ...aiSkills];
  const repeatedTools = [
    ...toolSkills,
    ...toolSkills,
    ...toolSkills,
    ...toolSkills,
    ...toolSkills,
    ...toolSkills
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word ScrollTrigger reveal animation
      if (paragraphRef.current) {
        const wordElements = paragraphRef.current.querySelectorAll('.about-word');
        gsap.fromTo(
          wordElements,
          {
            opacity: 0.2,
            color: '#525252'
          },
          {
            opacity: 1,
            color: '#ffffff',
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: 0.5
            }
          }
        );
      }

      // Infinite Marquee Animations
      // Row 1: Frontend (left -> right)
      if (marquee1Ref.current) {
        gsap.fromTo(
          marquee1Ref.current,
          { xPercent: -50 },
          { xPercent: 0, ease: 'none', duration: 30, repeat: -1 }
        );
      }

      // Row 2: Backend (right -> left)
      if (marquee2Ref.current) {
        gsap.fromTo(
          marquee2Ref.current,
          { xPercent: 0 },
          { xPercent: -50, ease: 'none', duration: 30, repeat: -1 }
        );
      }

      // Row 3: AI (left -> right)
      if (marquee3Ref.current) {
        gsap.fromTo(
          marquee3Ref.current,
          { xPercent: -50 },
          { xPercent: 0, ease: 'none', duration: 30, repeat: -1 }
        );
      }

      // Row 4: Tools (right -> left)
      if (marquee4Ref.current) {
        gsap.fromTo(
          marquee4Ref.current,
          { xPercent: 0 },
          { xPercent: -50, ease: 'none', duration: 30, repeat: -1 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="relative z-10 w-full bg-transparent text-white flex flex-col justify-center px-6 py-12 md:py-16 md:px-16 lg:px-24 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Large Editorial Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-8 text-white">
          Intro
        </h2>

        {/* Two-column layout (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-4 backdrop-blur-md shadow-2xl max-w-md w-full">
              <img
                src="/images/hero-person.png"
                alt="Sanjay"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Right Column: Glassmorphism Description Card */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10 shadow-2xl space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Hey, I'm Sanjay.
              </h3>

              {/* Word-by-Word Scroll Reveal Paragraph */}
              <p
                ref={paragraphRef}
                className="text-lg md:text-xl leading-relaxed font-light flex flex-wrap"
              >
                {descriptionWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="about-word mr-[0.3em] inline-block opacity-20 text-neutral-600"
                  >
                    {word}
                  </span>
                ))}
              </p>

              {/* Highlight Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {highlightTech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-neutral-200 text-sm font-medium backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Infinite Marquee Rows */}
        <div className="space-y-6 mt-12">
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-4">
            Skills &amp; Technologies
          </h3>

          {/* Row 1: Frontend (Left to Right) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md overflow-hidden flex items-center relative">
            <div className="shrink-0 z-10 pr-4 bg-neutral-950/80 backdrop-blur-md py-1">
              <span className="font-semibold text-neutral-400 text-sm px-2">
                Frontend
              </span>
            </div>
            <div className="overflow-hidden w-full relative">
              <div ref={marquee1Ref} className="flex gap-3 whitespace-nowrap w-max">
                {repeatedFrontend.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200 text-sm font-medium shrink-0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Backend (Right to Left) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md overflow-hidden flex items-center relative">
            <div className="shrink-0 z-10 pr-4 bg-neutral-950/80 backdrop-blur-md py-1">
              <span className="font-semibold text-neutral-400 text-sm px-2">
                Backend
              </span>
            </div>
            <div className="overflow-hidden w-full relative">
              <div ref={marquee2Ref} className="flex gap-3 whitespace-nowrap w-max">
                {repeatedBackend.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200 text-sm font-medium shrink-0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: AI (Left to Right) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md overflow-hidden flex items-center relative">
            <div className="shrink-0 z-10 pr-4 bg-neutral-950/80 backdrop-blur-md py-1">
              <span className="font-semibold text-neutral-400 text-sm px-2">
                AI
              </span>
            </div>
            <div className="overflow-hidden w-full relative">
              <div ref={marquee3Ref} className="flex gap-3 whitespace-nowrap w-max">
                {repeatedAI.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200 text-sm font-medium shrink-0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Tools (Right to Left) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md overflow-hidden flex items-center relative">
            <div className="shrink-0 z-10 pr-4 bg-neutral-950/80 backdrop-blur-md py-1">
              <span className="font-semibold text-neutral-400 text-sm px-2">
                Tools
              </span>
            </div>
            <div className="overflow-hidden w-full relative">
              <div ref={marquee4Ref} className="flex gap-3 whitespace-nowrap w-max">
                {repeatedTools.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200 text-sm font-medium shrink-0"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
