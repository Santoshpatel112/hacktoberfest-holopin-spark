import { useState, useEffect } from 'react';
import { contributors as initialContributors, type Contributor } from '@/data/contributors';

export const useContributors = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  // Load contributors from localStorage on mount, merge with initial data
  useEffect(() => {
    const savedContributors = localStorage.getItem('communityContributors');
    if (savedContributors) {
      try {
        const parsed = JSON.parse(savedContributors);
        // Merge saved contributors with initial contributors (avoid duplicates)
        const merged = [...parsed];
        initialContributors.forEach(initial => {
          if (!parsed.find((p: Contributor) => p.githubUsername === initial.githubUsername)) {
            merged.push(initial);
          }
        });
        setContributors(merged);
      } catch (error) {
        console.error('Failed to parse saved contributors:', error);
        setContributors(initialContributors);
      }
    } else {
      // No saved data, use initial contributors
      setContributors(initialContributors);
    }
  }, []);

  // Save contributors to localStorage whenever they change
  useEffect(() => {
    if (contributors.length > 0) {
      localStorage.setItem('communityContributors', JSON.stringify(contributors));
      console.log('Contributors saved to localStorage:', contributors.length);
    }
  }, [contributors]);

  const addContributor = (newContributor: Omit<Contributor, 'id'>) => {
    let resultContributor: Contributor;
    let isNewContributor = false;

    setContributors(prev => {
      // Check if contributor already exists
      const existingIndex = prev.findIndex(c => c.githubUsername === newContributor.githubUsername);
      
      if (existingIndex !== -1) {
        // Update existing contributor with latest data
        const updated = [...prev];
        resultContributor = { ...updated[existingIndex], ...newContributor };
        updated[existingIndex] = resultContributor;
        return updated;
      } else {
        // Add new contributor at the beginning (most recent first)
        resultContributor = {
          ...newContributor,
          id: Date.now().toString(),
        };
        isNewContributor = true;
        return [resultContributor, ...prev];
      }
    });

    // Force localStorage update
    setTimeout(() => {
      const current = JSON.parse(localStorage.getItem('communityContributors') || '[]');
      const existingIndex = current.findIndex((c: Contributor) => c.githubUsername === newContributor.githubUsername);
      
      if (existingIndex !== -1) {
        current[existingIndex] = resultContributor!;
      } else {
        current.unshift(resultContributor!);
      }
      
      localStorage.setItem('communityContributors', JSON.stringify(current));
    }, 100);

    return { contributor: resultContributor!, isNew: isNewContributor };
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

  const clearAllContributors = () => {
    localStorage.removeItem('communityContributors');
    setContributors(initialContributors);
  };

  const debugContributors = () => {
    console.log('Current contributors:', contributors);
    console.log('LocalStorage data:', localStorage.getItem('communityContributors'));
  };

  return {
    contributors,
    addContributor,
    updateContributor,
    removeContributor,
    getContributorByUsername,
    getTotalContributions,
    getTopContributors,
    clearAllContributors,
    debugContributors,
  };
};