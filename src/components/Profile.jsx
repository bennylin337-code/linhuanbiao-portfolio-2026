const stats = [
  '4 Projects',
  '1 AI Film',
  '1 Camera Game',
  '2 Interactive Studies',
  '2027 Fall Application',
]

function Profile() {
  return (
    <section className="section profile-section reveal-section" id="profile" data-nav-section>
      <div className="section-heading">
        <span className="section-index">01</span>
        <h2>PROFILE</h2>
      </div>
      <div className="profile-grid">
        <div className="glass-card profile-copy">
          <p>
            I am a photography student exploring AI moving images, camera games, machine vision
            and haptic media.
          </p>
          <p className="cn-copy">
            我从摄影出发，探索 AI 影像、摄影游戏、机器视觉与触觉媒体创作。
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat}>
              {stat}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Profile
