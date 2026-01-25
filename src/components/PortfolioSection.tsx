import { ArrowUpRight, FileText, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const publications = [
  {
    title: 'Minnovo - Crypto Investment Guide',
    description: 'Guida completa agli investimenti in criptovalute',
    url: 'https://minnovo.it',
  },
  {
    title: 'Medium - Apple in Fintech',
    description: 'Analisi della strategia fintech di Apple',
    url: 'https://medium.com',
  },
  {
    title: 'Il Progresso - Bitcoin Insights',
    description: 'Approfondimenti sul mercato Bitcoin',
    url: '#',
  },
];

const investments = [
  {
    name: 'Immobiliallasta.it',
    sector: 'PropTech',
    description: 'Piattaforma innovativa per aste immobiliari',
  },
  {
    name: 'Nuvola Zero',
    sector: 'Food Tech',
    description: 'Prodotti alimentari a base di proteine alternative',
  },
  {
    name: 'Beauty Tech Startup',
    sector: 'Beauty Tech',
    description: 'Innovazione nel settore bellezza e wellness',
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="section-padding bg-gradient-section">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Portfolio & Pubblicazioni
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 text-balance">
            Progetti, investimenti e thought leadership
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Publications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-medium">Pubblicazioni</h3>
            </div>

            <div className="space-y-4">
              {publications.map((pub) => (
                <a
                  key={pub.title}
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block card-elevated p-6 hover-lift group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-display text-lg font-medium group-hover:text-primary transition-colors">
                        {pub.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {pub.description}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" asChild>
                <a href="#" className="inline-flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Visualizza Portfolio Progetti
                </a>
              </Button>
            </div>
          </div>

          {/* Investments */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-medium">Investimenti in Startup</h3>
            </div>

            <div className="space-y-4">
              {investments.map((inv) => (
                <div
                  key={inv.name}
                  className="card-elevated p-6 hover-lift"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {inv.sector}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-medium">
                    {inv.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {inv.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Angel investor in startup innovative nei settori PropTech, Food Tech e Beauty Tech.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
