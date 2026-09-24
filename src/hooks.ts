import { useRef, useEffect, useState, RefObject } from 'react';
import type { Variants } from 'framer-motion';

/* ── Intersection Observer hook ── */
export function useInView(
  threshold = 0.15,
  rootMargin = '0px'
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/* ── Custom cursor hook ── */
export function useCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isExpanded = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], .interactive');
      if (interactive && !isExpanded.current) {
        isExpanded.current = true;
        cursorRef.current?.classList.add('expanded');
      } else if (!interactive && isExpanded.current) {
        isExpanded.current = false;
        cursorRef.current?.classList.remove('expanded');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return cursorRef;
}

/* ── Smooth scroll helper ── */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
    const y = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/* ── Animation variants with proper Framer Motion types ── */
export const stagger: { container: Variants; item: Variants } = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};
