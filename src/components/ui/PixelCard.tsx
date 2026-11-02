import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { inViewOnce, pixelRise } from '../../lib/motion';

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'li';
  /** Si es false, el padre controla la animación (p. ej. con stagger). */
  standalone?: boolean;
}

/** Panel con borde grueso y sombra escalonada, estilo ventana de RPG. */
export function PixelCard({ children, className = '', as = 'article', standalone = true }: PixelCardProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={`border-4 border-ink bg-night-800 p-5 shadow-pixel sm:p-6 ${className}`}
      variants={pixelRise}
      {...(standalone ? { initial: 'hidden', whileInView: 'visible', viewport: inViewOnce } : {})}
    >
      {children}
    </Tag>
  );
}
