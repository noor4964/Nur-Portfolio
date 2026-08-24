import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PROFILE } from "../data/profile";

const NAV_ITEMS = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/* SVG displacement filter that powers the liquid-glass refraction.
   Rendered once; referenced by .glass-filter via filter: url(#lg-dist). */
function LiquidGlassFilter() {
  return (
    <svg className="lg-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="60"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const listRef = useRef(null);
  const linkRefs = useRef([]);
  const [thumb, setThumb] = useState({ x: 0, w: 0, ready: false });

  /* Work stays active on /projects/:slug detail pages too */
  const activeIndex = NAV_ITEMS.findIndex(
    (item) =>
      location.pathname === item.to ||
      location.pathname.startsWith(item.to + "/")
  );

  /* hide when scrolling down, reveal when scrolling up */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < 80) setHidden(false);
        else if (delta > 4) setHidden(true);
        else if (delta < -4) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* slide the glass thumb under the active link (switcher logic) */
  useEffect(() => {
    const measure = () => {
      const el = activeIndex >= 0 ? linkRefs.current[activeIndex] : null;
      if (!el || !listRef.current) {
        setThumb((t) => (t.ready ? { ...t, ready: false } : t));
        return;
      }
      setThumb({ x: el.offsetLeft, w: el.offsetWidth, ready: true });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activeIndex]);

  return (
    <header className={`site-header${hidden ? " nav-hidden" : ""}`}>
      <LiquidGlassFilter />
      <nav className="nav-shell glass-container" aria-label="Primary">
        <div className="glass-filter" aria-hidden="true" />
        <div className="glass-overlay" aria-hidden="true" />
        <div className="glass-specular" aria-hidden="true" />
        <div className="glass-content">
          <Link to="/" className="nav-brand">
            {PROFILE.brand}
          </Link>

          <div className="nav-links" ref={listRef}>
            <span
              className={`nav-thumb${thumb.ready ? " ready" : ""}`}
              style={{ transform: `translateX(${thumb.x}px)`, width: `${thumb.w}px` }}
              aria-hidden="true"
            >
              {activeIndex >= 0 && (
                <span key={activeIndex} className="nav-thumb-inner" />
              )}
            </span>
            {NAV_ITEMS.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                ref={(el) => (linkRefs.current[i] = el)}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className="nav-cta">
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
