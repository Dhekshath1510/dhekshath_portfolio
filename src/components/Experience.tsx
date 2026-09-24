import { motion } from 'framer-motion';
import { useInView, fadeInUp, stagger } from '../hooks';
import { Briefcase, Calendar, Code } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  duration?: string;
  highlight: string;
  skills: string[];
  accentColor: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Data Scraping Intern',
    company: 'TCS CodeVita',
    period: '2023 – 2024',
    duration: '4 Months',
    highlight:
      'Selected through TCS CodeVita. Worked on Python-based data scraping, automated data extraction, structured data processing, and workflow optimization — improving extraction accuracy, reliability, and throughput.',
    skills: ['Python', 'Data Scraping', 'Automation', 'Data Processing'],
    accentColor: '#3b82f6',
  },
  {
    role: 'Web Development Intern',
    company: 'Kaashiv Infotech',
    period: '',
    highlight:
      'Full-stack web development using React, Node.js, HTML, CSS, and JavaScript. Worked on REST API integration, participated in code reviews, followed Agile sprint workflows, and collaborated with senior developers.',
    skills: ['React', 'Node.js', 'HTML', 'CSS', 'JavaScript', 'REST APIs', 'Agile'],
    accentColor: '#8b5cf6',
  },
];

/* ── Engineering Timeline ── */
const TIMELINE_STEPS = [
  { label: 'Frontend', color: '#06b6d4' },
  { label: 'Backend', color: '#3b82f6' },
  { label: 'Databases', color: '#10b981' },
  { label: 'APIs', color: '#f59e0b' },
  { label: 'Machine Learning', color: '#a855f7' },
  { label: 'IoT', color: '#06b6d4' },
  { label: 'Agentic AI', color: '#ec4899' },
  { label: 'Automation', color: '#f97316' },
];

export default function Experience() {
  const [ref, inView] = useInView(0.1);
  const [timelineRef, timelineInView] = useInView(0.2);

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: `var(--section-padding) 0`,
        position: 'relative',
      }}
    >
      <div className="section-container">
        {/* Experience */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div className="section-label">Journey</div>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger.container}
          className="grid gap-5"
          style={{ marginBottom: 'var(--section-padding)' }}
        >
          {EXPERIENCES.map((exp, i) => (
            <motion.div key={exp.company} variants={stagger.item} className="card relative">
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '2rem',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: exp.accentColor,
                  boxShadow: `0 0 12px ${exp.accentColor}40`,
                  border: '3px solid var(--bg-primary)',
                }}
              />

              <div className="flex flex-wrap items-center justify-between" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div className="flex items-center" style={{ gap: '0.5rem', marginTop: '0.25rem' }}>
                    <Briefcase size={13} style={{ color: exp.accentColor }} />
                    <span style={{ color: exp.accentColor, fontSize: '0.88rem', fontWeight: 500 }}>
                      {exp.company}
                    </span>
                  </div>
                </div>
                {(exp.period || exp.duration) && (
                  <div className="flex items-center" style={{ gap: '0.5rem' }}>
                    {exp.period && <span className="tech-tag">{exp.period}</span>}
                    {exp.duration && <span className="tech-tag">{exp.duration}</span>}
                  </div>
                )}
              </div>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}
              >
                {exp.highlight}
              </p>

              <div className="flex flex-wrap" style={{ gap: '0.35rem' }}>
                {exp.skills.map(skill => (
                  <span key={skill} className="tech-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Engineering Timeline - "What I Build" */}
        <div ref={timelineRef}>
          <motion.div
            initial="hidden"
            animate={timelineInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
          >
            <div className="section-label">Growth</div>
            <h2 className="section-title">
              What I <span className="gradient-text-purple">Build</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              marginBottom: '2.5rem',
              fontSize: '0.95rem',
            }}>
              My engineering journey spans multiple layers of software — from frontend interfaces to AI agents and automation workflows.
            </p>
          </motion.div>

          <div className="relative" style={{ paddingLeft: '2rem' }}>
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: '7px',
                top: 0,
                width: '2px',
                height: '100%',
                background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #ec4899, #f97316)',
                transformOrigin: 'top',
              }}
            />

            {TIMELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative flex items-center"
                style={{ marginBottom: '1.5rem' }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-2rem',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: step.color,
                    boxShadow: `0 0 10px ${step.color}50`,
                    border: '3px solid var(--bg-primary)',
                    transform: 'translateX(-50%)',
                    marginLeft: '8px',
                  }}
                />

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: step.color,
                    fontWeight: 500,
                  }}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
