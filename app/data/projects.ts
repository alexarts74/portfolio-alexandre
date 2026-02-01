export interface Project {
  title: string;
  slug: string;
  image: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  year: string;
  technologies: string[];
  type: "web" | "mobile";
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    title: "RunMate",
    slug: "runmate",
    image: "/images/projects/runmate.jpg",
    images: [
      "/images/projects/runmate.jpg",
      "/images/projects/runmate-2.jpg",
    ],
    shortDescription: "Mobile app for running enthusiasts",
    fullDescription:
      "RunMate is a mobile application designed for runners to track their progress, set goals, and connect with other running enthusiasts. Built with React Native for cross-platform compatibility.",
    year: "2024",
    technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
    type: "mobile",
  },
  {
    title: "Callixte Portfolio",
    slug: "callixte",
    image: "/images/projects/callixte.jpg",
    images: [
      "/images/projects/callixte.jpg",
      "/images/projects/callixte-2.jpg",
      "/images/projects/callixte-3.jpg",
    ],
    shortDescription: "Artistic portfolio for a contemporary dancer",
    fullDescription:
      "A minimalist and elegant portfolio website designed for Callixte, a contemporary dancer and choreographer. Features smooth scroll animations, video backgrounds, bilingual support, and a refined aesthetic that reflects the artistry of dance.",
    year: "2025",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    type: "web",
    liveUrl: "https://callixte.com",
  },
  {
    title: "TripMate",
    slug: "tripmate",
    image: "/images/projects/tripmate.jpg",
    images: [
      "/images/projects/tripmate.jpg",
      "/images/projects/tripmate-2.jpg",
      "/images/projects/tripmate-3.jpg",
    ],
    shortDescription: "Travel companion app for planning adventures",
    fullDescription:
      "TripMate is a comprehensive travel planning application that helps users organize their trips, discover destinations, and share experiences. Features include itinerary planning, budget tracking, and collaborative trip planning with friends.",
    year: "2024",
    technologies: ["React Native", "TypeScript", "Firebase", "Google Maps API"],
    type: "mobile",
  },
  {
    title: "Evera",
    slug: "evera",
    image: "/images/projects/evera.jpg",
    images: [
      "/images/projects/evera.jpg",
      "/images/projects/evera-2.jpg",
    ],
    shortDescription: "Modern web platform with elegant design",
    fullDescription:
      "Evera is a comprehensive web development project featuring modern design principles, responsive layouts, and seamless user interactions. Built with attention to detail and performance optimization.",
    year: "2024",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    type: "web",
  },
  {
    title: "Bib Batteries",
    slug: "bibbatteries",
    image: "/images/projects/bibbatteries.jpg",
    images: [
      "/images/projects/bibbatteries.jpg",
      "/images/projects/bibbatteries-2.jpg",
    ],
    shortDescription: "Professional website for battery solutions",
    fullDescription:
      "A professional web platform for Bib Batteries, showcasing their products and services. Features include product catalogs, contact forms, and an intuitive navigation system designed to enhance user experience.",
    year: "2024",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    type: "web",
  },
  {
    title: "WorkAdventure",
    slug: "workadventure",
    image: "/images/projects/workadventure.jpg",
    images: [
      "/images/projects/workadventure.jpg",
      "/images/projects/workadventure-2.jpg",
    ],
    shortDescription: "Virtual workspace exploration platform",
    fullDescription:
      "WorkAdventure is a web-based virtual workspace that allows teams to interact in a 2D environment. Features include real-time communication, customizable spaces, and integration with popular collaboration tools.",
    year: "2023",
    technologies: ["TypeScript", "Phaser", "Node.js", "WebSocket"],
    type: "web",
  },
  {
    title: "The Surf Course",
    slug: "thesurfcourse",
    image: "/images/projects/thesurfcourse.jpg",
    images: [
      "/images/projects/thesurfcourse.jpg",
      "/images/projects/thesurfcourse-2.jpg",
    ],
    shortDescription: "E-learning platform for surf lessons",
    fullDescription:
      "The Surf Course is an e-learning platform dedicated to surf education. It offers video courses, progress tracking, and interactive lessons for surfers of all levels.",
    year: "2023",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    type: "web",
  },
  {
    title: "Tudo Bem Maman",
    slug: "tudobemmaman",
    image: "/images/projects/tudobemmaman.jpg",
    images: [
      "/images/projects/tudobemmaman.jpg",
      "/images/projects/tudobemmaman-2.jpg",
    ],
    shortDescription: "Community platform for mothers",
    fullDescription:
      "Tudo Bem Maman is a supportive community platform designed for mothers. It provides resources, community forums, and helpful tools for navigating motherhood.",
    year: "2023",
    technologies: ["React", "Ruby on Rails", "PostgreSQL", "AWS"],
    type: "web",
  },
];
