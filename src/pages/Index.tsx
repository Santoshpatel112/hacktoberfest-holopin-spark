import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { BadgeSection } from "@/components/BadgeSection";
import { ContributeSection } from "@/components/ContributeSection";
import { GitHubProfileSection } from "@/components/GitHubProfileSection";
import { Footer } from "@/components/Footer";
import { ContributorNotification } from "@/components/ContributorNotification";
import { useState, useEffect } from "react";
import { type Contributor } from "@/data/contributors";

const Index = () => {
  const [notificationContributor, setNotificationContributor] = useState<Contributor | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleContributorAdded = (event: CustomEvent) => {
      if (event.detail.isNew) {
        setNotificationContributor(event.detail.contributor);
        setShowNotification(true);
      }
    };

    window.addEventListener("contributorAdded", handleContributorAdded as EventListener);

    return () => {
      window.removeEventListener("contributorAdded", handleContributorAdded as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BadgeSection />
      <ContributeSection />
      <GitHubProfileSection />
      <Footer />
      
      {/* Contributor Notification */}
      <ContributorNotification
        contributor={notificationContributor}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
};

export default Index;
