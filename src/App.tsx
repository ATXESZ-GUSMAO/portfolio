import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import Projects from './components/Projects.tsx'
import Skills from './components/Skills.tsx'
import Experience from './components/Experience.tsx'
import Contact from './components/Contact.tsx'

export default function App() {
  return (
    <div className="wrap">
      <Header />
      <main id="inicio">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer>Lucas Gabriel Gusmão · {new Date().getFullYear()}</footer>
    </div>
  )
}
