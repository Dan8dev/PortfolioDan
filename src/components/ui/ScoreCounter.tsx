import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface ScoreCounterProps {
  label: string;
  value: number;
  digits?: number;
}

/** Marcador que sube de 0 al valor, como el score de un arcade. */
export function ScoreCounter({ label, value, digits = 2 }: ScoreCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 0.9,
      delay: 0.6,
      ease: 'linear',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span className="font-pixel text-[0.55rem] text-muted sm:text-[0.6rem]">{label}</span>
      <span className="font-pixel text-lg text-star-gold sm:text-xl" aria-label={`${value} ${label}`}>
        {String(display).padStart(digits, '0')}
      </span>
    </div>
  );
}
