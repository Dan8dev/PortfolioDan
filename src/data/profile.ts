export interface Profile {
  name: string;
  fullName: string;
  role: string;
  location: string;
  email: string;
  github: { user: string; url: string };
  /** Déjalo vacío para ocultar el enlace de LinkedIn en todo el sitio. */
  linkedin: string;
  cvUrl: string;
  cvFileName: string;
  mainStack: string[];
  /** Frase corta del hero (se escribe con efecto máquina de escribir). */
  tagline: string;
  /** Resumen profesional (sección Experiencia). */
  summary: string;
  stats: { label: string; value: number }[];
  availability: string;
}

export const profile: Profile = {
  name: 'Daniel Meneses',
  fullName: 'Daniel Meneses Navarro',
  role: 'Desarrollador Full Stack',
  location: 'Puebla, México',
  email: 'dan99ml@gmail.com',
  github: { user: 'Dan8dev', url: 'https://github.com/Dan8dev' },
  linkedin: '',
  cvUrl: '/cv/CV-Daniel-Meneses-Navarro.pdf',
  cvFileName: 'CV-Daniel-Meneses-Navarro.pdf',
  mainStack: ['React', 'TypeScript', 'Firebase', 'Cloud Functions'],
  tagline:
    'Construyo apps de mensajería en tiempo real, chatbots con IA e integraciones confiables con APIs. Interfaces fluidas y código mantenible.',
  summary:
    'Desarrollador web con 4 años de experiencia construyendo aplicaciones frontend y backend. Actualmente desarrollo una aplicación de mensajería en tiempo real y un chatbot con React, TypeScript, Firebase Realtime Database y Cloud Functions, con flujos de despliegue dev, test y prod. Experiencia previa full stack con PHP, MySQL y JavaScript, integrando APIs REST de terceros como Zoom, Twilio y Cloudinary.',
  stats: [
    { label: 'Años exp.', value: 4 },
    { label: 'Proyectos', value: 5 },
    { label: 'APIs', value: 4 },
  ],
  availability: 'Disponible para trabajo presencial en Puebla, híbrido o remoto, y para viajar o reubicarme.',
};
