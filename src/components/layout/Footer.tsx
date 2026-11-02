import { profile } from '../../data/profile';
import { Container } from '../ui/Container';

export function Footer() {
  return (
    <footer className="border-t-4 border-night-700 bg-night-950 py-10">
      <Container className="flex flex-col items-center gap-6 text-center">
        <a href="#inicio" className="group font-pixel text-xs text-ink hover:text-aurora hover:no-underline">
          <span className="block text-muted">GAME OVER?</span>
          <span className="mt-3 inline-flex items-center gap-2 text-aurora">
            <span className="animate-blink" aria-hidden="true">
              ▶
            </span>
            CONTINUE
          </span>
        </a>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {profile.fullName} · Hecho con React, TypeScript, Vite y Framer Motion
        </p>
      </Container>
    </footer>
  );
}
