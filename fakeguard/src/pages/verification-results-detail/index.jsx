import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CredibilityOverview from './components/CredibilityOverview';
import DetailedFindings from './components/DetailedFindings';
import SourceAnalysis from './components/SourceAnalysis';
import SupportingEvidence from './components/SupportingEvidence';
import ActionPanel from './components/ActionPanel';
import ComparisonTools from './components/ComparisonTools';

const VerificationResultsDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock verification result data
  const verificationResult = {
    id: "VR-2024-07-001",
    analysisId: "AN-789456123",
    title: "Breaking: New Climate Change Study Reveals Shocking Temperature Predictions",
    originalUrl: "https://example-news.com/climate-study-2024",
    submittedAt: "2024-07-24T10:15:00Z",
    processedAt: "2024-07-24T10:17:13Z",
    processingTime: 2.3,
    modelVersion: "FakeGuard-AI-v3.2",
    credibilityScore: 78,
    confidenceLevel: 92,
    sourcesChecked: 15,
    factCheckStatus: "verified",
    sourceReliability: "high",
    biasDetection: "minimal",
    status: "completed",
    thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=300&fit=crop"
  };

  const detailedFindings = [
    {
      title: "Statistical Data Verification",
      category: "Data Accuracy",
      severity: "low",
      confidence: 94,
      impact: "Low",
      description: "The statistical data presented in the article has been cross-referenced with multiple authoritative sources. Most figures align with recent peer-reviewed research, though some projections extend beyond current scientific consensus.",
      evidence: "Temperature increase projections of 2.5°C by 2050 align with IPCC AR6 Working Group I report within acceptable variance margins.",
      recommendations: [
        "Verify projection methodologies with original research papers",
        "Cross-reference with additional climate modeling studies",
        "Consider uncertainty ranges in temperature predictions"
      ]
    },
    {
      title: "Source Attribution Issues",
      category: "Citation Quality",
      severity: "medium",
      confidence: 87,
      impact: "Medium",
      description: "Several key claims lack proper attribution to primary sources. While the information appears accurate, the absence of direct citations reduces the article's credibility and makes fact-checking more difficult.",
      evidence: "Claims about Arctic ice loss rates reference 'recent studies' without specific journal citations or researcher names.",
      recommendations: [
        "Request specific citations from the publication",
        "Verify claims through direct source consultation",
        "Flag for editorial review regarding citation standards"
      ]
    },
    {
      title: "Sensationalized Headlines",
      category: "Editorial Bias",
      severity: "medium",
      confidence: 91,
      impact: "Medium",
      description: "The headline uses emotionally charged language ('shocking') that may amplify reader reactions beyond what the scientific data supports. This represents a common form of editorial bias in climate reporting.",
      evidence: "Headline emphasizes 'shocking' predictions while the study itself uses measured scientific language about 'significant' changes.",
      recommendations: [
        "Compare headline tone with source material",
        "Assess whether emotional language is justified by data",
        "Consider alternative headline formulations"
      ]
    }
  ];

  const sourceAnalysis = [
    {
      title: "Climate Research Institute Study",
      domain: "climate-research.org",
      favicon: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=32&h=32&fit=crop",
      reliabilityScore: 9.2,
      reliabilityReason: "Peer-reviewed research from established climate science institution with strong methodological standards",
      authorityScore: 9.5,
      accuracyScore: 9.0,
      biasLevel: "Minimal",
      factChecked: true,
      publishDate: "2024-07-20",
      views: "12,450",
      shares: "892"
    },
    {
      title: "Environmental News Network Report",
      domain: "envnews.com",
      favicon: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=32&h=32&fit=crop",
      reliabilityScore: 7.8,
      reliabilityReason: "Reputable environmental journalism outlet with good fact-checking record, though occasionally sensationalizes headlines",
      authorityScore: 8.0,
      accuracyScore: 7.5,
      biasLevel: "Low",
      factChecked: true,
      publishDate: "2024-07-22",
      views: "45,230",
      shares: "2,156"
    },
    {
      title: "Global Weather Watch Blog",
      domain: "weatherwatch.blog",
      favicon: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=32&h=32&fit=crop",
      reliabilityScore: 6.1,
      reliabilityReason: "Independent blog with mixed accuracy record. Some posts lack proper scientific review and may contain speculation",
      authorityScore: 5.5,
      accuracyScore: 6.8,
      biasLevel: "Moderate",
      factChecked: false,
      publishDate: "2024-07-23",
      views: "8,920",
      shares: "445"
    }
  ];

  const supportingEvidence = {
    citations: [
      {
        title: "Global Temperature Anomalies and Climate Sensitivity: A Comprehensive Analysis",
        source: "Nature Climate Change",
        credibilityScore: 9.5,
        abstract: "This study presents a comprehensive analysis of global temperature anomalies over the past century, utilizing advanced climate modeling techniques to assess climate sensitivity parameters. Our findings indicate accelerated warming trends in polar regions with significant implications for sea level rise projections.",
        publishDate: "2024-06-15",
        citationCount: 127,
        impactFactor: 8.9
      },
      {
        title: "Arctic Ice Sheet Dynamics and Future Projections",
        source: "Journal of Glaciology",
        credibilityScore: 9.2,
        abstract: "Analysis of satellite data from 1979-2024 reveals accelerating ice loss in Greenland and Antarctic ice sheets. Our models project continued acceleration under current emission scenarios, with potential for non-linear responses in ice sheet dynamics.",
        publishDate: "2024-05-28",
        citationCount: 89,
        impactFactor: 7.2
      }
    ],
    relatedArticles: [
      {
        title: "IPCC Report Confirms Accelerating Climate Change Impacts",
        source: "Scientific American",
        thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=200&h=150&fit=crop",
        publishDate: "2024-07-18",
        relevanceScore: 94
      },
      {
        title: "New Climate Models Show Faster Warming Than Previously Predicted",
        source: "The Guardian",
        thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=200&h=150&fit=crop",
        publishDate: "2024-07-15",
        relevanceScore: 87
      }
    ],
    expertOpinions: [
      {
        expertName: "Dr. Sarah Chen",
        credentials: "Climate Scientist, MIT",
        expertPhoto: "https://randomuser.me/api/portraits/women/45.jpg",
        credibilityScore: 9.1,
        statement: "The temperature projections align with our latest climate models, though the timeline may be conservative given recent acceleration in feedback loops.",
        date: "2024-07-22",
        platform: "Twitter"
      },
      {
        expertName: "Prof. Michael Rodriguez",
        credentials: "Atmospheric Physics, Stanford University",
        expertPhoto: "https://randomuser.me/api/portraits/men/52.jpg",
        credibilityScore: 8.9,
        statement: "While the overall trends are accurate, we need more data on regional variations and tipping point thresholds before making definitive predictions.",
        date: "2024-07-21",
        platform: "LinkedIn"
      }
    ],
    mediaEvidence: [
      {
        type: "image",
        title: "Arctic Ice Coverage Comparison 2000 vs 2024",
        description: "Satellite imagery showing dramatic reduction in Arctic sea ice extent",
        thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        source: "NASA Earth Observatory"
      },
      {
        type: "video",
        title: "Climate Scientist Explains New Temperature Models",
        description: "Dr. Chen discusses methodology behind latest climate projections",
        thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=200&fit=crop",
        source: "MIT Climate Portal"
      }
    ]
  };

  const similarClaims = [
    {
      id: "SC-001",
      title: "Scientists Warn of Unprecedented Global Warming Acceleration",
      source: "Reuters",
      date: "2024-07-20",
      thumbnail: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=150&h=100&fit=crop",
      credibilityScore: 82,
      similarity: 89,
      summary: "International team of researchers publishes findings on accelerated warming trends with similar temperature projections."
    },
    {
      id: "SC-002",
      title: "Climate Change Impacts Happening Faster Than Expected",
      source: "BBC News",
      date: "2024-07-19",
      thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=150&h=100&fit=crop",
      credibilityScore: 85,
      similarity: 76,
      summary: "Report on climate impacts occurring ahead of previous scientific predictions, with focus on temperature increases."
    },
    {
      id: "SC-003",
      title: "New Study: Earth Warming at Record Pace",
      source: "Associated Press",
      date: "2024-07-18",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=100&fit=crop",
      credibilityScore: 88,
      similarity: 72,
      summary: "Analysis of global temperature data reveals record-breaking warming rates with implications for climate policy."
    }
  ];

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'findings', label: 'Findings', icon: 'Search' },
    { id: 'sources', label: 'Sources', icon: 'Globe' },
    { id: 'evidence', label: 'Evidence', icon: 'Database' },
    { id: 'comparison', label: 'Comparison', icon: 'GitCompare' },
    { id: 'actions', label: 'Actions', icon: 'Settings' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = (platform) => {
    console.log(`Sharing to ${platform}`);
    // Implement sharing logic
  };

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
    // Implement export logic
  };

  const handleBookmark = (bookmarked) => {
    console.log(`Bookmark status: ${bookmarked}`);
    // Implement bookmark logic
  };

  const handleReport = () => {
    console.log('Reporting issue');
    // Implement report logic
  };

  const handleCompare = (selectedClaims) => {
    console.log('Comparing claims:', selectedClaims);
    // Implement comparison logic
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <CredibilityOverview result={verificationResult} />;
      case 'findings':
        return <DetailedFindings findings={detailedFindings} />;
      case 'sources':
        return <SourceAnalysis sources={sourceAnalysis} />;
      case 'evidence':
        return <SupportingEvidence evidence={supportingEvidence} />;
      case 'comparison':
        return (
          <ComparisonTools
            currentResult={verificationResult}
            similarClaims={similarClaims}
            onCompare={handleCompare}
          />
        );
      case 'actions':
        return (
          <ActionPanel
            result={verificationResult}
            onShare={handleShare}
            onExport={handleExport}
            onBookmark={handleBookmark}
            onReport={handleReport}
          />
        );
      default:
        return <CredibilityOverview result={verificationResult} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading verification results...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Verification Results
                </h1>
                <p className="text-muted-foreground max-w-3xl">
                  Comprehensive analysis of "{verificationResult.title}" with detailed credibility assessment, source verification, and supporting evidence.
                </p>
              </div>
              <div className="flex items-center space-x-3 ml-6">
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={() => navigate('/main-dashboard')}
                >
                  Back to Dashboard
                </Button>
                <Button
                  variant="default"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location.reload()}
                >
                  Re-analyze
                </Button>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="bg-card rounded-lg border border-border p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Analyzed {new Date(verificationResult.processedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Zap" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Processing time: {verificationResult.processingTime}s
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Database" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Model: {verificationResult.modelVersion}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
                  <a
                    href={verificationResult.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 transition-smooth"
                  >
                    View Original Article
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 border-b border-border">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-smooth ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section.icon} size={16} />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            {renderSection()}
          </div>

          {/* Educational Footer */}
          <div className="bg-muted/50 rounded-lg p-6 border border-border">
            <div className="flex items-start space-x-3">
              <Icon name="BookOpen" size={20} className="text-primary mt-1" />
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  Understanding Verification Results
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our AI-powered verification system analyzes content across multiple dimensions including source credibility, 
                  fact-checking databases, expert opinions, and cross-referencing with verified information. Credibility scores 
                  represent the likelihood that information is accurate based on available evidence.
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>• Scores above 80% indicate high credibility</span>
                  <span>• Scores 60-79% suggest moderate credibility with some concerns</span>
                  <span>• Scores below 60% indicate significant credibility issues</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationResultsDetail;