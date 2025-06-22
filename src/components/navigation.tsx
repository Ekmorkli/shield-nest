import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const showConsultationPopup = () => {
    const event = new CustomEvent('showConsultationPopup');
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "security-assessment", "advanced-analytics", "plans", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "security-assessment", label: "Security Check" },
    { id: "advanced-analytics", label: "Analytics" },
    { id: "plans", label: "Plans" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-shield-dark/95 backdrop-blur-sm border-b border-shield-blue/20 scanner-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-shield-blue rounded-lg flex items-center justify-center neon-glow-blue animate-hologram micro-bounce">
                <Shield className="text-shield-gold h-5 w-5 md:h-6 md:w-6 animate-float" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-shield-gold font-montserrat glitch-text" data-text="ShieldNest">
                  ShieldNest
                </h1>
                <p className="text-xs text-muted-foreground hidden md:block data-stream">
                  Digital Guardian
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-shield-gold focus-visible:text-shield-gold ${
                    activeSection === item.id
                      ? "text-shield-gold"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={showConsultationPopup}
                className="bg-shield-orange hover:bg-shield-orange/90 text-white neon-glow-orange micro-bounce scanner-effect relative overflow-hidden"
              >
                Free Security Check
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden text-foreground hover:text-shield-gold"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-shield-blue/20 bg-shield-dark/98 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 text-base font-medium transition-colors duration-300 hover:text-shield-gold ${
                    activeSection === item.id
                      ? "text-shield-gold"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  showConsultationPopup();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-shield-orange hover:bg-shield-orange/90 text-white neon-glow-orange mt-4"
              >
                Free Security Check
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
