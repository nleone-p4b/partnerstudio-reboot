import { 
  BarChart3, 
  BookOpen, 
  Brain, 
  LineChart, 
  Megaphone, 
  Target, 
  Users, 
  Zap 
} from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI & Process Optimization',
    description: 'Mappatura e reingegnerizzazione processi in logica AI-enhanced. Identificazione quick wins, effort analysis e design di workflow ibridi umano-AI.',
    features: ['Mappatura processi', 'Quick wins identification', 'Workflow ibridi'],
  },
  {
    icon: Target,
    title: 'Consulenza Strategica',
    description: 'Vision & strategy design, performance management con KPI personalizzati. Trasformiamo le sfide in opportunità di crescita.',
    features: ['Vision & strategy', 'Performance management', 'KPI design'],
  },
  {
    icon: LineChart,
    title: 'Sales & Marketing Data-Driven',
    description: 'AI per vendite (lead scoring, forecast, agentic AI), marketing e advertising (creative generation, analytics), customer experience digitale.',
    features: ['Lead scoring', 'Forecast AI', 'Digital CX'],
  },
  {
    icon: BookOpen,
    title: 'Knowledge Management',
    description: 'Sistemi di knowledge sharing supportati da AI e ambienti immersivi. Metaverso per collaborazione, formazione e customer engagement.',
    features: ['Knowledge sharing', 'AI-powered', 'Ambienti immersivi'],
  },
  {
    icon: Users,
    title: 'Formazione Accademica',
    description: 'Programmi formativi per università e aziende su AI, digital transformation e management. Docenza presso Tor Vergata, ESCP e altre istituzioni.',
    features: ['Corsi universitari', 'Corporate training', 'Workshop'],
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategie di marketing digitale integrate, social media management, content creation e advertising su tutte le principali piattaforme.',
    features: ['Social media', 'Content creation', 'Advertising'],
  },
  {
    icon: BarChart3,
    title: 'Ricerca di Mercato',
    description: 'Analisi di mercato, competitive intelligence e studi di fattibilità per supportare decisioni strategiche basate sui dati.',
    features: ['Market analysis', 'Competitive intel', 'Studi fattibilità'],
  },
  {
    icon: Zap,
    title: 'Gestione Progetti',
    description: 'Gestione e coordinamento di progetti complessi, conferenze e workshop. Oltre 50 progetti completati con successo.',
    features: ['Project management', 'Conferenze', 'Workshop'],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="px-4 pt-4 pb-10 md:px-8 md:pt-6 md:pb-14 lg:px-16 lg:pt-8 lg:pb-20 bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            I Nostri Servizi
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group card-elevated p-6 hover-lift"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-display text-xl font-medium mb-3">
                {service.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
