import { useEffect, useState } from 'react'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import Process from './components/Process.jsx'
import Profile from './components/Profile.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('profile')
  const [showToast, setShowToast] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1400)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const revealSections = document.querySelectorAll('.reveal-section')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.16 },
    )

    revealSections.forEach((section) => revealObserver.observe(section))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const navSections = document.querySelectorAll('[data-nav-section]')
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.2, 0.45, 0.7],
      },
    )

    navSections.forEach((section) => navObserver.observe(section))
    return () => navObserver.disconnect()
  }, [])

  function handleMouseMove(event) {
    document.documentElement.style.setProperty('--spotlight-x', `${event.clientX}px`)
    document.documentElement.style.setProperty('--spotlight-y', `${event.clientY}px`)
  }

  function handlePresentationMode() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 1800)
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="site-shell" aria-hidden={isLoading} onMouseMove={handleMouseMove}>
        <div className="mouse-spotlight" aria-hidden="true" />
        <Header activeSection={activeSection} onPresentationMode={handlePresentationMode} />
        {showToast && (
          <div className="toast" role="status">
            Course presentation mode: show profile, projects and process.
          </div>
        )}
        {!selectedProject && (
          <div className="presentation-hint">
            For course presentation: Profile → Projects → Process → Contact
          </div>
        )}
        <main>
          <Hero />
          <Profile />
          <Projects onProjectClick={setSelectedProject} />
          <Process />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

export default App
