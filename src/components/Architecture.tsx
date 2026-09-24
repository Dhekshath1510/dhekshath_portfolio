import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView, fadeInUp } from '../hooks';

interface ArchLayer {
  label: string;
  color: string;
  technologies: string[];
}

const LAYERS: ArchLayer[] = [
  { label: 'USER', color: '#6b7280', technologies: ['Browser', 'Mobile App'] },
  { label: 'FRONTEND', color: '#06b6d4', technologies: ['React', 'React Native', 'Vite', 'HTML/CSS'] },
  { label: 'API LAYER', color: '#3b82f6', technologies: ['REST APIs', 'WebSockets', 'gRPC', 'JWT Auth'] },
  { label: 'BACKEND SERVICES', color: '#8b5cf6', technologies: ['Node.js', 'Express.js', 'Flask', 'Spring Boot'] },
  { label: 'DATABASE', color: '#10b981', technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Oracle DB', 'Neo4j'] },
  { label: 'AI / ML SERVICES', color: '#a855f7', technologies: ['XGBoost', 'YOLO', 'NLP', 'LangGraph', 'LangChain'] },
  { label: 'AUTOMATION / AGENTS', color: '#ec4899', technologies: ['n8n', 'LangGraph Agents', 'AI Automation'] },
  { label: 'INFRASTRUCTURE', color: '#f97316', technologies: ['Docker', 'Kubernetes', 'NGINX', 'Git'] },
];

export default function Architecture() {
  const [ref, inView] = useInView(0.1);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  return (
    <section
      id="architecture"
      ref={ref}
      style={{
        padding: `var(--section-padding) 0`,
        background: 'var(--bg-secondary)',
        position: 'relative',
      }}
    >
      <div className="section-container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div className="section-label">Systems Thinking</div>
          <h2 className="section-title">
            How I <span className="gradient-text">Think</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            marginBottom: '2.5rem',
            fontSize: '0.95rem',
          }}>
            I don't just list technologies — I understand how they connect. Hover over each layer to see the technologies I use.
          </p>
        </motion.div>

        {/* Architecture stack */}
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="interactive"
              style={{
                position: 'relative',
                marginBottom: '2px',
              }}
              onMouseEnter={() => setHoveredLayer(i)}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  borderRadius: i === 0 ? '12px 12px 2px 2px' : i === LAYERS.length - 1 ? '2px 2px 12px 12px' : '2px',
                  background: hoveredLayer === i
                    ? `${layer.color}12`
                    : 'var(--bg-card)',
                  border: `1px solid ${hoveredLayer === i ? `${layer.color}30` : 'var(--border-subtle)'}`,
                  transition: 'all 0.25s',
                  cursor: 'default',
                }}
              >
                <div className="flex items-center" style={{ gap: '1rem' }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: layer.color,
                      boxShadow: hoveredLayer === i ? `0 0 10px ${layer.color}60` : 'none',
                      transition: 'box-shadow 0.25s',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: hoveredLayer === i ? layer.color : 'var(--text-primary)',
                      letterSpacing: '0.06em',
                      transition: 'color 0.25s',
                    }}
                  >
                    {layer.label}
                  </span>
                </div>

                {/* Technologies shown on hover */}
                <div
                  className="flex flex-wrap justify-end"
                  style={{
                    gap: '0.35rem',
                    maxWidth: '60%',
                    opacity: hoveredLayer === i ? 1 : 0,
                    transform: hoveredLayer === i ? 'translateX(0)' : 'translateX(10px)',
                    transition: 'opacity 0.25s, transform 0.25s',
                  }}
                >
                  {layer.technologies.map(tech => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: `${layer.color}15`,
                        border: `1px solid ${layer.color}25`,
                        color: layer.color,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connector arrow */}
              {i < LAYERS.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '20px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '2px',
                      height: '100%',
                      background: `linear-gradient(to bottom, ${layer.color}40, ${LAYERS[i + 1].color}40)`,
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
