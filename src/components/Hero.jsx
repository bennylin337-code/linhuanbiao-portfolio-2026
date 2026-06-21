function Hero() {
  return (
    <section className="hero-section section" id="top">
      <div className="hero-content">
        <p className="kicker">AI FILM / CAMERA GAME / MACHINE VISION / HAPTIC MEDIA</p>
        <h1>
          Lin Huanbiao
          <span>Creative Portfolio</span>
        </h1>
        <p className="hero-lede">
          Photography student exploring AI moving images, camera games, machine vision and
          interactive media.
        </p>
        <p className="hero-cn">
          摄影专业学生，正在探索 AI 影像、摄影游戏、机器视觉与互动媒体创作。
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            View Projects
          </a>
          <a className="button secondary" href="#contact">
            Contact
          </a>
        </div>
      </div>
      <div className="hero-terminal" aria-label="Interactive archive status panel">
        <div className="terminal-top">
          <span>ARCHIVE NODE 00</span>
          <span>00:01:26:20</span>
        </div>
        <div className="terminal-frame">
          <span className="scan-dot" />
          <p>STATUS: COURSE PRESENTATION VERSION</p>
          <dl className="archive-list">
            <div>
              <dt>MODE</dt>
              <dd>WORK IN PROGRESS</dd>
            </div>
            <div>
              <dt>PROJECTS</dt>
              <dd>04</dd>
            </div>
            <div>
              <dt>FOCUS</dt>
              <dd>AI MOVING IMAGE / CAMERA GAME / MACHINE VISION / HAPTIC MEDIA</dd>
            </div>
            <div>
              <dt>APPLICATION</dt>
              <dd>2027 FALL</dd>
            </div>
          </dl>
          <small>Click a project card to open case file.</small>
        </div>
      </div>
    </section>
  )
}

export default Hero
