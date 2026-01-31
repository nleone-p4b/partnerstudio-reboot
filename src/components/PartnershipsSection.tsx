import { GraduationCap } from 'lucide-react';

const academicPartners = [
  { name: 'Università Roma Tor Vergata', category: 'Docente' },
  { name: 'ESCP Business School', category: 'Business School' },
  { name: 'PSB Paris School of Business', category: 'Business School' },
  { name: 'Singapore University', category: 'International' },
];

export function PartnershipsSection() {
  return (
    <section id="partnerships" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Academic Partners */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-medium">Istituzioni Accademiche</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {academicPartners.map((partner) => (
              <div
                key={partner.name}
                className="card-elevated p-6 text-center hover-lift"
              >
                <p className="font-display text-lg font-medium text-foreground mb-1">
                  {partner.name}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {partner.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
