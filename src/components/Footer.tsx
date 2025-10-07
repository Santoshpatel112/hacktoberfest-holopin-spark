import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://x.com/Santoshp3259330" },
  { icon: Github, label: "GitHub", href: "https://github.com/Santoshpatel112" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/santosh-patel112/" },
  { icon: Mail, label: "Email", href: "mailto:santoshpatelvns5@gmail.com" },
];

const footerLinks = {
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Community", href: "#" },
    { name: "Blog", href: "#" },
  ],
  Support: [
    { name: "Help Center", href: "#" },
    { name: "Discord", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Status", href: "#" },
  ],
  Legal: [
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Brand Guidelines", href: "#" },
    { name: "License", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Hacktoberfest x Holopin
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Let's build the future of open source, together. Whether you're launching a developer
              tool, hiring open-source contributors, or scaling a community, Hacktoberfest gives you
              a trusted platform to do it in a way that gets users excited.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-muted hover:bg-primary/20 rounded-lg transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-foreground">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
            <p className="text-sm">
              © 2025 DigitalOcean, LLC. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Brand Guidelines ↓
            </a>
          </div>
        </div>

        {/* Made with Love */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Made with <span className="text-primary">❤️</span> for Open Source
          </p>
        </div>
      </div>
    </footer>
  );
};
