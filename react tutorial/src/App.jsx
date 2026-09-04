import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'

const lessons = [
  {
    id: 'setup',
    number: '01',
    title: 'React ka setup',
    tag: 'Foundation',
    duration: '12 min',
    summary: 'Vite project ko samjho aur React app ka basic flow dekho.',
    outcome: 'Tum apna React project start, run aur build kar paoge.',
    concepts: ['Vite', 'Components', 'Project structure'],
    code: `import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)`,
    steps: ['Terminal me project folder kholo.', 'npm install ke baad npm run dev chalao.', 'src/App.jsx ko apna first screen banao.'],
    quiz: {
      question: 'React app ko browser me mount karne ke liye kya use hota hai?',
      options: ['createRoot()', 'createPage()', 'mountHTML()', 'startReact()'],
      answer: 0,
    },
  },
  {
    id: 'jsx',
    number: '02',
    title: 'JSX se UI banao',
    tag: 'Core idea',
    duration: '18 min',
    summary: 'JavaScript ke andar readable UI likhna seekho.',
    outcome: 'Tum JSX expressions, className aur reusable markup use karoge.',
    concepts: ['JSX', 'Expressions', 'className'],
    code: `const name = 'Asha'

export default function Welcome() {
  return (
    <section className="welcome">
      <h1>Hello, {name}!</h1>
      <p>React UI is data-driven.</p>
    </section>
  )
}`,
    steps: ['Curly braces ke andar JavaScript expression likho.', 'HTML ki class ko className karo.', 'Ek component ko chhote UI blocks me tod do.'],
    quiz: {
      question: 'JSX me HTML class attribute ka React version kya hai?',
      options: ['className', 'cssClass', 'styleName', 'classReact'],
      answer: 0,
    },
  },
  {
    id: 'props',
    number: '03',
    title: 'Props se data bhejo',
    tag: 'Composition',
    duration: '20 min',
    summary: 'Parent component se child ko data pass karke reusable cards banao.',
    outcome: 'Tum ek hi component ko alag data ke saath reuse kar paoge.',
    concepts: ['Props', 'Reusable UI', 'Component API'],
    code: `function CourseCard({ title, level }) {
  return (
    <article>
      <span>{level}</span>
      <h2>{title}</h2>
    </article>
  )
}

<CourseCard title="React Basics" level="Beginner" />`,
    steps: ['Component function me props destructure karo.', 'Data ko hard-code karne ke bajay parent se bhejo.', 'Same component ko multiple courses ke liye reuse karo.'],
    quiz: {
      question: 'Props ka main kaam kya hai?',
      options: ['Component ko data dena', 'Browser restart karna', 'CSS compile karna', 'State delete karna'],
      answer: 0,
    },
  },
  {
    id: 'state',
    number: '04',
    title: 'State se interaction',
    tag: 'Interaction',
    duration: '24 min',
    summary: 'Clicks aur user actions ke baad UI ko update karna seekho.',
    outcome: 'Tum interactive counters, toggles aur forms ki foundation bana loge.',
    concepts: ['useState', 'Events', 'Re-render'],
    code: `import { useState } from 'react'

export default function Progress() {
  const [done, setDone] = useState(2)

  return (
    <button onClick={() => setDone(done + 1)}>
      Lessons complete: {done}
    </button>
  )
}`,
    steps: ['State ko useState se declare karo.', 'Event handler me setter call karo.', 'State badalne par React ka re-render observe karo.'],
    quiz: {
      question: 'State update karne ke liye kya use karna chahiye?',
      options: ['Setter function', 'Direct DOM query', 'window.reload()', 'CSS variable'],
      answer: 0,
    },
  },
  {
    id: 'lists',
    number: '05',
    title: 'Lists aur forms',
    tag: 'Practice',
    duration: '28 min',
    summary: 'Array data ko map karke render karo aur controlled input banao.',
    outcome: 'Tum ek useful learning tracker jaisa mini feature bana paoge.',
    concepts: ['map()', 'Keys', 'Controlled input'],
    code: `const topics = ['JSX', 'Props', 'State']

<ul>
  {topics.map((topic) => (
    <li key={topic}>{topic}</li>
  ))}
</ul>`,
    steps: ['Array ko map se UI items me convert karo.', 'Har item ko stable key do.', 'Input value ko state ke saath control karo.'],
    quiz: {
      question: 'React list items ko unique identify karne ke liye kya chahiye?',
      options: ['key prop', 'id() function', 'uniqueCSS', 'index.html'],
      answer: 0,
    },
  },
]

