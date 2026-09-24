import { motion } from 'framer-motion';
import { useInView, fadeInUp } from '../hooks';
import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';

export default function GitHubSection() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      ref={ref}
      style={{
        padding: `var(--section-padding) 0`,
        position: 'relative',
      }}
    >
      <div className="section-container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="card text-center"
          style={{
            padding: 'clamp(2rem, 5vw, 4rem)',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(139,92,246,0.04) 100%)',
            border: '1px solid rgba(59,130,246,0.12)',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <Github size={26} style={{ color: 'var(--text-primary)' }} />
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            Explore My <span className="gradient-text">Code</span>
          </h3>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              maxWidth: '440px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}
          >
            Browse my repositories, contributions, and open-source work on GitHub.
          </p>

          <a
            href="https://github.com/Dhekshath1510"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive inline-flex items-center"
            style={{
              gap: '0.5rem',
              padding: '12px 28px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'border-color 0.25s, background 0.25s',
            }}
          >
            <Github size={16} />
            github.com/Dhekshath1510
            <ExternalLink size={14} style={{ color: 'var(--text-tertiary)' }} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
