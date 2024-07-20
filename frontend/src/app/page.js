import Header from "../components/Header"
import Services from "../components/Services"
import Testimonials from "../components/Testimonials"
import Feature from "../components/Feature"
import CTA from "../components/CTA"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

export default function Home() {

  return (
    <>
      <div className="bg-white">
        <Navbar />
        <Header />
        <Services />
        <Testimonials />
        <Feature />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
