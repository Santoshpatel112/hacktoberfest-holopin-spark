import { motion, AnimatePresence } from "framer-motion";
import { Users, Star, Calendar, ExternalLink, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { type Contributor } from "@/data/contributors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContributors } from "@/hooks/useContributors";

interface ContributorsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Contributors = ({ isOpen, onClose }: ContributorsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "contributions" | "name">("recent");
  const { contributors, getTotalContributions } = useContributors();

  // Filter and sort contributors
  const filteredContributors = useMemo(() => {
    let filtered = contributors.filter(contributor =>
      contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contributor.githubUsername.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "contributions":
        return filtered.sort((a, b) => b.contributions - a.contributions);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "recent":
      default:
        return filtered.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
    }
  }, [contributors, searchTerm, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Contributors Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-20 right-4 w-96 max-h-[80vh] bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Contributors</h3>
                    <motion.p 
                      key={contributors.length}
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground"
                    >
                      {filteredContributors.length} of {contributors.length} members • {getTotalContributions()} contributions
                    </motion.p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contributors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>
                
                <div className="flex gap-2">
                  {[
                    { key: "recent", label: "Recent" },
                    { key: "contributions", label: "Top Contributors" },
                    { key: "name", label: "A-Z" }
                  ].map((option) => (
                    <Button
                      key={option.key}
                      variant={sortBy === option.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy(option.key as any)}
                      className="text-xs h-7"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contributors List */}
            <div className="p-4 overflow-y-auto max-h-[60vh] contributors-scroll">
              {filteredContributors.length === 0 ? (
                searchTerm ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>No contributors found</p>
                    <p className="text-xs mt-2">Try a different search term</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>No contributors yet</p>
                    <p className="text-xs mt-2">Be the first to join the community!</p>
                  </div>
                )
              ) : (
                <div className="space-y-2">
                  {filteredContributors.map((contributor, index) => (
                    <motion.div
                      key={contributor.id}
                      variants={itemVariants}
                      className="group relative"
                      layout
                    >
                      <motion.a
                        href={contributor.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/30 block"
                        whileHover={{ x: 2, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {/* Avatar with Animation */}
                        <motion.div
                          className="relative flex-shrink-0"
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={contributor.avatarUrl}
                            alt={contributor.name}
                            className="h-10 w-10 rounded-full border-2 border-primary/20 group-hover:border-primary/50 transition-colors"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.name)}&background=6366f1&color=fff`;
                            }}
                          />
                          
                          {/* Online indicator for recent joiners */}
                          {new Date(contributor.joinedDate) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center"
                            >
                              <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                            </motion.div>
                          )}
                        </motion.div>

                        {/* Contributor Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate text-foreground">
                              {contributor.name}
                            </h4>
                            {contributor.badges && contributor.badges.includes("new-member") && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-1.5 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30"
                              >
                                NEW
                              </motion.span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            @{contributor.githubUsername}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {new Date(contributor.joinedDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-primary">
                              <Star className="h-3 w-3 fill-current" />
                              {contributor.contributions}
                            </div>
                          </div>
                        </div>

                        {/* External Link Icon */}
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </motion.div>
                      </motion.a>

                      {/* Quick badges preview */}
                      {contributor.badges && contributor.badges.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-1 mt-1 ml-13 flex-wrap"
                        >
                          {contributor.badges.slice(0, 2).map((badge) => (
                            <span
                              key={badge}
                              className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary/80 rounded-full"
                            >
                              {badge.replace('-', ' ').replace('hacktoberfest', 'hack')}
                            </span>
                          ))}
                          {contributor.badges.length > 2 && (
                            <span className="px-1.5 py-0.5 text-xs bg-muted/50 text-muted-foreground rounded-full">
                              +{contributor.badges.length - 2}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30">
              <motion.a
                href="#community"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  document.querySelector("#community")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block w-full text-center py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Our Community
              </motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};