import { useState, useEffect } from 'react';
import { contributors as initialContributors, type Contributor } from '@/data/contributors';

export const useContributors = () => {
  const [contributors, setContributors] = useState<Contributor[]>(initialContributors);

  // Load contributors from localStorage on mount
  useEffect(() => {
    const savedContributors = localStorage.getItem('communityContributors');
    if (savedContributors) {
      try {
        const parsed = JSON.parse(savedContributors);
        setContributors(parsed);
      } catch (error) {
        console.error('Failed to parse saved contributors:', error);
      }
    }
  }, []);

  // Save contributors to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('communityContributors', JSON.stringify(contributors));
  }, [contributors]);

  const addContributor = (newContributor: Omit<Contributor, 'id'>) => {
    const contributor: Contributor = {
      ...newContributor,
      id: Date.now().toString(),
    };

    setContributors(prev => {
      // Check if contributor already exists
      const existingIndex = prev.findIndex(c => c.githubUsername === contributor.githubUsername);
      if (existingIndex !== -1) {
        // Update existing contributor with latest data
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], ...contributor, id: updated[existingIndex].id };
        return updated;
      }
      // Add new contributor at the beginning (most recent first)
      return [contributor, ...prev];
    });

    return contributor;
  };

  const updateContributor = (id: string, updates: Partial<Contributor>) => {
    setContributors(prev => 
      prev.map(contributor => 
        contributor.id === id 
          ? { ...contributor, ...updates }
          : contributor
      )
    );
  };

  const removeContributor = (id: string) => {
    setContributors(prev => prev.filter(contributor => contributor.id !== id));
  };

  const getContributorByUsername = (username: string) => {
    return contributors.find(c => c.githubUsername === username);
  };

  const getTotalContributions = () => {
    return contributors.reduce((total, contributor) => total + contributor.contributions, 0);
  };

  const getTopContributors = (limit: number = 5) => {
    return [...contributors]
      .sort((a, b) => b.contributions - a.contributions)
      .slice(0, limit);
  };

  return {
    contributors,
    addContributor,
    updateContributor,
    removeContributor,
    getContributorByUsername,
    getTotalContributions,
    getTopContributors,
  };
};