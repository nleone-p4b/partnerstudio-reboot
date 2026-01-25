import { Award, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Un approccio unico che combina rigore accademico e pragmatismo operativo. I risultati parlano da soli.",
    author: "CEO, Azienda Tech",
    role: "Consulenza Strategica",
  },
  {
    quote: "L'implementazione di soluzioni AI ha trasformato completamente i nostri processi operativi.",
    author: "Operations Director",
    role: "AI Implementation",
  },
  {
    quote: "Formazione di altissimo livello che ha elevato le competenze del nostro team.",
    author: "HR Manager",
    role: "Corporate Training",
  },
];

const achievements = [
  {
    title: 'Best Paper Award',
    description: 'Riconoscimento accademico per la ricerca in Innovation Management',
    icon: Award,
  },
  {
    title: 'Thought Leadership',
    description: 'Pubblicazioni su crypto, fintech e innovazione digitale',
    icon: Star,
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Testimonianze & Riconoscimenti
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 text-balance">
            Cosa dicono di noi
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-elevated p-8 relative"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-medium text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="card-elevated p-8 flex items-start gap-6 hover-lift"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <achievement.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-medium mb-2">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
