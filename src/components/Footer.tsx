import { Linkedin, Mail, Twitter } from 'lucide-react';
import nlLogo from '@/assets/nl-partner-logo.png';

const footerLinks = [
  {
    title: 'Servizi',
    links: [
      { label: 'Consulenza Strategica', href: '#services' },
      { label: 'AI & Optimization', href: '#services' },
      { label: 'Formazione', href: '#services' },
      { label: 'Digital Marketing', href: '#services' },
    ],
  },
  {
    title: 'Azienda',
    links: [
      { label: 'Chi Siamo', href: '#about' },
      { label: 'Partnership', href: '#partnerships' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Contatti', href: '#contact' },
    ],
  },
  {
    title: 'Risorse',
    links: [
      { label: 'Pubblicazioni', href: '#portfolio' },
      { label: 'Case Studies', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:info@nlpartnerstudio.com', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide mx-auto px-4 md:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src={nlLogo}
              alt="NL Partner Studio"
              className="h-12 w-auto mb-6 brightness-0 invert opacity-90"
            />
            <p className="text-background/70 leading-relaxed max-w-sm mb-6">
              Consulenza strategica, formazione accademica e soluzioni AI per 
              trasformare le sfide operative in opportunità di crescita.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-display text-lg font-medium mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} NL Partner Studio. Tutti i diritti riservati.
          </p>
          <p className="text-sm text-background/50">
            P.IVA: XX XXX XXX XXX
          </p>
        </div>
      </div>
    </footer>
  );
}
