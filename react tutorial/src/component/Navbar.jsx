function Navbar({ completedCount, totalLessons, progress, isDark, onToggleTheme }) {
  return (
    <header className="topbar">
      <a className="brand-lockup" href="#top" aria-label="React Path home">
        <span className="brand-mark">R</span>
        <span>
          <strong>React Path</strong>
          <span>Practical frontend learning</span>
        </span>
      </a>

      <div className="nav-progress" aria-label={`${progress}% course progress`}>
        <span>Course progress</span>
        <div className="nav-progress-track"><i style={{ width: `${progress}%` }} /></div>
        <b>{completedCount}/{totalLessons}</b>
      </div>

      <div className="topbar-actions">
        <span className="streak"><span className="status-dot" /> 3 day streak</span>
        <button className="icon-button" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDark ? '☼' : '☾'}
        </button>
        <div className="avatar" aria-label="Student profile">AS</div>
      </div>
    </header>
  )
}

export default Navbar
