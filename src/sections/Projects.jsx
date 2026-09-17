import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);

  const projectsData = [
    {
      id: '01',
      title: 'MALE UAV AERO-PISTON ENGINE DIGITAL TWIN',
      description:
        'An AI-enabled Digital Twin system for health monitoring, fault prediction, degradation tracking, RUL estimation and mission-risk assessment for aero-piston engines used in MALE UAVs.',
      image: '/images/project-1.png',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: '02',
      title: 'STUDENT PERFORMANCE PREDICTION',
      description:
        'An AI-based application that predicts student performance using academic and behavioral features with machine learning models and provides study guidance.',
      image: '/images/project-2.png',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: '03',
      title: 'HYPERLOCAL PEER-TO-PEER DOUBT RESOLUTION',
      description:
        'A platform designed to connect students with verified peer mentors for doubt resolution, discussions and scheduled mentoring sessions.',
      image: '/images/project-3.png',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: '04',
      title: 'AI CUSTOMER RESOLUTION BRAIN',
      description:
        'A RAG and agentic AI system designed for enterprise customer experience intelligence and autonomous dispute resolution.',
      image: '/images/project-4.png',
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      const projectItems = containerRef.current.querySelectorAll('.project-item');

      projectItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 w-full bg-transparent text-white flex flex-col justify-center px-6 py-12 md:py-16 md:px-16 lg:px-24 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
              SELECTED{' '}
              <span className="font-serif italic font-normal text-neutral-400 lowercase">
                work
              </span>
            </h2>
          </div>

          <div className="max-w-md space-y-4">
            <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed">
              Featured intelligent systems, full-stack applications, and machine learning solutions engineered for real-world impact.
            </p>
            <div>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-[#ccff00] font-mono text-sm tracking-wider uppercase hover:underline cursor-pointer"
              >
                <span>Read More</span>
                <span className="text-lg">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Alternating Editorial Projects List */}
        <div className="space-y-24 md:space-y-32">
          {projectsData.map((project, index) => {
            const isEven = index % 2 === 0; // 01 & 03: image left; 02 & 04: image right

            return (
              <div
                key={project.id}
                className="project-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-neutral-900 pb-16 md:pb-24 last:border-0"
              >
                {/* Image Container */}
                <div
                  className={`lg:col-span-7 w-full ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  } order-3 mt-4 lg:mt-0`}
                >
                  <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-neutral-800/80 bg-neutral-900/60 flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-8 flex flex-col justify-between transition-transform duration-500 ease-out md:group-hover:scale-[1.05]">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                          PROJECT // {project.id}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
                      </div>

                      <div className="text-center py-6">
                        <h4 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-neutral-300 max-w-xs mx-auto">
                          {project.title}
                        </h4>
                      </div>

                      <div className="flex justify-between items-end text-xs font-mono text-neutral-600">
                        <span>EDITORIAL ASSET</span>
                        <span>16:10 RATIO</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Number (Mobile Order 1) */}
                  <div className="order-1">
                    <span className="font-mono text-neutral-500 text-lg md:text-xl font-medium">
                      {project.id}
                    </span>
                  </div>

                  {/* Title (Mobile Order 2) */}
                  <div className="order-2">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description (Mobile Order 4) */}
                  <div className="order-4 lg:order-3 pt-2">
                    <p className="text-neutral-300 font-light text-base md:text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Buttons (Mobile Order 5) */}
                  <div className="order-5 lg:order-4 pt-4 flex flex-wrap gap-4 items-center">
                    <a
                      href={project.liveUrl}
                      className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Live Demo</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>

                    <a
                      href={project.githubUrl}
                      className="px-6 py-2.5 rounded-full bg-white/5 border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>GitHub</span>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
