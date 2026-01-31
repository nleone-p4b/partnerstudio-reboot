import { Award, BookOpen, Briefcase, Lightbulb } from 'lucide-react';

const highlights = [
  {
    icon: Briefcase,
    title: 'Consulenza Manageriale',
    description: 'Solida base accademica unita a concreta esperienza sul campo',
  },
  {
    icon: Lightbulb,
    title: 'AI & Innovation',
    description: 'Soluzioni AI per l\'ottimizzazione dei processi aziendali',
  },
  {
    icon: BookOpen,
    title: 'Formazione Accademica',
    description: 'Docente universitario e PhD in Innovation Management',
  },
  {
    icon: Award,
    title: 'Track Record',
    description: 'Co-founder Minnovo.it, esperienza cross-industry',
  },
];

export function AboutSection() {
  return (
    <section 
      id="about" 
      className="px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-14 lg:px-16 lg:pt-10 lg:pb-20 bg-gradient-section"
      aria-labelledby="about-heading"
    >
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <header className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Chi Siamo
          </p>
          <h2 id="about-heading" className="font-display text-2xl md:text-3xl text-balance">
            Doppia anima: rigore accademico e pragmatismo operativo
          </h2>
        </header>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {highlights.map((item, index) => (
            <article
              key={item.title}
              className="card-elevated p-6 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
