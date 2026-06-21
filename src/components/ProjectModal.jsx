import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ProjectVisual from './ProjectVisual.jsx'

function ModalImage({ alt, caption, fit = 'cover', project, src }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (!src || imageFailed) {
    return (
      <figure className="modal-image-block">
        <ProjectVisual project={project} variant="modal" />
        <figcaption>{caption}</figcaption>
      </figure>
    )
  }

  return (
    <figure className="modal-image-block">
      <img
        alt={alt}
        className={`modal-image modal-image--${fit}`}
        src={src}
        onError={() => setImageFailed(true)}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

function ProjectModal({ project, onClose }) {
  const [failedVideo, setFailedVideo] = useState('')

  useEffect(() => {
    if (!project) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const canShowVideo = project.demoVideo && failedVideo !== project.demoVideo
  const heroFit = project.code === 'P2' || project.code === 'P4' ? 'contain' : 'cover'
  const boardCaption =
    project.code === 'P2'
      ? 'Machine Vision Archive concept board / hardware documentation pending'
      : 'Haptic Image Study concept board / hardware test pending'

  return createPortal(
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="modal-code">{project.caseNumber}</p>
            <h3 id="project-modal-title">{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
            <div className="modal-tags">
              <span>{project.type}</span>
              <span>{project.status}</span>
              <span>{project.visualStatus}</span>
            </div>
          </div>
          <button className="modal-close" type="button" aria-label="Close case file" onClick={onClose}>
            Close
          </button>
        </div>

        <ModalImage
          alt={project.detailAlt}
          caption={project.visualStatus}
          fit={heroFit}
          project={project}
          src={project.detailImage}
        />

        <div className="modal-content-grid">
          <section className="modal-summary">
            <h4>Project Summary</h4>
            <p>{project.description}</p>
          </section>
          <section className="modal-evidence">
            <h4>Current Evidence</h4>
            <ul>
              {project.evidenceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="modal-next">
            <h4>Next Step</h4>
            <p>{project.nextStep}</p>
          </section>
          <section className="modal-requirements">
            <h4>Photo / Visual Requirements</h4>
            <ul>
              {project.visualRequirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {project.boardImage && (
          <section className="modal-board">
            <h4>Full Concept Board</h4>
            <a href={project.boardImage} target="_blank" rel="noreferrer">
              <ModalImage
                alt={project.boardAlt}
                caption={boardCaption}
                fit="contain"
                project={project}
                src={project.boardImage}
              />
            </a>
          </section>
        )}

        <section className="modal-demo">
          <h4>Demo Area</h4>
          {canShowVideo ? (
            <video
              controls
              preload="metadata"
              poster={project.detailImage}
              onError={() => setFailedVideo(project.demoVideo)}
            >
              <source src={project.demoVideo} type="video/mp4" />
            </video>
          ) : (
            <p>Demo pending / visual documentation will be updated.</p>
          )}
        </section>

        <div className="modal-footer-actions">
          <button type="button" disabled>
            Process pending
          </button>
          <button type="button" disabled>
            GitHub pending
          </button>
          <button type="button" disabled>
            Portfolio PDF pending
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ProjectModal
