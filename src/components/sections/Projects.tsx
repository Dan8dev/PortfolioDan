import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { caseStudies, featuredProject, type ProjectImage } from '../../data/projects';
import { inViewOnce, pixelRise, staggerChildren, stepTransition } from '../../lib/motion';
import { Container } from '../ui/Container';
import { PixelButton } from '../ui/PixelButton';
import { PixelCard } from '../ui/PixelCard';
import { SectionTitle } from '../ui/SectionTitle';
import { TechList } from '../ui/TechBadge';
import { ChatDemo } from './ChatDemo';

// Casos con capturas ocupan todo el ancho; los de solo texto van en columnas.
const textCases = caseStudies.filter((cs) => !cs.images);
const imageCases = caseStudies.filter((cs) => cs.images);
const orderedCases = [...textCases, ...imageCases];

function caseSpan(index: number): string {
  if (orderedCases[index].images) return 'md:col-span-2 lg:col-span-3';
  // Si quedan casos de texto impares en 2 columnas, el último ocupa la fila completa en md
  const isLastText = index === textCases.length - 1;
  return isLastText && textCases.length % 2 === 1 ? 'md:col-span-2 lg:col-span-1' : '';
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink/90 md:text-[0.95rem]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.15rem] font-pixel text-[0.6rem] text-aurora">
            ▸
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Captura dentro de una "pantalla" con barra superior estilo consola. */
function ScreenFrame({ image, label, onOpen }: { image: ProjectImage; label: string; onOpen: () => void }) {
  return (
    <figure className="border-4 border-ink bg-night-950">
      <div className="flex items-center gap-2 border-b-4 border-ink bg-night-700 px-3 py-2">
        <span className="size-2.5 bg-star-pink" />
        <span className="size-2.5 bg-star-gold" />
        <span className="size-2.5 bg-aurora" />
        <span className="ml-2 truncate font-pixel text-[0.5rem] text-muted">{label}</span>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full cursor-zoom-in overflow-hidden"
        aria-label={`Ampliar imagen: ${image.alt}`}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="aspect-video w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </button>
      {image.caption && (
        <figcaption className="border-t-4 border-ink px-3 py-2 text-xs text-muted">{image.caption}</figcaption>
      )}
    </figure>
  );
}

function Lightbox({ image, onClose }: { image: ProjectImage | null; onClose: () => void }) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          className="fixed inset-0 z-[70] grid place-items-center bg-night-950/90 p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={stepTransition(3, 0.15)}
        >
          <motion.figure
            className="max-h-full max-w-5xl border-4 border-ink bg-night-900 p-2"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            transition={stepTransition(4, 0.2)}
          >
            <img src={image.src} alt={image.alt} className="max-h-[80vh] w-auto" />
            <figcaption className="flex items-center justify-between gap-4 px-1 pt-2 text-xs text-muted">
              <span>{image.caption ?? image.alt}</span>
              <button type="button" className="nes-btn is-error px-2 py-0 text-[0.55rem]" onClick={onClose} autoFocus>
                Cerrar
              </button>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Projects() {
  const [zoomed, setZoomed] = useState<ProjectImage | null>(null);
  const p = featuredProject;

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="py-24 md:py-32">
      <Container>
        <SectionTitle
          id="proyectos-title"
          stage={1}
          title="Proyectos"
          subtitle="Producto en producción y casos de estudio de sistemas internos que desarrollé."
        />

        {/* Proyecto destacado */}
        <PixelCard className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="order-2 flex flex-col gap-6 lg:order-1">
            <ScreenFrame image={p.images[0]} label={p.url.replace('https://', '')} onOpen={() => setZoomed(p.images[0])} />
            <ChatDemo />
          </div>

          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <div>
              <p className="mb-3 inline-block bg-star-gold px-2 py-1 font-pixel text-[0.55rem] text-night-950">★ DESTACADO</p>
              <h3 className="font-pixel text-lg leading-snug text-ink sm:text-xl">{p.name}</h3>
              <p className="mt-2 font-pixel text-[0.65rem] leading-relaxed text-aurora sm:text-xs">{p.headline}</p>
              <p className="mt-2 text-xs text-muted">{p.role}</p>
            </div>
            <p className="text-sm leading-relaxed text-ink/90 md:text-[0.95rem]">{p.summary}</p>
            <BulletList items={p.highlights} />
            <TechList items={p.stack} />
            <div>
              <PixelButton href={p.url} external variant="primary" ariaLabel={`Visitar ${p.name} (se abre en otra pestaña)`}>
                Visitar {p.name} ↗
              </PixelButton>
            </div>
          </div>
        </PixelCard>

        {/* Casos de estudio */}
        <div className="mt-20 mb-8 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-pixel text-sm text-ink sm:text-base">
            <span className="text-star-gold">◆</span> Casos de estudio
          </h3>
          <p className="text-xs text-muted">Sistemas internos sin acceso público</p>
        </div>

        <motion.ul
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerChildren(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          {orderedCases.map((cs, i) => (
            <motion.li
              key={cs.title}
              variants={pixelRise}
              className={`flex flex-col gap-5 border-4 border-ink bg-night-800 p-5 shadow-pixel sm:p-6 ${caseSpan(i)}`}
            >
              <header>
                <p className="font-pixel text-[0.55rem] text-muted">
                  CASO {String(i + 1).padStart(2, '0')} · {cs.client.toUpperCase()}
                </p>
                <h4 className="mt-3 font-pixel text-sm leading-relaxed text-ink sm:text-base">{cs.title}</h4>
              </header>

              <div className={cs.images ? 'grid gap-8 lg:grid-cols-[1fr_1.3fr]' : 'flex flex-col gap-5'}>
                <dl className="flex flex-col gap-4 text-sm leading-relaxed">
                  <div>
                    <dt className="mb-1 font-pixel text-[0.6rem] text-star-pink">Reto</dt>
                    <dd className="text-ink/90">{cs.challenge}</dd>
                  </div>
                  <div>
                    <dt className="mb-2 font-pixel text-[0.6rem] text-sky">Solución</dt>
                    <dd>
                      <BulletList items={cs.solution} />
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-pixel text-[0.6rem] text-aurora">Resultado</dt>
                    <dd className="text-ink/90">{cs.outcome}</dd>
                  </div>
                </dl>

                {cs.images && (
                  <ul className="grid grid-cols-2 gap-3 self-start">
                    {cs.images.map((img, idx) => (
                      <li key={img.src} className={idx === 0 ? 'col-span-2' : ''}>
                        <button
                          type="button"
                          onClick={() => setZoomed(img)}
                          className="group block w-full cursor-zoom-in border-4 border-night-700 hover:border-aurora"
                          aria-label={`Ampliar imagen: ${img.alt}`}
                        >
                          <img src={img.src} alt={img.alt} loading="lazy" className="aspect-video w-full object-cover object-top" />
                        </button>
                        <p className="mt-1 text-[0.7rem] text-muted">{img.caption}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-auto">
                <TechList items={cs.stack} tone="muted" />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>

      <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
    </section>
  );
}
