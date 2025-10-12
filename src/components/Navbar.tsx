import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import holopinLogo from "@/assets/holopin-logo.png";
import hacktoberfestLogo from "@/assets/hacktoberfest-logo.png";
import { Contributors } from "./Contributors";
import { useContributors } from "@/hooks/useContributors";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contributorsOpen, setContributorsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [contributorCountAnimation, setContributorCountAnimation] = useState(false);
  const { contributors } = useContributors();

  useEffect(() => {
    const savedProfile = localStorage.getItem("githubProfile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    const handleStorageChange = () => {
      const savedProfile = localStorage.getItem("githubProfile");
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      } else {
        setUserProfile(null);
      }
    };

    const handleContributorAdded = (event: CustomEvent) => {
      if (event.detail.isNew) {
        // Animate the counter when a new contributor is added
        setContributorCountAnimation(true);
        setTimeout(() => setContributorCountAnimation(false), 1000);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("profileUpdated", handleStorageChange);
    window.addEventListener("contributorAdded", handleContributorAdded as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileUpdated", handleStorageChange);
      window.removeEventListener("contributorAdded", handleContributorAdded as EventListener);
    };
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#badges", label: "Badges" },
    { href: "#contribute", label: "Contribute" },
    { href: "#community", label: "Join Community" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <a
              href="https://hacktoberfest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <img src={hacktoberfestLogo} alt="Hacktoberfest" className="h-8 md:h-10 w-auto" />
            </a>
            <span className="text-xl text-muted-foreground hidden sm:block">×</span>
            <img src={holopinLogo} alt="Holopin Dragon" className="h-8 md:h-10 w-auto animate-float" />
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            {/* Contributors Button */}
            <motion.button
              onClick={() => setContributorsOpen(true)}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="h-4 w-4" />
              <span>Contributors</span>
              
              {/* Live counter with animation */}
              <motion.div
                key={contributors.length} // Re-animate when count changes
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: contributorCountAnimation ? [1, 1.3, 1] : 1, 
                  opacity: 1,
                  rotate: contributorCountAnimation ? [0, 10, -10, 0] : 0
                }}
                transition={{ 
                  duration: contributorCountAnimation ? 0.6 : 0.3,
                  type: "spring",
                  stiffness: 300
                }}
                className={`h-5 w-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-medium ${
                  contributorCountAnimation ? 'animate-pulse-glow' : ''
                }`}
              >
                {contributors.length}
              </motion.div>
              
              {/* Enhanced floating preview */}
              <motion.div 
                className="absolute top-8 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50"
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
              >
                <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl min-w-[200px]">
                  <p className="text-xs text-muted-foreground mb-2">Recent Contributors</p>
                  <div className="space-y-2">
                    {contributors.slice(0, 3).map((contributor, index) => (
                      <motion.div
                        key={contributor.id}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <img
                          src={contributor.avatarUrl}
                          alt={contributor.name}
                          className="h-6 w-6 rounded-full border border-primary/20"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.name)}&background=6366f1&color=fff`;
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{contributor.name}</p>
                          <p className="text-xs text-muted-foreground">@{contributor.githubUsername}</p>
                        </div>
                        {new Date(contributor.joinedDate) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
                          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                        )}
                      </motion.div>
                    ))}
                    {contributors.length > 3 && (
                      <p className="text-xs text-muted-foreground text-center pt-1 border-t border-border">
                        +{contributors.length - 3} more contributors
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.button>
          </div>

          {/* User Profile & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            {userProfile ? (
              <motion.a
                href={userProfile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="hidden md:flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <img
                  src={userProfile.avatar_url}
                  alt={userProfile.login}
                  className="h-8 w-8 rounded-full border-2 border-primary"
                />
                <span className="text-sm font-medium">{userProfile.login}</span>
              </motion.a>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavClick("#community")}
                className="hidden md:flex gap-2"
              >
                <User className="h-4 w-4" />
                Join Community
              </Button>
            )}

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border glass"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Contributors Button - Mobile */}
              <button
                onClick={() => {
                  setContributorsOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left text-foreground hover:text-primary transition-colors py-2"
              >
                <Users className="h-5 w-5" />
                <span>Contributors ({contributors.length})</span>
              </button>
              
              {userProfile && (
                <a
                  href={userProfile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <img
                    src={userProfile.avatar_url}
                    alt={userProfile.login}
                    className="h-10 w-10 rounded-full border-2 border-primary"
                  />
                  <div>
                    <p className="font-medium">{userProfile.login}</p>
                    <p className="text-xs text-muted-foreground">View GitHub Profile</p>
                  </div>
                </a>
              )}

              <div className="flex gap-3 pt-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contributors Panel */}
      <Contributors 
        isOpen={contributorsOpen} 
        onClose={() => setContributorsOpen(false)} 
      />
    </motion.nav>
  );
};
