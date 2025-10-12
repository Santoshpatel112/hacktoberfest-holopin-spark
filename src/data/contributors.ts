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
    id: "1",
    name: "Santosh Patel",
    githubUsername: "Santoshpatel100",
    avatarUrl: "https://github.com/Santoshpatel100.png",
    profileUrl: "https://github.com/Santoshpatel100",
    contributions: 15,
    joinedDate: "2024-10-01",
    badges: ["hacktoberfest-2024", "first-contribution"]
  },
  {
    id: "2",
    name: "Alex Johnson",
    githubUsername: "alexjohnson",
    avatarUrl: "https://github.com/alexjohnson.png",
    profileUrl: "https://github.com/alexjohnson",
    contributions: 8,
    joinedDate: "2024-10-05",
    badges: ["hacktoberfest-2024"]
  },
  {
    id: "3",
    name: "Sarah Chen",
    githubUsername: "sarahchen",
    avatarUrl: "https://github.com/sarahchen.png",
    profileUrl: "https://github.com/sarahchen",
    contributions: 12,
    joinedDate: "2024-09-28",
    badges: ["hacktoberfest-2024", "mentor"]
  },
  {
    id: "4",
    name: "Mike Rodriguez",
    githubUsername: "mikerodriguez",
    avatarUrl: "https://github.com/mikerodriguez.png",
    profileUrl: "https://github.com/mikerodriguez",
    contributions: 6,
    joinedDate: "2024-10-08",
    badges: ["hacktoberfest-2024"]
  },
  {
    id: "5",
    name: "Emma Wilson",
    githubUsername: "emmawilson",
    avatarUrl: "https://github.com/emmawilson.png",
    profileUrl: "https://github.com/emmawilson",
    contributions: 20,
    joinedDate: "2024-09-25",
    badges: ["hacktoberfest-2024", "top-contributor", "mentor"]
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