import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Stats from "@/components/Stats"
import About from "@/components/About"
import Properties from "@/components/Properties"
import Services from "@/components/Services"
import FAQ from "@/components/FAQ"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Properties />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
