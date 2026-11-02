import { MotionConfig } from 'motion/react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { ScanlineOverlay } from './components/ui/ScanlineOverlay';

export default function App() {
  return (
    // reducedMotion="user": respeta la preferencia del sistema y desactiva los movimientos
    <MotionConfig reducedMotion="user">
      <a
        href="#proyectos"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[80] focus:bg-star-gold focus:p-3 focus:font-pixel focus:text-xs focus:text-night-950"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScanlineOverlay />
    </MotionConfig>
  );
}
