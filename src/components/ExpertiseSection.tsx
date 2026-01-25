import { CheckCircle2 } from 'lucide-react';

const expertiseAreas = [
  {
    title: 'AI & Process Optimization',
    items: [
      'Mappatura e reingegnerizzazione processi in logica AI-enhanced',
      'Identificazione quick wins e effort analysis',
      'Design di workflow ibridi umano-AI',
      'Automazione intelligente dei processi',
    ],
  },
  {
    title: 'Consulenza Manageriale',
    items: [
      'Vision & strategy design',
      'Performance management con KPI personalizzati',
      'Change management e trasformazione organizzativa',
      'Business model innovation',
    ],
  },
  {
    title: 'Sales & Marketing Data-Driven',
    items: [
      'AI per vendite: lead scoring, forecast, agentic AI',
      'Marketing e advertising: creative generation, analytics',
      'Customer experience digitale',
      'Marketing automation e CRM optimization',
    ],
  },
  {
    title: 'Knowledge Management',
    items: [
      'Sistemi di knowledge sharing supportati da AI',
      'Ambienti immersivi per collaborazione',
      'Metaverso per formazione e customer engagement',
      'Digital workplace transformation',
    ],
  },
];

export function ExpertiseSection() {
  return (
    <section id="expertise" className="section-padding bg-gradient-section">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Aree di Competenza
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 text-balance">
            Expertise specializzata per risultati concreti
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Progettazione e implementazione di soluzioni AI per l'ottimizzazione 
            dei processi e il miglioramento della performance organizzativa in contesti complessi.
          </p>
        </div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {expertiseAreas.map((area, index) => (
            <div
              key={area.title}
              className="card-elevated p-8 hover-lift"
            >
              <h3 className="font-display text-2xl font-medium mb-6 gold-underline pb-4">
                {area.title}
              </h3>
              <ul className="space-y-4">
                {area.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Experience Highlight */}
        <div className="mt-16 card-elevated p-8 md:p-12 bg-primary/5">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-display text-4xl md:text-5xl font-semibold text-primary mb-2">
                PMI
              </p>
              <p className="text-muted-foreground">Piccole e medie imprese</p>
            </div>
            <div>
              <p className="font-display text-4xl md:text-5xl font-semibold text-primary mb-2">
                Industria
              </p>
              <p className="text-muted-foreground">Settore manifatturiero</p>
            </div>
            <div>
              <p className="font-display text-4xl md:text-5xl font-semibold text-primary mb-2">
                Servizi
              </p>
              <p className="text-muted-foreground">Terziario avanzato</p>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
            Esperienza cross-industry su efficienza operativa, qualità decisionale e scalabilità, 
            con un focus particolare in ambito pharma/healthcare.
          </p>
        </div>
      </div>
    </section>
  );
}
