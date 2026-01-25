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
    <section id="about" className="section-padding bg-gradient-section">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Chi Siamo
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 text-balance">
            Doppia anima: rigore accademico e pragmatismo operativo
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Aiutiamo le aziende a trasformare le sfide operative e strategiche in opportunità 
            di crescita e innovazione, combinando una profonda conoscenza tecnologica con 
            una visione manageriale.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="card-elevated p-6 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-display text-2xl md:text-3xl gold-underline pb-4">
              La Nostra Storia
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              NL Partner Studio nasce dalla volontà di portare il meglio della consulenza 
              strategica e dell'innovazione tecnologica alle imprese italiane ed europee.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dal 2019, con la co-fondazione di Minnovo.it, abbiamo sviluppato una profonda 
              esperienza nella Business Transformation, lavorando con PMI, industria e servizi 
              su efficienza operativa, qualità decisionale e scalabilità.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Il nostro approccio unico combina il rigore metodologico derivante da un PhD 
              in Innovation Management con l'esperienza pratica maturata in varie industries, 
              con un focus particolare in ambito pharma/healthcare.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                <div className="text-center p-8">
                  <Lightbulb className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="font-display text-2xl text-foreground">
                    Innovation Meets Strategy
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
