import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, ExternalLink, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useContributors } from "@/hooks/useContributors";

export const GitHubProfileSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { addContributor, getContributorByUsername } = useContributors();

  const fetchGitHubProfile = async () => {
    if (!username) {
      toast.error("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setProfile(data);
      localStorage.setItem("githubProfile", JSON.stringify(data));

      // Add user to contributors (always update with latest data)
      const existingContributor = getContributorByUsername(data.login);
      const contributorData = {
        name: data.name || data.login,
        githubUsername: data.login,
        avatarUrl: data.avatar_url,
        profileUrl: data.html_url,
        contributions: existingContributor
          ? existingContributor.contributions + 1
          : Math.max(1, data.public_repos || 1),
        joinedDate: existingContributor
          ? existingContributor.joinedDate
          : new Date().toISOString().split("T")[0],
        badges: existingContributor
          ? existingContributor.badges
          : [
              "hacktoberfest-2024",
              "new-member",
              ...(data.public_repos > 10 ? ["active-developer"] : []),
              ...(data.followers > 50 ? ["popular"] : []),
            ],
      };

      const result = addContributor(contributorData);

      if (result.isNew) {
        toast.success(
          "🎉 Welcome to the community! You've been added to our contributors list!"
        );
        // Trigger a custom event to animate the navbar counter
        window.dispatchEvent(
          new CustomEvent("contributorAdded", {
            detail: { contributor: result.contributor, isNew: true },
          })
        );
      } else {
        toast.success("🎉 Welcome back! Your profile has been updated!");
        window.dispatchEvent(
          new CustomEvent("contributorAdded", {
            detail: { contributor: result.contributor, isNew: false },
          })
        );
      }

      window.dispatchEvent(new Event("profileUpdated"));
    } catch (error) {
      toast.error("User not found. Please check the username.");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    const savedProfile = localStorage.getItem("githubProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setUsername(JSON.parse(savedProfile).login);
    }
  });

  return (
    <section id="community" className="py-24 relative bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Join the Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect your GitHub profile and showcase your contributions to the
            world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8 bg-card border-border">
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && fetchGitHubProfile()}
                className="flex-1"
              />
              <Button
                onClick={fetchGitHubProfile}
                disabled={loading}
                className="bg-primary hover:bg-primary/90"
              >
                <Github className="mr-2 h-4 w-4" />
                {loading ? "Loading..." : "Search"}
              </Button>
            </div>

            {profile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <motion.img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-primary mb-4 glow-pink"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  {profile.name || profile.login}
                  {getContributorByUsername(profile.login) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium"
                    >
                      <Users className="h-3 w-3" />
                      Contributor
                    </motion.div>
                  )}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {profile.bio || "Open source contributor"}
                </p>

                <div className="flex gap-6 mb-6 text-sm">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <p className="font-bold text-xl gradient-text">
                      {profile.public_repos}
                    </p>
                    <p className="text-muted-foreground">Repositories</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <p className="font-bold text-xl gradient-text">
                      {profile.followers}
                    </p>
                    <p className="text-muted-foreground">Followers</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <p className="font-bold text-xl gradient-text">
                      {profile.following}
                    </p>
                    <p className="text-muted-foreground">Following</p>
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="bg-primary hover:bg-primary/90 glow-pink"
                  >
                    <a
                      href={profile.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View GitHub Profile
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      localStorage.removeItem("githubProfile");
                      setProfile(null);
                      setUsername("");
                      window.dispatchEvent(new Event("profileUpdated"));
                      toast.success("Profile cleared");
                    }}
                  >
                    Clear Profile
                  </Button>
                  
                  {/* Debug button for testing */}
                  {process.env.NODE_ENV === 'development' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        console.log('Current localStorage contributors:', localStorage.getItem('communityContributors'));
                        console.log('Current profile:', profile);
                      }}
                    >
                      Debug Data
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {!profile && !loading && (
              <div className="text-center py-8 text-muted-foreground">
                <Github className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Enter a GitHub username to view their profile</p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
