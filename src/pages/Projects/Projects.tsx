import { useMemo, useState } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { ProjectDetailOverlay } from '../../components/ProjectDetailOverlay/ProjectDetailOverlay'
import {
  projects,
  type ProjectRecord,
  type ProjectTag,
} from '../../data/projects'
import './Projects.css'

const projectData = projects

type ProjectFilterTag = ProjectTag | 'all'

function Projects() {
  const allTags = useMemo(
    () =>
      Array.from(
        new Set(projectData.flatMap((project) => project.tags))
      ).sort() as ProjectTag[],
    []
  )
  const [selectedTag, setSelectedTag] = useState<ProjectFilterTag>('all')
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(
    null
  )

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'all') {
      return projectData
    }

    return projectData.filter((project) => project.tags.includes(selectedTag))
  }, [selectedTag])

  return (
    <PageShell title="Projects" lead="Portfolio work and audio experiments">
      <div className="projects-page">
        <div
          className="projects-filter"
          role="tablist"
          aria-label="Project filters"
        >
          <button
            type="button"
            className={`projects-filter__chip ${selectedTag === 'all' ? 'projects-filter__chip--active' : ''}`}
            onClick={() => setSelectedTag('all')}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`projects-filter__chip ${selectedTag === tag ? 'projects-filter__chip--active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <ul className="projects-list">
          {filteredProjects.map((project) => (
            <li key={project.name} className="projects-list__item">
              <button
                type="button"
                className="projects-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="projects-card__header">
                  <span className="projects-card__eyebrow">
                    {project.tags?.join(' · ') || 'Project'}
                  </span>
                </div>

                <div className="projects-card__body">
                  <h3 className="projects-card__title">{project.name}</h3>
                  <p className="projects-card__desc">
                    {project.shortDescription || project.description}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ProjectDetailOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </PageShell>
  )
}

export default Projects
