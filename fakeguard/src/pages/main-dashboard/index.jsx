import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WelcomeSection from './components/WelcomeSection';
import QuickActionCard from './components/QuickActionCard';
import QuickSearchBar from './components/QuickSearchBar';
import MetricCard from './components/MetricCard';
import ActivityFeedItem from './components/ActivityFeedItem';
import TrendingAlert from './components/TrendingAlert';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MainDashboard = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [trendingAlerts, setTrendingAlerts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for quick actions
  const quickActions = [
    {
      title: "Verify URL",
      description: "Analyze news articles and web content for credibility and fact-checking",
      icon: "Link",
      route: "/article-url-verification",
      color: "primary",
      stats: { count: 127, accuracy: 94 }
    },
    {
      title: "Verify Text",
      description: "Check text content, social media posts, and written claims for authenticity",
      icon: "FileText",
      route: "/text-content-verification",
      color: "secondary",
      stats: { count: 89, accuracy: 91 }
    },
    {
      title: "Verify Media",
      description: "Detect deepfakes, manipulated images, and altered video content",
      icon: "Upload",
      route: "/media-upload-verification",
      color: "accent",
      stats: { count: 45, accuracy: 87 }
    }
  ];

  // Mock data for metrics
  const metrics = [
    {
      title: "Verifications This Month",
      value: "1,247",
      change: "+12%",
      changeType: "increase",
      icon: "BarChart3",
      color: "primary"
    },
    {
      title: "Accuracy Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "increase",
      icon: "Target",
      color: "success"
    },
    {
      title: "Sources Checked",
      value: "15,892",
      change: "+8%",
      changeType: "increase",
      icon: "Database",
      color: "secondary"
    },
    {
      title: "Community Reports",
      value: "342",
      change: "-5%",
      changeType: "decrease",
      icon: "Users",
      color: "warning"
    }
  ];

  // Mock data for recent activity
  const mockActivity = [
    {
      id: 1,
      type: "url",
      title: "COVID-19 Vaccine Side Effects Study",
      content: "https://example.com/covid-vaccine-study",
      summary: "Analyzed medical research article about vaccine side effects. Cross-referenced with peer-reviewed sources and medical databases.",
      credibilityScore: 87,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      processingTime: 12,
      sourcesChecked: 8
    },
    {
      id: 2,
      type: "text",
      title: "Election Fraud Claims Analysis",
      content: "Claims about voting machine manipulation in recent elections...",
      summary: "Fact-checked claims about election security. Found no credible evidence supporting the allegations made in the text.",
      credibilityScore: 23,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      processingTime: 8,
      sourcesChecked: 12
    },
    {
      id: 3,
      type: "media",
      title: "Suspicious Celebrity Video",
      content: "celebrity_deepfake_video.mp4",
      summary: "Detected potential deepfake manipulation in celebrity endorsement video. AI analysis shows 78% probability of synthetic content.",
      credibilityScore: 34,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      processingTime: 45,
      sourcesChecked: 5
    },
    {
      id: 4,
      type: "url",
      title: "Climate Change Research Paper",
      content: "https://example.com/climate-research",
      summary: "Verified scientific paper on climate change impacts. All citations checked and methodology validated by expert sources.",
      credibilityScore: 96,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      processingTime: 18,
      sourcesChecked: 15
    }
  ];

  // Mock data for trending alerts
  const mockAlerts = [
    {
      id: 1,
      severity: "high",
      title: "Viral Misinformation About New Health Treatment",
      description: "False claims about miracle cure spreading rapidly across social media platforms. Multiple fact-checkers have debunked these claims.",
      spreadRate: "2,400",
      affectedUsers: "45,000"
    },
    {
      id: 2,
      severity: "medium",
      title: "Manipulated Political Speech Video",
      description: "Deepfake video of political figure making controversial statements detected. Original speech context was altered.",
      spreadRate: "890",
      affectedUsers: "12,000"
    }
  ];

  useEffect(() => {
    setRecentActivity(mockActivity);
    setTrendingAlerts(mockAlerts);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      // In a real app, you would fetch fresh data here
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <WelcomeSection />

          {/* Quick Search */}
          <QuickSearchBar />

          {/* Quick Actions */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
              <Button variant="ghost" size="sm" onClick={handleRefresh} loading={isRefreshing}>
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Refresh
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </section>

          {/* Metrics */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Statistics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
          </section>

          {/* Trending Alerts */}
          {trendingAlerts.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="TrendingUp" size={20} className="text-destructive" />
                <h2 className="text-xl font-semibold text-foreground">Trending Misinformation Alerts</h2>
              </div>
              <div className="space-y-4">
                {trendingAlerts.map((alert) => (
                  <TrendingAlert key={alert.id} alert={alert} />
                ))}
              </div>
            </section>
          )}

          {/* Recent Activity */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
              <Button variant="outline" size="sm">
                <Icon name="History" size={16} className="mr-2" />
                View All
              </Button>
            </div>
            
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((verification) => (
                  <ActivityFeedItem key={verification.id} verification={verification} />
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Recent Activity</h3>
                <p className="text-muted-foreground mb-4">Start verifying content to see your activity here</p>
                <Button variant="default">
                  Start Verification
                </Button>
              </div>
            )}
          </section>

          {/* Bottom Actions */}
          <section className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Need Help Getting Started?</h3>
                <p className="text-muted-foreground">Learn how to effectively use FakeGuard's verification tools</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Icon name="BookOpen" size={16} className="mr-2" />
                  User Guide
                </Button>
                <Button variant="default">
                  <Icon name="Play" size={16} className="mr-2" />
                  Watch Tutorial
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;