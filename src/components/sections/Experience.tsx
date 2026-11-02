import { motion } from 'motion/react';
import { education, experience } from '../../data/experience';
import { profile } from '../../data/profile';
import { inViewOnce, pixelRise, staggerChildren } from '../../lib/motion';
import { Container } from '../ui/Container';
import { PixelCard } from '../ui/PixelCard';
import { SectionTitle } from '../ui/SectionTitle';
import { TechList } from '../ui/TechBadge';

export function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="bg-night-900 py-24 md:py-32">
      <Container>
        <SectionTitle id="experiencia-title" stage={2} title="Experiencia" />

        {/* Resumen en caja de diálogo */}
        <PixelCard className="relative mb-16 max-w-4xl">
          <p className="absolute -top-3 left-4 bg-night-800 px-2 font-pixel text-[0.6rem] text-star-gold">RESUMEN</p>
          <p className="text-sm leading-relaxed text-ink/90 md:text-base">{profile.summary}</p>
        </PixelCard>

        {/* Línea de tiempo */}
        <motion.ol
          className="relative ml-2 flex flex-col gap-12 border-l-4 border-dashed border-night-700 pl-8 sm:ml-4 sm:pl-10"
          variants={staggerChildren(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {experience.map((job) => (
            <motion.li key={job.company} variants={pixelRise} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-1 -left-[2.65rem] size-5 border-4 border-night-900 sm:-left-[3.15rem] ${
                  job.current ? 'bg-aurora' : 'bg-muted'
                }`}
              />
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-pixel text-sm text-ink sm:text-base">{job.company}</h3>
                {job.current && (
                  <span className="border-2 border-aurora px-2 py-0.5 font-pixel text-[0.5rem] text-aurora">
                    <span className="animate-blink">●</span> ACTUAL
                  </span>
                )}
              </div>
              <p className="mt-2 font-pixel text-[0.6rem] leading-relaxed text-sky sm:text-xs">{job.role}</p>
              <p className="mt-1 text-xs text-muted">{job.period}</p>

              <ul className="mt-5 flex max-w-3xl flex-col gap-2 text-sm leading-relaxed text-ink/90 md:text-[0.95rem]">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.15rem] font-pixel text-[0.6rem] text-aurora">
                      ▸
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <TechList items={job.stack} tone="muted" />
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* Educación */}
        <h3 className="mt-20 mb-6 font-pixel text-sm text-ink sm:text-base">
          <span className="text-star-gold">◆</span> Educación
        </h3>
        <motion.ul
          className="grid gap-6 md:grid-cols-2"
          variants={staggerChildren(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {education.map((ed) => (
            <motion.li key={ed.degree} variants={pixelRise} className="border-4 border-night-700 bg-night-800 p-5">
              <p className="text-sm font-bold leading-relaxed text-ink">{ed.degree}</p>
              <p className="mt-2 text-xs text-muted">
                {ed.school} · {ed.period}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
