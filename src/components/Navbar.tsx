import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import holopinLogo from "@/assets/holopin-logo.png";
import hacktoberfestLogo from "@/assets/hacktoberfest-logo.png";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

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

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("profileUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileUpdated", handleStorageChange);
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
    </motion.nav>
  );
};
