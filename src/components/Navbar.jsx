import { Link, NavLink } from "react-router-dom";
import { PROFILE } from "../data/profile";

const NAV_ITEMS = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Primary">
        <Link to="/" className="nav-brand">
          {PROFILE.brand}
        </Link>
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <a
          href={PROFILE.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="nav-cta"
          style={{ marginLeft: 28 }}
        >
          Résumé
        </a>
      </nav>
    </header>
  );
}
