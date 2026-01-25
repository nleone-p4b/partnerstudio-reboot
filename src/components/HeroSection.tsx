import { ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '50+', label: 'Eventi Gestiti', icon: Sparkles },
  { value: '4', label: 'Università', icon: Users },
  { value: '10+', label: 'Paesi', icon: TrendingUp },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full animate-fade-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Business Optimization
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              Trasformiamo i processi in{' '}
              <span className="text-gradient-gold">vantaggio competitivo</span>
            </h1>

            {/* Description */}
            <p
              className="font-body text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              Consulenza strategica, formazione accademica e soluzioni AI per trasformare 
              le sfide operative in opportunità di crescita e innovazione.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Button variant="hero" asChild>
                <a href="#services">
                  Scopri i Servizi
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button variant="hero-outline" asChild>
                <a href="#contact">Contattaci</a>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap gap-8 pt-8 border-t border-border/50 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Abstract Shape */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
              <div className="absolute inset-8 rounded-full border-2 border-primary/15" />
              <div className="absolute inset-16 rounded-full border-2 border-primary/10" />
              <div className="absolute inset-24 rounded-full bg-primary/5" />
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-primary" />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-12 right-0 px-4 py-2 bg-card rounded-lg shadow-card border border-border/50 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <p className="text-sm font-medium text-foreground">Consulenza Strategica</p>
              </div>
              <div className="absolute bottom-24 left-0 px-4 py-2 bg-card rounded-lg shadow-card border border-border/50 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <p className="text-sm font-medium text-foreground">AI & Innovation</p>
              </div>
              <div className="absolute bottom-8 right-8 px-4 py-2 bg-card rounded-lg shadow-card border border-border/50 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <p className="text-sm font-medium text-foreground">Formazione</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
