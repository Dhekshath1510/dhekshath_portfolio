import { useRef, useEffect } from 'react';
import { useCursor } from './hooks';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import AgenticAI from './components/AgenticAI';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Architecture from './components/Architecture';
import GitHubSection from './components/GitHubSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const cursorRef = useCursor();

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <AgenticAI />
        <Projects />
        <Experience />
        <Architecture />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
