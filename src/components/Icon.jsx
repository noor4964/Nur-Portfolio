import {
  FiSun,
  FiMoon,
  FiArrowRight,
  FiArrowUpRight,
  FiArrowLeft,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDownload,
  FiCpu,
  FiCode,
  FiBookOpen,
  FiZap,
  FiExternalLink,
  FiCheck,
  FiMenu,
  FiX,
} from "react-icons/fi";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiCplusplus,
  SiR,
  SiDart,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiOpencv,
  SiHuggingface,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiNodedotjs,
  SiLaravel,
  SiGraphql,
  SiPostgresql,
  SiFirebase,
  SiMysql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiLinux,
  SiGooglecolab,
  SiRoboflow,
  SiKaggle,
  SiFigma,
  SiPostman,
} from "react-icons/si";

/* Central icon registry — reference icons by name in data files.
   Unknown names render nothing instead of crashing. */
const REGISTRY = {
  // generic
  sun: FiSun,
  moon: FiMoon,
  arrowRight: FiArrowRight,
  arrowUpRight: FiArrowUpRight,
  arrowLeft: FiArrowLeft,
  github: FiGithub,
  linkedin: FiLinkedin,
  mail: FiMail,
  phone: FiPhone,
  mapPin: FiMapPin,
  download: FiDownload,
  external: FiExternalLink,
  check: FiCheck,
  menu: FiMenu,
  close: FiX,
  brain: FiCpu,
  code: FiCode,
  research: FiBookOpen,
  rocket: FiZap,
  // tech brands (simple-icons)
  SiPython, SiTypescript, SiJavascript, SiPhp, SiCplusplus, SiR, SiDart,
  SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv, SiHuggingface,
  SiReact, SiNextdotjs, SiNestjs, SiNodedotjs, SiLaravel, SiGraphql,
  SiPostgresql, SiFirebase, SiMysql, SiMongodb,
  SiGit, SiDocker, SiLinux, SiGooglecolab, SiRoboflow, SiKaggle, SiFigma, SiPostman,
};

export default function Icon({ name, size = 16, ...rest }) {
  const Cmp = REGISTRY[name];
  if (!Cmp) return null;
  return <Cmp size={size} aria-hidden="true" {...rest} />;
}

/* Initials shown inside a skill chip when no brand icon exists */
export function iconInitial(name) {
  return (
    String(name || "")
      .replace(/[^A-Za-z0-9+ ]/g, "")
      .split(/[\s+/]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "•"
  );
}
