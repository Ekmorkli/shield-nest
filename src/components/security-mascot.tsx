import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  X, 
  Send, 
  Bot, 
  Lightbulb,
  AlertTriangle,
  Lock,
  Wifi,
  Minimize2,
  Maximize2
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  tipType?: 'password' | 'phishing' | 'wifi' | 'general' | 'malware';
}

const securityTips = {
  password: [
    "Use at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols",
    "Never reuse passwords across multiple accounts",
    "Consider using a password manager like Bitwarden or 1Password",
    "Enable two-factor authentication wherever possible"
  ],
  phishing: [
    "Always verify sender email addresses before clicking links",
    "Hover over links to see the actual destination URL",
    "Be suspicious of urgent requests for personal information",
    "Look for spelling and grammar mistakes in suspicious emails"
  ],
  wifi: [
    "Use WPA3 or WPA2 encryption for your home network",
    "Avoid using public Wi-Fi for sensitive activities",
    "Consider using a VPN when on public networks",
    "Regularly update your router's firmware"
  ],
  malware: [
    "Keep your antivirus software updated and running",
    "Avoid downloading software from untrusted sources",
    "Be cautious with email attachments from unknown senders",
    "Regularly backup your important data"
  ],
  general: [
    "Keep all your software and operating systems updated",
    "Use different browsers for different activities",
    "Regularly review your privacy settings on social media",
    "Be mindful of what information you share online"
  ]
};

const responses = {
  greeting: [
    "Hello! I'm CyberShield, your AI security guardian. How can I help protect you today?",
    "Hi there! I'm here to help keep you safe online. What security topic interests you?",
    "Welcome! I'm CyberShield, ready to share cybersecurity tips. What would you like to know?"
  ],
  password: [
    "Great question about passwords! Here's what you need to know:",
    "Password security is crucial! Let me share some tips:",
    "I'm glad you're thinking about password security! Here's my advice:"
  ],
  phishing: [
    "Phishing is a serious threat! Here's how to stay protected:",
    "Smart question about phishing! Here are the warning signs:",
    "Phishing attacks are getting sophisticated. Here's what to watch for:"
  ],
  wifi: [
    "Wi-Fi security is important! Here's how to stay safe:",
    "Good thinking about network security! Here are my recommendations:",
    "Protecting your wireless connection is smart! Here's what to do:"
  ],
  malware: [
    "Malware protection is essential! Here's how to defend yourself:",
    "Great question about malware! Here are the best practices:",
    "Staying malware-free requires vigilance! Here's my advice:"
  ],
  general: [
    "That's a great general security question! Here's what I recommend:",
    "Excellent question! Here's some important security advice:",
    "I'm happy to help with general security! Here's what you should know:"
  ],
  unknown: [
    "I'm not sure about that specific topic, but here's some general security advice:",
    "That's interesting! While I focus on cybersecurity, here's a general tip:",
    "I specialize in cybersecurity, so let me share a relevant security tip:"
  ]
};

