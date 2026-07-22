import { useMemo } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { getResolvedCodingProjects } from '../../data/portfolio'
import './Projects.css'

function Projects() {
  const projects = useMemo(() => getResolvedCodingProjects(), [])

  return (
    <PageShell title="Projects" lead="Selected work.">
      <ul className="projects-grid">
        {projects.map((project) => (
          <li key={project.id} className="projects-card skeleton-block">
            <div className="projects-card__media">
              {project.screenshots.map((src) => (
                <div key={src} className="projects-card__thumb" data-src={src} aria-hidden="true" />
              ))}
            </div>
            <div className="projects-card__body">
              <h2 className="projects-card__title">{project.name}</h2>
              <p className="projects-card__desc">{project.description}</p>
              <table className="projects-table">
                <thead>
                  <tr>
                    <th scope="col">Built</th>
                    <th scope="col">Because</th>
                  </tr>
                </thead>
                <tbody>
                  {project.achievements.map((row, i) => (
                    <tr key={`${project.id}-a-${i}`}>
                      <td>{row.built}</td>
                      <td>{row.because}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

export default Projects
