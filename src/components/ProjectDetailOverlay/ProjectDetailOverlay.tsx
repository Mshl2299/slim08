import { useEffect } from 'react'
import './ProjectDetailOverlay.css'

interface ProjectLinkItem {
  label: string
  url: string
}

interface ProjectDetailItem {
  name: string
  shortDescription: string
  description: string
  links?: ProjectLinkItem[]
  screenshots?: string[]
  audioFile?: string
  tags?: string[]
}

interface ProjectDetailOverlayProps {
  project: ProjectDetailItem | null
  onClose: () => void
}

export function ProjectDetailOverlay({
  project,
  onClose,
}: ProjectDetailOverlayProps) {
  useEffect(() => {
    if (!project) {
      return undefined
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose, project])

  if (!project) {
    return null
  }

  const previewImage = project.screenshots?.[0] ?? null
  const additionalScreenshots = project.screenshots ?? []
  const projectLinks = project.links ?? []

  return (
    <div
      className="project-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      <div
        className="project-detail-overlay__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="project-detail-overlay__panel">
        <button
          type="button"
          className="project-detail-overlay__close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>

        <div className="project-detail-overlay__media">
          {previewImage ? (
            <img
              src={previewImage}
              alt={project.name}
              className="project-detail-overlay__image"
            />
          ) : (
            <div
              className="project-detail-overlay__fallback"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="project-detail-overlay__content">
          <div className="project-detail-overlay__meta">
            {project.tags?.map((tag) => (
              <span key={tag} className="project-detail-overlay__tag">
                {tag}
              </span>
            ))}
          </div>

          <h2
            id="project-detail-title"
            className="project-detail-overlay__title"
          >
            {project.name}
          </h2>

          <p className="project-detail-overlay__summary">
            {project.shortDescription || project.description}
          </p>

          <div className="project-detail-overlay__body">
            <p>{project.description}</p>
            {project.audioFile ? (
              <p className="project-detail-overlay__audio">
                Audio: {project.audioFile}
              </p>
            ) : null}
          </div>

          {projectLinks.length > 0 ? (
            <div
              className="project-detail-overlay__links"
              aria-label={`${project.name} links`}
            >
              {projectLinks.map((link) => (
                <a
                  key={`${project.name}-${link.label}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-detail-overlay__link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}

          {additionalScreenshots.length > 0 ? (
            <div className="project-detail-overlay__gallery">
              {additionalScreenshots.map((image, index) => (
                <img
                  key={`${project.name}-${index}`}
                  src={image}
                  alt={`${project.name} screenshot ${index + 2}`}
                  className="project-detail-overlay__gallery-image"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
