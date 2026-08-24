import { Link, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import { PROFILE } from "../data/profile";
import {
  PROJECTS,
  getProjectBySlug,
  getAdjacentProjects,
} from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  /* hooks must run unconditionally — build meta from whatever we have */
  const title = project
    ? `${project.title} — Case Study — ${PROFILE.name}`
    : `Project not found — ${PROFILE.name}`;
  const description = project
    ? `${project.summary} A case study by ${PROFILE.name}.`
    : "This project could not be found.";
  usePageMeta(title, description);

  if (!project) return <NotFoundInline />;

  const { prev, next } = getAdjacentProjects(project.slug);
  const index = PROJECTS.findIndex((p) => p.slug === project.slug);

  /* case-study sections — only render what has content */
  const sections = [
    { label: "Overview", body: [project.summary] },
    { label: "The challenge", body: [project.problem] },
    { label: "Context", body: [project.context] },
    { label: "My approach", body: [project.approach] },
  ].filter((s) => s.body.every(Boolean));

  const tailSections = [
    { label: "The outcome", body: project.outcome },
    { label: "What I learned", body: project.learnings },
  ].filter((s) => s.body);

  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <div className="page">
      {/* ── hero ── */}
      <header className="case-hero">
        <div className="container">
          <Link to="/projects" className="backlink">
            ← All projects
          </Link>
          <div className="case-kicker">
            {project.category} · Case study {String(index + 1).padStart(2, "0")}
          </div>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-tagline">{project.tagline}</p>

          <div className="case-meta-row">
            <div>
              Year
              <strong>{project.year}</strong>
            </div>
            {project.status && (
              <div>
                Status
                <strong>{project.status}</strong>
              </div>
            )}
            {project.role && (
              <div>
                Role
                <strong>{project.role}</strong>
              </div>
            )}
            <div>
              Stack
              <strong>{(project.stack || []).slice(0, 3).join(" · ")}</strong>
            </div>
          </div>

          {(project.links?.repo || project.links?.demo) && (
            <div className="case-ctas">
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noreferrer" className="btn btn-primary">
                  View code
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  Live demo →
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── narrative ── */}
      {sections.map((s) => (
        <section className="case-section" key={s.label}>
          <div className="container">
            <h2 className="case-h2">
              <span className="case-num">{num()}</span> {s.label}
            </h2>
            <div className="case-body">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {project.features?.length > 0 && (
        <section className="case-section">
          <div className="container">
            <h2 className="case-h2">
              <span className="case-num">{num()}</span> What was built
            </h2>
            <ul className="feature-list">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.metrics?.length > 0 && (
        <section className="case-section">
          <div className="container">
            <h2 className="case-h2">
              <span className="case-num">{num()}</span> At a glance
            </h2>
            <div className="metric-grid">
              {project.metrics.map((m) => (
                <Reveal key={m.label} className="stat-card">
                  <div className="stat-num">{m.value}</div>
                  <div className="stat-label">{m.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {tailSections.map((s) => (
        <section className="case-section" key={s.label}>
          <div className="container">
            <h2 className="case-h2">
              <span className="case-num">{num()}</span> {s.label}
            </h2>
            <div className="case-body">
              <p>{s.body}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="case-section">
        <div className="container">
          <h2 className="case-h2">
            <span className="case-num">{num()}</span> Technologies
          </h2>
          <div className="stack-cloud">
            {(project.stack || []).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── next project ── */}
      <nav className="case-nav" aria-label="More projects">
        {next ? (
          <Link to={`/projects/${next.slug}`}>
            <div className="dir">Next case study →</div>
            <div className="name">{next.title}</div>
          </Link>
        ) : prev ? (
          <Link to={`/projects/${prev.slug}`}>
            <div className="dir">← Previous case study</div>
            <div className="name">{prev.title}</div>
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
        <Link to="/projects" className="next">
          <div className="dir">Index</div>
          <div className="name">All projects</div>
        </Link>
      </nav>
    </div>
  );
}

function NotFoundInline() {
  return (
    <div className="page notfound">
      <div className="code" aria-hidden="true">
        ?
      </div>
      <p>That project doesn't exist (yet).</p>
      <Link to="/projects" className="btn btn-primary">
        Browse all projects
      </Link>
    </div>
  );
}
