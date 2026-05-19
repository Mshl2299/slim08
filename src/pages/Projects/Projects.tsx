import PageShell from '../../components/PageShell/PageShell'
import './Projects.css'

const placeholders = [1, 2, 3]

function Projects() {
  return (
    <PageShell title="Projects" lead="Selected work — content coming soon.">
      <ul className="projects-grid">
        {placeholders.map((n) => (
          <li key={n} className="projects-card skeleton-block">
            <div className="projects-card__thumb" aria-hidden="true" />
            <div className="projects-card__body">
              <div className="skeleton-line skeleton-line--medium" />
              <div className="skeleton-line skeleton-line--short" />
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

export default Projects
