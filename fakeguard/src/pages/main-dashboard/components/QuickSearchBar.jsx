import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const QuickSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      // Here you would typically navigate to search results or show results
      console.log('Searching for:', searchQuery);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Quick search previous verifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border-0 bg-muted"
          />
        </div>
        <Button 
          variant="default" 
          size="default"
          onClick={handleSearch}
          loading={isSearching}
          iconName="Search"
          disabled={!searchQuery.trim()}
        >
          Search
        </Button>
      </div>
      
      <div className="flex items-center space-x-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center space-x-1">
          <Icon name="Clock" size={12} />
          <span>Recent searches</span>
        </span>
        <button className="hover:text-foreground transition-smooth">fake news covid</button>
        <button className="hover:text-foreground transition-smooth">election misinformation</button>
        <button className="hover:text-foreground transition-smooth">deepfake detection</button>
      </div>
    </div>
  );
};

export default QuickSearchBar;