export interface Skill {
  name: string;
  percentage: number;
}

export const SKILLS: Skill[] = [
  { name: 'Angular',         percentage: 95 },
  { name: 'TypeScript',      percentage: 95 },
  { name: 'HTML / CSS / SASS', percentage: 90 },
  { name: 'JavaScript',      percentage: 90 },
  { name: 'NgRx',            percentage: 80 },
  { name: 'React',           percentage: 75 },
  { name: 'Node.js / Express', percentage: 75 },
  { name: 'Docker / CI/CD',  percentage: 70 },
  { name: 'MongoDB / MySQL', percentage: 65 },
];
