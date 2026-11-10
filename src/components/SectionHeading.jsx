export default function SectionHeading({ index, label, title, description, id }) {
  return (
    <header className="section-head">
      <div className="section-index">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <div className="section-head-content">
        <h2 className="section-title" id={id}>{title}</h2>
        {description ? <p className="section-desc">{description}</p> : null}
      </div>
    </header>
  );
}
