import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonTools = ({ currentResult, similarClaims, onCompare }) => {
  const [selectedClaims, setSelectedClaims] = useState([]);
  const [comparisonView, setComparisonView] = useState('grid');

  const handleClaimSelection = (claimId) => {
    setSelectedClaims(prev => {
      if (prev.includes(claimId)) {
        return prev.filter(id => id !== claimId);
      } else if (prev.length < 3) {
        return [...prev, claimId];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedClaims.length > 0) {
      onCompare?.(selectedClaims);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-accent/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const getSimilarityColor = (similarity) => {
    if (similarity >= 80) return 'text-primary';
    if (similarity >= 60) return 'text-secondary';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Similar Claims Comparison
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="GitCompare" size={20} className="text-primary" />
            <span className="text-sm font-caption text-muted-foreground">
              {similarClaims.length} Similar Claims Found
            </span>
          </div>
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setComparisonView('grid')}
              className={`p-1 rounded transition-smooth ${
                comparisonView === 'grid' ? 'bg-card shadow-sm' : 'hover:bg-card/50'
              }`}
            >
              <Icon name="Grid3X3" size={16} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setComparisonView('list')}
              className={`p-1 rounded transition-smooth ${
                comparisonView === 'list' ? 'bg-card shadow-sm' : 'hover:bg-card/50'
              }`}
            >
              <Icon name="List" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Selection Controls */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="CheckSquare" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            Select up to 3 claims to compare ({selectedClaims.length}/3)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {selectedClaims.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setSelectedClaims([])}
            >
              Clear
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            iconName="GitCompare"
            disabled={selectedClaims.length === 0}
            onClick={handleCompare}
          >
            Compare Selected
          </Button>
        </div>
      </div>

      {/* Current Result Card */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-primary" />
          <span>Current Analysis</span>
        </h3>
        <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
          <div className="flex items-start space-x-3">
            <Image
              src={currentResult.thumbnail}
              alt="Current analysis"
              className="w-16 h-16 rounded object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1 line-clamp-2">
                {currentResult.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {currentResult.source} • {currentResult.date}
              </p>
              <div className="flex items-center space-x-4">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(currentResult.credibilityScore)} ${getScoreColor(currentResult.credibilityScore)}`}>
                  {currentResult.credibilityScore}% Credible
                </div>
                <span className="text-xs text-muted-foreground">
                  {currentResult.sourcesChecked} sources verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Claims */}
      <div>
        <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Search" size={16} className="text-primary" />
          <span>Similar Claims</span>
        </h3>
        
        <div className={comparisonView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {similarClaims.map((claim) => (
            <div
              key={claim.id}
              className={`border rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-card ${
                selectedClaims.includes(claim.id) 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleClaimSelection(claim.id)}
            >
              <div className="flex items-start space-x-3">
                {comparisonView === 'grid' && (
                  <Image
                    src={claim.thumbnail}
                    alt={claim.title}
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground line-clamp-2 text-sm">
                      {claim.title}
                    </h4>
                    <div className="flex items-center space-x-1 ml-2">
                      {selectedClaims.includes(claim.id) && (
                        <Icon name="CheckCircle" size={16} className="text-primary" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {claim.source} • {claim.date}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(claim.credibilityScore)} ${getScoreColor(claim.credibilityScore)}`}>
                      {claim.credibilityScore}%
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="GitCompare" size={12} className={getSimilarityColor(claim.similarity)} />
                      <span className={`text-xs font-medium ${getSimilarityColor(claim.similarity)}`}>
                        {claim.similarity}% similar
                      </span>
                    </div>
                  </div>
                  
                  {comparisonView === 'list' && (
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {claim.summary}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Insights */}
      {similarClaims.length > 0 && (
        <div className="mt-6 bg-muted/50 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span>Comparison Insights</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {Math.round(similarClaims.reduce((acc, claim) => acc + claim.credibilityScore, 0) / similarClaims.length)}%
              </div>
              <div className="text-muted-foreground">Avg. Credibility</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">
                {Math.round(similarClaims.reduce((acc, claim) => acc + claim.similarity, 0) / similarClaims.length)}%
              </div>
              <div className="text-muted-foreground">Avg. Similarity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {similarClaims.filter(claim => claim.credibilityScore >= 70).length}
              </div>
              <div className="text-muted-foreground">Credible Claims</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTools;