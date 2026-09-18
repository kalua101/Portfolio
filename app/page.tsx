'use client';

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  useScrollAnimation();

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <div className="scroll-animate">
        <About />
      </div>
      <div className="scroll-animate-scale">
        <TechStack />
      </div>
      <div className="scroll-animate">
        <Projects />
      </div>
      <div className="scroll-animate-left">
        <Experience />
      </div>
      <div className="scroll-animate-right">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
