import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { stepTransition } from '../../lib/motion';
import { Container } from '../ui/Container';

export const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
] as const;

const sectionIds = sections.map((s) => s.id);

export function Navbar() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  // Cierra el menú móvil con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-night-700 bg-night-950/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-3 font-pixel text-xs text-ink hover:text-aurora hover:no-underline">
          <span className="grid size-9 place-items-center border-4 border-aurora bg-night-800 text-[0.6rem] text-aurora">
            DM
          </span>
          <span className="hidden sm:inline">{profile.name.toUpperCase()}</span>
        </a>

        {/* Escritorio: el cursor ▶ salta a la sección activa, como en un menú de juego */}
        <nav aria-label="Secciones" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex items-center px-3 py-2 font-pixel text-[0.6rem] uppercase hover:text-aurora hover:no-underline ${
                      isActive ? 'text-aurora' : 'text-muted'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-cursor"
                        aria-hidden="true"
                        className="absolute -left-1 text-star-gold"
                        transition={stepTransition(3, 0.18)}
                      >
                        ▶
                      </motion.span>
                    )}
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.cvUrl}
            download={profile.cvFileName}
            className="nes-btn is-success px-3 py-1 text-[0.6rem]"
          >
            CV ↓
          </a>
          <button
            type="button"
            className="nes-btn px-3 py-1 text-[0.6rem] lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'X' : 'Menú'}
          </button>
        </div>
      </Container>

      {/* Móvil: menú de pausa */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Secciones"
            className="border-t-4 border-night-700 bg-night-900 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={stepTransition(5, 0.25)}
          >
            <Container className="py-4">
              <p className="mb-3 font-pixel text-[0.6rem] text-star-gold">— PAUSA —</p>
              <ul className="flex flex-col gap-1">
                {sections.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 py-3 font-pixel text-xs uppercase hover:no-underline ${
                        active === id ? 'text-aurora' : 'text-ink'
                      }`}
                    >
                      <span aria-hidden="true" className={`text-star-gold ${active === id ? 'animate-blink' : 'invisible'}`}>
                        ▶
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
