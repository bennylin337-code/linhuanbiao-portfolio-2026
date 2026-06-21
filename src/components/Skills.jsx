import { skillGroups } from '../data/projects.js'

function Skills() {
  return (
    <section className="section skills-section reveal-section" id="skills" data-nav-section>
      <div className="section-heading">
        <span className="section-index">04</span>
        <h2>SKILLS</h2>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-group glass-card" key={group.title}>
            <h3>{group.title}</h3>
            <p>{group.note}</p>
            <div className="skill-tags">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
