import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Features from './components/Features'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Contact />
      <Footer />
    </main>
  )
}