import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Clock, Info } from "lucide-react";

export default function Plans() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const showConsultationPopup = () => {
    const event = new CustomEvent('showConsultationPopup');
    window.dispatchEvent(event);
  };

  const plans = [
    {
      name: "Basic Plan",
      price: "₵150",
      period: "/month",
      description: "Perfect for home users and small setups",
      features: [
        "Monthly Wi-Fi security audit",
        "2 remote support sessions",
        "1 malware cleanup service",
        "Free security consultation",
        "Email & WhatsApp support"
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      popular: false,
      colorScheme: "blue"
    },
    {
      name: "Pro Plan",
      price: "₵300",
      period: "/month",
      description: "Complete protection for businesses",
      features: [
        "Everything in Basic Plan",
        "Same-day response guarantee",
        "Firewall setup & monitoring",
        "Weekly automated backups",
        "Phishing awareness training",
        "Complete home office setup",
        "Priority phone support"
      ],
      buttonText: "Choose Pro",
      buttonVariant: "default" as const,
      popular: true,
      colorScheme: "gold"
    },
    {
      name: "Pay-As-You-Go",
      price: "₵50",
      period: "/hour",
      description: "Flexible support when you need it",
      features: [
        "One-time security audits",
        "Emergency IT repairs",
        "Device setup & configuration",
        "Custom technical solutions",
        "No monthly commitment"
      ],
      additionalInfo: "+₵50 travel fee for onsite visits in Accra",
      buttonText: "Book Service",
      buttonVariant: "default" as const,
      popular: false,
      colorScheme: "green"
    }
  ];

  return (
    <section id="plans" className="py-20 bg-card robotic-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-foreground mb-6">
            Choose Your <span className="text-shield-gold">Protection Plan</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Affordable cybersecurity and IT support packages designed for every need and budget
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative micro-bounce scanner-effect overflow-hidden ${
                plan.popular
                  ? "border-2 border-shield-gold neon-glow-gold hologram-effect"
                  : plan.colorScheme === "blue"
                  ? "border-shield-blue/30 neon-glow-blue"
                  : "border-shield-green/30 neon-glow-green"
              } hover-lift bg-gradient-to-b from-${plan.colorScheme === "gold" ? "shield-gold" : plan.colorScheme === "blue" ? "shield-blue" : "shield-green"}/5 to-transparent`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-shield-gold text-shield-dark px-4 py-1 font-semibold animate-glow-pulse glitch-text" data-text="MOST POPULAR">
                    <Star className="w-3 h-3 mr-1 animate-hologram" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-montserrat text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-shield-gold">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="text-shield-green h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.additionalInfo && (
                    <li className="flex items-start space-x-3">
                      <Info className="text-shield-orange h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{plan.additionalInfo}</span>
                    </li>
                  )}
                </ul>

                <Button
                  onClick={scrollToContact}
                  className={`w-full py-3 font-semibold transition-all duration-300 hover-lift micro-bounce scanner-effect relative overflow-hidden ${
                    plan.popular
                      ? "bg-shield-gold hover:bg-shield-gold/90 text-shield-dark neon-glow-gold"
                      : plan.colorScheme === "blue"
                      ? "bg-shield-blue hover:bg-shield-blue/90 text-white neon-glow-blue"
                      : "bg-shield-green hover:bg-shield-green/90 text-white neon-glow-green"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-shield-blue/10 to-shield-green/10 rounded-2xl p-8 border border-shield-gold/30 neon-glow-gold">
          <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
            Need Help Choosing the Right Plan?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get a free consultation to discuss your specific cybersecurity and IT support needs. 
            We'll help you find the perfect solution for your budget and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={showConsultationPopup}
              size="lg"
              className="bg-shield-orange hover:bg-shield-orange/90 text-white neon-glow-orange hover-lift"
            >
              <Clock className="mr-2 h-5 w-5" />
              Get Free Consultation
            </Button>
            <Button
              onClick={scrollToContact}
              variant="outline"
              size="lg"
              className="border-shield-gold text-shield-gold hover:bg-shield-gold hover:text-shield-dark hover-lift-gold"
            >
              Contact Us for Custom Plans
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
