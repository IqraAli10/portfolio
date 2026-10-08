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
    title: "Frontend",
    icon: web,
  },
  {
    title: "UI Design",
    icon: mobile,
  },
  {
    title: "Interaction",
    icon: figma,
  },
  {
    title: "Creative Development",
    icon: threejs,
  },
  {
    title: "Applied AI",
    icon: creator,
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
    iconBg: "#29231F",
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
    iconBg: "#D8C9BA",
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
    name: "Nova",
    description:
      "A modern digital experience designed to make exploring Nova’s products and services feel clear, engaging, and effortless.",
    tags: [
      {
        name: "product design",
        color: "blue-text-gradient",
      },
      {
        name: "web design",
        color: "green-text-gradient",
      },
      {
        name: "responsive",
        color: "pink-text-gradient",
      },
    ],
    image: "/nova.png",
    source_code_link: "https://rotating-turnip-092303.framer.app/",
  },
  {
    name: "Signalist",
    description:
      "A finance and market insights interface that brings watchlists, price movements, and company updates together in one place.",
    tags: [
      {
        name: "fintech",
        color: "blue-text-gradient",
      },
      {
        name: "dashboard",
        color: "green-text-gradient",
      },
      {
        name: "data visualization",
        color: "pink-text-gradient",
      },
    ],
    image: "/signalist.png",
    source_code_link: "https://signalist-osddzsh3w-iqra-alis-projects.vercel.app/",
  },
  {
    name: "MacBook",
    description:
      "A clean product showcase for MacBook, highlighting its hardware, features, and details through a polished shopping experience.",
    tags: [
      {
        name: "e-commerce",
        color: "blue-text-gradient",
      },
      {
        name: "product page",
        color: "green-text-gradient",
      },
      {
        name: "responsive",
        color: "pink-text-gradient",
      },
    ],
    image: "/macbook.png",
    source_code_link: "https://macbook-smoky.vercel.app/",
  },
];

export { services, technologies, experiences, testimonials, projects };
