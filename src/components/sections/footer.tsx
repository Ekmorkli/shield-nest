import { Shield, MessageSquare, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
  };

  return (
    <footer className="bg-card border-t border-shield-blue/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Slogan */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-shield-blue rounded-lg flex items-center justify-center neon-glow-blue">
                <Shield className="text-shield-gold h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-montserrat font-bold text-shield-gold">ShieldNest</h3>
                <p className="text-sm text-muted-foreground">Digital Guardian</p>
              </div>
            </div>
            <p className="text-shield-green font-semibold text-lg mb-3 font-montserrat">
              Secure. Support. Simplify.
            </p>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Protecting Ghana's digital landscape with affordable cybersecurity and expert IT support. 
              Founded on the principles of Gye Nyame - resilience and divine protection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-montserrat font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-muted-foreground hover:text-shield-gold transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-shield-gold transition-colors text-sm"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("plans")}
                  className="text-muted-foreground hover:text-shield-gold transition-colors text-sm"
                >
                  Plans & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-shield-gold transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground hover:text-shield-gold transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-montserrat font-bold text-foreground mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="text-shield-green h-4 w-4" />
                <a
                  href="https://wa.me/233539985980"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-shield-green transition-colors text-sm"
                >
                  +233 539 985 980
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-shield-blue h-4 w-4" />
                <a
                  href="mailto:info@shieldnest.com"
                  className="text-muted-foreground hover:text-shield-blue transition-colors text-sm"
                >
                  info@shieldnest.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-shield-gold rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-shield-dark rounded-full" />
                </div>
                <span className="text-muted-foreground text-sm">Accra, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-shield-blue/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {currentYear} ShieldNest. All rights reserved. | Making Ghana digitally safe, one shield at a time.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://wa.me/233539985980"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-shield-green/20 rounded-lg flex items-center justify-center hover:bg-shield-green/30 transition-colors neon-glow-green"
              >
                <MessageSquare className="text-shield-green h-4 w-4" />
              </a>
              <a
                href="mailto:info@shieldnest.com"
                className="w-8 h-8 bg-shield-blue/20 rounded-lg flex items-center justify-center hover:bg-shield-blue/30 transition-colors neon-glow-blue"
              >
                <Mail className="text-shield-blue h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
