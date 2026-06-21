import { useState } from 'react'

const email = '2594624903@qq.com'

function Contact() {
  const [copied, setCopied] = useState(false)

  async function handleCopyEmail() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(email)
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="section contact-section reveal-section" id="contact" data-nav-section>
      <div className="section-heading">
        <span className="section-index">05</span>
        <h2>CONTACT</h2>
      </div>
      <div className="contact-panel glass-card">
        <div className="contact-copy">
          <p>For course presentation, portfolio review and future application use.</p>
          <p>
            This website is a work-in-progress creative portfolio for course presentation and
            future application use.
          </p>
          <p>
            这是一个持续更新中的个人创作作品集网站，目前用于课程展示，也会继续升级为未来求职与研究生申请作品集入口。
          </p>
        </div>
        <div className="contact-actions">
          <a className="button primary" href={`mailto:${email}`}>
            Email Me
          </a>
          <button className="button secondary" type="button" onClick={handleCopyEmail}>
            {copied ? 'Copied' : 'Copy Email'}
          </button>
          <button className="button secondary" type="button" disabled>
            GitHub Coming Soon
          </button>
          <button className="button secondary" type="button" disabled>
            Portfolio PDF Coming Soon
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact
