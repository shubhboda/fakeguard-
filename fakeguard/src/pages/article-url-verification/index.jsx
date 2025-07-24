import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import UrlInputForm from './components/UrlInputForm';
import AnalysisProgress from './components/AnalysisProgress';
import RecentAnalyses from './components/RecentAnalyses';
import AdvancedOptions from './components/AdvancedOptions';
import LiveResults from './components/LiveResults';
import { useNavigate } from 'react-router-dom';

const ArticleUrlVerification = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Advanced options state
  const [advancedOptions, setAdvancedOptions] = useState({
    checkWhitelist: true,
    historicalComparison: false,
    deepFactChecking: true,
    socialMediaAnalysis: false,
    includeEvidence: true,
    includeSourceAnalysis: true,
    generateCharts: false,
    emailAlerts: false,
    browserNotifications: true
  });

  // Mock recent analyses data
  const recentAnalyses = [
    {
      id: 1,
      headline: "Breaking: Major Climate Agreement Reached at Global Summit",
      source: "Reuters",
      url: "https://reuters.com/climate-agreement-2024",
      credibilityScore: 92,
      sourceRating: 5,
      factChecks: 8,
      timestamp: new Date(Date.now() - 3600000),
      processingTime: 23,
      summary: "Comprehensive analysis confirms the authenticity of this breaking news report. Multiple credible sources corroborate the information, and the reporting follows established journalistic standards.",
      keyFindings: [
        "Source verified as highly credible news organization",
        "Multiple independent confirmations found",
        "No contradictory evidence discovered",
        "Reporting style consistent with factual journalism"
      ]
    },
    {
      id: 2,
      headline: "Miracle Cure Discovered by Local Doctor Shocks Medical Community",
      source: "HealthNews24",
      url: "https://healthnews24.com/miracle-cure-discovery",
      credibilityScore: 23,
      sourceRating: 2,
      factChecks: 12,
      timestamp: new Date(Date.now() - 7200000),
      processingTime: 31,
      summary: "Analysis reveals significant credibility concerns with this health claim. The source lacks medical authority, and no peer-reviewed evidence supports the extraordinary claims made.",
      keyFindings: [
        "Source not recognized as medical authority",
        "No peer-reviewed studies cited",
        "Claims contradict established medical consensus",
        "Similar false claims previously debunked"
      ]
    },
    {
      id: 3,
      headline: "Tech Giant Announces Revolutionary AI Breakthrough",
      source: "TechCrunch",
      url: "https://techcrunch.com/ai-breakthrough-2024",
      credibilityScore: 78,
      sourceRating: 4,
      factChecks: 6,
      timestamp: new Date(Date.now() - 10800000),
      processingTime: 18,
      summary: "Generally credible report with some areas requiring additional verification. The source is reputable, but some technical claims need expert validation.",
      keyFindings: [
        "Reputable technology news source",
        "Company statements verified",
        "Some technical details require expert review",
        "No contradictory information found"
      ]
    }
  ];

  // Simulate analysis process
  const simulateAnalysis = async (url) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep(1);
    setShowResults(false);
    setAnalysisResults(null);

    // Simulate progress through steps
    const steps = [
      { step: 1, duration: 2000, progress: 20 },
      { step: 2, duration: 3000, progress: 45 },
      { step: 3, duration: 2500, progress: 70 },
      { step: 4, duration: 2000, progress: 90 },
      { step: 5, duration: 1500, progress: 100 }
    ];

    for (const stepData of steps) {
      setCurrentStep(stepData.step);
      
      // Animate progress
      const startProgress = analysisProgress;
      const targetProgress = stepData.progress;
      const duration = stepData.duration;
      const startTime = Date.now();

      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentProgress = startProgress + (targetProgress - startProgress) * progress;
        
        setAnalysisProgress(Math.round(currentProgress));
        
        if (progress < 1) {
          requestAnimationFrame(animateProgress);
        }
      };
      
      animateProgress();
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    // Generate mock results
    const mockResults = {
      id: Date.now(),
      url: url,
      headline: "Global Economic Summit Addresses Climate Change Funding",
      source: "Associated Press",
      author: "Sarah Johnson",
      publishDate: "July 24, 2024",
      credibilityScore: 87,
      sourceRating: 5,
      factCheckReferences: [
        { source: "Snopes", status: "verified" },
        { source: "FactCheck.org", status: "verified" },
        { source: "PolitiFact", status: "verified" },
        { source: "Reuters Fact Check", status: "disputed" }
      ],
      evidenceBreakdown: [
        {
          category: "Source Credibility",
          confidence: 95,
          description: "Associated Press is a highly credible news organization with established editorial standards and fact-checking processes."
        },
        {
          category: "Content Analysis",
          confidence: 82,
          description: "Article content follows journalistic standards with proper attribution and balanced reporting. Some claims require additional verification."
        },
        {
          category: "Cross-Reference Check",
          confidence: 88,
          description: "Multiple independent sources confirm key facts. Minor discrepancies found in specific details but overall narrative is consistent."
        },
        {
          category: "Historical Context",
          confidence: 91,
          description: "Information aligns with historical patterns and previous reporting on similar topics. No contradictory evidence found."
        }
      ]
    };

    setAnalysisResults(mockResults);
    setShowResults(true);
    setIsAnalyzing(false);
  };

  const handleAnalyze = (url) => {
    simulateAnalysis(url);
  };

  const handleViewDetails = (analysisId) => {
    navigate('/verification-results-detail', { 
      state: { 
        analysisId: analysisId,
        type: 'url'
      } 
    });
  };

  const handleAdvancedOptionsChange = (newOptions) => {
    setAdvancedOptions(newOptions);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Article URL Verification</h1>
            <p className="text-muted-foreground">
              Analyze news articles by submitting web links for comprehensive credibility assessment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Input and Options */}
            <div className="lg:col-span-2 space-y-6">
              <UrlInputForm 
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
              
              <AnalysisProgress 
                isVisible={isAnalyzing}
                progress={analysisProgress}
                currentStep={currentStep}
              />
              
              <LiveResults 
                results={analysisResults}
                isVisible={showResults}
              />
              
              <AdvancedOptions 
                options={advancedOptions}
                onOptionsChange={handleAdvancedOptionsChange}
              />
            </div>

            {/* Right Column - Recent Analyses */}
            <div className="lg:col-span-1">
              <RecentAnalyses 
                analyses={recentAnalyses}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleUrlVerification;