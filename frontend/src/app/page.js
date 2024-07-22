"use client";
import Header from "../components/Header"
import Services from "../components/Services"
import Testimonials from "../components/Testimonials"
import Feature from "../components/Feature"
import CTA from "../components/CTA"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/Dashboard');
    }
  }, [user, router]);

  if (user) {
    return <div>Loading...</div>;
  }
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
