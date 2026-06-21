import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

function Projects({ onProjectClick }) {
  return (
    <section className="section projects-section reveal-section" id="projects" data-nav-section>
      <div className="section-heading">
        <span className="section-index">02</span>
        <h2>PROJECTS</h2>
      </div>
      <div className="section-intro">
        <p>
          Each case file is currently shown as a work-in-progress visual document. Future
          footage, gameplay recordings and hardware documentation will be added progressively.
        </p>
        <p>
          以下项目目前以进行中的视觉档案形式展示，后续将逐步补充成片、游戏录屏与硬件记录。
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.code} onOpen={onProjectClick} />
        ))}
      </div>
    </section>
  )
}

export default Projects
