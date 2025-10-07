import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Star, Trophy, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const badges = [
  {
    icon: Trophy,
    title: "Contributor",
    description: "Complete your first PR",
    color: "from-primary to-secondary",
  },
  {
    icon: Star,
    title: "Rising Star",
    description: "5 accepted contributions",
    color: "from-secondary to-accent",
  },
  {
    icon: Award,
    title: "Champion",
    description: "10+ merged pull requests",
    color: "from-accent to-primary",
  },
  {
    icon: Target,
    title: "Master",
    description: "Complete all challenges",
    color: "from-primary via-accent to-secondary",
  },
];

export const BadgeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="badges" className="py-24 relative bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Earn Digital Badges</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcase your open source contributions with beautiful Holopin badges.
            Collect them all and display your achievements to the world!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 h-full bg-card border-border hover:border-accent transition-all duration-300 group relative overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className="mb-4 flex justify-center">
                      <div className={`p-4 rounded-full bg-gradient-to-br ${badge.color} glow-cyan`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center">{badge.title}</h3>
                    <p className="text-muted-foreground text-center">{badge.description}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground">
            Powered by{" "}
            <span className="font-bold gradient-text">Holopin</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
