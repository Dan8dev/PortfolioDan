import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { pixelRise } from '../../lib/motion';

interface SectionTitleProps {
  stage: number;
  title: string;
  subtitle?: string;
  id?: string;
}

/** Título de sección estilo "STAGE 01" con el nombre escrito letra por letra. */
export function SectionTitle({ stage, title, subtitle, id }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion() ?? false;
  const { text, done } = useTypewriter(title, { speed: 70, enabled: inView, instant: reduce });

  return (
    <motion.div
      ref={ref}
      className="mb-10 md:mb-14"
      variants={pixelRise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      <p className="mb-3 font-pixel text-[0.6rem] tracking-widest text-star-gold sm:text-xs">
        STAGE {String(stage).padStart(2, '0')}
      </p>
      <h2 id={id} className="font-pixel text-xl text-ink uppercase sm:text-2xl md:text-3xl" aria-label={title}>
        <span
          aria-hidden="true"
          className="mr-3 inline-block size-[0.8em] bg-aurora align-[-0.02em] [clip-path:polygon(0_0,100%_50%,0_100%)]"
        />
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true" className={`ml-1 inline-block text-aurora ${done ? 'animate-blink' : ''}`}>
          ▮
        </span>
      </h2>
      {subtitle && <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">{subtitle}</p>}
    </motion.div>
  );
}
