import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, CheckCircle, XCircle, Eye, EyeOff, Zap } from "lucide-react";

const securityItems = [
  { id: 'antivirus', question: 'Updated antivirus software?', weight: 10 },
  { id: 'firewall', question: 'Firewall enabled?', weight: 10 },
  { id: 'wifi', question: 'Wi-Fi secured with WPA3/WPA2?', weight: 8 },
  { id: 'updates', question: 'Regular software updates?', weight: 9 },
  { id: 'passwords', question: 'Strong, unique passwords?', weight: 9 },
  { id: '2fa', question: 'Two-factor authentication enabled?', weight: 8 },
  { id: 'backups', question: 'Regular data backups?', weight: 7 },
  { id: 'email', question: 'Cautious with email attachments?', weight: 6 },
  { id: 'privacy', question: 'Social media privacy secured?', weight: 5 },
  { id: 'monitoring', question: 'Monitor financial statements?', weight: 7 }
];

export default function SecurityAssessmentSimple() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('checklist');

  const handleCheckboxChange = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const calculateScore = () => {
    const totalWeight = securityItems.reduce((sum, item) => sum + item.weight, 0);
    const checkedWeight = securityItems
      .filter(item => checkedItems[item.id])
      .reduce((sum, item) => sum + item.weight, 0);
    return Math.round((checkedWeight / totalWeight) * 100);
  };

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-green-500' };
    if (score >= 75) return { level: 'Good', color: 'text-yellow-500' };
    if (score >= 50) return { level: 'Fair', color: 'text-orange-500' };
    return { level: 'Poor', color: 'text-red-500' };
  };

  const checkPasswordStrength = (pwd: string) => {
    let score = 0;
    const feedback = [];

    if (pwd.length >= 8) score += 25;
    else feedback.push('Use at least 8 characters');

    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 25;
    else feedback.push('Include uppercase and lowercase letters');

    if (/\d/.test(pwd)) score += 25;
    else feedback.push('Include numbers');

    if (/[!@#$%^&*]/.test(pwd)) score += 25;
    else feedback.push('Include special characters');

    let strength = 'Very Weak';
    let color = 'text-red-500';
    if (score >= 80) { strength = 'Very Strong'; color = 'text-green-500'; }
    else if (score >= 60) { strength = 'Strong'; color = 'text-yellow-500'; }
    else if (score >= 40) { strength = 'Moderate'; color = 'text-orange-500'; }

    return { score, feedback, strength, color };
  };

  const showConsultation = () => {
    const event = new CustomEvent('showConsultationPopup');
    window.dispatchEvent(event);
  };

  const score = calculateScore();
  const scoreLevel = getScoreLevel(score);
  const passwordAnalysis = checkPasswordStrength(password);

  return (
    <section id="security-assessment" className="py-20 bg-gradient-to-b from-shield-dark/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-foreground mb-6">
            Security <span className="text-shield-gold">Assessment Tools</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Evaluate and strengthen your digital security
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-shield-dark/50 rounded-lg p-1 border border-shield-blue/30">
            <Button
              onClick={() => setActiveTab('checklist')}
              variant={activeTab === 'checklist' ? 'default' : 'ghost'}
              className={`px-6 py-2 ${activeTab === 'checklist' ? 'bg-shield-blue text-white' : 'text-foreground'}`}
            >
              Security Checklist
            </Button>
            <Button
              onClick={() => setActiveTab('password')}
              variant={activeTab === 'password' ? 'default' : 'ghost'}
              className={`px-6 py-2 ml-2 ${activeTab === 'password' ? 'bg-shield-blue text-white' : 'text-foreground'}`}
            >
              Password Checker
            </Button>
          </div>
        </div>

        {/* Security Checklist Tab */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            {/* Security Score */}
            <Card className="bg-gradient-to-br from-shield-blue/10 to-transparent border-shield-blue/30">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-montserrat">Your Security Score</CardTitle>
                <CardDescription>Based on your security practices</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-32 h-32 rounded-full border-8 border-shield-dark flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${scoreLevel.color}`}>{score}%</div>
                      <Badge className={`${scoreLevel.color} border-current`}>
                        {scoreLevel.level}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Progress value={score} className="w-full mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Complete the checklist below to improve your score
                </p>
                {score < 75 && (
                  <Button onClick={showConsultation} className="bg-shield-orange hover:bg-shield-orange/90 text-white">
                    <Shield className="mr-2 h-4 w-4" />
                    Get Expert Help
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Checklist Items */}
            <div className="grid gap-4">
              {securityItems.map((item) => (
                <Card key={item.id} className="bg-gradient-to-r from-transparent to-shield-blue/5 border-shield-blue/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className="cursor-pointer"
                        onClick={() => handleCheckboxChange(item.id)}
                      >
                        <div className={`w-6 h-6 border-2 rounded flex items-center justify-center ${
                          checkedItems[item.id] 
                            ? 'bg-shield-blue border-shield-blue' 
                            : 'border-muted-foreground hover:border-shield-blue'
                        }`}>
                          {checkedItems[item.id] && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div
                          className="text-lg font-medium text-foreground cursor-pointer"
                          onClick={() => handleCheckboxChange(item.id)}
                        >
                          {item.question}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {checkedItems[item.id] ? (
                            <CheckCircle className="h-4 w-4 text-shield-green" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            Weight: {item.weight} points
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Password Checker Tab */}
        {activeTab === 'password' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-shield-green/10 to-transparent border-shield-green/30">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat flex items-center">
                  <Zap className="mr-2 h-6 w-6 text-shield-gold" />
                  Password Strength Checker
                </CardTitle>
                <CardDescription>
                  Test your password strength and get recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password to test strength"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12 bg-shield-dark/50 border-shield-blue/30 text-black"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>

                {password && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Password Strength:</span>
                      <Badge className={`${passwordAnalysis.color} border-current`}>
                        {passwordAnalysis.strength}
                      </Badge>
                    </div>
                    
                    <Progress value={passwordAnalysis.score} className="w-full" />
                    
                    <div className="text-center">
                      <span className={`text-2xl font-bold ${passwordAnalysis.color}`}>
                        {passwordAnalysis.score}%
                      </span>
                    </div>

                    {passwordAnalysis.feedback.length > 0 && (
                      <div className="bg-shield-dark/30 p-4 rounded-lg border border-shield-blue/20">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-shield-gold" />
                          Recommendations:
                        </h4>
                        <ul className="space-y-1">
                          {passwordAnalysis.feedback.map((item, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center">
                              <span className="w-2 h-2 bg-shield-gold rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {passwordAnalysis.score < 60 && (
                      <div className="text-center">
                        <Button onClick={showConsultation} className="bg-shield-orange hover:bg-shield-orange/90 text-white">
                          <Shield className="mr-2 h-4 w-4" />
                          Get Security Consultation
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-shield-blue/10 p-4 rounded-lg border border-shield-blue/20">
                  <h4 className="font-medium text-shield-gold mb-2">Password Security Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use at least 12 characters for maximum security</li>
                    <li>• Combine uppercase, lowercase, numbers, and symbols</li>
                    <li>• Avoid personal information like names or birthdays</li>
                    <li>• Don't reuse passwords across multiple accounts</li>
                    <li>• Consider using a password manager</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}