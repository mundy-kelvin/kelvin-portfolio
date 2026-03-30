export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets?: string[];
}

export const EDUCATION: EducationItem[] = [
  {
    degree: 'BS. Information Technology',
    institution: 'Strayer University',
    period: '2018 – 2019',
    description: 'Specializing in Programming Technology and Web Design.'
  },
  {
    degree: 'Certificate – Full Stack Development',
    institution: 'Georgia Institute of Technology',
    period: '2018 – 2019',
    description: 'Developing full stack applications with modern web technologies.'
  },
  {
    degree: 'AAS. Computer Programming & Support',
    institution: 'West Georgia Technical College',
    period: '2014 – 2017',
    description: 'Foundations in computer programming, support, and systems.'
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Senior Frontend Engineer',
    company: 'Backbase USA — Atlanta, GA',
    period: '04/2021 – Present',
    description: 'Architected enterprise financial applications using Angular and TypeScript.',
    bullets: [
      'Led client implementations through full production launch cycles.',
      'Integrated third-party financial systems: Payveris, Yodlee Fastlink, and Zelle.',
      'Directed Angular modernization initiatives for legacy systems.',
      'Mentored junior engineers and conducted code reviews.'
    ]
  },
  {
    title: 'Software Engineering Consultant',
    company: 'EY — Atlanta, GA',
    period: '02/2019 – 11/2020',
    description: 'Developed scalable MEAN stack applications for internal workflow automation.',
    bullets: [
      'Contributed to .NET microservices architecture.',
      'Implemented role-based access control systems.',
      'Served as interim team lead during organizational transitions.'
    ]
  }
];
