import { Link } from "react-router-dom";

export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="project-card"
      aria-label={`Open case study: ${project.title}`}
    >
      {/* image placeholder — drop project.image into the data file to show a real shot */}
      <div className="pc-media">
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" />
        ) : (
          <span className="pc-index">{num}</span>
        )}
      </div>

      <div className="pc-caption">
        <div className="pc-caption-row">
          <h3 className="pc-title">{project.title}</h3>
          <span className="pc-year">{project.year}</span>
        </div>
        <div className="pc-role">
          {project.role}
          {project.category ? ` — ${project.category}` : ""}
        </div>
        <p className="pc-summary">{project.summary}</p>
      </div>
    </Link>
  );
}
