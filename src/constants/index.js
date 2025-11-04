import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "AI Developer",
    icon: creator,
  },
  {
    title: "Full Stack Developer",
    icon: web,
  },
  {
    title: "Backend Engineer",
    icon: backend,
  },
  {
    title: "UI/UX Designer",
    icon: mobile,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "AI Developer",
    company_name: "Freelance",
    icon: meta,
    iconBg: "#383E56",
    date: "2023 - Present",
    points: [
      "Designing, training, and integrating AI models into production web apps.",
      "Building data pipelines, vector search, and intelligent features that delight users.",
      "Optimizing inference performance and cost with modern tooling and cloud services.",
      "Collaborating end-to-end — from ideation and UX to deployment and iteration.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Freelance",
    icon: reactjs,
    iconBg: "#E6DEDD",
    date: "2021 - Present",
    points: [
      "Developing scalable APIs with Node.js and secure, maintainable backends.",
      "Creating responsive React frontends with clean design systems and animations.",
      "Implementing CI/CD, testing, and observability for reliable delivery.",
      "Leading UX-focused development to ship fast while maintaining quality.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Iqra delivered a polished, AI-powered experience that exceeded our expectations.",
    name: "Sarah Khan",
    designation: "Product Lead",
    company: "FinTech Startup",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "End-to-end ownership, clear communication, and beautiful UX — would highly recommend.",
    name: "Ahmed Raza",
    designation: "Founder",
    company: "SaaS Co",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "From API design to front-end animations, the attention to detail was outstanding.",
    name: "Ayesha Ali",
    designation: "CTO",
    company: "HealthTech",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "AI Car Finder",
    description:
      "An AI-assisted platform to explore and compare cars with intelligent search, pricing insights, and a smooth booking flow.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "#",
  },
  {
    name: "AI Job Scout",
    description:
      "An intelligent job discovery app with semantic search, role matching, and location-aware recommendations.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "#",
  },
  {
    name: "Smart Trip Guide",
    description:
      "A travel companion that personalizes itineraries and bookings using AI-driven recommendations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "#",
  },
];

export { services, technologies, experiences, testimonials, projects };
