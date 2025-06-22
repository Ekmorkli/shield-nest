import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  TrendingUp, 
  BarChart3, 
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  FileText,
  Target,
  Eye
} from "lucide-react";
import { format } from "date-fns";

const businessTypes = [
  { id: 'retail', name: 'Retail Store', riskMultiplier: 1.2 },
  { id: 'healthcare', name: 'Healthcare', riskMultiplier: 1.8 },
  { id: 'financial', name: 'Financial Services', riskMultiplier: 2.0 },
  { id: 'education', name: 'Educational Institution', riskMultiplier: 1.4 },
  { id: 'government', name: 'Government Agency', riskMultiplier: 1.9 },
  { id: 'technology', name: 'Technology Company', riskMultiplier: 1.6 },
  { id: 'manufacturing', name: 'Manufacturing', riskMultiplier: 1.3 },
  { id: 'hospitality', name: 'Hospitality', riskMultiplier: 1.1 },
  { id: 'nonprofit', name: 'Non-Profit', riskMultiplier: 1.0 },
  { id: 'other', name: 'Other', riskMultiplier: 1.2 }
];

const complianceStandards = [
  {
    id: 'gdpr',
    name: 'GDPR (General Data Protection Regulation)',
    description: 'EU data protection regulation',
    requirements: [
      'Data protection officer appointed',
      'Privacy policy published and accessible',
      'Consent mechanisms implemented',
      'Right to be forgotten procedures',
      'Data breach notification process',
      'Regular data protection impact assessments'
    ]
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    description: 'Information security management standard',
    requirements: [
      'Information security policy documented',
      'Risk assessment procedures established',
      'Security controls implemented',
      'Regular security audits conducted',
      'Incident response procedures defined',
      'Continuous improvement process'
    ]
  },
  {
    id: 'pci_dss',
    name: 'PCI DSS',
    description: 'Payment card industry data security standard',
    requirements: [
      'Secure network and systems',
      'Protect cardholder data',
      'Maintain vulnerability management program',
      'Implement strong access control measures',
      'Regular monitoring and testing',
      'Maintain information security policy'
    ]
  }
];

const incidentTypes = [
  {
    id: 'malware',
    name: 'Malware Infection',
    severity: 'high',
    steps: [
      'Immediately disconnect affected systems from network',
      'Run full system antivirus scan',
      'Check for data exfiltration signs',
      'Restore from clean backup if necessary',
      'Update all security software',
      'Document incident details'
    ]
  },
  {
    id: 'phishing',
    name: 'Phishing Attack',
    severity: 'medium',
    steps: [
      'Do not click any suspicious links',
      'Report the phishing email to IT',
      'Change passwords for potentially compromised accounts',
      'Enable two-factor authentication',
      'Educate staff about phishing signs',
      'Review email security policies'
    ]
  },
  {
    id: 'data_breach',
    name: 'Data Breach',
    severity: 'critical',
    steps: [
      'Immediately contain the breach',
      'Assess scope of compromised data',
      'Notify relevant authorities within 72 hours',
      'Inform affected customers/users',
      'Conduct forensic investigation',
      'Implement additional security measures'
    ]
  },
  {
    id: 'ransomware',
    name: 'Ransomware Attack',
    severity: 'critical',
    steps: [
      'Isolate infected systems immediately',
      'Do NOT pay the ransom',
      'Contact law enforcement',
      'Restore from clean backups',
      'Patch all security vulnerabilities',
      'Implement advanced threat protection'
    ]
  }
];

