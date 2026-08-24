export default function SectionHead({ eyebrow, title, desc }) {
  return (
    <div className="section-head">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  );
}
