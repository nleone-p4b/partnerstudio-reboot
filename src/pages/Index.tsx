import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PartnersLogoStrip } from '@/components/PartnersLogoStrip';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main role="main" aria-label="Contenuto principale">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PartnersLogoStrip />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

