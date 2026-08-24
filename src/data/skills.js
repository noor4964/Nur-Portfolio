/* ─────────────────────────────────────────────
   SKILLS — grouped by category.
   `icon` maps to a react-icons/si export name (see
   src/components/Icon.jsx). Items without a matching
   brand icon show initials automatically.
   ───────────────────────────────────────────── */

export const SKILL_GROUPS = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "SiPython" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "PHP", icon: "SiPhp" },
      { name: "C/C++", icon: "SiCplusplus" },
      { name: "R", icon: "SiR" },
      { name: "Dart", icon: "SiDart" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "PyTorch", icon: "SiPytorch" },
      { name: "TensorFlow", icon: "SiTensorflow" },
      { name: "Scikit-learn", icon: "SiScikitlearn" },
      { name: "OpenCV", icon: "SiOpencv" },
      { name: "YOLOv8", icon: "" },
      { name: "HuggingFace", icon: "SiHuggingface" },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "React", icon: "SiReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "NestJS", icon: "SiNestjs" },
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Laravel", icon: "SiLaravel" },
      { name: "REST API", icon: "" },
      { name: "GraphQL", icon: "SiGraphql" },
      { name: "WebSockets", icon: "" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "Firebase", icon: "SiFirebase" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "ChromaDB", icon: "" },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git", icon: "SiGit" },
      { name: "Docker", icon: "SiDocker" },
      { name: "Linux", icon: "SiLinux" },
      { name: "Google Colab", icon: "SiGooglecolab" },
      { name: "Roboflow", icon: "SiRoboflow" },
      { name: "Kaggle", icon: "SiKaggle" },
      { name: "Figma", icon: "SiFigma" },
      { name: "Postman", icon: "SiPostman" },
    ],
  },
];

/* Short blurbs for the About page "what I do" cards */
export const WHAT_I_DO = [
  {
    icon: "brain",
    title: "AI / ML Engineering",
    desc: "Designing and training deep learning models — from dataset curation to benchmarked, reproducible pipelines.",
  },
  {
    icon: "code",
    title: "Full-Stack Development",
    desc: "Production-grade web platforms with React, NestJS and PostgreSQL — auth, APIs, real-time features included.",
  },
  {
    icon: "research",
    title: "Applied Research",
    desc: "Publishing peer-reviewed work in deep learning and IoT, with a focus on practical, deployable systems.",
  },
  {
    icon: "rocket",
    title: "Product Delivery",
    desc: "Co-founding Algo Tech IT taught me to ship client projects end-to-end: scoping, architecture and delivery.",
  },
];
