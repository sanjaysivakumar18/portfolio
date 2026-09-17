import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);
  const headingRef = useRef(null);

  const servicesData = [
    {
      id: '01',
      title: 'AI FULL STACK DEVELOPMENT',
      description:
        'Building practical, scalable applications by combining modern frontend, backend and AI technologies.',
      capabilities: [
        'React',
        'Next.js',
        'FastAPI',
        'Node.js',
        'Backend Architecture',
        'Databases',
        'AI/LLM Integration'
      ],
      cta: 'VIEW PROJECTS'
    },
    {
      id: '02',
      title: 'FRONTEND DEVELOPMENT',
      capabilities: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'GSAP',
        'Responsive Interfaces'
      ]
    },
    {
      id: '03',
      title: 'BACKEND & API DEVELOPMENT',
      capabilities: [
        'FastAPI',
        'Node.js',
        'Express.js',
        'REST APIs',
        'MongoDB',
        'PostgreSQL',
        'Authentication'
      ]
    },
    {
      id: '04',
      title: 'AI & AUTOMATION',
      capabilities: [
        'Machine Learning',
        'LLMs',
        'LangChain',
        'MCP',
        'RAG',
        'Prompt Engineering',
        'Chatbots & Intelligent Automation'
      ]
    },
    {
      id: '05',
      title: 'MOBILE DEVELOPMENT',
      capabilities: [
        'React Native',
        'API Integration',
        'Responsive UI',
        'State Management',
        'Performance Optimization'
      ]
    },
    {
      id: '06',
      title: 'DEVOPS & TOOLS',
      capabilities: [
        'Git',
        'GitHub',
        'Docker',
        'Postman',
        'VS Code',
        'CI/CD & Deployment Workflows'
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="relative z-10 w-full bg-transparent text-white flex flex-col justify-center px-6 py-12 md:py-16 md:px-16 lg:px-24 border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Right-aligned Oversized Editorial Header with GSAP Entrance */}
        <div className="flex justify-end mb-16 overflow-hidden">
          <h2
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-right text-white"
          >
            WHAT I CAN DO
          </h2>
        </div>

        {/* 6 Full-width Accordion Rows */}
        <div className="divide-y divide-neutral-800 border-t border-b border-neutral-800">
          {servicesData.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={service.id}
                className="group py-6 md:py-8 px-4 -mx-4 rounded-xl transition-all duration-300 md:hover:bg-[#ccff00] md:hover:text-black cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {/* Header Row (Clickable) */}
                <div className="w-full flex items-center justify-between text-left focus:outline-none">
                  <div className="flex items-baseline gap-6 md:gap-12">
                    <span className="text-neutral-500 font-mono text-lg md:text-2xl font-medium transition-colors md:group-hover:text-black/70">
                      {service.id}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white transition-colors md:group-hover:text-black">
                      {service.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center transition-all duration-300 shrink-0 ml-4 md:group-hover:border-black/30 md:group-hover:bg-black/10">
                    <svg
                      className={`w-5 h-5 text-white transition-transform duration-300 md:group-hover:text-black ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expandable Content Area with CSS Grid Transition */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 mt-8 pt-4 border-t border-neutral-800/40 md:group-hover:border-black/20'
                      : 'grid-rows-[0fr] opacity-0 mt-0 pt-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-neutral-300 md:group-hover:text-black/90">
                      {/* Left Column: Description & CTA */}
                      <div className="lg:col-span-6 space-y-4">
                        {service.description ? (
                          <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-300 md:group-hover:text-black/90">
                            {service.description}
                          </p>
                        ) : (
                          <p className="text-neutral-400 md:group-hover:text-black/70 font-light text-base">
                            Specialized solutions tailored to project requirements and modern architectural standards.
                          </p>
                        )}
                        {service.cta && (
                          <div className="pt-2">
                            <a
                              href="#projects"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-white md:group-hover:text-black border-b border-white md:group-hover:border-black pb-1 transition-all"
                            >
                              <span>{service.cta}</span>
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
                          </div>
                        )}
                      </div>

                      {/* Right Column: Capabilities */}
                      <div className="lg:col-span-6">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 md:group-hover:text-black/70 mb-3">
                          Capabilities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-sm font-medium transition-colors md:group-hover:bg-black/10 md:group-hover:border-black/20 md:group-hover:text-black"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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
