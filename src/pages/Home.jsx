import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import SectionHead from "../components/SectionHead";
import usePageMeta from "../hooks/usePageMeta";
import { PROFILE, STATS } from "../data/profile";
import { PROJECTS } from "../data/projects";

const SELECTED_COUNT = 4;

export default function Home() {
  usePageMeta(
    `${PROFILE.name} — Full-Stack Developer & AI/ML Researcher`,
    `${PROFILE.name}: full-stack developer and AI/ML researcher in Dhaka. Deep learning research, computer vision, and production-grade web platforms.`
  );

  const selected = PROJECTS.slice(0, SELECTED_COUNT);

  return (
    <div className="page">
      {/* ── hero ── */}
      <section className="hero">
        <div className="container">
          <p className="hero-kicker">
            <span className="dot" aria-hidden="true" />
            {PROFILE.name} — {PROFILE.location} · {PROFILE.availability}
          </p>

          <h1>
            I build intelligent software with clarity, rigor, and restraint.
          </h1>

          <div className="hero-foot">
            <p className="hero-philosophy">
              Good products don't shout. They solve a real problem, behave
              predictably, and stay out of the way.
            </p>
            <div className="hero-side">
              <p>
                Full-stack developer and AI/ML researcher at {PROFILE.affiliation}.
                From PyTorch training loops to NestJS production APIs — I take
                products the whole distance: research, architecture, delivery.
              </p>
              <div className="hero-ctas">
                <Link to="/projects" className="btn btn-primary">View my work</Link>
                <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── stats ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stat-grid">
            {STATS.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-num">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── case studies ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Selected work"
            title="Case studies"
            desc="A few projects that show how I think — the problem, the approach, and what shipped."
          />
          <div className="project-grid has-stagger">
            {selected.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
          <div className="more-row">
            <span style={{ color: "var(--muted)", fontSize: 14 }}>
              Showing {selected.length} of {PROJECTS.length} projects
            </span>
            <Link to="/projects" className="arrow-link">
              All projects <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── publications teaser ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Research"
            title="Published & peer-reviewed"
            desc="My engineering decisions are grounded in research — deep learning, computer vision, and assistive IoT."
          />
          <Link to="/research" className="arrow-link">
            Read the publications <span className="arr" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ── closing CTA ── */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">Contact</div>
          <h2 className="section-title" style={{ maxWidth: "18ch", marginBottom: 20 }}>
            Have a role or project in mind?
          </h2>
          <p className="section-desc" style={{ marginBottom: 36 }}>
            I'm actively looking for opportunities in full-stack development and
            applied AI. My inbox is always open.
          </p>
          <div className="hero-ctas" style={{ marginTop: 0 }}>
            <Link to="/contact" className="btn btn-primary">Get in touch</Link>
            <a href={`mailto:${PROFILE.email}`} className="btn-text">{PROFILE.email}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
