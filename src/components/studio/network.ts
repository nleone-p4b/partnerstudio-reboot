
export type Partner = { name: string; url?: string };
// `services` e' il testo esteso della modale Servizi, `keywords` la riga breve dentro la sfera.
export type Sector = { name: string; hint: string; services: string[]; keywords: string[]; partners: Partner[] };

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
    keywords: ['Università', 'Aziende', 'Certificazioni'],
    partners: [
      { name: 'Università di Roma Tor Vergata', url: 'https://web.uniroma2.it/it' },
      { name: 'Master EMCM Tor Vergata', url: 'https://economia.uniroma2.it/commedia' },
      { name: 'ESCP Business School', url: 'https://escp.eu/' },
      { name: 'PSB Paris School of Business', url: 'https://www.psbedu.paris/fr' },
      { name: 'Singapore University' },
      { name: 'Minnovo Academy', url: 'https://minnovo.academy/' },
      { name: 'Centoform', url: 'https://centoform.it/' },
      { name: 'Taylora', url: 'https://discover.taylora.com/' },
      { name: 'AIFIA', url: 'https://www.aifia.it/' },
      { name: 'CEPAS Bureau Veritas', url: 'https://cepas.bureauveritas.it/' },
      { name: 'Talent Garden', url: 'https://talentgarden.com/en' },
    ],
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
    keywords: ['Processi', 'AI', 'Bandi'],
    partners: [
      { name: 'Pangenic (P4B.Ai)' },
      { name: 'More – Laboratorio di Organizzazione' },
      { name: 'Ministero della Salute (Progetto Vita)', url: 'https://www.salute.gov.it/' },
      { name: 'FIASO', url: 'https://www.fiaso.it/' },
      { name: 'FISM', url: 'https://fism.it/' },
      { name: 'PwC', url: 'https://www.pwc.com/it/it.html' },
      { name: 'ARNAS Civico Palermo', url: 'https://www.arnascivico.it/' },
      { name: 'EBO', url: 'https://www.ebo.ai' },
      { name: 'Policlinico di Bari', url: 'https://www.sanita.puglia.it/web/policlinico-di-bari-ospedale-giovanni-xxiii' },
      { name: 'AOX Cosmeceuticals', url: 'https://aox.com' },
    ],
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
    keywords: ['Brand', 'Content', 'Eventi'],
    partners: [
      { name: 'Minnovo', url: 'https://minnovo.it' },
      { name: 'Webion', url: 'https://webion.com' },
      { name: 'The Crowd', url: 'https://www.thecrowdfunding.it' },
      { name: 'YouMark', url: 'https://youmark.it' },
      { name: 'Rome Future Week', url: 'https://romefutureweek.it' },
      { name: "L'Espresso – Setteidee", url: 'https://www.setteidee.com' },
      { name: 'Binance', url: 'https://www.binance.com' },
      { name: 'Opificio Alkemico', url: 'https://opificioalkemico.com' },
      { name: "Il futuro dell'immobiliare" },
      { name: 'Nuvola Zero', url: 'https://nuvolazero.it' },
      { name: 'The Daily Cage', url: 'https://thedailycage.it' },
      { name: 'Urban Fitness', url: 'https://www.urbanfitness.it' },
    ],
  },
];

export const highlights = [
  { title: 'Consulenza Manageriale', description: 'Solida base accademica unita a concreta esperienza sul campo.' },
  { title: 'AI & Innovation', description: "Soluzioni AI per l'ottimizzazione dei processi aziendali." },
  { title: 'Formazione Accademica', description: 'Docente universitario e PhD in Innovation Management.' },
  { title: 'Track Record', description: 'Co-founder Minnovo.it, esperienza cross-industry.' },
];
