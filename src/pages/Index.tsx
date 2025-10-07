import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { BadgeSection } from "@/components/BadgeSection";
import { ContributeSection } from "@/components/ContributeSection";
import { GitHubProfileSection } from "@/components/GitHubProfileSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BadgeSection />
      <ContributeSection />
      <GitHubProfileSection />
      <Footer />
    </div>
  );
};

export default Index;
