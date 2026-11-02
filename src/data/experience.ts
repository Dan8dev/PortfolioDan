export interface Job {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
}

export const experience: Job[] = [
  {
    company: 'Blikon',
    role: 'Desarrollador Full Stack',
    period: '2024 – Actualidad',
    current: true,
    highlights: [
      'Aplicación de mensajería para usuarios y negocios: chats 1 a 1 y grupales con texto, multimedia, documentos, audios y stickers.',
      'Conversaciones en tiempo real con Firebase Realtime Database, sincronizadas con la caché de TanStack Query y estado global con Zustand.',
      'Chatbot con IA de punta a punta: respuestas en markdown animadas y lectura en voz en React, conectado a una Cloud Function que gestiona las conversaciones y consulta un modelo de OpenAI.',
      'Lógica de mensajería centralizada en Cloud Functions con TypeScript (enrutamiento, validación de acceso y manejo unificado de errores): eliminó código duplicado y redujo la carga en cada app.',
      'Despliegues en ambientes dev, test y prod; trabajo ágil con Git, GitHub y Trello; diseños UI/UX desde Figma y Adobe XD.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind', 'Firebase', 'Cloud Functions', 'TanStack Query', 'Zustand', 'OpenAI'],
  },
  {
    company: 'Universidad del Conde',
    role: 'Desarrollador Web Full Stack',
    period: '2022 – 2024',
    highlights: [
      'Migración de las clases en línea a Zoom (Meeting SDK y API) y webhooks para registrar la entrada y salida de profesores.',
      'Rediseño del inicio de sesión de 4 plataformas (alumnos, docentes y control escolar) con verificación en dos pasos por WhatsApp vía Twilio.',
      'Desarrollo de un sistema completo de requisiciones.',
      'Notificaciones push a alumnos con Firebase Cloud Messaging y almacenamiento de imágenes y PDF con Cloudinary.',
      'Mantenimiento de paneles administrativos y landing pages con PHP, MySQL, JavaScript y jQuery bajo el patrón MVC.',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Zoom SDK', 'Twilio', 'FCM', 'Cloudinary'],
  },
];

export const education = [
  {
    degree: 'Ingeniería en Desarrollo y Gestión de Software',
    school: 'Universidad Tecnológica de Puebla',
    period: '2020 – 2022',
  },
  {
    degree: 'TSU en Tecnologías de la Información, Desarrollo de Software Multiplataforma',
    school: 'Universidad Tecnológica de Puebla',
    period: '2018 – 2020',
  },
];
