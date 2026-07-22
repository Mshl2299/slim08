import { useMemo } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { getResolvedMusicProjects } from '../../data/portfolio'
import './SoundDesign.css'

function SoundDesign() {
  const projects = useMemo(() => getResolvedMusicProjects(), [])

  return (
    <PageShell title="Sound Design" lead="Audio work and demos.">
      <ul className="sound-list">
        {projects.map((project) => (
          <li key={project.id} className="sound-row skeleton-block">
            <div className="sound-row__content">
              <h2 className="sound-row__title">{project.name}</h2>
              <p className="sound-row__desc">{project.description}</p>
              <audio className="sound-row__audio" controls preload="none">
                <source src={`${import.meta.env.BASE_URL}${project.audioFile}`} />
              </audio>
              <table className="sound-table">
                <thead>
                  <tr>
                    <th scope="col">Design choice</th>
                    <th scope="col">Because</th>
                  </tr>
                </thead>
                <tbody>
                  {project.designChoices.map((row, i) => (
                    <tr key={`${project.id}-d-${i}`}>
                      <td>{row.choice}</td>
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

export default SoundDesign
