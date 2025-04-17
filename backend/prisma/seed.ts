import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.certificate.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.education.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.project.deleteMany();

    console.log("Cleared existing data");

    // Seed Skills
    const skills = [
      // Frontend
      { name: "React", category: "Frontend", level: 5 },
      { name: "React Native", category: "Frontend", level: 5 },
      { name: "Next.js", category: "Frontend", level: 5 },
      { name: "TypeScript", category: "Frontend", level: 5 },
      { name: "JavaScript", category: "Frontend", level: 5 },
      { name: "Redux", category: "Frontend", level: 4 },
      { name: "Zustand", category: "Frontend", level: 4 },
      { name: "Context API", category: "Frontend", level: 4 },
      // Testing
      { name: "Jest", category: "Testing", level: 4 },
      { name: "Testing Library", category: "Testing", level: 4 },
      // Styling
      { name: "Styled-Components", category: "Styling", level: 5 },
      { name: "Sass", category: "Styling", level: 4 },
      // Tools
      { name: "Git", category: "Tools", level: 4 },
      { name: "Webpack", category: "Tools", level: 3 },
      { name: "Babel", category: "Tools", level: 3 },
      { name: "Docker", category: "Tools", level: 3 },
      // Methodologies
      { name: "Agile", category: "Methodologies", level: 4 },
      { name: "Scrum", category: "Methodologies", level: 4 },
      { name: "Kanban", category: "Methodologies", level: 4 },
      { name: "CI/CD", category: "Methodologies", level: 4 },
      // Other
      { name: "REST API", category: "Other", level: 4 },
      { name: "GraphQL", category: "Other", level: 4 },
      { name: "Micro-Frontend", category: "Other", level: 4 },
      { name: "UI/UX Design", category: "Other", level: 4 },
      { name: "Responsive Design", category: "Other", level: 5 },
      { name: "Accessibility (a11y)", category: "Other", level: 4 },
      { name: "SEO", category: "Other", level: 3 },
    ];

    for (const skill of skills) {
      await prisma.skill.create({ data: skill });
    }
    console.log("Skills seeded");

    // Seed Education
    const educations = [
      {
        institution: "Metrópole Digital Institute (IMD) - UFRN",
        degree: "Technician",
        field: "Industrial Automation",
        startDate: new Date("2015-01-01"),
        endDate: new Date("2016-12-31"),
        description:
          "Graduated from Metrópole Digital Institute (IMD) linked to UFRN.",
      },
      {
        institution: "Sciences and Technology School - UFRN",
        degree: "Bachelor",
        field: "Sciences and Technology",
        startDate: new Date("2015-01-01"),
        endDate: new Date("2018-12-31"),
        description:
          "Graduated from Sciences and Technology School linked to UFRN with emphasis in Computer Engineering.",
      },
      {
        institution: "Computer and Automation Engineering Department - UFRN",
        degree: "Bachelor",
        field: "Computer Engineering",
        startDate: new Date("2018-01-01"),
        endDate: new Date("2022-12-31"),
        description:
          "Graduate in progress from Computer and Automation Engineering Department linked to UFRN.",
      },
    ];

    for (const education of educations) {
      await prisma.education.create({ data: education });
    }
    console.log("Education seeded");

    // Seed Experience
    const experiences = [
      {
        company: "OSF Digital",
        position: "Frontend React and RN Developer",
        startDate: new Date("2021-07-01"),
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
          "Scrum",
          "Kanban",
        ],
      },
      {
        company: "Sinergia",
        position: "Frontend RN Developer (Part-Time)",
        startDate: new Date("2022-05-01"),
        endDate: new Date("2023-02-28"),
        description:
          "Built a React Native application to connect players across gaming platforms, improving user engagement by 20%. Utilized TypeScript and Styled-Components for scalable and maintainable code.",
        technologies: [
          "React Native",
          "TypeScript",
          "Styled-Components",
          "Scrum",
        ],
      },
      {
        company: "Wipro",
        position: "Fullstack Developer",
        startDate: new Date("2021-02-01"),
        endDate: new Date("2021-05-31"),
        description:
          "Worked on the Direct Mobility System application for STTU, aiming to replace the legacy system. Developed features using Angular 8, C#, and SQL.",
        technologies: ["Angular 8", "SQL", "C#", "MSTest", "GitLab", "Scrum"],
      },
      {
        company: "Connecta",
        position: "Frontend React and RN Developer",
        startDate: new Date("2020-02-01"),
        endDate: new Date("2021-02-28"),
        description:
          'Developed web/mobile applications like "Connecta Saúde" and "Quero Trabalhar". Integrated libraries like React-pdf, Axios, Chart.js, and Leaflet.',
        technologies: [
          "React",
          "React Native",
          "Redux",
          "Saga",
          "Styled-Components",
        ],
      },
      {
        company: "TRT-21/RN",
        position: "Fullstack Developer Intern (Part-Time)",
        startDate: new Date("2018-08-01"),
        endDate: new Date("2020-02-29"),
        description:
          "Developed internal applications for TRT-21 employees. Assisted in preparing project documentation and manuals.",
        technologies: ["AngularJS", "Angular 5/7", "NodeJS", "Java"],
      },
      {
        company: "Multiprova - ECT/UFRN",
        position: "Fullstack React/Node Developer",
        startDate: new Date("2019-06-01"),
        endDate: new Date("2019-11-30"),
        description:
          "Developed the Multiprova/UFRN application to facilitate exams and exercises for tutors, professors, and students.",
        technologies: ["ReactJS", "NodeJS", "MongoDB", "Docker", "Scrum"],
      },
      {
        company: "ECT/UFRN",
        position: "Logic/Language of Programming Monitor",
        startDate: new Date("2018-05-01"),
        endDate: new Date("2019-12-31"),
        description:
          "Assisted students in algorithm development and programming concepts.",
        technologies: ["JavaScript", "C++"],
      },
    ];

    for (const experience of experiences) {
      await prisma.experience.create({ data: experience });
    }
    console.log("Experience seeded");

    // Seed Projects
    const projects = [
      {
        title: "Porto Seguro Claims Tracking System",
        description:
          "Developed micro-frontend architecture using React, React Query, and SCSS to enhance claims tracking journey for brokers. Optimized component performance, resulting in 20% faster load times. Improved apps response time through code optimization and React Query caching.",
        startDate: new Date("2024-08-01"),
        endDate: null,
        technologies: ["React", "React Query", "SCSS", "Micro-Frontend"],
        images: [
          {
            url: "https://via.placeholder.com/800x600?text=Porto+Seguro+Claims",
            alt: "Porto Seguro Claims Tracking System",
          },
        ],
        githubUrl: "https://github.com/higor21/portfolio",
      },
      {
        title: "Safra Link Banking App",
        description:
          "Built cross-platform mobile banking application using React Native, Expo, and Zustand state management. Implemented CI/CD pipelines, improving deployment time. Integrated financial APIs and implemented secure authentication flows.",
        startDate: new Date("2023-11-01"),
        endDate: new Date("2024-07-31"),
        technologies: ["React Native", "Expo", "Zustand", "CI/CD"],
        images: [
          {
            url: "https://via.placeholder.com/800x600?text=Safra+Link+Banking",
            alt: "Safra Link Banking App",
          },
        ],
        githubUrl: "https://github.com/higor21/portfolio",
      },
      {
        title: "Caixa/CNP Portal",
        description:
          "Developed React.js portal serving as unified access point for multiple enterprise applications. Implemented responsive UI components with accessibility compliance. Reduced bundle size by 25% through code splitting and lazy loading.",
        startDate: new Date("2022-11-01"),
        endDate: new Date("2023-10-31"),
        technologies: [
          "React",
          "TypeScript",
          "Accessibility",
          "Code Splitting",
        ],
        images: [
          {
            url: "https://via.placeholder.com/800x600?text=Caixa+CNP+Portal",
            alt: "Caixa/CNP Portal",
          },
        ],
        githubUrl: "https://github.com/higor21/portfolio",
      },
      {
        title: "Saúde Melhor Telemedicine Platform",
        description:
          "Created healthcare dashboard with video consultation and e-prescription features using React and TypeScript. Integrated WebRTC for real-time video communication between doctors and patients. Developed data visualization components using Chart.js for patient metrics.",
        startDate: new Date("2020-05-01"),
        endDate: new Date("2021-07-31"),
        technologies: ["React", "TypeScript", "WebRTC", "Chart.js"],
        images: [
          {
            url: "https://via.placeholder.com/800x600?text=Saúde+Melhor",
            alt: "Saúde Melhor Telemedicine Platform",
          },
        ],
        githubUrl: "https://github.com/higor21/portfolio",
      },
      {
        title: "Creditas Payment Flow",
        description:
          "Implemented payment journey in React Native app using clean architecture principles. Wrote comprehensive unit tests with Jest and React Native Testing Library (90% coverage). Conducted code reviews and mentored junior developers in best practices. Improved the clients payment journey increasing the CSAT by 23%.",
        startDate: new Date("2021-08-01"),
        endDate: new Date("2022-10-31"),
        technologies: [
          "React Native",
          "Jest",
          "Testing Library",
          "Clean Architecture",
        ],
        images: [
          {
            url: "https://via.placeholder.com/800x600?text=Creditas+Payment",
            alt: "Creditas Payment Flow",
          },
        ],
        githubUrl: "https://github.com/higor21/portfolio",
      },
      {
        title: "GoGame Gaming Platform",
        description:
          "Built matchmaking system connecting players across platforms using React Native and Firebase. Implemented real-time chat functionality and tournament management features. Followed Scrum methodology with bi-weekly sprints.",
        startDate: new Date("2022-05-01"),
        endDate: new Date("2023-02-28"),
        technologies: ["React Native", "Firebase", "Real-time Chat", "Scrum"],
        images: [
          {
            url: "https://via.placeholder.com/800x600?text=GoGame+Platform",
            alt: "GoGame Gaming Platform",
          },
        ],
        githubUrl: "https://github.com/higor21/portfolio",
      },
    ];

    for (const project of projects) {
      await prisma.project.create({ data: project });
    }
    console.log("Projects seeded");

    // Seed Certificates
    const certificates = [
      {
        title: "Microfrontends with React: A Complete Developer's Guide",
        issuer: "Udemy",
        issueDate: new Date("2024-01-01"),
        credentialUrl:
          "https://www.udemy.com/certificate/UC-a0e4c574-1bba-4f79-9ad1-fe4bc25d76e6/",
      },
      {
        title: "GitLab CI: Pipelines, Continuous Delivery e Deployment",
        issuer: "Udemy",
        issueDate: new Date("2023-01-01"),
        credentialUrl:
          "https://www.udemy.com/certificate/UC-8cea6a6c-8775-478b-9bf6-31c766fa77cb/",
      },
      {
        title: "Soft Skills: The 11 Essential Career Soft Skills",
        issuer: "Udemy",
        issueDate: new Date("2023-01-01"),
      },
      {
        title: "GraphQL by Example",
        issuer: "Udemy",
        issueDate: new Date("2022-01-01"),
        credentialUrl: "https://ude.my/UC-fe077336-3574-4c2b-97ce-d3f40060e60d",
      },
      {
        title: "Testing React with Jest and Testing Library",
        issuer: "Udemy",
        issueDate: new Date("2022-01-01"),
        credentialUrl:
          "https://www.udemy.com/certificate/UC-1a0ac6b1-19ad-4d20-a731-9ca199685d21/",
      },
      {
        title: "11ª OmniStack Week",
        issuer: "Rocketseat",
        issueDate: new Date("2020-01-01"),
        credentialUrl: "shorturl.at/blnr9",
      },
      {
        title: "The Web Developer Bootcamp",
        issuer: "Udemy",
        issueDate: new Date("2019-01-01"),
        credentialUrl: "https://www.udemy.com/certificate/UC-JMNS7GHW/",
      },
      {
        title: "Building Web Applications with the New Angular (4, 5 e 6)",
        issuer: "Udemy",
        issueDate: new Date("2019-01-01"),
        credentialUrl: "https://www.udemy.com/certificate/UC-XGSYIHMN/",
      },
    ];

    for (const certificate of certificates) {
      await prisma.certificate.create({ data: certificate });
    }
    console.log("Certificates seeded");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
