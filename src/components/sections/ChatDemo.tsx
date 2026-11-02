import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { stepTransition } from '../../lib/motion';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

const script: Message[] = [
  { from: 'user', text: 'Hola, ¿me ayudas a resumir este documento?' },
  { from: 'bot', text: '¡Claro! Envíamelo y te doy los puntos clave.' },
  { from: 'user', text: '[PDF] propuesta-final.pdf' },
  { from: 'bot', text: 'Listo: 3 puntos clave, fechas de entrega y presupuesto. ¿Te lo leo en voz alta?' },
];

/** Mini demo ilustrativa del chat + chatbot: los mensajes aparecen como en un RPG. */
export function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion() ?? false;
  const [shown, setShown] = useState(reduce ? script.length : 0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(script.length);
      return;
    }
    if (!inView || shown >= script.length) return;

    const next = script[shown];
    if (next.from === 'bot' && !typing) {
      // El bot "escribe" antes de responder
      const t = window.setTimeout(() => setTyping(true), 400);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(
      () => {
        setTyping(false);
        setShown((s) => s + 1);
      },
      next.from === 'bot' ? 1100 : 700,
    );
    return () => window.clearTimeout(t);
  }, [inView, reduce, shown, typing]);

  return (
    <div ref={ref} className="border-4 border-ink bg-night-950" aria-label="Demostración ilustrativa del chatbot">
      <div className="flex items-center justify-between border-b-4 border-ink bg-night-700 px-3 py-2">
        <span className="font-pixel text-[0.5rem] text-muted">ASISTENTE IA</span>
        <span className="flex items-center gap-1 font-pixel text-[0.5rem] text-aurora">
          <span className="animate-blink">●</span> EN LÍNEA
        </span>
      </div>

      <ul className="flex min-h-64 flex-col gap-3 p-4 text-[0.8rem] leading-relaxed" aria-live="off">
        {script.slice(0, shown).map((m, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={stepTransition(3, 0.18)}
            className={`max-w-[85%] border-2 px-3 py-2 ${
              m.from === 'user'
                ? 'self-end origin-bottom-right border-sky bg-sky/10 text-ink'
                : 'self-start origin-bottom-left border-aurora bg-aurora/10 text-ink'
            }`}
          >
            {m.text}
          </motion.li>
        ))}
        {typing && (
          <li className="self-start border-2 border-aurora/60 px-3 py-2 font-pixel text-[0.6rem] text-aurora" aria-hidden="true">
            <span className="animate-blink">. . .</span>
          </li>
        )}
      </ul>
      <p className="border-t-4 border-ink px-3 py-2 text-[0.7rem] text-muted">Demo ilustrativa del chatbot con IA</p>
    </div>
  );
}
