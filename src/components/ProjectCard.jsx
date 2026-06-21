import ProjectVisual from './ProjectVisual.jsx'

function ProjectCard({ project, onOpen }) {
  return (
    <button className="project-card" type="button" onClick={() => onOpen(project)}>
      <ProjectVisual project={project} />
      <div className="project-body">
        <div className="project-meta">
          <span>{project.status}</span>
          <span>{project.type}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p>{project.description}</p>
        <div className="project-evidence-row">
          <span>Visual Status</span>
          <strong>{project.visualStatus}</strong>
        </div>
        <div className="project-evidence-row">
          <span>Evidence count</span>
          <strong>{project.evidenceItems.length} items</strong>
        </div>
        <div className="project-next-step">
          <span>Next step</span>
          <p>{project.nextStep}</p>
        </div>
        <div className="open-case">Open case file</div>
      </div>
    </button>
  )
}

export default ProjectCard
