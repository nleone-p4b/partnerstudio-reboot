import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import nlLogo from '@/assets/nl-partner-logo.png';

const navItems = [
  { label: 'Chi Siamo', href: '#about' },
  { label: 'Servizi', href: '#services' },
  { label: 'Partnership', href: '#partnerships' },
  { label: 'Portfolio', href: '#portfolio' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-subtle py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-wide mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img
              src={nlLogo}
              alt="NL Partner Studio"
              className="h-10 md:h-12 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-body text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="gold" size="default" asChild>
              <a href="#contact">Contattaci</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-card animate-fade-in">
            <ul className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block py-3 px-4 font-body text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button variant="gold" className="w-full" asChild>
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Contattaci
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
