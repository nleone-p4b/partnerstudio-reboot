import minnovo from '@/assets/partners/minnovo.png';
import binance from '@/assets/partners/binance.png';
import torVergata from '@/assets/partners/tor-vergata.png';
import taylora from '@/assets/partners/taylora.png';
import centoform from '@/assets/partners/centoform.png';
import aox from '@/assets/partners/aox.png';
import immobiliare from '@/assets/partners/immobiliallasta.png';
import opificio from '@/assets/partners/opificio-alkemico.png';
import nuvola from '@/assets/partners/nuvola-zero.png';
import daily from '@/assets/partners/daily-cage.png';

export const brandLogos: Record<string, string> = {
  'Università di Roma Tor Vergata': torVergata,
  'Master EMCM Tor Vergata': torVergata,
  'Minnovo Academy': minnovo,
  Minnovo: minnovo,
  Binance: binance,
  Taylora: taylora,
  Centoform: centoform,
  'AOX Cosmeceuticals': aox,
  "Il futuro dell'immobiliare": immobiliare,
  'Opificio Alkemico': opificio,
  'Nuvola Zero': nuvola,
  'The Daily Cage': daily,
};

export type Sector = { name: string; hint: string; services: string[]; brands: string[] };

export const sectors: Sector[] = [
  {
    name: 'FORMAZIONE',
    hint: 'Docenza e programmi su misura per università e aziende',
    services: [
      'Corsi universitari e master in innovation management',
      'Corporate training su AI, digitale e innovazione',
      'Progettazione di percorsi e certificazioni',
      'Workshop executive e facilitazione',
    ],
    brands: ['Università di Roma Tor Vergata', 'Master EMCM Tor Vergata', 'ESCP Business School', 'PSB Paris School of Business', 'Singapore University', 'Minnovo Academy', 'Centoform', 'Taylora', 'AIFIA', 'CEPAS Bureau Veritas', 'Talent Garden'],
  },
  {
    name: 'HEALTHCARE',
    hint: 'Organizzazione, dati e AI per sanità e pharma',
    services: [
      'Riorganizzazione di processi clinici e amministrativi',
      'Soluzioni AI per sanità e pubblica amministrazione',
      'Bandi, PNRR e rendicontazione',
      'Patient e caregiver experience',
    ],
    brands: ['Pangenic (P4B.Ai)', 'More – Laboratorio di Organizzazione', 'Ministero della Salute (Progetto Vita)', 'FIASO', 'FISM', 'PwC', 'ARNAS Civico Palermo', 'EBO', 'Policlinico di Bari', 'AOX Cosmeceuticals'],
  },
  {
    name: 'COMMUNICATION',
    hint: 'Posizionamento e crescita guidati dai dati',
    services: [
      'Strategia di marca e posizionamento',
      'Social media e content strategy',
      'Advertising e funnel di acquisizione',
      'Eventi, community e partnership',
    ],
    brands: ['Minnovo', 'Webion', 'The Crowd', 'YouMark', 'Rome Future Week', "L'Espresso – Setteidee", 'Binance', 'Opificio Alkemico', "Il futuro dell'immobiliare", 'Nuvola Zero', 'The Daily Cage', 'Urban Fitness'],
  },
];

export const highlights = [
  { title: 'Consulenza Manageriale', description: 'Solida base accademica unita a concreta esperienza sul campo.' },
  { title: 'AI & Innovation', description: "Soluzioni AI per l'ottimizzazione dei processi aziendali." },
  { title: 'Formazione Accademica', description: 'Docente universitario e PhD in Innovation Management.' },
  { title: 'Track Record', description: 'Co-founder Minnovo.it, esperienza cross-industry.' },
];
