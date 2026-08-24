import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import SectionHead from "../components/SectionHead";
import usePageMeta from "../hooks/usePageMeta";
import { PROFILE } from "../data/profile";
import { PROJECTS, getProjectCategories, getFeaturedProjects } from "../data/projects";

const ALL = "All";

/* Large editorial block for featured projects */
function FeaturedProject({ project, index }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="feature-card"
      aria-label={`Open case study: ${project.title}`}
    >
      <div className="feature-media">
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" />
        ) : (
          <span className="pc-index">{num}</span>
        )}
      </div>
      <div className="feature-body">
        <div className="feature-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
          {project.status && <span>{project.status}</span>}
        </div>
        <h3>{project.title}</h3>
        <p className="feature-tagline">{project.tagline}</p>
        <p className="feature-summary">{project.summary}</p>
        <div className="pc-stack">
          {(project.stack || []).slice(0, 6).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <span className="arrow-link">
          Read case study <span className="arr" aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function Projects() {
  usePageMeta(
    `Work — ${PROFILE.name}`,
    `Software and AI/ML projects by ${PROFILE.name}, filterable by category, each with a full case study.`
  );

  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");

  const categories = useMemo(() => getProjectCategories(), []);
  const isDefaultView = category === ALL && !query.trim() && sort === "recent";

  const featured = useMemo(() => getFeaturedProjects(), []);

  const visible = useMemo(() => {
    let list = PROJECTS;

    if (category !== ALL) list = list.filter((p) => p.category === category);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.title, p.tagline, p.summary, p.category, p.role, ...(p.stack || [])]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    return [...list].sort((a, b) => {
      if (sort === "name") return a.title.localeCompare(b.title);
      if (sort === "year-asc") return String(a.year).localeCompare(String(b.year));
      return String(b.year).localeCompare(String(a.year));
    });
  }, [category, query, sort]);

  /* default view: featured blocks + grid of the rest; filtered view: flat grid */
  const gridItems = isDefaultView
    ? visible.filter((p) => !p.featured)
    : visible;

  return (
    <div className="page">
      <section className="section" style={{ borderTop: "none" }}>
        <div className="container">
          <SectionHead
            eyebrow="Work"
            title="Projects & case studies"
            desc="Each project below opens into a case study — the problem, the approach, what was built and what I learned."
          />

          {isDefaultView && (
            <div className="feature-stack">
              {featured.map((p, i) => (
                <FeaturedProject key={p.slug} project={p} index={i} />
              ))}
            </div>
          )}

          {isDefaultView && gridItems.length > 0 && (
            <div className="grid-divider">
              <span>More projects</span>
            </div>
          )}

          {/* category filters */}
          <div className="chip-row" role="group" aria-label="Filter projects by category">
            {[{ name: ALL, count: PROJECTS.length }, ...categories].map((c) => (
              <button
                key={c.name}
                className={`filter-chip${category === c.name ? " active" : ""}`}
                onClick={() => setCategory(c.name)}
                aria-pressed={category === c.name}
              >
                {c.name}
                <span className="count">{c.count}</span>
              </button>
            ))}
          </div>

          {/* search + sort */}
          <div className="toolbar">
            <input
              type="search"
              className="search-input"
              placeholder="Search by name, tag or technology…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search projects"
            />
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort projects"
            >
              <option value="recent">Newest first</option>
              <option value="year-asc">Oldest first</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>

          {/* grid */}
          {gridItems.length > 0 ? (
            <div className="project-grid has-stagger">
              {gridItems.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          ) : (
            !isDefaultView && (
              <div className="empty-state">
                No projects match “{query}”. Try a different keyword or clear the filters.
              </div>
            )
          )}

          {/* GitHub CTA */}
          <div className="more-row">
            <span style={{ color: "var(--muted)", fontSize: 14 }}>
              More experiments live on GitHub
            </span>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="arrow-link">
              View full GitHub profile <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
