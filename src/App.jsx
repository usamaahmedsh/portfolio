import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  )
}

export default App
