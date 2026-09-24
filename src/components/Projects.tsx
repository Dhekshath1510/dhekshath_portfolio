import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView, fadeInUp, stagger } from '../hooks';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  TrafficCone,
  Heart,
  Shield,
  Ear,
  ShoppingCart,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  shortDesc: string;
  techStack: string[];
  accentColor: string;
  problem: string;
  solution: string;
  architecture: string[];
  impact: string;
}

const PROJECTS: Project[] = [
  {
    id: 'traffic',
    title: 'AI-Based Smart Traffic Management & Congestion Prediction System',
    category: 'AI / Machine Learning / Smart City',
    icon: <TrafficCone size={20} />,
    shortDesc:
      'An AI-based system designed to analyze traffic conditions and predict congestion levels using machine learning, explainable AI, and contextual traffic factors.',
    techStack: ['Python', 'XGBoost', 'YOLO', 'SHAP', 'REST API', 'Explainable AI'],
    accentColor: '#3b82f6',
    problem:
      'Urban traffic congestion is unpredictable and hard to manage without data-driven insights.',
    solution:
      'Built a machine learning system using XGBoost and YOLO for traffic forecasting, congestion classification (Low / Moderate / Severe), context-aware prediction, and explainable AI using SHAP to provide transparent management insights.',
    architecture: [
      'Road Network',
      'Traffic Data',
      'ML Model',
      'Congestion Prediction',
      'Explainability (SHAP)',
      'Management Insight',
    ],
    impact:
      'An end-to-end AI pipeline exploring contextual traffic factors and ML-based prediction to support smarter traffic management decisions.',
  },
  {
    id: 'siddha',
    title: 'Siddha Hospital Recommendation System',
    category: 'Machine Learning / Healthcare',
    icon: <Heart size={20} />,
    shortDesc:
      'A UI-based Siddha hospital recommendation system using XGBoost-based machine learning to provide hospital recommendations from relevant input data.',
    techStack: ['Python', 'XGBoost', 'Machine Learning', 'UI System'],
    accentColor: '#10b981',
    problem:
      'Patients need data-driven recommendations for Siddha hospitals based on their specific requirements.',
    solution:
      'Developed an XGBoost-powered recommendation system with a UI interface that processes user inputs, runs feature processing, and delivers personalized hospital recommendations.',
    architecture: [
      'User Input',
      'Feature Processing',
      'XGBoost Model',
      'Recommendation Engine',
      'UI Result',
    ],
    impact:
      'A practical ML-based recommendation system bridging healthcare data with user-friendly accessibility.',
  },
  {
    id: 'piracy',
    title: 'Theater Piracy Detection System',
    category: 'Computer Vision / IoT / Full Stack',
    icon: <Shield size={20} />,
    shortDesc:
      'A real-time unauthorized-camera detection system using YOLO-based object detection, grid-based spatial tracking, and IoT integration for automated theater monitoring.',
    techStack: ['Python', 'YOLO', 'MongoDB', 'React', 'Vite', 'ESP32', 'IR Sensors'],
    accentColor: '#ef4444',
    problem:
      'Theaters rely on manual surveillance to detect unauthorized recording, which is unreliable and labor-intensive.',
    solution:
      'Built an end-to-end automated anti-piracy system combining YOLO-based camera detection, spatial tracking grids, ESP32 microcontrollers with IR sensors for continuous monitoring, and a React + Vite dashboard for live incident tracking and screen blocking.',
    architecture: [
      'Camera Detection (YOLO)',
      'Spatial Tracking',
      'Incident Detection',
      'Backend Logging (MongoDB)',
      'Live Monitoring Dashboard',
      'Screen Blocking Response',
    ],
    impact:
      'An end-to-end automated anti-piracy system designed to reduce dependence on manual surveillance.',
  },
  {
    id: 'assistive',
    title: 'Assistive Communication System for Deaf Individuals',
    category: 'IoT / Speech Processing / Assistive Tech',
    icon: <Ear size={20} />,
    shortDesc:
      'A real-time speech-to-text assistive communication device using ESP32, cloud processing, and a display module for low-cost IoT architecture.',
    techStack: ['Python', 'Azure Web Services', 'ESP32', 'Microphone', 'Display Module'],
    accentColor: '#8b5cf6',
    problem:
      'Deaf individuals need affordable, real-time speech-to-text solutions for everyday communication.',
    solution:
      'Designed and built a low-cost IoT device that captures audio via microphone, processes it through ESP32 and Azure cloud services, converts speech to text using Python processing, and displays the result on an attached display module in real time.',
    architecture: [
      'Microphone',
      'ESP32',
      'Cloud Service (Azure)',
      'Python Processing',
      'Speech-to-Text',
      'Display Output',
    ],
    impact:
      'A functional assistive communication device using low-cost IoT hardware and cloud-based speech processing.',
  },
  {
    id: 'grocery',
    title: 'Online Grocery & Home Needs Management System',
    category: 'Full Stack / E-Commerce / AI',
    icon: <ShoppingCart size={20} />,
    shortDesc:
      'A full-stack grocery and household-goods management platform with web, mobile, REST APIs, and AI-based product recommendations.',
    techStack: ['Python', 'Flask', 'React', 'Vite', 'React Native', 'REST APIs', 'AI Recommendation'],
    accentColor: '#f59e0b',
    problem:
      'Grocery and household management needs a unified platform across web and mobile with intelligent recommendations.',
    solution:
      'Built a multi-platform e-commerce system with Flask backend, React + Vite web frontend, React Native mobile app, RESTful API architecture, and an AI-based product recommendation system.',
    architecture: [
      'Web / Mobile Client',
      'REST API Layer',
      'Flask Backend',
      'Database',
      'AI Recommendation System',
    ],
    impact:
      'A complete multi-platform e-commerce architecture with intelligent product recommendations.',
  },
];

