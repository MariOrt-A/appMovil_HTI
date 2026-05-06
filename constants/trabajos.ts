export interface TrabajoSoftware {
  id: string;
  nombre: string;
  descripcion: string;
  integrantesMin: number;
  integrantesMax: number;
  tecnologias: string[];
  ofrece: string[];
  costoPorIntegrante: number;
  horasEstimadas: number;
}

export const TRABAJOS_SOFTWARE: TrabajoSoftware[] = [
  {
    id: 'web',
    nombre: 'Desarrollo Web',
    descripcion: 'Aplicaciones web responsivas, landing pages, e-commerce',
    integrantesMin: 1,
    integrantesMax: 3,
    tecnologias: ['React', 'Next.js', 'Node.js', 'TailwindCSS'],
    ofrece: [
      'Diseño responsivo',
      'SEO optimizado',
      'Panel de administración',
      'Hosting por 3 meses'
    ],
    costoPorIntegrante: 500,
    horasEstimadas: 160
  },
  {
    id: 'movil',
    nombre: 'App Móvil',
    descripcion: 'Apps nativas o híbridas para iOS y Android',
    integrantesMin: 2,
    integrantesMax: 4,
    tecnologias: ['React Native', 'Flutter', 'Firebase', 'Expo'],
    ofrece: [
      'Publicación en stores',
      'Notificaciones push',
      'Sincronización en la nube',
      'Soporte técnico 1 mes'
    ],
    costoPorIntegrante: 600,
    horasEstimadas: 200
  },
  {
    id: 'backend',
    nombre: 'Backend & APIs',
    descripcion: 'Servidores, bases de datos, APIs REST/GraphQL',
    integrantesMin: 1,
    integrantesMax: 2,
    tecnologias: ['Python/Django', 'Node.js', 'PostgreSQL', 'Docker'],
    ofrece: [
      'Documentación de API',
      'Escalabilidad',
      'Seguridad implementada',
      'Monitoreo básico'
    ],
    costoPorIntegrante: 550,
    horasEstimadas: 120
  },
  {
    id: 'consultoria',
    nombre: 'Consultoría Técnica',
    descripcion: 'Revisión de código, arquitectura, optimización',
    integrantesMin: 1,
    integrantesMax: 2,
    tecnologias: ['Code Review', 'AWS', 'CI/CD', 'Testing'],
    ofrece: [
      'Diagnóstico completo',
      'Plan de mejora',
      'Mentoría al equipo',
      'Reporte ejecutivo'
    ],
    costoPorIntegrante: 450,
    horasEstimadas: 80
  }
];