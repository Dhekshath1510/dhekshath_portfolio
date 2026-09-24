import { motion } from 'framer-motion';
import { useInView, fadeInUp } from '../hooks';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Contact() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: `var(--section-padding) 0`,
        position: 'relative',
      }}
    >
      {/* Background accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative text-center">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Get In Touch
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Let's Build Something{' '}
            <span className="gradient-text">Interesting.</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '460px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Have an idea, project, or opportunity? Let's connect.
          </p>
        </motion.div>

        {/* Contact buttons */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex flex-wrap justify-center"
          style={{ gap: '1rem', marginBottom: '3rem' }}
        >
          <a
            href="mailto:dhekshath.saravanan@gmail.com"
            className="interactive flex items-center"
            style={{
              gap: '0.6rem',
              padding: '14px 28px',
              borderRadius: '12px',
              background: 'var(--gradient-blue-cyan)',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'transform 0.2s, box-shadow 0.3s',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.25)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.35)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.25)';
            }}
          >
            <Mail size={16} />
            Email Me
          </a>

          <a
            href="https://github.com/Dhekshath1510"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive flex items-center"
            style={{
              gap: '0.6rem',
              padding: '14px 28px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'border-color 0.25s, background 0.25s',
            }}
          >
            <Github size={16} />
            GitHub
            <ArrowUpRight size={14} style={{ color: 'var(--text-tertiary)' }} />
          </a>

          <a
            href="https://linkedin.com/in/dhekshath-s"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive flex items-center"
            style={{
              gap: '0.6rem',
              padding: '14px 28px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'border-color 0.25s, background 0.25s',
            }}
          >
            <Linkedin size={16} />
            LinkedIn
            <ArrowUpRight size={14} style={{ color: 'var(--text-tertiary)' }} />
          </a>
        </motion.div>

        {/* Email display */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <a
            href="mailto:dhekshath.saravanan@gmail.com"
            className="interactive"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--text-tertiary)',
              textDecoration: 'none',
              transition: 'color 0.25s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--accent-cyan)')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-tertiary)')}
          >
            dhekshath.saravanan@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
