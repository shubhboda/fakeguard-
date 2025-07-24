import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import TextInputArea from './components/TextInputArea';
import ProcessingIndicator from './components/ProcessingIndicator';
import AnalysisResults from './components/AnalysisResults';
import SmartDetectionPanel from './components/SmartDetectionPanel';
import ReportModal from './components/ReportModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TextContentVerification = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [results, setResults] = useState(null);
  const [detectedElements, setDetectedElements] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Mock data for analysis results
  const mockResults = {
    credibilityScore: 73,
    summary: "The content contains a mix of verified facts and unsubstantiated claims. Several statistical assertions require additional verification from primary sources.",
    claimsAnalyzed: 8,
    sourcesChecked: 12,
    confidence: 85,
    keyFindings: [
      "3 out of 8 claims are fully verified by credible sources",
      "2 statistical assertions lack primary source attribution",
      "Content shows moderate political bias indicators",
      "Language analysis suggests emotional manipulation techniques"
    ],
    claims: [
      {
        text: "The unemployment rate has decreased by 15% in the last quarter",
        status: "verified",
        confidence: 92,
        explanation: "This claim is supported by official government statistics from the Bureau of Labor Statistics.",
        sources: [
          { name: "Bureau of Labor Statistics", url: "https://bls.gov" },
          { name: "Reuters Economic Report", url: "https://reuters.com" }
        ]
      },
      {
        text: "Scientists have discovered a cure for all forms of cancer",
        status: "false",
        confidence: 98,
        explanation: "This claim is completely false. While there have been advances in cancer treatment, no universal cure exists.",
        sources: [
          { name: "National Cancer Institute", url: "https://cancer.gov" },
          { name: "Medical Journal Review", url: "https://medical-journal.com" }
        ]
      },
      {
        text: "The new policy will affect 50 million citizens",
        status: "disputed",
        confidence: 45,
        explanation: "The exact number is disputed. Estimates range from 35-65 million depending on implementation details.",
        sources: [
          { name: "Policy Analysis Institute", url: "https://policy-institute.org" }
        ]
      }
    ],
    sources: [
      { name: "Reuters", type: "News Agency", reliability: "high" },
      { name: "Associated Press", type: "News Wire", reliability: "high" },
      { name: "Unknown Blog", type: "Blog", reliability: "low" },
      { name: "Government Statistics", type: "Official Data", reliability: "high" }
    ],
    languageAnalysis: {
      language: "English",
      sentiment: "neutral"
    },
    biasIndicators: [
      { type: "Political Bias", level: "medium" },
      { type: "Emotional Language", level: "high" },
      { type: "Selective Reporting", level: "low" }
    ],
    originalText: text,
    highlights: [
      { text: "unemployment rate has decreased by 15%", verified: true },
      { text: "cure for all forms of cancer", verified: false },
      { text: "50 million citizens", verified: false }
    ]
  };

  const mockDetectedElements = {
    claims: [
      "The unemployment rate has decreased by 15% in the last quarter",
      "Scientists have discovered a cure for all forms of cancer",
      "The new policy will affect 50 million citizens"
    ],
    quotes: [
      "According to the latest report",
      "Experts believe that"
    ],
    statistics: [
      "15% decrease",
      "50 million citizens",
      "85% approval rating"
    ],
    dates: [
      "last quarter",
      "January 2024",
      "next month"
    ]
  };

  const handleVerify = async () => {
    if (!text.trim()) return;

    setIsProcessing(true);
    setProgress(0);
    setResults(null);
    setDetectedElements(null);

    // Simulate processing steps
    const steps = [
      { step: 'Parsing Content', time: 1000 },
      { step: 'Identifying Claims', time: 1500 },
      { step: 'Checking Sources', time: 2000 },
      { step: 'AI Analysis', time: 2500 },
      { step: 'Generating Score', time: 1000 }
    ];

    let totalTime = steps.reduce((sum, step) => sum + step.time, 0);
    setEstimatedTime(`${Math.ceil(totalTime / 1000)}s`);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i].step);
      setProgress((i / steps.length) * 100);
      
      await new Promise(resolve => setTimeout(resolve, steps[i].time));
      
      if (i === 1) {
        // Show detected elements after claim identification
        setDetectedElements(mockDetectedElements);
      }
    }

    setProgress(100);
    setCurrentStep('Complete');
    
    // Show results after a brief delay
    setTimeout(() => {
      setResults(mockResults);
      setIsProcessing(false);
    }, 500);
  };

  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      originalText: text,
      results: results,
      platform: 'FakeGuard'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fakeguard-verification-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReport = () => {
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = (reportData) => {
    console.log('Report submitted:', reportData);
    setIsReportModalOpen(false);
    
    // Show success message (in a real app, this would be a toast notification)
    alert('Thank you for your report. We will review the content and take appropriate action.');
  };

  const handleElementClick = (elementType) => {
    const elements = detectedElements[elementType];
    console.log(`Clicked on ${elementType}:`, elements);
    
    // In a real app, this might scroll to highlighted text or show a detailed view
    alert(`Found ${elements.length} ${elementType} in the text. Check the analysis results for detailed verification.`);
  };

  const handleNewVerification = () => {
    setText('');
    setResults(null);
    setDetectedElements(null);
    setProgress(0);
    setCurrentStep('');
  };

  const handleViewDetailedResults = () => {
    navigate('/verification-results-detail', { 
      state: { 
        results: results,
        originalText: text,
        verificationType: 'text'
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Text Content Verification
                </h1>
                <p className="text-muted-foreground">
                  Analyze text content for misinformation and verify claims with AI-powered fact-checking
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">2.3M+</div>
                <div className="text-sm text-muted-foreground font-caption">Texts Verified</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">94%</div>
                <div className="text-sm text-muted-foreground font-caption">Accuracy Rate</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">&lt;30s</div>
                <div className="text-sm text-muted-foreground font-caption">Avg Analysis Time</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {!results && !isProcessing && (
            <>
              <TextInputArea
                text={text}
                setText={setText}
                onVerify={handleVerify}
                isProcessing={isProcessing}
              />

              {/* Help Section */}
              <div className="mt-8 bg-card rounded-lg border border-border shadow-card p-6">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  How Text Verification Works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Search" size={16} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Smart Detection</h4>
                        <p className="text-sm text-muted-foreground">
                          AI identifies claims, quotes, statistics, and key assertions automatically
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Database" size={16} className="text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Source Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          Cross-references claims with trusted databases and fact-checking sources
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="BarChart3" size={16} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Credibility Scoring</h4>
                        <p className="text-sm text-muted-foreground">
                          Generates comprehensive credibility scores with detailed explanations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Eye" size={16} className="text-warning" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Bias Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          Detects emotional language, political bias, and manipulation techniques
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Processing State */}
          {isProcessing && (
            <>
              <ProcessingIndicator
                isProcessing={isProcessing}
                progress={progress}
                currentStep={currentStep}
                estimatedTime={estimatedTime}
              />
              
              {detectedElements && (
                <SmartDetectionPanel
                  detectedElements={detectedElements}
                  onElementClick={handleElementClick}
                />
              )}
            </>
          )}

          {/* Results */}
          {results && !isProcessing && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Verification Complete
                </h2>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleNewVerification}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    New Verification
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleViewDetailedResults}
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    View Details
                  </Button>
                </div>
              </div>

              <AnalysisResults
                results={results}
                onExport={handleExport}
                onReport={handleReport}
              />
            </>
          )}
        </div>
      </main>

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
};

export default TextContentVerification;