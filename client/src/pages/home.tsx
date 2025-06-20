import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import SecurityAssessmentSimple from "@/components/security-assessment-simple";
import Plans from "@/components/sections/plans";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import ConsultationPopup from "@/components/consultation-popup";

export default function Home() {
  return (
    <div className="min-h-screen bg-shield-dark overflow-x-hidden">
      <Navigation />
      <main className="w-full">
        <Hero />
        <Services />
        <SecurityAssessmentSimple />
        <Plans />
        <About />
        <Contact />
      </main>
      <Footer />
      <ConsultationPopup />
    </div>
  );
}
