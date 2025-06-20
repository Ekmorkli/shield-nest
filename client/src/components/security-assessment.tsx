import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, CheckCircle, XCircle, Eye, EyeOff, Zap } from "lucide-react";

interface SecurityItem {
  id: string;
  category: string;
  question: string;
  description: string;
  weight: number;
}

const securityChecklist: SecurityItem[] = [
  {
    id: 'antivirus',
    category: 'Device Protection',
    question: 'Do you have updated antivirus software installed?',
    description: 'Real-time protection against malware, viruses, and ransomware',
    weight: 10
  },
  {
    id: 'firewall',
    category: 'Network Security',
    question: 'Is your firewall enabled and properly configured?',
    description: 'Blocks unauthorized access to your network',
    weight: 10
  },
  {
    id: 'wifi_security',
    category: 'Network Security',
    question: 'Is your Wi-Fi network secured with WPA3 or WPA2?',
    description: 'Prevents unauthorized access to your internet connection',
    weight: 8
  },
  {
    id: 'software_updates',
    category: 'System Maintenance',
    question: 'Do you regularly update your operating system and software?',
    description: 'Patches security vulnerabilities and improves protection',
    weight: 9
  },
  {
    id: 'strong_passwords',
    category: 'Authentication',
    question: 'Do you use strong, unique passwords for all accounts?',
    description: 'Prevents unauthorized access to your accounts',
    weight: 9
  },
  {
    id: 'two_factor_auth',
    category: 'Authentication',
    question: 'Have you enabled two-factor authentication on important accounts?',
    description: 'Adds an extra layer of security to your accounts',
    weight: 8
  },
  {
    id: 'backup_system',
    category: 'Data Protection',
    question: 'Do you regularly backup your important data?',
    description: 'Protects against data loss from attacks or system failures',
    weight: 7
  },
  {
    id: 'email_security',
    category: 'Communication',
    question: 'Are you cautious about opening email attachments and links?',
    description: 'Prevents phishing attacks and malware infections',
    weight: 6
  },
  {
    id: 'social_media_privacy',
    category: 'Privacy',
    question: 'Have you reviewed and secured your social media privacy settings?',
    description: 'Limits exposure of personal information',
    weight: 5
  },
  {
    id: 'financial_monitoring',
    category: 'Financial Security',
    question: 'Do you regularly monitor your bank and credit card statements?',
    description: 'Helps detect fraudulent transactions quickly',
    weight: 7
  }
];

