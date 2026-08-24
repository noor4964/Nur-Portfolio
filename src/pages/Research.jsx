import { Link } from "react-router-dom";
import SectionHead from "../components/SectionHead";
import Reveal from "../components/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import { PROFILE } from "../data/profile";
import { PUBLICATIONS, SELF_NAME } from "../data/publications";

const TAG_CLASS = {
  published: "published",
  review: "review",
  prep: "prep",
};

export default function Research() {
  usePageMeta(
    `Research & Publications — ${PROFILE.name}`,
    `Peer-reviewed publications and research in progress by ${PROFILE.name}: deep learning, computer vision and IoT systems.`
  );

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Research"
            title="Publications"
            desc="Peer-reviewed work and manuscripts in progress across deep learning, computer vision and assistive IoT."
          />

          <div className="pub-list">
            {PUBLICATIONS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05} className="pub-item">
                <div className="pub-meta">
                  <span className="pub-venue">{p.venue}</span>
                  <span className={`pub-tag ${TAG_CLASS[p.tag] || "prep"}`}>{p.tagLabel}</span>
                </div>
                <h3 className="pub-title">{p.title}</h3>
                <p className="pub-authors">
                  {p.authors.map((a, idx) => (
                    <span key={idx}>
                      {a === SELF_NAME ? <span className="self">{a}</span> : a}
                      {idx < p.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="contact-note" style={{ maxWidth: 860, marginTop: 36 }}>
            My B.Sc. thesis — <strong>DeepDetect</strong>, a hybrid EfficientNet + Vision
            Transformer model for deepfake detection — is the foundation of several manuscripts
            above. Details on the{" "}
            <Link to="/projects/deepdetect" className="info-value" style={{ fontSize: "inherit" }}>
              project case study
            </Link>
            .
          </div>
        </div>
      </section>
    </div>
  );
}
