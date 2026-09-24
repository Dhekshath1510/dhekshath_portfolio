import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { scrollToSection } from '../hooks';

/* ─── Animated System Network Canvas ─── */
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes representing engineering stack
    const labels = ['Frontend', 'Backend', 'Database', 'AI / ML', 'Agents', 'Automation', 'IoT', 'APIs'];
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    interface Node {
      x: number;
      y: number;
      label: string;
      baseX: number;
      baseY: number;
      phase: number;
    }

    const nodes: Node[] = labels.map((label, i) => {
      const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
      const rx = Math.min(w, 500) * 0.32;
      const ry = Math.min(h, 400) * 0.32;
      const cx = w * 0.5;
      const cy = h * 0.5;
      return {
        x: cx + Math.cos(angle) * rx,
        y: cy + Math.sin(angle) * ry,
        label,
        baseX: cx + Math.cos(angle) * rx,
        baseY: cy + Math.sin(angle) * ry,
        phase: i * 0.8,
      };
    });

    // Connections
    const connections: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      connections.push([i, (i + 1) % nodes.length]);
      if (i + 2 < nodes.length) connections.push([i, i + 2]);
    }
    // Central hub connections
    connections.push([0, 4], [1, 5], [2, 6], [3, 7]);

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update positions with subtle float
      nodes.forEach(n => {
        n.x = n.baseX + Math.sin(time + n.phase) * 4;
        n.y = n.baseY + Math.cos(time * 0.7 + n.phase) * 3;
      });

      // Draw connections
      connections.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animated data particle
        const phaseMod = (time * 0.5 + a * 0.3) % 1;
        const px = na.x + (nb.x - na.x) * phaseMod;
        const py = na.y + (nb.y - na.y) * phaseMod;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${0.3 + Math.sin(time * 2 + a) * 0.2})`;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n, i) => {
        // Outer glow
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 20);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5 + Math.sin(time * 1.5 + n.phase) * 1, 0, Math.PI * 2);
        ctx.fillStyle = i < 4 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(139, 92, 246, 0.7)';
        ctx.fill();
        ctx.strokeStyle = i < 4 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(139, 92, 246, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(160, 160, 184, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + 20);
      });

      // Center hub
      const cx = w * 0.5, cy = h * 0.5;
      const hubGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      hubGrad.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
      hubGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fillStyle = hubGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.fill();

      ctx.font = '600 9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.textAlign = 'center';
      ctx.fillText('SYSTEM', cx, cy + 24);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        opacity: 0.65,
      }}
    />
  );
}

/* ─── Hero Section ─── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100vh',
        paddingTop: 'var(--nav-height)',
      }}
    >
      {/* Background network */}
      <div className="absolute inset-0 pointer-events-none">
        <NetworkCanvas />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(59, 130, 246, 0.06) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 40%, rgba(139, 92, 246, 0.04) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="section-container relative z-10 text-center" style={{ maxWidth: '820px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              marginBottom: '2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.06em',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
                animation: 'pulse-glow 2s infinite',
              }}
            />
            Open to Opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
            }}
          >
            <span className="gradient-text">DHEKSHATH</span>{' '}
            <span style={{ color: 'var(--text-primary)' }}>SARAVANAN</span>
          </motion.h1>

          {/* Supporting headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '650px',
              margin: '0 auto 1rem',
              fontWeight: 400,
            }}
          >
            Software Engineer building intelligent systems, scalable backends &amp; AI-powered applications.
          </motion.p>

          {/* Role tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center"
            style={{ gap: '0.5rem', marginBottom: '2.5rem' }}
          >
            {['Full Stack Developer', 'Backend Engineer', 'AI & Agentic AI Developer'].map(role => (
              <span
                key={role}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  padding: '5px 14px',
                  borderRadius: '6px',
                  background: 'rgba(139, 92, 246, 0.08)',
                  border: '1px solid rgba(139, 92, 246, 0.18)',
                  color: 'var(--accent-purple)',
                  letterSpacing: '0.03em',
                }}
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex flex-wrap justify-center items-center"
            style={{ gap: '1rem' }}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="interactive"
              style={{
                padding: '12px 28px',
                borderRadius: '10px',
                background: 'var(--gradient-blue-cyan)',
                border: 'none',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.3s',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.25)',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLElement).style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.35)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.25)';
              }}
            >
              View My Work
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="interactive"
              style={{
                padding: '12px 28px',
                borderRadius: '10px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'border-color 0.25s, background 0.25s',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.borderColor = 'rgba(59, 130, 246, 0.4)';
                (e.target as HTMLElement).style.background = 'rgba(59, 130, 246, 0.06)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                (e.target as HTMLElement).style.background = 'transparent';
              }}
            >
              Let's Connect
            </button>

            {/* Social buttons */}
            <a
              href="https://github.com/Dhekshath1510"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive"
              aria-label="GitHub Profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text-secondary)',
                transition: 'border-color 0.25s, color 0.25s',
              }}
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/dhekshath-s"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive"
              aria-label="LinkedIn Profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text-secondary)',
                transition: 'border-color 0.25s, color 0.25s',
              }}
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about section"
        className="absolute interactive"
        style={{
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          color: 'var(--text-tertiary)',
          cursor: 'pointer',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}
