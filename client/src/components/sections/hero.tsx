import { Button } from "@/components/ui/button";
import { Shield, CheckCircle } from "lucide-react";

export default function Hero() {
  const showConsultationPopup = () => {
    const event = new CustomEvent('showConsultationPopup');
    window.dispatchEvent(event);
  };

  const scrollToPlans = () => {
    const element = document.getElementById("plans");
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center circuit-pattern overflow-hidden robotic-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-shield-blue/10 via-transparent to-shield-green/10" />
      
      {/* Animated Data Streams */}
      <div className="absolute top-20 left-0 w-full h-px data-stream" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 left-0 w-full h-px data-stream" style={{ animationDelay: '2s' }} />
      <div className="absolute top-60 left-0 w-full h-px data-stream" style={{ animationDelay: '4s' }} />
      
      {/* Scanner Effect */}
      <div className="absolute inset-0 scanner-effect" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating Shield Icon with Energy Pulse */}
        <div className="mb-8 animate-float relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-shield-blue to-shield-green rounded-full flex items-center justify-center neon-glow-blue hologram-effect animate-rotate-slow">
            <Shield className="text-shield-gold h-10 w-10 animate-hologram" />
          </div>
          {/* Energy Pulse Rings */}
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border border-shield-blue/30 animate-energy-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border border-shield-green/30 animate-energy-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border border-shield-gold/30 animate-energy-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Main Heading with Glitch Effect */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-6 text-glow-gold glitch-text" data-text="ShieldNest: Your Digital Guardian">
          <span className="text-shield-gold micro-bounce inline-block">ShieldNest:</span>
          <br />
          <span className="text-foreground">Your Digital Guardian</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
          Protecting Ghana's homes, businesses, and communities with affordable cybersecurity and IT support.{" "}
          <span className="text-shield-gold font-semibold">Starting from just ₵150/month</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            onClick={showConsultationPopup}
            size="lg"
            className="bg-shield-orange hover:bg-shield-orange/90 text-white px-8 py-4 text-lg neon-glow-orange hover-lift micro-bounce scanner-effect relative overflow-hidden"
          >
            <Shield className="mr-2 h-5 w-5 animate-hologram" />
            Book a FREE Security Check
          </Button>
          <Button
            onClick={scrollToPlans}
            variant="outline"
            size="lg"
            className="border-2 border-shield-gold text-shield-gold hover:bg-shield-gold hover:text-shield-dark px-8 py-4 text-lg hover-lift-gold micro-bounce hologram-effect relative overflow-hidden"
          >
            View Our Plans
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle className="text-shield-green h-5 w-5" />
            <span>Google Certified</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle className="text-shield-green h-5 w-5" />
            <span>Ghana-Based Experts</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle className="text-shield-green h-5 w-5" />
            <span>24/7 Support</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-shield-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-shield-gold rounded-full animate-ping mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
