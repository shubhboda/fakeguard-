import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const AdvancedOptions = ({ options, onOptionsChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [batchUrls, setBatchUrls] = useState('');

  const handleOptionChange = (key, value) => {
    onOptionsChange({
      ...options,
      [key]: value
    });
  };

  const handleBatchUpload = () => {
    const urls = batchUrls.split('\n').filter(url => url.trim());
    if (urls.length > 0) {
      alert(`Batch processing ${urls.length} URLs would be initiated here.`);
      setBatchUrls('');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-foreground">Advanced Options</h3>
            <p className="text-sm text-muted-foreground">Configure analysis settings and batch processing</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="space-y-6 mt-6">
            {/* Analysis Options */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Analysis Settings</h4>
              <div className="space-y-3">
                <Checkbox
                  label="Check against source whitelist"
                  description="Verify if the source is in your trusted whitelist"
                  checked={options.checkWhitelist}
                  onChange={(e) => handleOptionChange('checkWhitelist', e.target.checked)}
                />
                <Checkbox
                  label="Historical comparison"
                  description="Compare with previously analyzed versions of this article"
                  checked={options.historicalComparison}
                  onChange={(e) => handleOptionChange('historicalComparison', e.target.checked)}
                />
                <Checkbox
                  label="Deep fact-checking"
                  description="Perform comprehensive cross-reference with multiple fact-checking databases"
                  checked={options.deepFactChecking}
                  onChange={(e) => handleOptionChange('deepFactChecking', e.target.checked)}
                />
                <Checkbox
                  label="Social media analysis"
                  description="Analyze how this article is being shared and discussed on social platforms"
                  checked={options.socialMediaAnalysis}
                  onChange={(e) => handleOptionChange('socialMediaAnalysis', e.target.checked)}
                />
              </div>
            </div>

            {/* Batch Processing */}
            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground mb-4">Batch Processing</h4>
              <div className="space-y-4">
                <Input
                  label="Multiple URLs"
                  type="textarea"
                  placeholder={`Enter multiple URLs, one per line:\nhttps://example1.com/article\nhttps://example2.com/article\nhttps://example3.com/article`}
                  value={batchUrls}
                  onChange={(e) => setBatchUrls(e.target.value)}
                  description="Paste multiple URLs to analyze them in batch"
                  className="min-h-24"
                />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {batchUrls.split('\n').filter(url => url.trim()).length} URLs detected
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleBatchUpload}
                    disabled={!batchUrls.trim()}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Process Batch
                  </Button>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground mb-4">Export Settings</h4>
              <div className="space-y-3">
                <Checkbox
                  label="Include detailed evidence"
                  description="Add comprehensive evidence breakdown to exported reports"
                  checked={options.includeEvidence}
                  onChange={(e) => handleOptionChange('includeEvidence', e.target.checked)}
                />
                <Checkbox
                  label="Include source analysis"
                  description="Add source credibility assessment to reports"
                  checked={options.includeSourceAnalysis}
                  onChange={(e) => handleOptionChange('includeSourceAnalysis', e.target.checked)}
                />
                <Checkbox
                  label="Generate visual charts"
                  description="Include credibility charts and graphs in exported reports"
                  checked={options.generateCharts}
                  onChange={(e) => handleOptionChange('generateCharts', e.target.checked)}
                />
              </div>
            </div>

            {/* Notification Settings */}
            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-semibold text-foreground mb-4">Notifications</h4>
              <div className="space-y-3">
                <Checkbox
                  label="Email completion alerts"
                  description="Receive email notifications when analysis is complete"
                  checked={options.emailAlerts}
                  onChange={(e) => handleOptionChange('emailAlerts', e.target.checked)}
                />
                <Checkbox
                  label="Browser notifications"
                  description="Show browser notifications for analysis updates"
                  checked={options.browserNotifications}
                  onChange={(e) => handleOptionChange('browserNotifications', e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;