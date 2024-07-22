import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Services from "../components/Services"
import Testimonials from "../components/Testimonials"
import Feature from "../components/Feature"
import CTA from "../components/CTA"
import Footer from "../components/Footer"

export default function Home() {
  
  return(
   <>
   <Navbar />
   <div className="space-y-[250px] lg:space-y-[250px] ">
   <Header />
   <Services />
   <Testimonials />
   <Feature />
   <CTA />
   </div>
   <Footer />
   </>
  )
}