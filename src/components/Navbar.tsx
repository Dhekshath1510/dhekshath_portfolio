import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '../hooks';

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Agentic AI', id: 'agentic-ai' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      })).filter(s => s.el);

      const navH = 80;
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].el!.getBoundingClientRect();
        if (rect.top <= navH + 100) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: 'var(--nav-height)',
          background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s',
        }}
      >
        <div className="section-container-wide flex items-center justify-between h-full">
          {/* Logo */}
          <button
            onClick={() => handleNav('hero')}
            className="interactive"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: 'var(--accent-cyan)' }}>D</span>S
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--text-tertiary)',
              marginLeft: '8px',
              letterSpacing: '0.08em',
            }}>
              / engineer
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center" style={{ gap: '2rem' }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="interactive"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: activeSection === item.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color 0.25s',
                  letterSpacing: '0.01em',
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'var(--gradient-blue-cyan)',
                      borderRadius: 1,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden interactive"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              top: 'var(--nav-height)',
              background: 'rgba(10, 10, 15, 0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full" style={{ gap: '2rem' }}>
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNav(item.id)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    color: activeSection === item.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
