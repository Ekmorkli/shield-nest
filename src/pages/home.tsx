import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import SecurityAssessmentSimple from "@/components/security-assessment-simple";
import AdvancedAnalytics from "@/components/advanced-analytics";
import Plans from "@/components/sections/plans";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import ConsultationPopup from "@/components/consultation-popup";
import SecurityMascot from "@/components/security-mascot";

export default function Home() {
  return (
    <div className="min-h-screen bg-shield-dark">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <SecurityAssessmentSimple />
        <AdvancedAnalytics />
        <Plans />
        <About />
        <Contact />
      </main>
      <Footer />
      <ConsultationPopup />
      <SecurityMascot />
    </div>
  );
}
