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
    description: 'A follow-up automation platform for independent professionals — track leads, set reminders, and close more deals without the weight of a full CRM. Built with Next.js.',
    image: 'img/leadthaw.png',
    link: 'https://www.leadthaw.com/',
    category: 'photos'
  },
  {
    title: 'MarketDash',
    description: 'A real-time market data dashboard with real-time price ticks and watchlist management. Built with Angular.',
    image: 'img/market-dash.png',
    link: 'https://market-dashboard-eight-sigma.vercel.app/',
    category: 'photos'
  },
];
