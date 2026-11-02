import { motion } from 'motion/react';
import { languages, skillGroups } from '../../data/skills';
import { inViewOnce, pixelRise, staggerChildren, stepTransition } from '../../lib/motion';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';

const slotPop = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: stepTransition(3, 0.2) },
};

export function Skills() {
  return (
    <section id="habilidades" aria-labelledby="habilidades-title" className="py-24 md:py-32">
      <Container>
        <SectionTitle
          id="habilidades-title"
          stage={3}
          title="Habilidades"
          subtitle="Inventario de tecnologías que uso en el día a día."
        />

        {/* Columnas tipo masonry: cada bolsa del inventario mide lo que su contenido */}
        <div className="gap-8 md:columns-2 lg:columns-3">
          {skillGroups.map((group) => (
            <motion.section
              key={group.category}
              aria-label={group.category}
              className="mb-8 break-inside-avoid border-4 border-ink bg-night-800 p-5 shadow-pixel"
              variants={staggerChildren(0.05, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={inViewOnce}
            >
              <motion.h3 variants={pixelRise} className="mb-5 flex items-center gap-3 font-pixel text-[0.65rem] text-ink sm:text-xs">
                {/* "Gema" de color de la categoría */}
                <span aria-hidden="true" className="size-3 rotate-45" style={{ backgroundColor: group.color }} />
                {group.category.toUpperCase()}
              </motion.h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={slotPop}
                    whileHover={{ y: -3, transition: stepTransition(2, 0.1) }}
                    className="border-2 border-night-700 bg-night-950 px-3 py-2 text-xs leading-snug text-ink hover:border-(--slot)"
                    style={{ ['--slot' as string]: group.color }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t-4 border-dashed border-night-700 pt-8"
          variants={pixelRise}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <p className="font-pixel text-[0.6rem] text-star-gold sm:text-xs">IDIOMAS</p>
          {languages.map((lang) => (
            <p key={lang.name} className="text-sm text-ink">
              <span className="font-bold">{lang.name}:</span> <span className="text-muted">{lang.level}</span>
            </p>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
