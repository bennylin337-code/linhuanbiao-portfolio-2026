import { useEffect, useState } from 'react'

function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + 5, 100))
    }, 55)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="loading-screen" role="status" aria-label="Loading portfolio">
      <div className="loading-panel">
        <span className="eyebrow">AFTER PHOTOGRAPHY LAB</span>
        <div className="loading-number" dir="ltr">{`${progress}%`}</div>
        <div className="loading-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p>Indexing AI moving image experiments</p>
      </div>
    </div>
  )
}

export default LoadingScreen
