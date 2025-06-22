import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Compass, Target, Award, Users, Building, GraduationCap, TrendingUp, Globe, Smartphone, Trophy, Leaf } from "lucide-react";

export default function About() {
  const goals2030 = [
    { icon: <Users className="h-4 w-4" />, text: "Serve 500+ protected clients nationwide" },
    { icon: <Building className="h-4 w-4" />, text: "Operate 3 regional offices across Ghana" },
    { icon: <GraduationCap className="h-4 w-4" />, text: "Train 1,000+ Ghanaians in cybersecurity" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "Achieve ₵1.76M annual revenue" }
  ];

  const goals2035 = [
    { icon: <Globe className="h-4 w-4" />, text: "Serve 2,387+ clients across West Africa" },
    { icon: <Smartphone className="h-4 w-4" />, text: "Launch proprietary cybersecurity app" },
    { icon: <Trophy className="h-4 w-4" />, text: "Lead Ghana's cybersecurity training sector" },
    { icon: <Leaf className="h-4 w-4" />, text: "Achieve carbon-neutral operations" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "Reach ₵5.86M annual revenue" }
  ];

  const credentials = [
    {
      title: "Google Cybersecurity Certificate",
      description: "Professional-level cybersecurity training and expertise",
      status: "Certified",
      color: "shield-blue"
    },
    {
      title: "ISC2 Certified in Cybersecurity",
      description: "Industry-recognized advanced certification",
      status: "In Progress",
      color: "shield-green"
    },
    {
      title: "Google IT Support Professional",
      description: "Comprehensive IT support and troubleshooting expertise",
      status: "Certified",
      color: "shield-gold"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-card to-shield-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-foreground mb-6">
            About <span className="text-shield-gold">ShieldNest</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Building a digitally safe Ghana through affordable cybersecurity and expert IT support
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Vision & Mission */}
          <div className="space-y-8">
            {/* Vision */}
            <Card className="bg-gradient-to-br from-shield-blue/10 to-transparent border-shield-blue/30 neon-glow-blue hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-montserrat text-shield-gold">
                  <Eye className="mr-3 h-6 w-6 text-shield-blue" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create a digitally safe Ghana where homes, businesses, and communities thrive securely 
                  in the digital age, protected by world-class cybersecurity solutions accessible to everyone.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="bg-gradient-to-br from-shield-green/10 to-transparent border-shield-green/30 neon-glow-green hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-montserrat text-shield-gold">
                  <Compass className="mr-3 h-6 w-6 text-shield-green" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver affordable, certified cybersecurity and IT support services using local expertise, 
                  empowering Ghanaians with the knowledge and tools to protect their digital lives while building 
                  a stronger, more secure digital economy.
                </p>
              </CardContent>
            </Card>

            {/* Gye Nyame Heritage */}
            <Card className="bg-gradient-to-br from-shield-gold/10 to-transparent border-shield-gold/30 neon-glow-gold hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-montserrat text-shield-gold">
                  <Award className="mr-3 h-6 w-6 text-shield-gold" />
                  Inspired by Gye Nyame
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our brand draws inspiration from the Akan symbol <strong className="text-shield-gold">Gye Nyame</strong>, 
                  representing the supremacy and resilience that guides our commitment to protecting Ghana's digital landscape. 
                  Just as this symbol signifies unwavering strength, ShieldNest stands as your dependable digital guardian.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Goals & Credentials */}
          <div className="space-y-8">
            {/* 2030 Goals */}
            <Card className="bg-gradient-to-br from-shield-blue/10 to-transparent border-shield-blue/30 neon-glow-blue hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-montserrat text-shield-gold">
                  <Target className="mr-3 h-6 w-6 text-shield-blue" />
                  Goals 2030
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {goals2030.map((goal, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="text-shield-green">
                        {goal.icon}
                      </div>
                      <span className="text-muted-foreground text-sm">{goal.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 2035 Vision */}
            <Card className="bg-gradient-to-br from-shield-green/10 to-transparent border-shield-green/30 neon-glow-green hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-montserrat text-shield-gold">
                  <Globe className="mr-3 h-6 w-6 text-shield-green" />
                  Vision 2035
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {goals2035.map((goal, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="text-shield-gold">
                        {goal.icon}
                      </div>
                      <span className="text-muted-foreground text-sm">{goal.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Credentials */}
            <Card className="bg-gradient-to-br from-shield-gold/10 to-transparent border-shield-gold/30 neon-glow-gold hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-montserrat text-shield-gold">
                  <Award className="mr-3 h-6 w-6 text-shield-gold" />
                  Our Credentials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {credentials.map((credential, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground text-sm">
                          {credential.title}
                        </h4>
                        <Badge 
                          variant={credential.status === "Certified" ? "default" : "secondary"}
                          className={credential.status === "Certified" ? "bg-shield-green text-white" : "bg-shield-orange text-white"}
                        >
                          {credential.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {credential.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-shield-blue/10 to-transparent rounded-xl border border-shield-blue/30">
            <div className="text-3xl font-bold text-shield-gold mb-2">500+</div>
            <div className="text-muted-foreground text-sm">Target Clients by 2030</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-shield-green/10 to-transparent rounded-xl border border-shield-green/30">
            <div className="text-3xl font-bold text-shield-gold mb-2">3</div>
            <div className="text-muted-foreground text-sm">Regional Offices</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-shield-gold/10 to-transparent rounded-xl border border-shield-gold/30">
            <div className="text-3xl font-bold text-shield-gold mb-2">1,000+</div>
            <div className="text-muted-foreground text-sm">Trained Professionals</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-shield-orange/10 to-transparent rounded-xl border border-shield-orange/30">
            <div className="text-3xl font-bold text-shield-gold mb-2">₵1.76M</div>
            <div className="text-muted-foreground text-sm">Revenue Goal 2030</div>
          </div>
        </div>
      </div>
    </section>
  );
}
