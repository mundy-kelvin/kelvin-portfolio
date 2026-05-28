export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    title: 'LeadThaw',
    description: 'A follow-up automation platform for independent professionals — track leads, set reminders, and close more deals without the weight of a full CRM.',
    image: 'img/leadthaw.png',
    link: 'https://www.leadthaw.com/',
    category: 'photos'
  }
];
