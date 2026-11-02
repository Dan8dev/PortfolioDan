import type { Transition, Variants } from 'motion/react';

/**
 * Easing "por pasos": el movimiento avanza a saltos, como los sprites
 * de las consolas de 8 bits, en lugar de interpolarse suavemente.
 */
export const steps =
  (count: number) =>
  (t: number): number =>
    t >= 1 ? 1 : Math.floor(t * count) / count;

export const stepTransition = (count = 4, duration = 0.4, delay = 0): Transition => ({
  duration,
  delay,
  ease: steps(count),
});

/** Entrada de bloques: suben a saltos desde abajo. */
export const pixelRise: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: stepTransition(4, 0.4) },
};

/** Contenedor que escalona la aparición de sus hijos. */
export const staggerChildren = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Letras que caen desde arriba y rebotan, como bloques de un puzzle. */
export const letterDrop: Variants = {
  hidden: { opacity: 0, y: -48 },
  visible: {
    opacity: 1,
    y: [-48, 6, 0],
    transition: { duration: 0.35, times: [0, 0.7, 1], ease: steps(5) },
  },
};

/** "Cortinilla" de pantalla: el bloque se revela de izquierda a derecha en franjas. */
export const screenWipe: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: stepTransition(8, 0.5) },
};

/** Hover/tap de botones: brinca como al tomar una moneda. */
export const coinHover = { y: -4, transition: stepTransition(2, 0.12) };
export const coinTap = { y: 2, scale: 0.97, transition: stepTransition(2, 0.08) };

/** Viewport por defecto para animaciones al hacer scroll (una sola vez). */
export const inViewOnce = { once: true, amount: 0.2 } as const;
