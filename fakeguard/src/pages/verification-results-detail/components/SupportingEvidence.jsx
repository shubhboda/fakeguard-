import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SupportingEvidence = ({ evidence }) => {
  const [activeTab, setActiveTab] = useState('citations');
  const [expandedCitation, setExpandedCitation] = useState(null);

  const tabs = [
    { id: 'citations', label: 'Citations', icon: 'FileText', count: evidence.citations?.length || 0 },
    { id: 'related', label: 'Related Articles', icon: 'Link', count: evidence.relatedArticles?.length || 0 },
    { id: 'experts', label: 'Expert Opinions', icon: 'Users', count: evidence.expertOpinions?.length || 0 },
    { id: 'media', label: 'Media Evidence', icon: 'Image', count: evidence.mediaEvidence?.length || 0 }
  ];

  const getCredibilityColor = (score) => {
    if (score >= 8) return 'text-accent';
    if (score >= 6) return 'text-warning';
    return 'text-destructive';
  };

  const getCredibilityBg = (score) => {
    if (score >= 8) return 'bg-accent/10';
    if (score >= 6) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const renderCitations = () => (
    <div className="space-y-4">
      {evidence.citations?.map((citation, index) => (
        <div key={index} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedCitation(expandedCitation === index ? null : index)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${getCredibilityBg(citation.credibilityScore)}`}>
                <Icon name="FileText" size={16} className={getCredibilityColor(citation.credibilityScore)} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-foreground">{citation.title}</h3>
                <p className="text-sm text-muted-foreground">{citation.source}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCredibilityBg(citation.credibilityScore)} ${getCredibilityColor(citation.credibilityScore)}`}>
                {citation.credibilityScore}/10
              </span>
              <Icon 
                name={expandedCitation === index ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground" 
              />
            </div>
          </button>

          {expandedCitation === index && (
            <div className="px-4 pb-4 border-t border-border bg-muted/20">
              <div className="pt-4 space-y-3">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Abstract</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {citation.abstract}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Published: {citation.publishDate}</span>
                  <span>Citations: {citation.citationCount}</span>
                  <span>Impact Factor: {citation.impactFactor}</span>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
                    View Full Paper
                  </button>
                  <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
                    Export Citation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderRelatedArticles = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {evidence.relatedArticles?.map((article, index) => (
        <div key={index} className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth">
          <div className="flex items-start space-x-3">
            <Image
              src={article.thumbnail}
              alt={article.title}
              className="w-16 h-16 rounded object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {article.source}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {article.publishDate}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={12} className="text-accent" />
                  <span className="text-xs text-accent">{article.relevanceScore}% match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExpertOpinions = () => (
    <div className="space-y-4">
      {evidence.expertOpinions?.map((opinion, index) => (
        <div key={index} className="border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Image
              src={opinion.expertPhoto}
              alt={opinion.expertName}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium text-foreground">{opinion.expertName}</h3>
                  <p className="text-sm text-muted-foreground">{opinion.credentials}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCredibilityBg(opinion.credibilityScore)} ${getCredibilityColor(opinion.credibilityScore)}`}>
                  {opinion.credibilityScore}/10
                </div>
              </div>
              <blockquote className="text-sm text-foreground italic mb-2">
                "{opinion.statement}"
              </blockquote>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{opinion.date}</span>
                <span>{opinion.platform}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMediaEvidence = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {evidence.mediaEvidence?.map((media, index) => (
        <div key={index} className="border border-border rounded-lg overflow-hidden">
          <div className="aspect-video bg-muted relative">
            <Image
              src={media.thumbnail}
              alt={media.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded text-xs font-medium bg-black/70 text-white`}>
                {media.type.toUpperCase()}
              </span>
            </div>
            {media.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/80 transition-smooth">
                  <Icon name="Play" size={20} color="white" />
                </button>
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium text-foreground mb-1 line-clamp-2">
              {media.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {media.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{media.source}</span>
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={12} className="text-accent" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'citations':
        return renderCitations();
      case 'related':
        return renderRelatedArticles();
      case 'experts':
        return renderExpertOpinions();
      case 'media':
        return renderMediaEvidence();
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Supporting Evidence
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Database" size={20} className="text-primary" />
          <span className="text-sm font-caption text-muted-foreground">
            Comprehensive Analysis
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-smooth ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="font-medium">{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id ? 'bg-primary-foreground/20' : 'bg-muted'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SupportingEvidence;