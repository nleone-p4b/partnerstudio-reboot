import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PartnersLogoStrip } from '@/components/PartnersLogoStrip';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PartnershipsSection } from '@/components/PartnershipsSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PartnersLogoStrip />
        <AboutSection />
        <ServicesSection />
        <PartnershipsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
