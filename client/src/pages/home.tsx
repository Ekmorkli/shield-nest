import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import SecurityAssessment from "@/components/security-assessment";
import Plans from "@/components/sections/plans";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import ConsultationPopup from "@/components/consultation-popup";

export default function Home() {
  return (
    <div className="min-h-screen bg-shield-dark">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <SecurityAssessment />
        <Plans />
        <About />
        <Contact />
      </main>
      <Footer />
      <ConsultationPopup />
    </div>
  );
}
