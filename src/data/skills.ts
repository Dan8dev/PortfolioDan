export interface SkillGroup {
  category: string;
  /** Color del "objeto" en el inventario (variable CSS de la paleta). */
  color: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    color: 'var(--color-sky)',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'Framer Motion'],
  },
  {
    category: 'Estado y datos',
    color: 'var(--color-star-pink)',
    skills: ['TanStack Query', 'Zustand'],
  },
  {
    category: 'Backend',
    color: 'var(--color-aurora)',
    skills: ['Node.js', 'Firebase Cloud Functions', 'PHP', 'APIs REST', 'Webhooks', 'MVC'],
  },
  {
    category: 'Bases de datos y nube',
    color: 'var(--color-star-gold)',
    skills: ['Firebase Realtime Database', 'Firebase Cloud Messaging', 'MySQL', 'Cloudinary'],
  },
  {
    category: 'Integraciones',
    color: 'var(--color-star-pink)',
    skills: ['Zoom Meeting SDK y API', 'Twilio', 'OpenAI'],
  },
  {
    category: 'Herramientas',
    color: 'var(--color-sky)',
    skills: ['Git', 'GitHub', 'Trello', 'Figma', 'Adobe XD', 'Metodologías ágiles'],
  },
];

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'Básico (lectura de documentación técnica)' },
];
