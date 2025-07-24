import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [reportData, setReportData] = useState({
    reason: '',
    description: '',
    categories: [],
    email: '',
    anonymous: false
  });

  const reportReasons = [
    { id: 'misinformation', label: 'Contains Misinformation', description: 'False or misleading information' },
    { id: 'bias', label: 'Biased Content', description: 'Shows clear political or ideological bias' },
    { id: 'spam', label: 'Spam or Promotional', description: 'Promotional content or spam' },
    { id: 'harmful', label: 'Harmful Content', description: 'Could cause harm if believed' },
    { id: 'other', label: 'Other', description: 'Other concerns not listed above' }
  ];

  const handleReasonChange = (reason) => {
    setReportData(prev => ({ ...prev, reason }));
  };

  const handleCategoryChange = (category, checked) => {
    setReportData(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reportData);
    setReportData({
      reason: '',
      description: '',
      categories: [],
      email: '',
      anonymous: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Report Content
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              What's the issue with this content?
            </label>
            <div className="space-y-2">
              {reportReasons.map((reason) => (
                <label
                  key={reason.id}
                  className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-smooth"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.id}
                    checked={reportData.reason === reason.id}
                    onChange={() => handleReasonChange(reason.id)}
                    className="mt-1 w-4 h-4 text-primary border-border focus:ring-ring"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {reason.label}
                    </div>
                    <div className="text-xs text-muted-foreground font-caption">
                      {reason.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Input
              label="Additional Details"
              type="text"
              placeholder="Provide more context about the issue..."
              value={reportData.description}
              onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
              description="Help us understand the specific concerns"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Content Categories (Optional)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Political', 'Health', 'Science', 'Technology', 'Social', 'Economic'].map((category) => (
                <Checkbox
                  key={category}
                  label={category}
                  checked={reportData.categories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                />
              ))}
            </div>
          </div>

          <div>
            <Input
              label="Email (Optional)"
              type="email"
              placeholder="your.email@example.com"
              value={reportData.email}
              onChange={(e) => setReportData(prev => ({ ...prev, email: e.target.value }))}
              description="We may contact you for follow-up questions"
            />
          </div>

          <div>
            <Checkbox
              label="Submit anonymously"
              description="Your email will not be associated with this report"
              checked={reportData.anonymous}
              onChange={(e) => setReportData(prev => ({ ...prev, anonymous: e.target.checked }))}
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={!reportData.reason}
              iconName="Flag"
              iconPosition="left"
            >
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;