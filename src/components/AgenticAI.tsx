import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView, fadeInUp } from '../hooks';
import { Bot, Workflow, Wrench, Brain, Zap } from 'lucide-react';

/* ── Animated Agent Workflow ── */
function AgentWorkflow() {
  const steps = [
    { icon: '📥', label: 'User Input', color: '#3b82f6' },
    { icon: '🤖', label: 'Agent', color: '#8b5cf6' },
    { icon: '🧠', label: 'Decision / Reasoning', color: '#a855f7' },
    { icon: '🔧', label: 'Tool Selection', color: '#06b6d4' },
    { icon: '⚡', label: 'Action', color: '#f59e0b' },
    { icon: '👁️', label: 'Observation', color: '#10b981' },
    { icon: '🔄', label: 'Next Step', color: '#ec4899' },
    { icon: '✅', label: 'Final Response', color: '#3b82f6' },
  ];

  return (
    <div className="relative" style={{ padding: '1rem 0' }}>
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="flex items-center relative"
          style={{ marginBottom: i < steps.length - 1 ? '0' : '0' }}
        >
          {/* Vertical connector line */}
          {i < steps.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
              style={{
                position: 'absolute',
                left: '19px',
                top: '40px',
                width: '2px',
                height: '24px',
                background: `linear-gradient(to bottom, ${step.color}60, ${steps[i + 1].color}60)`,
                transformOrigin: 'top',
              }}
            />
          )}

          <div
            className="flex items-center"
            style={{
              gap: '1rem',
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              width: '100%',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = `${step.color}08`)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: `${step.color}12`,
                border: `1px solid ${step.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0,
              }}
            >
              {step.icon}
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: step.color,
                  fontWeight: 500,
                }}
              >
                {step.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── LangGraph Node Visualization ── */
function LangGraphViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const graphNodes = [
      { x: w * 0.15, y: h * 0.3, label: 'START', color: '#3b82f6' },
      { x: w * 0.4, y: h * 0.15, label: 'Agent', color: '#8b5cf6' },
      { x: w * 0.65, y: h * 0.3, label: 'Tool', color: '#06b6d4' },
      { x: w * 0.4, y: h * 0.55, label: 'Decision', color: '#a855f7' },
      { x: w * 0.7, y: h * 0.65, label: 'Output', color: '#10b981' },
      { x: w * 0.85, y: h * 0.45, label: 'END', color: '#3b82f6' },
    ];

    const edges: [number, number][] = [
      [0, 1], [1, 2], [1, 3], [2, 3], [3, 1], [3, 4], [4, 5], [2, 5],
    ];

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, w, h);

      // Draw edges
      edges.forEach(([a, b], i) => {
        const na = graphNodes[a], nb = graphNodes[b];
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Flow particle
        const t = (time * 0.4 + i * 0.15) % 1;
        const px = na.x + (nb.x - na.x) * t;
        const py = na.y + (nb.y - na.y) * t;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
        ctx.fill();
      });

      // Draw nodes
      graphNodes.forEach(n => {
        // Glow
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16);
        g.addColorStop(0, `${n.color}20`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}cc`;
        ctx.fill();

        // Label
        ctx.font = '500 8px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(160, 160, 184, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + 18);
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '200px',
        borderRadius: '12px',
      }}
    />
  );
}

/* ── n8n Workflow Visualization ── */
function N8nWorkflow() {
  const steps = [
    { label: 'Trigger', icon: <Zap size={16} />, color: '#f59e0b' },
    { label: 'Processing', icon: <Workflow size={16} />, color: '#3b82f6' },
    { label: 'AI / Logic', icon: <Brain size={16} />, color: '#8b5cf6' },
    { label: 'API', icon: <Wrench size={16} />, color: '#06b6d4' },
    { label: 'Database', icon: <Bot size={16} />, color: '#10b981' },
    { label: 'Output', icon: <Zap size={16} />, color: '#ec4899' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center" style={{ gap: '0.25rem' }}>
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center"
        >
          <div
            className="interactive flex flex-col items-center"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: `${step.color}08`,
              border: `1px solid ${step.color}20`,
              minWidth: '80px',
              cursor: 'default',
              transition: 'border-color 0.25s, background 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${step.color}50`;
              e.currentTarget.style.background = `${step.color}12`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${step.color}20`;
              e.currentTarget.style.background = `${step.color}08`;
            }}
          >
            <div style={{ color: step.color, marginBottom: '0.35rem' }}>{step.icon}</div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
            }}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span style={{
              color: 'var(--text-tertiary)',
              fontSize: '0.75rem',
              margin: '0 0.15rem',
            }}>
              →
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Main Agentic AI Section ── */
export default function AgenticAI() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      id="agentic-ai"
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
          top: '20%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div className="section-label">Intelligence Layer</div>
          <h2 className="section-title">
            Agentic AI & <span className="gradient-text-purple">Automation</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            marginBottom: '2.5rem',
            fontSize: '0.95rem',
            lineHeight: 1.7,
          }}>
            Hands-on experience building Agentic AI systems using LangGraph, LangChain, and n8n — 
            designing AI agents that perform multi-step reasoning, interact with tools, and orchestrate 
            complex workflows autonomously.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Agent Workflow */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="card"
          >
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}>
              Agent Workflow Architecture
            </h3>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-tertiary)',
              marginBottom: '1rem',
            }}>
              Multi-step reasoning and tool interaction
            </p>
            <AgentWorkflow />
          </motion.div>

          <div className="flex flex-col" style={{ gap: '1.5rem' }}>
            {/* LangGraph card */}
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="card"
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '0.25rem',
              }}>
                Agentic AI Development
              </h3>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-tertiary)',
                marginBottom: '1rem',
              }}>
                Graph-based agent orchestration
              </p>

              <LangGraphViz />

              <div className="flex flex-col" style={{ gap: '0.75rem', marginTop: '1rem' }}>
                <div className="flex items-center" style={{ gap: '0.75rem' }}>
                  <span className="tech-tag" style={{
                    background: 'rgba(139,92,246,0.1)',
                    borderColor: 'rgba(139,92,246,0.25)',
                    color: '#a855f7',
                  }}>
                    LangGraph
                  </span>
                  <span style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                  }}>
                    → Agent workflow orchestration
                  </span>
                </div>
                <div className="flex items-center" style={{ gap: '0.75rem' }}>
                  <span className="tech-tag" style={{
                    background: 'rgba(59,130,246,0.1)',
                    borderColor: 'rgba(59,130,246,0.25)',
                    color: '#3b82f6',
                  }}>
                    LangChain
                  </span>
                  <span style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                  }}>
                    → Intermediate-level experience
                  </span>
                </div>
              </div>
            </motion.div>

            {/* n8n Automation card */}
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              className="card"
            >
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '0.25rem',
              }}>
                Workflow Automation
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem',
                lineHeight: 1.6,
              }}>
                Worked on two real-world automation projects using n8n, designing connected workflows 
                for integrating services, processing data, and automating multi-step operations.
              </p>
              <N8nWorkflow />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