function App() {
  const [activeId, setActiveId] = useState('setup')
  const [completed, setCompleted] = useState([])
  const [quizChoice, setQuizChoice] = useState(null)
  const [isDark, setIsDark] = useState(true)
  const [query, setQuery] = useState('')

  const activeLesson = lessons.find((lesson) => lesson.id === activeId) ?? lessons[0]
  const filteredLessons = lessons.filter((lesson) =>
    `${lesson.title} ${lesson.tag} ${lesson.concepts.join(' ')}`.toLowerCase().includes(query.toLowerCase()),
  )
  const progress = Math.round((completed.length / lessons.length) * 100)
  const quizAnswered = quizChoice !== null
  const chooseLesson = (id) => {
    setActiveId(id)
    setQuizChoice(null)
  }
  const markComplete = () => {
    setCompleted((current) => current.includes(activeLesson.id) ? current : [...current, activeLesson.id])
  }
  const nextLesson = () => {
    const index = lessons.findIndex((lesson) => lesson.id === activeLesson.id)
    chooseLesson(lessons[(index + 1) % lessons.length].id)
  }

  return (
    <div className={`app-shell ${isDark ? '' : 'light-mode'}`}>
      <Navbar
        completedCount={completed.length}
        totalLessons={lessons.length}
        progress={progress}
        isDark={isDark}
        onToggleTheme={() => setIsDark((value) => !value)}
      />

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-heading">
            <div>
              <span className="eyebrow">Your curriculum</span>
              <h2>React foundations</h2>
            </div>
            <span className="lesson-count">{completed.length}/{lessons.length}</span>
          </div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <label className="search-box">
            <span>⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a lesson" />
            <kbd>/</kbd>
          </label>
          <nav className="lesson-list" aria-label="Lessons">
            {filteredLessons.map((lesson) => (
              <button key={lesson.id} className={`lesson-nav ${lesson.id === activeLesson.id ? 'active' : ''}`} onClick={() => chooseLesson(lesson.id)}>
                <span className={`lesson-index ${completed.includes(lesson.id) ? 'complete' : ''}`}>
                  {completed.includes(lesson.id) ? '✓' : lesson.number}
                </span>
                <span className="lesson-nav-copy"><strong>{lesson.title}</strong><small>{lesson.duration} · {lesson.tag}</small></span>
                <span className="chevron">›</span>
              </button>
            ))}
          </nav>
          <div className="sidebar-footnote"><span>✦</span><div><strong>Learning tip</strong><p>Read less, build more. Run every example.</p></div></div>
        </aside>

        <main className="content">
          <div className="content-inner">
            <div className="breadcrumb"><span>Curriculum</span><b>/</b><span>React foundations</span><b>/</b><strong>{activeLesson.title}</strong></div>
            <section className="lesson-hero">
              <div className="hero-copy">
                <div className="lesson-kicker"><span className="kicker-line" /> Lesson {activeLesson.number} <span className="lesson-tag">{activeLesson.tag}</span></div>
                <h1>{activeLesson.title}</h1>
                <p>{activeLesson.summary}</p>
                <div className="hero-meta"><span>◷ {activeLesson.duration}</span><span>◉ {activeLesson.concepts.length} concepts</span><span className="save-label">⌁ Progress saved</span></div>
              </div>
              <div className="completion-card"><div className="completion-ring" style={{ '--ring-progress': completed.includes(activeLesson.id) ? '100%' : '0%' }}><span>{completed.includes(activeLesson.id) ? '✓' : '0%'}</span></div><div><strong>{completed.includes(activeLesson.id) ? 'Lesson complete' : 'In progress'}</strong><small>{completed.includes(activeLesson.id) ? 'Nice work. Keep going.' : 'Finish the practice below.'}</small></div></div>
            </section>

            <section className="outcome-banner"><div className="outcome-icon">↗</div><div><span className="eyebrow">By the end of this lesson</span><strong>{activeLesson.outcome}</strong></div></section>

            <div className="lesson-grid">
              <section className="panel concept-panel"><div className="panel-heading"><div><span className="eyebrow">Core concept</span><h2>What you need to know</h2></div><span className="panel-number">01</span></div><p className="lead">React ka magic ek simple idea par based hai: UI ko chhote, understandable components me baanto aur data ke saath connect karo.</p><div className="concept-list">{activeLesson.concepts.map((concept, index) => <div className="concept-row" key={concept}><span>0{index + 1}</span><strong>{concept}</strong><small>{index === 0 ? 'The building block' : index === 1 ? 'The practical pattern' : 'The mental model'}</small></div>)}</div></section>
              <section className="panel code-panel"><div className="panel-heading"><div><span className="eyebrow">Example</span><h2>See it in code</h2></div><button className="copy-button" onClick={() => navigator.clipboard?.writeText(activeLesson.code)}>Copy <span>⌘ C</span></button></div><div className="code-window"><div className="code-bar"><span className="window-dots"><i /><i /><i /></span><span>example.jsx</span><span className="code-status">● live example</span></div><pre><code>{activeLesson.code}</code></pre></div></section>
            </div>

            <section className="practice-layout"><div className="practice-intro"><span className="eyebrow">Your turn</span><h2>Build the habit</h2><p>Follow these small steps in your editor. The goal is understanding, not copy-paste.</p><button className={`complete-button ${completed.includes(activeLesson.id) ? 'done' : ''}`} onClick={markComplete}>{completed.includes(activeLesson.id) ? '✓ Completed' : 'Mark lesson complete'} <span>→</span></button></div><div className="step-list">{activeLesson.steps.map((step, index) => <div className="step" key={step}><span className="step-number">{index + 1}</span><span>{step}</span><span className="step-arrow">↗</span></div>)}</div></section>

            <section className="quiz-card"><div className="quiz-label"><span>Quick check</span><span>{quizAnswered ? 'Answered' : '1 question'}</span></div><h2>{activeLesson.quiz.question}</h2><div className="quiz-options">{activeLesson.quiz.options.map((option, index) => <button key={option} className={`${quizChoice === index ? (index === activeLesson.quiz.answer ? 'correct' : 'incorrect') : ''} ${quizAnswered && index === activeLesson.quiz.answer ? 'answer' : ''}`} onClick={() => setQuizChoice(index)} disabled={quizAnswered}><span>{String.fromCharCode(65 + index)}</span>{option}{quizAnswered && index === activeLesson.quiz.answer && <b>✓</b>}</button>)}</div>{quizAnswered && <p className={`quiz-feedback ${quizChoice === activeLesson.quiz.answer ? 'good' : 'try-again'}`}>{quizChoice === activeLesson.quiz.answer ? 'Correct. You have the right mental model.' : 'Almost. The highlighted answer is the key idea for this lesson.'}</p>}</section>

            <footer className="lesson-footer"><span>Lesson {activeLesson.number} of {lessons.length}</span><button onClick={nextLesson}>Next lesson <b>→</b></button></footer>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
