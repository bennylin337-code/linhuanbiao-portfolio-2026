import { useState } from 'react'

function ProjectVisual({ imageAlt, imageSrc, project, variant = 'card' }) {
  const [imageFailed, setImageFailed] = useState(false)
  const source = imageSrc ?? project.coverImage
  const altText = imageAlt ?? project.coverAlt
  const hasImage = source && !imageFailed

  return (
    <div className={`project-visual project-visual--${variant}`}>
      {hasImage ? (
        <img src={source} alt={altText} onError={() => setImageFailed(true)} />
      ) : (
        <div className="case-fallback" aria-label={`${project.title} fallback case file cover`}>
          <div className="case-cover-grid" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span className="archive-node" />
        </div>
      )}
      <div className="visual-overlay">
        <div className="case-cover-top">
          <span>{project.caseNumber}</span>
          <small>{project.status}</small>
        </div>
        <div className="case-cover-bottom">
          <strong>{project.coverLabel}</strong>
          <small>{project.visualStatus}</small>
        </div>
      </div>
    </div>
  )
}

export default ProjectVisual
