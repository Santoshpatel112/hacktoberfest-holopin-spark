export interface Contributor {
  id: string;
  name: string;
  githubUsername: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
  joinedDate: string;
  badges?: string[];
}

export const contributors: Contributor[] = [
  {
    id: "initial-1",
    name: "Santosh Patel",
    githubUsername: "Santoshpatel100",
    avatarUrl: "https://github.com/Santoshpatel100.png",
    profileUrl: "https://github.com/Santoshpatel100",
    contributions: 15,
    joinedDate: "2024-10-01",
    badges: ["hacktoberfest-2024", "first-contribution"]
  },
  {
    id: "initial-2",
    name: "Alex Johnson",
    githubUsername: "alexjohnson",
    avatarUrl: "https://github.com/alexjohnson.png",
    profileUrl: "https://github.com/alexjohnson",
    contributions: 8,
    joinedDate: "2024-10-05",
    badges: ["hacktoberfest-2024"]
  },
  {
    id: "initial-3",
    name: "Sarah Chen",
    githubUsername: "sarahchen",
    avatarUrl: "https://github.com/sarahchen.png",
    profileUrl: "https://github.com/sarahchen",
    contributions: 12,
    joinedDate: "2024-09-28",
    badges: ["hacktoberfest-2024", "mentor"]
  }
];

// Function to add new contributor
export const addContributor = (contributor: Omit<Contributor, 'id'>) => {
  const newContributor: Contributor = {
    ...contributor,
    id: Date.now().toString()
  };
  contributors.push(newContributor);
  return newContributor;
};