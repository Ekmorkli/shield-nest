import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { validateConsultationPhone } from "@/lib/validation";
import { Shield, X, MessageSquare } from "lucide-react";

export default function ConsultationPopup() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleShowPopup = () => {
      setIsOpen(true);
    };

    window.addEventListener('showConsultationPopup', handleShowPopup);
    
    return () => {
      window.removeEventListener('showConsultationPopup', handleShowPopup);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    setPhone("");
    setError("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateConsultationPhone(phone)) {
      setError("Please enter a valid Ghanaian phone number (+233... or 0...)");
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Submitting consultation form with phone:", phone);
      const response = await apiRequest("POST", "/api/consultation", { phone });
      console.log("Consultation response:", response.status);
      
      const result = await response.json();
      console.log("Consultation result:", result);
      
      toast({
        title: "Consultation Booked!",
        description: result.message || "We'll contact you via WhatsApp within 24 hours.",
      });
      
      // Redirect to WhatsApp with pre-filled message
      const whatsappMessage = encodeURIComponent(
        `Hi ShieldNest! I'd like to book my FREE security check. My number is ${phone}. Please contact me to schedule the consultation.`
      );
      const whatsappUrl = `https://wa.me/233539985980?text=${whatsappMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      closePopup();
      
    } catch (error) {
      console.error("Consultation booking error:", error);
      toast({
        title: "Booking Error",
        description: error instanceof Error ? error.message : "There was an error booking your consultation. Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <Card className="w-full max-w-md bg-shield-dark border-shield-gold/30 neon-glow-gold relative animate-glow-pulse">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={closePopup}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </Button>

        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-shield-gold rounded-full flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
            <Shield className="text-shield-dark h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-montserrat text-shield-gold">
            Book Your FREE Security Check
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Get a personalized cybersecurity assessment. We'll contact you via WhatsApp within 24 hours.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="consultation-phone" className="text-foreground">
                Your WhatsApp Number *
              </Label>
              <Input
                id="consultation-phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+233 XX XXX XXXX"
                className={`bg-background border-input text-black focus:border-shield-gold focus-visible:ring-shield-gold ${
                  error ? "border-red-500" : ""
                }`}
                required
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={closePopup}
                className="flex-1 border-muted-foreground text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-shield-gold hover:bg-shield-gold/90 text-shield-dark font-semibold neon-glow-gold hover-lift"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {isSubmitting ? "Booking..." : "Continue to WhatsApp"}
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            We'll send you a WhatsApp message to schedule your free security check. 
            No commitment required.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
