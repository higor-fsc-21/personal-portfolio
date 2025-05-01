import { v4 as uuidv4 } from "uuid";

// Mock user data
export const users = [
  {
    id: uuidv4(),
    email: "admin@example.com",
    password: "$2a$10$Km/mWHAY.mROhwuSYspzEuWrZOJgS.cQTm3mIJV4S1MngEYjzJvMa", // "password123"
    name: "Admin User",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock project data (based on your resume)
export const projects = [
  {
    id: uuidv4(),
    title: "Porto Seguro Claims Tracking System",
    description:
      "Developed micro-frontend architecture using React, React Query, and SCSS to enhance claims tracking journey for brokers. Optimized component performance, resulting in 20% faster load times. Improved apps response time through code optimization and React Query caching.",
    startDate: "2024-08-01",
    endDate: null,
    technologies: ["React", "React Query", "SCSS", "Micro-frontend"],
    imageUrl: "/images/project1.jpg",
    repoUrl: "https://github.com/higor21",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Safra Link Banking App",
    description:
      "Built cross-platform mobile banking application using React Native, Expo, and Zustand state management. Implemented CI/CD pipelines, improving deployment time. Integrated financial APIs and implemented secure authentication flows.",
    startDate: "2023-11-01",
    endDate: "2024-07-01",
    technologies: ["React Native", "Expo", "Zustand", "TypeScript"],
    imageUrl: "/images/project2.jpg",
    repoUrl: "https://github.com/higor21",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Caixa/CNP Portal",
    description:
      "Developed React.js portal serving as unified access point for multiple enterprise applications. Implemented responsive UI components with accessibility compliance. Reduced bundle size by 25% through code splitting and lazy loading.",
    startDate: "2022-11-01",
    endDate: "2023-10-01",
    technologies: ["React", "TypeScript", "Micro-frontend"],
    imageUrl: "/images/project3.jpg",
    repoUrl: "https://github.com/higor21",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock experience data (based on your resume)
export const experiences = [
  {
    id: uuidv4(),
    company: "OSF Digital",
    position: "Frontend React and RN Developer",
    startDate: "2021-07-01",
    endDate: null,
    description:
      "Developed and maintained web and mobile applications for clients like Creditas, Caixa Bank, and Porto Seguro. Implemented micro-frontend architecture using Next.js, reducing deployment times by 25%. Optimized React Native applications, improving performance by 30%. Collaborated with cross-functional teams using Agile methodologies and CI/CD pipelines.",
    technologies: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "Jest",
      "Redux Toolkit",
      "Zustand",
      "Styled-Components",
      "Sass",
      "Scrum/Kanban",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    company: "Sinergia",
    position: "Frontend RN Developer (Part-Time)",
    startDate: "2022-05-01",
    endDate: "2023-02-01",
    description:
      "Built a React Native application to connect players across gaming platforms, improving user engagement by 20%. Utilized TypeScript and Styled-Components for scalable and maintainable code.",
    technologies: ["React Native", "TypeScript", "Styled-Components", "Scrum"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    company: "Wipro",
    position: "Fullstack Developer",
    startDate: "2021-02-01",
    endDate: "2021-05-01",
    description:
      "Worked on the Direct Mobility System application for STTU, aiming to replace the legacy system. Developed features using Angular 8, C#, and SQL.",
    technologies: ["Angular 8", "SQL", "C#", "MSTest", "GitLab", "Scrum"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock education data (based on your resume)
export const education = [
  {
    id: uuidv4(),
    institution: "Federal University of Rio Grande do Norte (UFRN)",
    degree: "Bachelor",
    field: "Computer Engineering",
    startDate: "2018-01-01",
    endDate: "2022-12-01",
    description:
      "Graduate in progress from Computer and Automation Engineering Department linked to UFRN.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    institution: "Federal University of Rio Grande do Norte (UFRN)",
    degree: "Bachelor",
    field: "Sciences and Technology",
    startDate: "2015-01-01",
    endDate: "2018-12-01",
    description:
      "Graduated from Sciences and Technology School linked to UFRN with emphasis in Computer Engineering.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    institution: "Metrópole Digital Institute (IMD)",
    degree: "Technical",
    field: "Industrial Automation",
    startDate: "2015-01-01",
    endDate: "2016-12-01",
    description:
      "Graduated from Metrópole Digital Institute (IMD) linked to UFRN.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock skills data (based on your resume)
export const skills = [
  {
    id: uuidv4(),
    name: "React",
    category: "Frontend",
    level: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "React Native",
    category: "Mobile",
    level: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Next.js",
    category: "Frontend",
    level: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "TypeScript",
    category: "Language",
    level: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Redux Toolkit",
    category: "State Management",
    level: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Zustand",
    category: "State Management",
    level: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Styled Components",
    category: "Styling",
    level: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "SASS/SCSS",
    category: "Styling",
    level: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock certificates data (based on your resume)
export const certificates = [
  {
    id: uuidv4(),
    title: "Microfrontends with React: A Complete Developer's Guide",
    issuer: "Udemy",
    issueDate: "2024-01-01",
    expiryDate: null,
    credentialUrl:
      "https://www.udemy.com/certificate/UC-a0e4c574-1bba-4f79-9ad1-fe4bc25d76e6/",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "GitLab CI: Pipelines, Continuous Delivery e Deployment",
    issuer: "Udemy",
    issueDate: "2023-01-01",
    expiryDate: null,
    credentialUrl:
      "https://www.udemy.com/certificate/UC-8cea6a6c-8775-478b-9bf6-31c766fa77cb/",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "GraphQL by Example",
    issuer: "Udemy",
    issueDate: "2022-01-01",
    expiryDate: null,
    credentialUrl: "https://ude.my/UC-fe077336-3574-4c2b-97ce-d3f40060e60d",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
