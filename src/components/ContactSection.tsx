import { useState } from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@nlpartnerstudio.com',
    href: 'mailto:info@nlpartnerstudio.com',
  },
  {
    icon: Phone,
    label: 'Telefono',
    value: '+39 XXX XXX XXXX',
    href: 'tel:+39XXXXXXXXXX',
  },
  {
    icon: MapPin,
    label: 'Sede',
    value: 'Roma, Italia',
    href: '#',
  },
];

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Messaggio inviato!',
      description: 'Ti risponderemo il prima possibile.',
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="section-padding bg-gradient-section">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Contatti
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 text-balance">
            Iniziamo una conversazione
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pronto a trasformare la tua azienda? Contattaci per una consulenza gratuita.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-elevated p-8 md:p-10">
            <h3 className="font-display text-2xl font-medium mb-6">
              Richiedi una consulenza
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nome
                  </label>
                  <Input
                    type="text"
                    placeholder="Il tuo nome"
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="email@esempio.com"
                    required
                    className="bg-background"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Azienda
                </label>
                <Input
                  type="text"
                  placeholder="Nome della tua azienda"
                  className="bg-background"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Messaggio
                </label>
                <Textarea
                  placeholder="Come possiamo aiutarti?"
                  rows={5}
                  required
                  className="bg-background resize-none"
                />
              </div>
              
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-medium mb-6">
                Informazioni di contatto
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 card-elevated hover-lift group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="card-elevated p-8 bg-primary/5">
              <h4 className="font-display text-xl font-medium mb-4">
                Orari di ufficio
              </h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Lunedì - Venerdì: 9:00 - 18:00</p>
                <p>Sabato - Domenica: Chiuso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
