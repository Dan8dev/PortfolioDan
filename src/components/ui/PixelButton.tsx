import { motion } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { coinHover, coinTap, steps } from '../../lib/motion';

type Variant = 'primary' | 'secondary' | 'gold';

const variantClass: Record<Variant, string> = {
  primary: 'is-success',
  secondary: '',
  gold: 'is-warning',
};

interface PixelButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Abre en otra pestaña con rel seguro. */
  external?: boolean;
  /** Nombre de archivo para descargar (atributo download). */
  download?: string;
  /** Muestra una moneda "+1" que sale volando al hacer clic. */
  coin?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function PixelButton({
  href,
  children,
  variant = 'secondary',
  external = false,
  download,
  coin = false,
  className = '',
  ariaLabel,
}: PixelButtonProps) {
  const [coins, setCoins] = useState<number[]>([]);

  return (
    <span className="relative inline-block">
      <motion.a
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        className={`nes-btn ${variantClass[variant]} text-[0.65rem] leading-relaxed sm:text-xs ${className}`}
        whileHover={coinHover}
        whileTap={coinTap}
        onClick={() => coin && setCoins((c) => [...c, Date.now()])}
      >
        {children}
      </motion.a>

      {coins.map((id) => (
        <motion.span
          key={id}
          aria-hidden="true"
          className="pointer-events-none absolute -top-2 left-1/2 flex -translate-x-1/2 items-center gap-1 font-pixel text-[0.6rem] text-star-gold"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -56, opacity: [1, 1, 1, 0] }}
          transition={{ duration: 0.7, ease: steps(7) }}
          onAnimationComplete={() => setCoins((c) => c.filter((x) => x !== id))}
        >
          <i className="nes-icon coin is-small" /> +1
        </motion.span>
      ))}
    </span>
  );
}
