import { motion } from 'motion/react';
import { useState } from 'react';
import { profile } from '../../data/profile';
import { inViewOnce, pixelRise, staggerChildren } from '../../lib/motion';
import { Container } from '../ui/Container';
import { PixelButton } from '../ui/PixelButton';
import { SectionTitle } from '../ui/SectionTitle';

interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: string;
  external?: boolean;
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const links: ContactLink[] = [
    { label: 'Correo', value: profile.email, href: `mailto:${profile.email}`, icon: 'gmail' },
    ...(profile.linkedin
      ? [{ label: 'LinkedIn', value: 'Ver perfil', href: profile.linkedin, icon: 'linkedin', external: true }]
      : []),
    { label: 'GitHub', value: profile.github.user, href: profile.github.url, icon: 'github', external: true },
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-night-900 py-24 md:py-32">
      <Container>
        <SectionTitle id="contacto-title" stage={4} title="Contacto" />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <motion.div
            className="relative border-4 border-ink bg-night-800 p-6 shadow-pixel sm:p-8"
            variants={pixelRise}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            <p className="absolute -top-3 left-4 bg-night-800 px-2 font-pixel text-[0.6rem] text-star-gold">
              Nueva misión
            </p>
            <p className="font-pixel text-sm leading-loose text-ink sm:text-base">¿Buscas un desarrollador para tu equipo?</p>
            <p className="mt-4 text-sm leading-relaxed text-ink/90 md:text-base">
              Si tienes una vacante o un proyecto con React, TypeScript o Firebase, escríbeme y platicamos.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{profile.availability}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PixelButton href={`mailto:${profile.email}`} variant="primary">
                Escríbeme
              </PixelButton>
              <PixelButton href={profile.cvUrl} download={profile.cvFileName} variant="gold" coin>
                Descargar CV
              </PixelButton>
            </div>
          </motion.div>

          <motion.ul
            className="flex flex-col gap-4"
            variants={staggerChildren(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
          >
            {links.map((link) => (
              <motion.li key={link.label} variants={pixelRise} className="flex items-stretch gap-2">
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="group flex flex-1 items-center gap-4 border-4 border-night-700 bg-night-800 p-4 text-ink hover:border-aurora hover:text-ink hover:no-underline"
                >
                  <i className={`nes-icon ${link.icon} is-medium shrink-0`} aria-hidden="true" />
                  <span className="flex min-w-0 flex-col">
                    <span className="font-pixel text-[0.6rem] text-muted group-hover:text-aurora">{link.label}</span>
                    <span className="mt-1 truncate text-sm">{link.value}</span>
                  </span>
                  {link.external && <span className="ml-auto text-muted" aria-hidden="true">↗</span>}
                </a>
                {link.icon === 'gmail' && (
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="nes-btn shrink-0 px-3 text-[0.55rem]"
                    aria-label="Copiar correo al portapapeles"
                  >
                    {copied ? '¡Listo!' : 'Copiar'}
                  </button>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <p className="sr-only" aria-live="polite">
          {copied ? 'Correo copiado al portapapeles' : ''}
        </p>
      </Container>
    </section>
  );
}
