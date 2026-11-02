export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface FeaturedProject {
  name: string;
  headline: string;
  url: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  images: ProjectImage[];
}

export interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string[];
  outcome: string;
  stack: string[];
  images?: ProjectImage[];
}

export const featuredProject: FeaturedProject = {
  name: 'Blikon',
  headline: 'Mensajería en tiempo real + chatbot con IA',
  url: 'https://blikon.com.blog',
  role: 'Desarrollador Full Stack · 2024 – Actualidad',
  summary:
    'Aplicación de mensajería para usuarios y negocios, con conversaciones en tiempo real, envío de todo tipo de contenido y un asistente con inteligencia artificial integrado.',
  highlights: [
    'Chats 1 a 1 y grupales: texto, multimedia, documentos, audios y stickers.',
    'Tiempo real con Firebase Realtime Database sincronizado con TanStack Query; estado global con Zustand.',
    'Chatbot con IA: respuestas en markdown animadas y lectura en voz (Web Speech API), procesadas por una Cloud Function conectada a OpenAI.',
    'Lógica de mensajería centralizada en Cloud Functions para que todas las apps creen y actualicen conversaciones igual.',
  ],
  stack: ['React', 'TypeScript', 'Tailwind', 'Firebase RTDB', 'Cloud Functions', 'TanStack Query', 'Zustand', 'OpenAI'],
  images: [
    {
      src: '/img/projects/blikon-validacel.jpg',
      alt: 'Pantalla de registro de Blikon con validación del número celular por SMS',
      caption: 'Registro con validación de número celular',
    },
  ],
};

export const caseStudies: CaseStudy[] = [
  {
    title: 'Clases en línea con Zoom',
    client: 'Universidad del Conde',
    challenge: 'Llevar las clases en línea de la universidad a una plataforma estable y registrar la asistencia de los docentes.',
    solution: [
      'Migración de las clases a Zoom integrando su Meeting SDK y API en la plataforma escolar.',
      'Webhooks de Zoom para registrar automáticamente la entrada y salida de cada profesor.',
    ],
    outcome: 'Mejor experiencia de clase para alumnos y docentes, con asistencia docente registrada sin captura manual.',
    stack: ['Zoom Meeting SDK', 'Zoom API', 'Webhooks', 'PHP', 'MySQL', 'JavaScript'],
  },
  {
    title: 'Acceso seguro para 4 plataformas',
    client: 'Universidad del Conde',
    challenge: 'Unificar y reforzar el inicio de sesión de las plataformas de alumnos, docentes y control escolar.',
    solution: [
      'Rediseño del inicio de sesión de las 4 plataformas.',
      'Verificación en dos pasos con un PIN enviado por WhatsApp mediante la API de Twilio.',
      'Notificaciones push a alumnos con Firebase Cloud Messaging.',
    ],
    outcome: 'Inicio de sesión más seguro que solo correo y contraseña, y un canal directo de avisos para los alumnos.',
    stack: ['Twilio', 'Firebase Cloud Messaging', 'PHP', 'MySQL', 'JavaScript'],
  },
  {
    title: 'Sistema de requisiciones',
    client: 'Universidad del Conde',
    challenge: 'Digitalizar el proceso de requisiciones internas de la universidad.',
    solution: [
      'Desarrollo completo del sistema, desde la base de datos hasta la interfaz.',
      'Arquitectura MVC con PHP y MySQL, interfaz con JavaScript y jQuery.',
    ],
    outcome: 'Un sistema propio de la universidad para gestionar sus requisiciones en un solo lugar.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'MVC'],
  },
  {
    title: 'Landing pages y sistemas para eventos',
    client: 'Universidad del Conde',
    challenge: 'Promocionar la oferta académica y los congresos de la universidad, y controlar el acceso de los asistentes.',
    solution: [
      'Landing page institucional y landing del congreso CISMAC 2024.',
      'Sistema de acceso para asistentes a un congreso internacional.',
      'Paneles administrativos con imágenes y PDF almacenados en Cloudinary.',
    ],
    outcome: 'Sitios de promoción y herramientas de registro para los congresos y la oferta académica de la universidad.',
    stack: ['React', 'Tailwind', 'PHP', 'MySQL', 'Cloudinary', 'HTML5', 'CSS3'],
    images: [
      { src: '/img/projects/udc-landing.jpg', alt: 'Landing page de la Universidad del Conde con su oferta académica', caption: 'Landing institucional' },
      { src: '/img/projects/congreso-acceso.jpg', alt: 'Pantalla de acceso general de asistentes al congreso de medicina estética', caption: 'Acceso a congreso' },
      { src: '/img/projects/cismac-landing.jpg', alt: 'Landing del congreso CISMAC 2024 en Monterrey', caption: 'CISMAC 2024' },
    ],
  },
];
