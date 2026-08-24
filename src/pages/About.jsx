import Icon, { iconInitial } from "../components/Icon";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import usePageMeta from "../hooks/usePageMeta";
import { PROFILE, STATS, EDUCATION, EXPERIENCE } from "../data/profile";
import { SKILL_GROUPS, WHAT_I_DO } from "../data/skills";

export default function About() {
  usePageMeta(
    `About — ${PROFILE.name}`,
    `Background, education and experience of ${PROFILE.name}: full-stack developer and AI/ML researcher based in ${PROFILE.location}.`
  );

  return (
    <div className="page">
      <section className="section" style={{ paddingBottom: 56 }}>
        <div className="container">
          <SectionHead
            eyebrow="About me"
            title="Building at the edge of intelligence"
            desc={`${PROFILE.roles[0]} · ${PROFILE.roles[1]} · ${PROFILE.affiliation}`}
          />
          <div className="about-grid">
            <div className="prose">
              <p>
                I'm a Computer Science student at{" "}
                <strong>American International University-Bangladesh (AIUB)</strong> with
                published research in deep learning and IoT. I design, implement and evaluate
                machine-learning pipelines end-to-end — from raw dataset curation to model
                benchmarking.
              </p>
              <p>
                As <strong>Co-founder &amp; CTO of Algo Tech IT</strong>, I lead technical
                architecture, project delivery and developer mentorship. Currently I'm completing
                a thesis on deepfake detection using a multi-branch vision architecture
                (EfficientNet + Vision Transformer).
              </p>
              <p>
                What drives me is the full arc of a product: the research that proves an idea,
                the engineering that makes it real, and the delivery that puts it in front of
                users.
              </p>
            </div>

            <div>
              <figure className="about-portrait">
                <img src={PROFILE.portrait} alt={`Portrait of ${PROFILE.name}`} loading="lazy" />
                <figcaption>{PROFILE.name} — {PROFILE.location}</figcaption>
              </figure>

              <div className="contact-note" style={{ marginTop: 20 }}>
                <strong style={{ display: "block", marginBottom: 6 }}>Currently</strong>
                Finishing my B.Sc. thesis on deepfake detection and open to full-time roles,
                internships and research collaborations. Reach me via{" "}
                <a href={`mailto:${PROFILE.email}`} className="info-value" style={{ fontSize: "inherit" }}>
                  email
                </a>{" "}
                or{" "}
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="info-value" style={{ fontSize: "inherit" }}>
                  LinkedIn
                </a>
                .
              </div>

              <div style={{ marginTop: 20 }}>
                <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  View résumé (PDF)
                </a>
              </div>
            </div>
          </div>

          <div className="stat-grid" style={{ marginTop: 48 }}>
            {STATS.map((s) => (
              <Reveal key={s.label} className="stat-card">
                <div className="stat-num">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── what I do ── */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Focus areas" title="What I do" />
          <div className="do-grid">
            {WHAT_I_DO.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06} className="do-card">
                <span className="do-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── education & experience ── */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div>
              <SectionHead eyebrow="Experience" title="Where I've worked" />
              <div className="timeline">
                {EXPERIENCE.map((e) => (
                  <Reveal key={e.role} className="tl-item">
                    <div className="tl-period">{e.period}</div>
                    <div className="tl-role">{e.role}</div>
                    <div className="tl-org">{e.org}</div>
                    <p className="tl-desc">{e.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <SectionHead eyebrow="Education" title="Where I studied" />
              <div className="timeline">
                {EDUCATION.map((e) => (
                  <Reveal key={e.role} className="tl-item">
                    <div className="tl-period">{e.period}</div>
                    <div className="tl-role">{e.role}</div>
                    <div className="tl-org">{e.org}</div>
                    <p className="tl-desc">{e.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── skills matrix ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Technical arsenal"
            title="Skills & tools"
            desc="The technologies I reach for across research and product builds."
          />
          <div className="skills-grid">
            {SKILL_GROUPS.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.05} className="skill-group">
                <div className="skill-group-head">
                  <span className="skill-group-title">{group.category}</span>
                  <span className="skill-group-count">{group.items.length}</span>
                </div>
                <div className="skill-chips">
                  {group.items.map((item) => (
                    <span key={item.name} className="skill-chip" title={item.name}>
                      {item.icon ? (
                        <Icon name={item.icon} size={15} />
                      ) : (
                        <span className="skill-initial" aria-hidden="true">
                          {iconInitial(item.name)}
                        </span>
                      )}
                      {item.name}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
