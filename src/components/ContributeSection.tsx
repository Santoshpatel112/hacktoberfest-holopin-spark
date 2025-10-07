import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GitFork, GitPullRequest, CheckCircle, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Users,
    title: "Sign Up",
    description: "Register with your GitHub account to get started with Hacktoberfest.",
    number: "01",
  },
  {
    icon: GitFork,
    title: "Find Projects",
    description: "Browse repositories tagged with 'hacktoberfest' and find projects you care about.",
    number: "02",
  },
  {
    icon: GitPullRequest,
    title: "Create PRs",
    description: "Submit quality pull requests to participate and make meaningful contributions.",
    number: "03",
  },
  {
    icon: CheckCircle,
    title: "Earn Rewards",
    description: "Complete challenges to earn Holopin badges and celebrate your achievements!",
    number: "04",
  },
];

export const ContributeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contribute" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">How to Participate</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of developers contributing to open source. Follow these simple steps
            to start your Hacktoberfest journey today!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="p-6 h-full bg-card border-border hover:border-secondary transition-all duration-300 relative overflow-hidden group">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20 group-hover:text-primary/20 transition-colors">
                    {step.number}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4 p-3 bg-secondary/10 rounded-lg w-fit group-hover:bg-secondary/20 transition-colors">
                      <Icon className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
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
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground glow-cyan text-lg px-8 py-6"
          >
            Browse Repositories
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
