import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertConsultationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Test endpoint
  app.get("/api/test", (req, res) => {
    res.json({ message: "API is working", timestamp: new Date().toISOString() });
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    console.log("Contact form request received:", req.body);
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Validate name (at least 2 characters)
      if (validatedData.name.trim().length < 2) {
        return res.status(400).json({ 
          message: "Name must be at least 2 characters long" 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(validatedData.email)) {
        return res.status(400).json({ 
          message: "Please enter a valid email address" 
        });
      }

      // Validate Ghanaian phone number (optional)
      if (validatedData.phone && validatedData.phone.trim()) {
        const ghanaPhoneRegex = /^(\+233|0)[2-5][0-9]{8}$/;
        if (!ghanaPhoneRegex.test(validatedData.phone.replace(/\s/g, ''))) {
          return res.status(400).json({ 
            message: "Please enter a valid Ghanaian phone number" 
          });
        }
      }

      // Validate message (at least 10 characters)
      if (validatedData.message.trim().length < 10) {
        return res.status(400).json({ 
          message: "Message must be at least 10 characters long" 
        });
      }

      const contact = await storage.createContact(validatedData);
      
      // In a real application, you would send an email notification here
      // using nodemailer or similar service
      console.log('New contact submission:', contact);
      
      res.status(201).json({ 
        message: "Thank you for your message! We'll get back to you within 24 hours.",
        contact: { id: contact.id, name: contact.name, email: contact.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      console.error('Contact form error:', error);
      res.status(500).json({ 
        message: "There was an error processing your request. Please try again." 
      });
    }
  });

  // Consultation booking
  app.post("/api/consultation", async (req, res) => {
    console.log("Consultation request received:", req.body);
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      
      // Validate Ghanaian phone number
      const ghanaPhoneRegex = /^(\+233|0)[2-5][0-9]{8}$/;
      if (!ghanaPhoneRegex.test(validatedData.phone.replace(/\s/g, ''))) {
        return res.status(400).json({ 
          message: "Please enter a valid Ghanaian phone number" 
        });
      }

      const consultation = await storage.createConsultation(validatedData);
      
      // In a real application, you would send email notification here
      console.log('New consultation booking:', consultation);
      
      res.status(201).json({ 
        message: "Consultation booked successfully! We'll contact you via WhatsApp.",
        consultation: { id: consultation.id, phone: consultation.phone }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid phone number", 
          errors: error.errors 
        });
      }
      console.error('Consultation booking error:', error);
      res.status(500).json({ 
        message: "There was an error booking your consultation. Please try again." 
      });
    }
  });

  // Get all contacts (for admin use)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error('Get contacts error:', error);
      res.status(500).json({ message: "Error retrieving contacts" });
    }
  });

  // Get all consultations (for admin use)
  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getAllConsultations();
      res.json(consultations);
    } catch (error) {
      console.error('Get consultations error:', error);
      res.status(500).json({ message: "Error retrieving consultations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
