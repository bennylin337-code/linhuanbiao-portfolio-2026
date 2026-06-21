import { useState } from 'react'
import { processItems } from '../data/projects.js'

function Process() {
  const [openItem, setOpenItem] = useState('AI Film Workflow')

  return (
    <section className="section process-section reveal-section" id="process" data-nav-section>
      <div className="section-heading">
        <span className="section-index">03</span>
        <h2>PROCESS</h2>
      </div>
      <div className="process-grid">
        {processItems.map((item, index) => (
          <button
            className={`process-item glass-card ${openItem === item.title ? 'is-open' : ''}`}
            key={item.title}
            type="button"
            onClick={() => setOpenItem(openItem === item.title ? '' : item.title)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.status}</p>
            <div className="process-detail">{item.detail}</div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default Process
