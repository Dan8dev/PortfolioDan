import { motion, useReducedMotion } from 'motion/react';
import { profile } from '../../data/profile';
import { useTypewriter } from '../../hooks/useTypewriter';
import { letterDrop, pixelRise, screenWipe, staggerChildren, stepTransition } from '../../lib/motion';
import { Container } from '../ui/Container';
import { PixelButton } from '../ui/PixelButton';
import { ScoreCounter } from '../ui/ScoreCounter';
import { TechList } from '../ui/TechBadge';

// Estrellas extra que titilan sobre el fondo pixel
const stars = [
  { top: '14%', left: '8%', color: 'bg-star-gold', delay: '0s' },
  { top: '22%', left: '46%', color: 'bg-star-pink', delay: '0.8s' },
  { top: '9%', left: '72%', color: 'bg-sky', delay: '1.6s' },
  { top: '38%', left: '90%', color: 'bg-star-gold', delay: '0.4s' },
  { top: '58%', left: '4%', color: 'bg-aurora', delay: '1.2s' },
];

export function Hero() {
  const reduce = useReducedMotion() ?? false;
  const nameWords = profile.name.toUpperCase().split(' ');
  const tagline = useTypewriter(profile.tagline, { speed: 22, startDelay: 1400, instant: reduce });

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-24 pb-20"
    >
      {/* Fondo: aurora pixel + degradado para legibilidad */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img src="/img/aurora.jpg" alt="" className="pixelated size-full object-cover object-top" />
        <div className="absolute inset-0 bg-linear-to-b from-night-950/55 via-night-950/75 to-night-950" />
        {stars.map((s) => (
          <span
            key={`${s.top}-${s.left}`}
            className={`animate-twinkle absolute size-1.5 ${s.color}`}
            style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          />
        ))}
      </div>

      <Container className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr] lg:gap-16">
        <motion.div initial="hidden" animate="visible" variants={staggerChildren(0.12)} className="flex flex-col gap-6">
          <motion.div variants={pixelRise} className="flex items-center gap-4">
            <img
              src="/img/daniel.jpg"
              alt=""
              className="size-14 border-4 border-aurora object-cover md:hidden"
              width={56}
              height={56}
            />
            <p className="font-pixel text-[0.6rem] leading-relaxed text-star-gold sm:text-xs">
              PLAYER 1 · {profile.location}
            </p>
          </motion.div>

          <h1 id="hero-title" aria-label={profile.name} className="font-pixel text-[1.65rem] leading-tight text-ink sm:text-4xl lg:text-5xl">
            <motion.span
              aria-hidden="true"
              className="inline-block"
              variants={staggerChildren(0.05)}
              initial="hidden"
              animate="visible"
            >
              {nameWords.map((word, w) => (
                // Cada palabra es un bloque que no se parte; las letras caen una por una dentro de ella
                <span key={word} className="mr-[0.5em] inline-block whitespace-nowrap last:mr-0">
                  {word.split('').map((letter, i) => (
                    <motion.span key={`${w}-${i}`} variants={letterDrop} className="inline-block">
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p variants={screenWipe} className="font-pixel text-sm leading-relaxed text-aurora sm:text-base lg:text-lg">
            {profile.role}
          </motion.p>

          <motion.div variants={pixelRise}>
            <TechList items={profile.mainStack} tone="sky" />
          </motion.div>

          <motion.p
            variants={pixelRise}
            className="min-h-[5.5rem] max-w-xl text-base leading-relaxed text-ink/90 sm:min-h-[4.5rem] md:text-lg"
            onClick={tagline.skip}
          >
            <span className="sr-only">{profile.tagline}</span>
            <span aria-hidden="true">
              {tagline.text}
              <span className="animate-blink text-aurora">▮</span>
            </span>
          </motion.p>

          <motion.div variants={pixelRise} className="flex flex-wrap items-center gap-4">
            <PixelButton href={profile.cvUrl} download={profile.cvFileName} variant="primary" coin>
              Descargar CV
            </PixelButton>
            <PixelButton href="#contacto">Contactar</PixelButton>
          </motion.div>

          <motion.div
            variants={pixelRise}
            className="mt-2 flex flex-wrap gap-x-6 gap-y-4 border-t-4 sm:gap-x-10 border-dashed border-night-700 pt-5"
          >
            {profile.stats.map((stat) => (
              <ScoreCounter key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </motion.div>
        </motion.div>

        {/* Retrato en marco pixel (escritorio) */}
        <motion.figure
          className="relative mx-auto hidden w-full max-w-xs md:block"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={stepTransition(5, 0.4, 0.5)}
        >
          <div className="border-4 border-ink bg-night-800 p-2 shadow-pixel">
            <img
              src="/img/daniel.jpg"
              alt={`Fotografía de ${profile.fullName}`}
              className="aspect-[4/5] w-full object-cover"
              width={320}
              height={400}
            />
          </div>
          <figcaption className="absolute -bottom-4 left-1/2 -translate-x-1/2 border-4 border-ink bg-night-950 px-3 py-2 font-pixel text-[0.55rem] whitespace-nowrap text-aurora">
            LV.{profile.stats[0].value} FULL STACK
          </figcaption>
        </motion.figure>
      </Container>

      <a
        href="#proyectos"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-pixel text-[0.6rem] text-ink hover:text-aurora hover:no-underline sm:text-xs"
      >
        <span className="animate-blink">PRESS START ▼</span>
      </a>
    </section>
  );
}
