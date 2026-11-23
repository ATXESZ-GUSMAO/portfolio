import About from './components/About.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'
import Hero from './components/Hero.tsx'
import Nav from './components/Nav.tsx'
import Work from './components/Work.tsx'
import { useReveal } from './hooks/useReveal.ts'

export default function App() {
  useReveal()
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="page-bg" aria-hidden="true" />
      <Nav />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
