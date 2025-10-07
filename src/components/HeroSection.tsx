import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import holopinLogo from "@/assets/holopin-logo.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      {/* Animated Particles Effect */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src={holopinLogo}
            alt="Holopin"
            className="h-24 mx-auto mb-6 animate-float"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
        >
          <span className="gradient-text">Celebrate Open Source</span>
          <br />
          <span className="text-foreground">with Hacktoberfest</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          Contribute, Collaborate, Earn Digital Badges, and Join the Global Community
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-pink text-lg px-8 py-6"
          >
            Start Contributing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6"
            onClick={() => {
              document.getElementById("community")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Github className="mr-2 h-5 w-5" />
            Connect GitHub
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {["github", "digitalocean", "opensource", "osc", "pull-request"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium"
            >
              #{tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-muted-foreground text-sm"
        >
          Powered by{" "}
          <span className="text-secondary font-semibold">DigitalOcean</span>
        </motion.p>
      </div>
    </section>
  );
};
