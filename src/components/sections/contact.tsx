import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { validateName, validateEmail, validateGhanaianPhone, validateMessage } from "@/lib/validation";
import { MessageSquare, Mail, MapPin, Clock, QrCode, Shield } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateName(formData.name)) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !validateGhanaianPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Ghanaian phone number (+233...)";
    }

    if (!validateMessage(formData.message)) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please check the form fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Submitting contact form with data:", formData);
      const response = await apiRequest("POST", "/api/contact", formData);
      console.log("Response received:", response.status);
      
      const result = await response.json();
      console.log("Response data:", result);
      
      toast({
        title: "Message Sent Successfully!",
        description: result.message || "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      
      // Optional: Redirect to WhatsApp for immediate contact
      setTimeout(() => {
        const whatsappMessage = encodeURIComponent(
          `Hi ShieldNest! I just sent a message through your website. Looking forward to hearing from you.`
        );
        window.open(`https://wa.me/233539985980?text=${whatsappMessage}`, '_blank');
      }, 2000);
      
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error Sending Message",
        description: error instanceof Error ? error.message : "There was an error sending your message. Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const showConsultationPopup = () => {
    const event = new CustomEvent('showConsultationPopup');
    window.dispatchEvent(event);
  };

  return (
    <section id="contact" className="py-20 circuit-pattern robotic-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-foreground mb-6">
            Get In <span className="text-shield-gold">Touch</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to secure your digital world? Contact us today for a free consultation and security assessment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-shield-blue/10 to-transparent border-shield-blue/30 neon-glow-blue scanner-effect micro-bounce relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-montserrat text-shield-gold glitch-text" data-text="Send Us a Message">
                Send Us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`bg-background border-input text-white focus:border-shield-gold focus-visible:ring-shield-gold ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`bg-background border-input text-white focus:border-shield-gold focus-visible:ring-shield-gold ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+233 XX XXX XXXX"
                    className={`bg-background border-input text-white focus:border-shield-gold focus-visible:ring-shield-gold ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your cybersecurity needs..."
                    rows={5}
                    className={`bg-background border-input focus:border-shield-gold focus-visible:ring-shield-gold resize-none ${
                      errors.message ? "border-red-500" : ""
                    }`}
                    style={{ color: 'white !important' }}
                    required
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-shield-gold hover:bg-shield-gold/90 text-shield-dark py-3 font-semibold neon-glow-gold hover-lift micro-bounce scanner-effect relative overflow-hidden"
                >
                  <Mail className="mr-2 h-5 w-5 animate-hologram" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* WhatsApp Contact */}
            <Card className="bg-gradient-to-br from-shield-green/10 to-transparent border-shield-green/30 neon-glow-green hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center text-shield-gold text-xl">
                  <MessageSquare className="mr-3 h-6 w-6 text-shield-green" />
                  WhatsApp Support
                </CardTitle>
                <CardDescription>
                  Get instant support via Ghana's preferred communication platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-shield-green font-semibold text-lg">+233 539 985 980</p>
                    <p className="text-muted-foreground text-sm">Available 24/7</p>
                  </div>
                  {/* QR Code placeholder - In production, this would be the actual QR code image */}
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border-2 border-shield-blue">
                    <QrCode className="h-12 w-12 text-shield-dark" />
                  </div>
                </div>
                
                <Button
                  asChild
                  className="w-full bg-shield-green hover:bg-shield-green/90 text-white neon-glow-green hover-lift"
                >
                  <a
                    href="https://wa.me/233539985980?text=Hi%20ShieldNest,%20I'm%20interested%20in%20your%20cybersecurity%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Other Contact Methods */}
            <Card className="bg-gradient-to-br from-shield-blue/10 to-transparent border-shield-blue/30 neon-glow-blue hover-lift">
              <CardHeader>
                <CardTitle className="text-shield-gold text-xl">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-shield-blue/20 rounded-lg flex items-center justify-center">
                      <Mail className="text-shield-blue h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email Support</p>
                      <a 
                        href="mailto:info@shieldnest.com"
                        className="text-shield-blue hover:text-shield-blue/80 transition-colors"
                      >
                        info@shieldnest.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-shield-gold/20 rounded-lg flex items-center justify-center">
                      <MapPin className="text-shield-gold h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-muted-foreground">Accra, Ghana (Nationwide Service)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-shield-green/20 rounded-lg flex items-center justify-center">
                      <Clock className="text-shield-green h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Response Time</p>
                      <p className="text-muted-foreground">24 hours (Emergency support available)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Free Security Check CTA */}
            <Card className="bg-gradient-to-r from-shield-orange/20 to-shield-gold/20 border-shield-gold/30 neon-glow-gold hover-lift">
              <CardContent className="p-6">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-shield-gold mx-auto mb-4" />
                  <h4 className="text-xl font-montserrat font-bold text-shield-gold mb-3">
                    Get Your FREE Security Check
                  </h4>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Not sure about your current security? Book a free consultation and we'll assess 
                    your digital safety with no commitment required.
                  </p>
                  <Button
                    onClick={showConsultationPopup}
                    className="bg-shield-gold hover:bg-shield-gold/90 text-shield-dark font-semibold neon-glow-gold hover-lift"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Book Free Security Check
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
