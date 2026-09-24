import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView, fadeInUp, stagger } from '../hooks';

interface SkillCategory {
  name: string;
  color: string;
  skills: { name: string; note?: string }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming Languages',
    color: '#3b82f6',
    skills: [
      { name: 'Java' },
      { name: 'Python' },
      { name: 'JavaScript' },
      { name: 'C' },
      { name: 'SQL' },
      { name: 'CQL' },
    ],
  },
  {
    name: 'Frontend',
    color: '#06b6d4',
    skills: [
      { name: 'React' },
      { name: 'React Native' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'Vite' },
    ],
  },
  {
    name: 'Backend',
    color: '#8b5cf6',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Flask' },
      { name: 'Spring Boot' },
    ],
  },
  {
    name: 'AI / Machine Learning',
    color: '#a855f7',
    skills: [
      { name: 'XGBoost' },
      { name: 'YOLO' },
      { name: 'Machine Learning' },
      { name: 'Natural Language Processing' },
    ],
  },
  {
    name: 'Agentic AI',
    color: '#ec4899',
    skills: [
      { name: 'Agentic AI — LangGraph' },
      { name: 'Intermediate — LangChain' },
    ],
  },
  {
    name: 'Databases',
    color: '#10b981',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Redis' },
      { name: 'Oracle DB' },
      { name: 'MySQL' },
      { name: 'Neo4j' },
      { name: 'SQLite' },
    ],
  },
  {
    name: 'ORM / Data Access',
    color: '#14b8a6',
    skills: [
      { name: 'Hibernate ORM' },
      { name: 'SQLAlchemy' },
    ],
  },
  {
    name: 'APIs / Communication',
    color: '#f59e0b',
    skills: [
      { name: 'REST APIs' },
      { name: 'WebSockets' },
      { name: 'gRPC' },
      { name: 'JWT Authentication' },
    ],
  },
  {
    name: 'DevOps / Infrastructure',
    color: '#ef4444',
    skills: [
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'Git' },
      { name: 'NGINX' },
    ],
  },
  {
    name: 'Automation',
    color: '#f97316',
    skills: [
      { name: 'n8n' },
      { name: 'Workflow Automation' },
      { name: 'AI Automation' },
    ],
  },
  {
    name: 'IoT',
    color: '#06b6d4',
    skills: [
      { name: 'ESP32' },
      { name: 'Sensors' },
      { name: 'Microcontrollers' },
      { name: 'IoT System Integration' },
    ],
  },
];

export default function Skills() {
  const [ref, inView] = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section
      id="skills"
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
          <div className="section-label">Technical Arsenal</div>
          <h2 className="section-title">
            Skills & <span className="gradient-text-purple">Technologies</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            marginBottom: '2.5rem',
            fontSize: '0.95rem',
          }}>
            Technologies I work with across the full software stack — from frontend interfaces to backend services, AI models, and infrastructure.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger.container}
          className="grid lg:grid-cols-4 gap-6"
        >
          {/* Category tabs - sidebar */}
          <div className="lg:col-span-1">
            <div className="flex lg:flex-col flex-wrap" style={{ gap: '0.4rem' }}>
              {SKILL_CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat.name}
                  variants={stagger.item}
                  onClick={() => setActiveCategory(i)}
                  className="interactive text-left"
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '10px',
                    background: activeCategory === i
                      ? `${cat.color}12`
                      : 'transparent',
                    border: activeCategory === i
                      ? `1px solid ${cat.color}30`
                      : '1px solid transparent',
                    color: activeCategory === i ? cat.color : 'var(--text-secondary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    fontWeight: activeCategory === i ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: cat.color,
                      marginRight: '8px',
                      opacity: activeCategory === i ? 1 : 0.4,
                    }}
                  />
                  {cat.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Skills display */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="card"
                style={{ minHeight: '260px' }}
              >
                <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: SKILL_CATEGORIES[activeCategory].color,
                      boxShadow: `0 0 12px ${SKILL_CATEGORIES[activeCategory].color}40`,
                    }}
                  />
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                  }}>
                    {SKILL_CATEGORIES[activeCategory].name}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {SKILL_CATEGORIES[activeCategory].skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center"
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-subtle)',
                        gap: '0.75rem',
                      }}
                    >
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: SKILL_CATEGORIES[activeCategory].color,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        color: 'var(--text-primary)',
                      }}>
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
