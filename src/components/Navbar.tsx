import { motion } from "framer-motion";
import { Github, Linkedin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import holopinLogo from "@/assets/holopin-logo.png";

export const Navbar = () => {
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
            className="flex items-center gap-3"
          >
            <img src={holopinLogo} alt="Holopin Dragon" className="h-10 w-auto animate-float" />
            <span className="text-xl font-bold gradient-text hidden md:block">
              Hacktoberfest x Holopin
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#badges" className="text-foreground hover:text-primary transition-colors">
              Badges
            </a>
            <a href="#contribute" className="text-foreground hover:text-primary transition-colors">
              Contribute
            </a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors">
              Community
            </a>
          </div>

          {/* Social & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <Button variant="default" className="hidden md:flex bg-primary hover:bg-primary/90 glow-pink">
              Start Hacking
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
