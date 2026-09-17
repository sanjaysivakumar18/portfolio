import React from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import GalaxyEffect from './components/GalaxyEffect';

export default function App() {
  return (
    <main className="relative min-h-screen bg-[#050816] text-white overflow-x-hidden">
      <GalaxyEffect />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
