import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Simulated API submission workflow (Ready for real backend integration)
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset state back to idle after 4 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    }, 1500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (infoRef.current && formRef.current) {
        gsap.fromTo(
          infoRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );

        gsap.fromTo(
          formRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 w-full bg-transparent text-white flex flex-col justify-center px-6 py-12 md:py-16 md:px-16 lg:px-24 border-t border-white/10 overflow-hidden select-none"
    >
      {/* Ambient Lime Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (~40%): Info & Socials */}
          <div ref={infoRef} className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
                Get in touch
              </h2>
              <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed max-w-md">
                Have a project in mind or interested in collaborating? Feel free to reach out directly or send a message.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <div>
                <span className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                  Email
                </span>
                <a
                  href="mailto:sanch.builds@gmail.com"
                  className="text-lg font-medium text-white hover:text-[#ccff00] transition-colors"
                >
                  sanch.builds@gmail.com
                </a>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="pt-6">
              <span className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
                Social Links
              </span>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Instagram', url: '#' },
                  { name: 'YouTube', url: '#' },
                  { name: 'LinkedIn', url: '#' },
                  { name: 'GitHub', url: '#' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-200 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (~60%): Form */}
          <div
            ref={formRef}
            className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    disabled={status === 'submitting'}
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-white rounded-xl px-4 py-3.5 text-base placeholder-neutral-600 focus:outline-none focus:border-[#ccff00] transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    disabled={status === 'submitting'}
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-white rounded-xl px-4 py-3.5 text-base placeholder-neutral-600 focus:outline-none focus:border-[#ccff00] transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    disabled={status === 'submitting'}
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-white rounded-xl px-4 py-3.5 text-base placeholder-neutral-600 focus:outline-none focus:border-[#ccff00] transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    required
                    disabled={status === 'submitting'}
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-white rounded-xl px-4 py-3.5 text-base placeholder-neutral-600 focus:outline-none focus:border-[#ccff00] transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  disabled={status === 'submitting'}
                  className="w-full bg-neutral-900/60 border border-neutral-800 text-white rounded-xl px-4 py-3.5 text-base placeholder-neutral-600 focus:outline-none focus:border-[#ccff00] transition-colors resize-none disabled:opacity-50"
                ></textarea>
              </div>

              {/* Submit Button & Status Indicator */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    status === 'submitting'
                      ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed opacity-70'
                      : status === 'success'
                      ? 'bg-[#ccff00] text-black font-bold'
                      : 'bg-white text-black hover:bg-[#ccff00] hover:text-black'
                  }`}
                >
                  {status === 'submitting' && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  <span>
                    {status === 'idle' && 'Send Message'}
                    {status === 'submitting' && 'Sending...'}
                    {status === 'success' && 'Message sent successfully!'}
                    {status === 'error' && 'Retry Sending'}
                  </span>
                </button>

                {status === 'success' && (
                  <span className="text-xs font-mono text-[#ccff00] uppercase tracking-wider">
                    ✓ Thank you! I will reply shortly.
                  </span>
                )}

                {status === 'error' && (
                  <span className="text-xs font-mono text-red-400 uppercase tracking-wider">
                    {errorMessage || 'Failed to send message.'}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
