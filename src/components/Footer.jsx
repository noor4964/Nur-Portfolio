import { Link } from "react-router-dom";
import { PROFILE } from "../data/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="name">{PROFILE.name}</div>
            <p className="desc">
              {PROFILE.roles[0]} & {PROFILE.roles[1]} — building intelligent
              software end-to-end from {PROFILE.location}.
            </p>
            <span className="avail">
              <span className="dot" aria-hidden="true" />
              {PROFILE.availability}
            </span>
          </div>

          <div className="footer-col">
            <div className="col-label">Site</div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/projects">Work</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/research">Research</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="col-label">Elsewhere</div>
            <ul>
              <li><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href={PROFILE.researchgate} target="_blank" rel="noreferrer">ResearchGate</a></li>
              <li><a href={`mailto:${PROFILE.email}`}>Email</a></li>
              <li><a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">Résumé (PDF)</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
          <span>Designed & built with React.</span>
        </div>
      </div>
    </footer>
  );
}
