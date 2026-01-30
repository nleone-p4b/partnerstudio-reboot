import tayloraLogo from '@/assets/partners/taylora.png';
import centoformLogo from '@/assets/partners/centoform.png';
import aoxLogo from '@/assets/partners/aox.png';
import immobiliallasta from '@/assets/partners/immobiliallasta.png';
import opificioAlkemico from '@/assets/partners/opificio-alkemico.png';
import nuvolaZero from '@/assets/partners/nuvola-zero.png';
import torVergata from '@/assets/partners/tor-vergata.png';
import minnovo from '@/assets/partners/minnovo.png';
import dailyCage from '@/assets/partners/daily-cage.png';
import binance from '@/assets/partners/binance.png';

const partners = [
  { name: 'Minnovo', logo: minnovo },
  { name: 'Binance', logo: binance },
  { name: 'Tor Vergata', logo: torVergata },
  { name: 'Taylora', logo: tayloraLogo },
  { name: 'Centoform', logo: centoformLogo },
  { name: 'AOX Cosmeceuticals', logo: aoxLogo },
  { name: 'Immobiliallasta.it', logo: immobiliallasta },
  { name: 'Opificio Alkemico', logo: opificioAlkemico },
  { name: 'Nuvola Zero', logo: nuvolaZero },
  { name: 'The Daily Cage', logo: dailyCage },
];

export function PartnersLogoStrip() {
  return (
    <section className="py-16 md:py-20 bg-background border-y border-border/50">
      <div className="container-wide mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Partnership, Collaborazioni, Network
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Consulenza e accompagnamento strategico per la crescita e il decision-making 
            che genera partnership di valore
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 md:max-h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
