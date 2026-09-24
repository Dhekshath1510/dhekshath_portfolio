import { Mail, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '2.5rem 0',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-primary)',
      }}
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: '1.5rem' }}>
          {/* Left - branding */}
          <div className="flex items-center" style={{ gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text-primary)',
              }}
            >
              <span style={{ color: 'var(--accent-cyan)' }}>D</span>S
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.04em',
              }}
            >
              Dhekshath Saravanan
            </span>
          </div>

          {/* Center - label */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.04em',
            }}
          >
            Software Engineer • Chennai, India
          </span>

          {/* Right - social links */}
          <div className="flex items-center" style={{ gap: '0.75rem' }}>
            {[
              { icon: <Github size={15} />, href: 'https://github.com/Dhekshath1510', label: 'GitHub' },
              { icon: <Linkedin size={15} />, href: 'https://linkedin.com/in/dhekshath-s', label: 'LinkedIn' },
              { icon: <Mail size={15} />, href: 'mailto:dhekshath.saravanan@gmail.com', label: 'Email' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={link.label}
                className="interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'var(--text-tertiary)',
                  textDecoration: 'none',
                  transition: 'border-color 0.25s, color 0.25s',
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