export default function SecurityMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(responses.greeting[Math.floor(Math.random() * responses.greeting.length)]);
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, tipType?: 'password' | 'phishing' | 'wifi' | 'general' | 'malware') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: false,
      timestamp: new Date(),
      tipType
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const analyzeMessage = (message: string): 'password' | 'phishing' | 'wifi' | 'malware' | 'general' | 'unknown' => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('password') || lowerMessage.includes('login') || lowerMessage.includes('authenticate')) {
      return 'password';
    }
    if (lowerMessage.includes('phishing') || lowerMessage.includes('email') || lowerMessage.includes('scam') || lowerMessage.includes('suspicious')) {
      return 'phishing';
    }
    if (lowerMessage.includes('wifi') || lowerMessage.includes('network') || lowerMessage.includes('router') || lowerMessage.includes('internet')) {
      return 'wifi';
    }
    if (lowerMessage.includes('virus') || lowerMessage.includes('malware') || lowerMessage.includes('antivirus') || lowerMessage.includes('infection')) {
      return 'malware';
    }
    if (lowerMessage.includes('security') || lowerMessage.includes('protect') || lowerMessage.includes('safe') || lowerMessage.includes('cyber')) {
      return 'general';
    }
    
    return 'unknown';
  };

  const generateResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const category = analyzeMessage(userMessage);
      const responseIntro = responses[category][Math.floor(Math.random() * responses[category].length)];
      
      // Add the introductory response
      addBotMessage(responseIntro);
      
      // Add a specific tip after a short delay
      setTimeout(() => {
        if (category !== 'unknown') {
          const tips = securityTips[category as keyof typeof securityTips];
          const randomTip = tips[Math.floor(Math.random() * tips.length)];
          addBotMessage(`💡 ${randomTip}`, category as any);
        } else {
          const generalTips = securityTips.general;
          const randomTip = generalTips[Math.floor(Math.random() * generalTips.length)];
          addBotMessage(`💡 ${randomTip}`, 'general');
        }
        
        // Ask a follow-up question
        setTimeout(() => {
          addBotMessage("Do you have any other cybersecurity questions? I'm here to help keep you safe!");
        }, 1000);
        
        setIsTyping(false);
      }, 1500);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    addUserMessage(inputMessage);
    generateResponse(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTipIcon = (tipType?: string) => {
    switch (tipType) {
      case 'password': return <Lock className="h-4 w-4 text-shield-gold" />;
      case 'phishing': return <AlertTriangle className="h-4 w-4 text-shield-orange" />;
      case 'wifi': return <Wifi className="h-4 w-4 text-shield-blue" />;
      case 'malware': return <Shield className="h-4 w-4 text-shield-green" />;
      default: return <Lightbulb className="h-4 w-4 text-shield-gold" />;
    }
  };

  // Floating mascot button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-shield-blue to-shield-green hover:from-shield-blue/90 hover:to-shield-green/90 shadow-lg neon-glow-blue animate-bounce-slow group"
        >
          <div className="relative">
            <Bot className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-shield-gold rounded-full animate-ping"></div>
          </div>
        </Button>
        
        {/* Tooltip */}
        <div className="absolute bottom-20 right-0 bg-shield-dark text-white px-3 py-2 rounded-lg shadow-lg border border-shield-blue/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-sm font-medium">CyberShield AI Assistant</div>
          <div className="text-xs text-muted-foreground">Click for security tips!</div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-shield-dark"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`bg-shield-dark/95 border-shield-blue/30 shadow-2xl neon-glow-blue transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-shield-blue/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-shield-blue to-shield-green rounded-full flex items-center justify-center animate-glow-pulse">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-shield-gold">CyberShield AI</h3>
              <p className="text-xs text-muted-foreground">Your Security Guardian</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0 h-[350px] overflow-y-auto">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-shield-blue text-white'
                          : 'bg-shield-dark/50 border border-shield-blue/20 text-foreground'
                      }`}
                    >
                      {!message.isUser && message.tipType && (
                        <div className="flex items-center space-x-2 mb-2">
                          {getTipIcon(message.tipType)}
                          <span className="text-xs font-medium text-shield-gold uppercase tracking-wide">
                            {message.tipType} tip
                          </span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-shield-dark/50 border border-shield-blue/20 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-shield-blue animate-pulse" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-shield-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-shield-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-shield-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-shield-blue/20 security-mascot">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about cybersecurity..."
                  className="flex-1 bg-shield-dark/50 border-shield-blue/30 text-black placeholder:text-muted-foreground"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-shield-blue hover:bg-shield-blue/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Quick suggestion buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputMessage("How do I create strong passwords?");
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs border-shield-blue/30 text-muted-foreground hover:text-foreground hover:border-shield-blue"
                >
                  Password Tips
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputMessage("How do I spot phishing emails?");
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs border-shield-blue/30 text-muted-foreground hover:text-foreground hover:border-shield-blue"
                >
                  Phishing Help
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputMessage("How do I secure my Wi-Fi?");
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs border-shield-blue/30 text-muted-foreground hover:text-foreground hover:border-shield-blue"
                >
                  Wi-Fi Security
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}