/* ── Architecture Flow Component ── */
function ArchitectureFlow({ steps, color }: { steps: string[]; color: string }) {
  return (
    <div className="flex flex-wrap items-center" style={{ gap: '0.35rem', margin: '1rem 0' }}>
      {steps.map((step, i) => (
        <div key={step} className="flex items-center" style={{ gap: '0.35rem' }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              background: `${color}0c`,
              border: `1px solid ${color}22`,
              color: color,
              whiteSpace: 'nowrap',
            }}
          >
            {step}
          </motion.span>
          {i < steps.length - 1 && (
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>→</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={stagger.item}
      layout
      className="card interactive"
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        borderColor: expanded ? `${project.accentColor}30` : undefined,
        boxShadow: expanded ? `0 0 40px ${project.accentColor}10` : undefined,
      }}
      onClick={() => setExpanded(e => !e)}
    >
      {/* Header */}
      <div className="flex items-start justify-between" style={{ gap: '1rem' }}>
        <div className="flex-1">
          <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: `${project.accentColor}12`,
                border: `1px solid ${project.accentColor}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: project.accentColor,
                flexShrink: 0,
              }}
            >
              {project.icon}
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: project.accentColor,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {project.category}
              </span>
            </div>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: '0.75rem',
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {project.shortDesc}
          </p>
        </div>

        <button
          aria-label={expanded ? 'Collapse project' : 'Expand project'}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            padding: '4px',
            flexShrink: 0,
          }}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap" style={{ gap: '0.35rem', marginTop: '1rem' }}>
        {project.techStack.map(tech => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-tertiary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Problem
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-tertiary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Solution
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Architecture flow */}
              <div style={{ marginTop: '1.25rem' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Architecture
                </h4>
                <ArchitectureFlow steps={project.architecture} color={project.accentColor} />
              </div>

              {/* Impact */}
              <div style={{ marginTop: '1rem' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.5rem',
                  }}
                >
                  Engineering Impact
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {project.impact}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Projects Section ── */
export default function Projects() {
  const [ref, inView] = useInView(0.05);

  return (
    <section
      id="projects"
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
          <div className="section-label">Engineering Work</div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '550px',
              marginBottom: '2.5rem',
              fontSize: '0.95rem',
            }}
          >
            Real-world engineering projects spanning AI, full-stack development, IoT, and system design. Click any project to explore the architecture.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger.container}
          className="grid gap-5"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
