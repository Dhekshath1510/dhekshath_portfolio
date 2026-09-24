import { motion } from 'framer-motion';
import { MapPin, GraduationCap } from 'lucide-react';
import { useInView, fadeInUp } from '../hooks';

export default function About() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: `var(--section-padding) 0`,
        position: 'relative',
      }}
    >
      {/* Subtle accent glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
          transform: 'translateY(-50%)',
        }}
      />

      <div className="section-container relative">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div className="section-label">About</div>
          <h2 className="section-title">
            Building systems that <span className="gradient-text">actually work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 mt-4">
          {/* Main text */}
          <motion.div
            className="md:col-span-3"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <p
              style={{
                fontSize: '1.02rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: '580px',
              }}
            >
              I'm a Computer Science engineering student and software developer focused on building practical, 
              scalable, and intelligent software systems. My experience spans full-stack development, backend 
              engineering, REST API design, databases, system architecture, machine learning, Agentic AI, 
              workflow automation, and IoT.
            </p>
            <p
              style={{
                fontSize: '1.02rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: '580px',
                marginTop: '1rem',
              }}
            >
              I enjoy working across the entire lifecycle of a product — from designing interfaces and backend 
              APIs to databases, AI models, automation workflows, deployment, and system integration. I don't 
              just write code; I build complete systems.
            </p>
          </motion.div>

          {/* Info cards */}
          <motion.div
            className="md:col-span-2 flex flex-col"
            style={{ gap: '1rem' }}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            {/* Location */}
            <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  Location
                </span>
              </div>
              <p style={{ fontWeight: 500, fontSize: '0.95rem' }}>Chennai, India</p>
            </div>

            {/* Education */}
            <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '0.5rem' }}>
                <GraduationCap size={16} style={{ color: 'var(--accent-purple)' }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  Education
                </span>
              </div>
              <p style={{ fontWeight: 500, fontSize: '0.95rem' }}>B.E. Computer Science</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Rajalakshmi Engineering College
              </p>
              <div className="flex items-center" style={{ gap: '1rem', marginTop: '0.5rem' }}>
                <span className="tech-tag">2023 – 2027</span>
                <span className="tech-tag">CGPA: 8.30</span>
              </div>
            </div>

            {/* Core focus */}
            <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.75rem',
              }}>
                Core Focus Areas
              </span>
              <div className="flex flex-wrap" style={{ gap: '0.4rem' }}>
                {[
                  'Software Engineering',
                  'Backend Systems',
                  'Full Stack',
                  'AI / ML',
                  'Agentic AI',
                  'Automation',
                  'IoT',
                  'System Design',
                ].map(area => (
                  <span key={area} className="tech-tag">{area}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
