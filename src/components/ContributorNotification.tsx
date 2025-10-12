import { motion, AnimatePresence } from "framer-motion";
import { Users, X } from "lucide-react";
import { useState, useEffect } from "react";
import { type Contributor } from "@/data/contributors";

interface ContributorNotificationProps {
  contributor: Contributor | null;
  isVisible: boolean;
  onClose: () => void;
}

export const ContributorNotification = ({ contributor, isVisible, onClose }: ContributorNotificationProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && contributor && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          className="fixed top-24 right-4 z-50 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-xl p-4 max-w-sm"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
              <Users className="h-4 w-4 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={contributor.avatarUrl}
                  alt={contributor.name}
                  className="h-6 w-6 rounded-full border border-primary/20"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.name)}&background=6366f1&color=fff`;
                  }}
                />
                <h4 className="font-medium text-sm truncate">{contributor.name}</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                @{contributor.githubUsername} joined the community!
              </p>
              <div className="flex gap-1 mt-2">
                {contributor.badges?.slice(0, 2).map((badge) => (
                  <span
                    key={badge}
                    className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                  >
                    {badge.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};