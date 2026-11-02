import { useEffect, useState } from 'react';

interface Options {
  /** Milisegundos por carácter. */
  speed?: number;
  /** Retraso antes de empezar a escribir. */
  startDelay?: number;
  /** Si es false, no empieza (útil para esperar a que el elemento sea visible). */
  enabled?: boolean;
  /** Muestra el texto completo de inmediato (p. ej. con prefers-reduced-motion). */
  instant?: boolean;
}

/**
 * Escribe `text` carácter por carácter, como los diálogos de los RPG.
 * Devuelve el texto visible, si ya terminó y una función para saltar al final.
 */
export function useTypewriter(text: string, { speed = 35, startDelay = 0, enabled = true, instant = false }: Options = {}) {
  const [count, setCount] = useState(instant ? text.length : 0);

  useEffect(() => {
    if (instant) {
      setCount(text.length);
      return;
    }
    if (!enabled || count >= text.length) return;

    const timeout = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? startDelay + speed : speed);
    return () => window.clearTimeout(timeout);
  }, [count, enabled, instant, speed, startDelay, text.length]);

  return {
    text: text.slice(0, count),
    done: count >= text.length,
    skip: () => setCount(text.length),
  };
}
