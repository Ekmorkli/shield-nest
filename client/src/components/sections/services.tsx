import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Laptop, Wifi, Bug, GraduationCap, Key, ShieldX, Monitor, Printer, Network, Settings, Headphones } from "lucide-react";

export default function Services() {
  const cybersecurityServices = [
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Wi-Fi Security Audits",
      description: "Comprehensive network vulnerability assessments and security optimization"
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: "Malware Cleanup",
      description: "Complete virus removal, system cleaning, and protection setup"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Security Training",
      description: "Phishing awareness, password security, and safe browsing practices"
    },
    {
      icon: <Key className="h-6 w-6" />,
      title: "Password & 2FA Setup",
      description: "Strong authentication systems and account security implementation"
    },
    {
      icon: <ShieldX className="h-6 w-6" />,
      title: "Account Recovery",
      description: "Restore compromised accounts and prevent future security breaches"
    }
  ];

  const itSupportServices = [
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "PC Performance Optimization",
      description: "Speed up slow computers, fix crashes, and optimize system performance"
    },
    {
      icon: <Printer className="h-6 w-6" />,
      title: "Device Setup & Configuration",
      description: "Install and configure printers, scanners, routers, and peripherals"
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Connectivity Solutions",
      description: "Fix internet issues, network problems, and optimize connections"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Software Installation",
      description: "Install, update, and configure software applications and systems"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Remote Support",
      description: "Instant technical assistance via secure remote access technology"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-shield-dark to-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-foreground mb-6">
            Our <span className="text-shield-gold">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive cybersecurity and IT support solutions designed for Ghana's digital landscape
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Cybersecurity Services */}
          <Card className="bg-gradient-to-br from-shield-blue/10 to-transparent border-shield-blue/30 neon-glow-blue hover-lift micro-bounce scanner-effect relative overflow-hidden">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto bg-shield-blue rounded-full flex items-center justify-center mb-4 neon-glow-blue animate-hologram relative">
                <Shield className="text-shield-gold h-8 w-8 animate-float" />
                {/* Energy pulse rings */}
                <div className="absolute inset-0 rounded-full border border-shield-blue/30 animate-energy-pulse" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-full border border-shield-blue/20 animate-energy-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-montserrat text-shield-gold">
                Cybersecurity
              </CardTitle>
              <CardDescription className="text-shield-blue font-semibold">
                Digital Protection & Security Audits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cybersecurityServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-shield-blue/5 border border-shield-blue/20">
                    <div className="text-shield-green mt-1">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm md:text-base">
                        {service.title}
                      </h4>
                      <p className="text-muted-foreground text-xs md:text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* IT Support Services */}
          <Card className="bg-gradient-to-br from-shield-green/10 to-transparent border-shield-green/30 neon-glow-green hover-lift micro-bounce hologram-effect relative overflow-hidden">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto bg-shield-green rounded-full flex items-center justify-center mb-4 neon-glow-green animate-hologram relative">
                <Laptop className="text-shield-gold h-8 w-8 animate-float" />
                {/* Energy pulse rings */}
                <div className="absolute inset-0 rounded-full border border-shield-green/30 animate-energy-pulse" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-full border border-shield-green/20 animate-energy-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-montserrat text-shield-gold">
                IT Support
              </CardTitle>
              <CardDescription className="text-shield-green font-semibold">
                Technical Solutions & Optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {itSupportServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-shield-green/5 border border-shield-green/20">
                    <div className="text-shield-blue mt-1">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm md:text-base">
                        {service.title}
                      </h4>
                      <p className="text-muted-foreground text-xs md:text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