export default function AdvancedAnalytics() {
  const [activeTab, setActiveTab] = useState('risk-calculator');
  
  // Risk Calculator State
  const [businessType, setBusinessType] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [hasRemoteWork, setHasRemoteWork] = useState('');
  const [dataHandling, setDataHandling] = useState('');
  const [currentSecurity, setCurrentSecurity] = useState<{ [key: string]: boolean }>({});
  const [riskScore, setRiskScore] = useState(0);

  // Compliance Checker State
  const [selectedStandard, setSelectedStandard] = useState('');
  const [complianceChecks, setComplianceChecks] = useState<{ [key: string]: boolean }>({});

  // Incident Response State
  const [selectedIncident, setSelectedIncident] = useState('');

  // Audit Scheduler State
  const [auditDate, setAuditDate] = useState<Date>();
  const [auditType, setAuditType] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', company: '' });

  const securityMeasures = [
    { id: 'firewall', name: 'Firewall Protection', weight: 15 },
    { id: 'antivirus', name: 'Antivirus Software', weight: 12 },
    { id: 'encryption', name: 'Data Encryption', weight: 18 },
    { id: 'backup', name: 'Regular Backups', weight: 10 },
    { id: 'training', name: 'Security Training', weight: 8 },
    { id: '2fa', name: 'Two-Factor Authentication', weight: 15 },
    { id: 'monitoring', name: '24/7 Monitoring', weight: 12 },
    { id: 'updates', name: 'Regular Updates', weight: 10 }
  ];

  const calculateRiskScore = useCallback(() => {
    let baseScore = 50;
    
    // Business type impact
    const selectedBusiness = businessTypes.find(b => b.id === businessType);
    if (selectedBusiness) {
      baseScore *= selectedBusiness.riskMultiplier;
    }

    // Employee count impact
    const empCount = parseInt(employeeCount) || 0;
    if (empCount > 100) baseScore += 20;
    else if (empCount > 50) baseScore += 15;
    else if (empCount > 10) baseScore += 10;

    // Remote work impact
    if (hasRemoteWork === 'yes') baseScore += 15;

    // Data handling impact
    if (dataHandling === 'sensitive') baseScore += 25;
    else if (dataHandling === 'personal') baseScore += 15;
    else if (dataHandling === 'public') baseScore += 5;

    // Security measures impact (reduce risk)
    const implementedMeasures = securityMeasures.filter(m => currentSecurity[m.id]);
    const securityReduction = implementedMeasures.reduce((sum, measure) => sum + measure.weight, 0);
    baseScore -= securityReduction;

    const finalScore = Math.max(0, Math.min(100, Math.round(baseScore)));
    setRiskScore(finalScore);
    return finalScore;
  }, [businessType, employeeCount, hasRemoteWork, dataHandling, currentSecurity]);

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Critical', color: 'text-red-500', bg: 'bg-red-500/10' };
    if (score >= 60) return { level: 'High', color: 'text-orange-500', bg: 'bg-orange-500/10' };
    if (score >= 40) return { level: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    if (score >= 20) return { level: 'Low', color: 'text-blue-500', bg: 'bg-blue-500/10' };
    return { level: 'Very Low', color: 'text-green-500', bg: 'bg-green-500/10' };
  };

  const handleSecurityMeasureChange = (measureId: string) => {
    setCurrentSecurity(prev => ({
      ...prev,
      [measureId]: !prev[measureId]
    }));
  };

  const handleComplianceCheck = (requirementId: string) => {
    setComplianceChecks(prev => ({
      ...prev,
      [requirementId]: !prev[requirementId]
    }));
  };

  const showConsultation = () => {
    const event = new CustomEvent('showConsultationPopup');
    window.dispatchEvent(event);
  };

  const currentRisk = getRiskLevel(riskScore);
  const selectedStandardData = complianceStandards.find(s => s.id === selectedStandard);
  const selectedIncidentData = incidentTypes.find(i => i.id === selectedIncident);

  return (
    <section id="advanced-analytics" className="py-20 bg-gradient-to-b from-shield-dark/30 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat text-foreground mb-6">
            Advanced <span className="text-shield-gold">Analytics</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive security analysis and compliance tools for your organization
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="bg-shield-dark/50 rounded-lg p-1 border border-shield-blue/30 flex min-w-max">
            <Button
              onClick={() => setActiveTab('risk-calculator')}
              variant={activeTab === 'risk-calculator' ? 'default' : 'ghost'}
              className={`px-4 py-2 whitespace-nowrap ${activeTab === 'risk-calculator' ? 'bg-shield-blue text-white' : 'text-foreground'}`}
            >
              <Target className="mr-2 h-4 w-4" />
              Risk Calculator
            </Button>
            <Button
              onClick={() => setActiveTab('compliance')}
              variant={activeTab === 'compliance' ? 'default' : 'ghost'}
              className={`px-4 py-2 ml-2 whitespace-nowrap ${activeTab === 'compliance' ? 'bg-shield-blue text-white' : 'text-foreground'}`}
            >
              <FileText className="mr-2 h-4 w-4" />
              Compliance
            </Button>
            <Button
              onClick={() => setActiveTab('incident-response')}
              variant={activeTab === 'incident-response' ? 'default' : 'ghost'}
              className={`px-4 py-2 ml-2 whitespace-nowrap ${activeTab === 'incident-response' ? 'bg-shield-blue text-white' : 'text-foreground'}`}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Incident Response
            </Button>
            <Button
              onClick={() => setActiveTab('audit-scheduler')}
              variant={activeTab === 'audit-scheduler' ? 'default' : 'ghost'}
              className={`px-4 py-2 ml-2 whitespace-nowrap ${activeTab === 'audit-scheduler' ? 'bg-shield-blue text-white' : 'text-foreground'}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Audit Scheduler
            </Button>
          </div>
        </div>

        {/* Risk Calculator Tab */}
        {activeTab === 'risk-calculator' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-shield-blue/10 to-transparent border-shield-blue/30">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat flex items-center">
                  <TrendingUp className="mr-2 h-6 w-6 text-shield-gold" />
                  Security Risk Assessment
                </CardTitle>
                <CardDescription>
                  Calculate your organization's cybersecurity risk profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Type</label>
                      <Select value={businessType} onValueChange={setBusinessType}>
                        <SelectTrigger className="bg-shield-dark/50 border-shield-blue/30">
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map(type => (
                            <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Employees</label>
                      <Input
                        type="number"
                        placeholder="Enter employee count"
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(e.target.value)}
                        className="bg-shield-dark/50 border-shield-blue/30 text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Remote Work</label>
                      <Select value={hasRemoteWork} onValueChange={setHasRemoteWork}>
                        <SelectTrigger className="bg-shield-dark/50 border-shield-blue/30">
                          <SelectValue placeholder="Do you have remote workers?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, we have remote workers</SelectItem>
                          <SelectItem value="no">No remote work</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Data Handling</label>
                      <Select value={dataHandling} onValueChange={setDataHandling}>
                        <SelectTrigger className="bg-shield-dark/50 border-shield-blue/30">
                          <SelectValue placeholder="What type of data do you handle?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sensitive">Sensitive/Financial Data</SelectItem>
                          <SelectItem value="personal">Personal Information</SelectItem>
                          <SelectItem value="business">Business Data Only</SelectItem>
                          <SelectItem value="public">Public Information</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Current Security Measures</h3>
                    <div className="space-y-3">
                      {securityMeasures.map(measure => (
                        <div key={measure.id} className="flex items-center space-x-3">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleSecurityMeasureChange(measure.id)}
                          >
                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                              currentSecurity[measure.id] 
                                ? 'bg-shield-blue border-shield-blue' 
                                : 'border-muted-foreground hover:border-shield-blue'
                            }`}>
                              {currentSecurity[measure.id] && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => handleSecurityMeasureChange(measure.id)}
                          >
                            <span className="text-sm font-medium">{measure.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              (-{measure.weight} risk points)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={calculateRiskScore} className="bg-shield-blue hover:bg-shield-blue/90">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Calculate Risk Score
                  </Button>
                </div>

                {riskScore > 0 && (
                  <Card className={`${currentRisk.bg} border-2`}>
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="text-center">
                          <div className={`text-4xl font-bold ${currentRisk.color}`}>{riskScore}</div>
                          <div className="text-sm text-muted-foreground">Risk Score</div>
                        </div>
                        <div className="text-center">
                          <Badge className={`${currentRisk.color} border-current text-lg px-4 py-2`}>
                            {currentRisk.level} Risk
                          </Badge>
                        </div>
                      </div>
                      <Progress value={riskScore} className="w-full mb-4" />
                      
                      {riskScore >= 60 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center text-orange-500">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            <span className="font-medium">Immediate Action Recommended</span>
                          </div>
                          <Button onClick={showConsultation} className="bg-shield-orange hover:bg-shield-orange/90 text-white">
                            <Shield className="mr-2 h-4 w-4" />
                            Get Expert Security Consultation
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Compliance Checker Tab */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-shield-green/10 to-transparent border-shield-green/30">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat flex items-center">
                  <CheckCircle className="mr-2 h-6 w-6 text-shield-gold" />
                  Compliance Checker
                </CardTitle>
                <CardDescription>
                  Verify your compliance with industry standards and regulations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Compliance Standard</label>
                  <Select value={selectedStandard} onValueChange={setSelectedStandard}>
                    <SelectTrigger className="bg-shield-dark/50 border-shield-blue/30">
                      <SelectValue placeholder="Choose a compliance standard" />
                    </SelectTrigger>
                    <SelectContent>
                      {complianceStandards.map(standard => (
                        <SelectItem key={standard.id} value={standard.id}>
                          {standard.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedStandardData && (
                  <div className="space-y-4">
                    <div className="bg-shield-blue/5 p-4 rounded-lg border border-shield-blue/20">
                      <h3 className="font-medium text-lg mb-2">{selectedStandardData.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedStandardData.description}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Requirements Checklist:</h4>
                      {selectedStandardData.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-shield-dark/20 rounded-lg">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleComplianceCheck(`${selectedStandard}-${index}`)}
                          >
                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                              complianceChecks[`${selectedStandard}-${index}`] 
                                ? 'bg-shield-green border-shield-green' 
                                : 'border-muted-foreground hover:border-shield-green'
                            }`}>
                              {complianceChecks[`${selectedStandard}-${index}`] && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                          <span
                            className="flex-1 cursor-pointer text-sm"
                            onClick={() => handleComplianceCheck(`${selectedStandard}-${index}`)}
                          >
                            {requirement}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-4">
                      <Button onClick={showConsultation} className="bg-shield-green hover:bg-shield-green/90 text-white">
                        <FileText className="mr-2 h-4 w-4" />
                        Get Compliance Consultation
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Incident Response Tab */}
        {activeTab === 'incident-response' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-red-500/10 to-transparent border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat flex items-center">
                  <AlertTriangle className="mr-2 h-6 w-6 text-shield-gold" />
                  Incident Response Planner
                </CardTitle>
                <CardDescription>
                  Step-by-step response guides for security incidents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Incident Type</label>
                  <Select value={selectedIncident} onValueChange={setSelectedIncident}>
                    <SelectTrigger className="bg-shield-dark/50 border-shield-blue/30">
                      <SelectValue placeholder="Choose the type of security incident" />
                    </SelectTrigger>
                    <SelectContent>
                      {incidentTypes.map(incident => (
                        <SelectItem key={incident.id} value={incident.id}>
                          <div className="flex items-center">
                            <AlertCircle className={`h-4 w-4 mr-2 ${
                              incident.severity === 'critical' ? 'text-red-500' :
                              incident.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'
                            }`} />
                            {incident.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedIncidentData && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border-2 ${
                      selectedIncidentData.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                      selectedIncidentData.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                      'bg-yellow-500/10 border-yellow-500/30'
                    }`}>
                      <div className="flex items-center mb-2">
                        <AlertCircle className={`h-5 w-5 mr-2 ${
                          selectedIncidentData.severity === 'critical' ? 'text-red-500' :
                          selectedIncidentData.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'
                        }`} />
                        <h3 className="font-medium text-lg">{selectedIncidentData.name}</h3>
                        <Badge className={`ml-auto ${
                          selectedIncidentData.severity === 'critical' ? 'bg-red-500' :
                          selectedIncidentData.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                        } text-white`}>
                          {selectedIncidentData.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-shield-gold" />
                        Response Steps (Follow in Order):
                      </h4>
                      {selectedIncidentData.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-shield-dark/20 rounded-lg">
                          <div className="bg-shield-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-shield-gold/10 p-4 rounded-lg border border-shield-gold/30">
                      <h4 className="font-medium text-shield-gold mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Emergency Contact
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        If you need immediate expert assistance with this incident:
                      </p>
                      <Button onClick={showConsultation} className="bg-shield-orange hover:bg-shield-orange/90 text-white">
                        <Eye className="mr-2 h-4 w-4" />
                        Get Emergency Support
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Audit Scheduler Tab */}
        {activeTab === 'audit-scheduler' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-shield-gold/10 to-transparent border-shield-gold/30">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat flex items-center">
                  <CalendarIcon className="mr-2 h-6 w-6 text-shield-gold" />
                  Security Audit Scheduler
                </CardTitle>
                <CardDescription>
                  Schedule a professional security audit for your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Audit Type</label>
                      <Select value={auditType} onValueChange={setAuditType}>
                        <SelectTrigger className="bg-shield-dark/50 border-shield-blue/30">
                          <SelectValue placeholder="Select audit type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprehensive">Comprehensive Security Audit</SelectItem>
                          <SelectItem value="network">Network Security Assessment</SelectItem>
                          <SelectItem value="compliance">Compliance Audit</SelectItem>
                          <SelectItem value="penetration">Penetration Testing</SelectItem>
                          <SelectItem value="vulnerability">Vulnerability Assessment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-shield-dark/50 border-shield-blue/30"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {auditDate ? format(auditDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={auditDate}
                            onSelect={setAuditDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Name</label>
                      <Input
                        placeholder="Your full name"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-shield-dark/50 border-shield-blue/30 text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your.email@company.com"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-shield-dark/50 border-shield-blue/30 text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input
                        placeholder="+233 XX XXX XXXX"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-shield-dark/50 border-shield-blue/30 text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name</label>
                      <Input
                        placeholder="Your company name"
                        value={contactInfo.company}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                        className="bg-shield-dark/50 border-shield-blue/30 text-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-shield-blue/5 p-6 rounded-lg border border-shield-blue/20">
                  <h3 className="font-medium text-lg mb-4 flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-shield-gold" />
                    What's Included in Your Security Audit:
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-shield-green mr-2" />
                      Network vulnerability assessment
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-shield-green mr-2" />
                      Security policy review
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-shield-green mr-2" />
                      Access control evaluation
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-shield-green mr-2" />
                      Compliance gap analysis
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-shield-green mr-2" />
                      Risk assessment report
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-shield-green mr-2" />
                      Remediation recommendations
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={showConsultation}
                    className="bg-shield-gold hover:bg-shield-gold/90 text-shield-dark font-medium px-8 py-3"
                    disabled={!auditType || !auditDate || !contactInfo.name || !contactInfo.email}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Schedule Security Audit
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Our security experts will contact you within 24 hours to confirm your appointment
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}