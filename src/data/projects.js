import { getProjectProgress } from '../utils/localStorage';

export const projects = [
  {
    id: 'bayt-elite',
    name: 'Bayt Elite',
    tagline: 'The Sales Machine for Gulf Real Estate Developers',
    description: 'A comprehensive sales enablement platform for Gulf real estate developers targeting remote Nigerian investors. Features include dynamic payment calculators with Hijri timelines, prayer/Qibla integration, and virtual property tours.',
    status: 'planning',
    progress: getProjectProgress('bayt-elite'),
    priority: 'high',
    market: 'Gulf',
    techStack: ['React', 'Node.js', 'MongoDB', 'Mapbox', 'Aladhan API'],
    features: [
      'Dynamic payment calculator with PDF export',
      'Hijri/Gregorian dual timelines',
      'Prayer times & Qibla direction',
      '360° virtual property tours',
      'WhatsApp integration for sales agents'
    ],
    color: '#1e3a8a'
  },
  {
    id: 'tawasul-ai',
    name: 'Tawasul AI',
    tagline: 'Arabic-English Communication Intelligence',
    description: 'AI-powered communication assistant specializing in Arabic-English translation with Gulf cultural context. Includes voice recognition, dialect detection, and business communication templates.',
    status: 'planning',
    progress: getProjectProgress('tawasul-ai'),
    priority: 'high',
    market: 'Gulf',
    techStack: ['Python', 'FastAPI', 'React', 'OpenAI', 'Whisper'],
    features: [
      'Arabic dialect detection',
      'Real-time voice translation',
      'Business communication templates',
      'Cultural context suggestions',
      'Document translation with formatting'
    ],
    color: '#0d9488'
  },
  {
    id: 'zimam-delivery',
    name: 'Zimam Delivery',
    tagline: 'Gulf-Focused Delivery Management System',
    description: 'Delivery and logistics platform optimized for Gulf market challenges: extreme heat, complex addressing, Ramadan schedules, and cash-on-delivery preferences.',
    status: 'planning',
    progress: getProjectProgress('zimam-delivery'),
    priority: 'medium',
    market: 'Gulf',
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps API'],
    features: [
      'Heat-sensitive delivery scheduling',
      'Arabic address parsing',
      'Ramadan-optimized delivery times',
      'Cash/COD management',
      'Driver heat-stress monitoring'
    ],
    color: '#7c3aed'
  },
  {
    id: 'al-multaqa',
    name: 'Al-Multaqa Dashboard',
    tagline: 'Business Intelligence for Gulf Markets',
    description: 'Dashboard providing actionable insights for businesses operating in Gulf markets. Tracks market trends, consumer behavior, and regulatory changes specific to Saudi, UAE, Qatar, etc.',
    status: 'planning',
    progress: getProjectProgress('al-multaqa'),
    priority: 'medium',
    market: 'Gulf',
    techStack: ['Next.js', 'D3.js', 'Python', 'FastAPI', 'Redis'],
    features: [
      'Market trend visualization',
      'Competitor analysis',
      'Regulatory change alerts',
      'Consumer sentiment analysis',
      'Export/import data insights'
    ],
    color: '#dc2626'
  }
];

// Function to refresh project progress
export const refreshProjectProgress = () => {
  return projects.map(project => ({
    ...project,
    progress: getProjectProgress(project.id)
  }));
};

export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};