export default function SecurityAssessment() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{
    score: number;
    feedback: string[];
    strength: string;
    color: string;
  }>({ score: 0, feedback: [], strength: 'Very Weak', color: 'text-red-500' });
  
  // Initialize with a working state for testing
  const [isLoaded, setIsLoaded] = useState(true);

  const handleItemCheck = (itemId: string, checked: boolean) => {
    try {
      const newCheckedItems = new Set(checkedItems);
      if (checked) {
        newCheckedItems.add(itemId);
      } else {
        newCheckedItems.delete(itemId);
      }
      setCheckedItems(newCheckedItems);
    } catch (error) {
      console.error('Error updating checkbox:', error);
    }
  };

  const calculateSecurityScore = () => {
    const totalWeight = securityChecklist.reduce((sum, item) => sum + item.weight, 0);
    const checkedWeight = securityChecklist
      .filter(item => checkedItems.has(item.id))
      .reduce((sum, item) => sum + item.weight, 0);
    
    return Math.round((checkedWeight / totalWeight) * 100);
  };

  const getSecurityLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-shield-green', bgColor: 'bg-shield-green/10' };
    if (score >= 75) return { level: 'Good', color: 'text-shield-gold', bgColor: 'bg-shield-gold/10' };
    if (score >= 50) return { level: 'Fair', color: 'text-orange-500', bgColor: 'bg-orange-500/10' };
    return { level: 'Poor', color: 'text-red-500', bgColor: 'bg-red-500/10' };
  };

  const checkPasswordStrength = (pwd: string) => {
    let score = 0;
    const feedback = [];

    if (pwd.length >= 8) {
      score += 20;
    } else {
      feedback.push('Use at least 8 characters');
    }

    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) {
      score += 20;
    } else {
      feedback.push('Include both uppercase and lowercase letters');
    }

    if (/\d/.test(pwd)) {
      score += 20;
    } else {
      feedback.push('Include at least one number');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      score += 20;
    } else {
      feedback.push('Include special characters (!@#$%^&*)');
    }

    if (pwd.length >= 12) {
      score += 10;
    }

    if (/(.)\1{2,}/.test(pwd)) {
      score -= 10;
      feedback.push('Avoid repeating characters');
    }

    let strength = 'Very Weak';
    let color = 'text-red-500';

    if (score >= 80) {
      strength = 'Very Strong';
      color = 'text-shield-green';
    } else if (score >= 60) {
      strength = 'Strong';
      color = 'text-shield-gold';
    } else if (score >= 40) {
      strength = 'Moderate';
      color = 'text-orange-500';
    } else if (score >= 20) {
      strength = 'Weak';
      color = 'text-red-400';
    }

    return { score: Math.min(score, 100), feedback, strength, color };
  };

  const handlePasswordChange = (value: string) => {
    try {
      setPassword(value);
      const feedback = checkPasswordStrength(value);
      setPasswordFeedback(feedback);
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const showConsultationPopup = () => {
    try {
      const event = new CustomEvent('showConsultationPopup');
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error showing consultation popup:', error);
    }
  };

  const securityScore = calculateSecurityScore();
  const securityLevel = getSecurityLevel(securityScore);

  return (
    <section id="security-assessment" className="py-20 bg-gradient-to-b from-shield-dark/50 to-transparent robotic-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-montserrat text-foreground mb-4 sm:mb-6 leading-tight">
            Security <span className="text-shield-gold">Assessment Tools</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Evaluate and strengthen your digital security with our comprehensive assessment tools
          </p>
        </div>

        <Tabs defaultValue="checklist" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-shield-dark/50 border border-shield-blue/30 h-auto">
            <TabsTrigger value="checklist" className="data-[state=active]:bg-shield-blue/20 text-sm sm:text-base py-2 px-2 sm:px-4">
              Security Checklist
            </TabsTrigger>
            <TabsTrigger value="password" className="data-[state=active]:bg-shield-blue/20 text-sm sm:text-base py-2 px-2 sm:px-4">
              Password Checker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="space-y-4 sm:space-y-6">
            {/* Security Score Display */}
            <Card className="bg-gradient-to-br from-shield-blue/10 to-transparent border-shield-blue/30 neon-glow-blue">
              <CardHeader className="text-center px-4 py-4 sm:px-6 sm:py-6">
                <CardTitle className="text-xl sm:text-2xl font-montserrat">Your Security Score</CardTitle>
                <CardDescription className="text-sm sm:text-base">Based on your current security practices</CardDescription>
              </CardHeader>
              <CardContent className="text-center px-4 sm:px-6">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-shield-dark flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-4 sm:border-8 border-transparent"
                         style={{
                           borderTopColor: securityScore >= 25 ? (securityLevel.color === 'text-shield-green' ? '#15803D' : securityLevel.color === 'text-shield-gold' ? '#FFD700' : '#f97316') : '#374151',
                           borderRightColor: securityScore >= 50 ? (securityLevel.color === 'text-shield-green' ? '#15803D' : securityLevel.color === 'text-shield-gold' ? '#FFD700' : '#f97316') : '#374151',
                           borderBottomColor: securityScore >= 75 ? (securityLevel.color === 'text-shield-green' ? '#15803D' : securityLevel.color === 'text-shield-gold' ? '#FFD700' : '#f97316') : '#374151',
                           borderLeftColor: securityScore >= 100 ? '#15803D' : '#374151',
                           transform: `rotate(${(securityScore / 100) * 360}deg)`,
                           transition: 'all 0.5s ease-in-out'
                         }}>
                    </div>
                    <div className="text-center z-10">
                      <div className={`text-xl sm:text-3xl font-bold ${securityLevel.color}`}>{securityScore}%</div>
                      <Badge className={`${securityLevel.bgColor} ${securityLevel.color} border-current text-xs sm:text-sm`}>
                        {securityLevel.level}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Progress value={securityScore} className="w-full mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 px-2">
                  Complete the checklist below to improve your security score
                </p>
                {securityScore < 75 && (
                  <Button onClick={showConsultationPopup} className="bg-shield-orange hover:bg-shield-orange/90 text-white micro-bounce text-sm sm:text-base px-3 sm:px-4 py-2">
                    <Shield className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Get Expert Help
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Security Checklist */}
            <div className="grid gap-3 sm:gap-4">
              {securityChecklist.map((item) => (
                <Card key={item.id} className="bg-gradient-to-r from-transparent to-shield-blue/5 border-shield-blue/20 hover-lift micro-bounce">
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <Checkbox
                        id={item.id}
                        checked={checkedItems.has(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked !== null && checked !== undefined) {
                            handleItemCheck(item.id, Boolean(checked));
                          }
                        }}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-1 sm:space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <label
                            htmlFor={item.id}
                            className="text-sm sm:text-lg font-medium text-foreground cursor-pointer leading-tight"
                          >
                            {item.question}
                          </label>
                          <Badge variant="outline" className="text-xs self-start sm:self-auto shrink-0">
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center space-x-2">
                          {checkedItems.has(item.id) ? (
                            <CheckCircle className="h-4 w-4 text-shield-green" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            Weight: {item.weight} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="password" className="space-y-4 sm:space-y-6">
            <Card className="bg-gradient-to-br from-shield-green/10 to-transparent border-shield-green/30 neon-glow-green">
              <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
                <CardTitle className="text-xl sm:text-2xl font-montserrat flex items-center">
                  <Zap className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-shield-gold" />
                  Password Strength Checker
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Test your password strength and get recommendations for improvement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password to test its strength"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="pr-10 sm:pr-12 bg-shield-dark/50 border-shield-blue/30 text-foreground text-sm sm:text-base py-2 sm:py-3"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent p-1 sm:p-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowPassword(prev => !prev);
                    }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>

                {password && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-sm font-medium">Password Strength:</span>
                      <Badge className={`${passwordFeedback.color} border-current text-xs sm:text-sm`}>
                        {passwordFeedback.strength}
                      </Badge>
                    </div>
                    
                    <Progress value={passwordFeedback.score} className="w-full" />
                    
                    <div className="text-center">
                      <span className={`text-xl sm:text-2xl font-bold ${passwordFeedback.color}`}>
                        {passwordFeedback.score}%
                      </span>
                    </div>

                    {passwordFeedback.feedback.length > 0 && (
                      <div className="bg-shield-dark/30 p-3 sm:p-4 rounded-lg border border-shield-blue/20">
                        <h4 className="font-medium text-foreground mb-2 flex items-center text-sm sm:text-base">
                          <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-shield-gold" />
                          Recommendations:
                        </h4>
                        <ul className="space-y-1">
                          {passwordFeedback.feedback.map((item, index) => (
                            <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-start">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-shield-gold rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                              <span className="leading-tight">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {passwordFeedback.score < 60 && (
                      <div className="text-center">
                        <Button onClick={showConsultationPopup} className="bg-shield-orange hover:bg-shield-orange/90 text-white micro-bounce text-sm sm:text-base px-3 sm:px-4 py-2">
                          <Shield className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Get Security Consultation
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-shield-blue/10 p-3 sm:p-4 rounded-lg border border-shield-blue/20">
                  <h4 className="font-medium text-shield-gold mb-2 text-sm sm:text-base">Password Security Tips:</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Use at least 12 characters for maximum security</li>
                    <li>• Combine uppercase, lowercase, numbers, and symbols</li>
                    <li>• Avoid personal information like names or birthdays</li>
                    <li>• Don't reuse passwords across multiple accounts</li>
                    <li>• Consider using a password manager</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}