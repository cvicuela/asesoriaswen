import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Statement />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  );
}
