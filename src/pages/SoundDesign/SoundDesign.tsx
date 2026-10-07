import { useMemo } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { projects } from '../../data/projects'
import './SoundDesign.css'

const audioProjects = projects.filter((project) => project.tags.includes('audio'))

function SoundDesign() {
  const projects = useMemo(() => audioProjects, [])

  return (
    <PageShell title="Sound Design" lead="Audio work and demos.">
      <ul className="sound-list">
        {projects.map((project) => (
          <li key={project.name} className="sound-row skeleton-block">
            <div className="sound-row__content">
              <h2 className="sound-row__title">{project.name}</h2>
              <p className="sound-row__desc">{project.shortDescription || project.description}</p>
              {project.audioFile ? (
                <audio className="sound-row__audio" controls preload="none">
                  <source src={`${import.meta.env.BASE_URL}${project.audioFile}`} />
                </audio>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

export default SoundDesign
