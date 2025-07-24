import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import UploadZone from './components/UploadZone';
import FilePreview from './components/FilePreview';
import AnalysisProgress from './components/AnalysisProgress';
import AnalysisResults from './components/AnalysisResults';

const MediaUploadVerification = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('upload');
  const [currentFile, setCurrentFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  // Mock analysis results data
  const mockResults = [
    {
      fileName: "sample_image.jpg",
      type: "image",
      fileSize: "2.4 MB",
      preview: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop",
      authenticityScore: 87,
      detectionResults: [
        {
          type: "Facial Manipulation",
          icon: "User",
          status: "clean",
          confidence: 87,
          description: "No signs of facial manipulation or deepfake technology detected in the analyzed regions."
        },
        {
          type: "Background Alteration",
          icon: "Image",
          status: "suspicious",
          confidence: 23,
          description: "Minor inconsistencies detected in background lighting patterns that may indicate editing."
        },
        {
          type: "Metadata Integrity",
          icon: "FileText",
          status: "clean",
          confidence: 94,
          description: "EXIF data appears consistent with claimed capture device and timestamp information."
        }
      ],
      metadata: {
        device: "iPhone 13 Pro",
        timestamp: "2024-07-20 14:32:15",
        location: "37.7749, -122.4194",
        resolution: "4032 x 3024",
        colorSpace: "sRGB",
        compression: "JPEG (Quality: 85%)",
        software: "iOS 17.1.1"
      }
    }
  ];

  const mockVideoResults = [
    {
      fileName: "sample_video.mp4",
      type: "video",
      fileSize: "15.7 MB",
      preview: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
      authenticityScore: 72,
      detectionResults: [
        {
          type: "Audio-Video Sync",
          icon: "Volume2",
          status: "suspicious",
          confidence: 68,
          description: "Minor synchronization discrepancies detected between audio and video tracks."
        },
        {
          type: "Frame Consistency",
          icon: "Video",
          status: "clean",
          confidence: 89,
          description: "Frame-to-frame analysis shows consistent lighting and motion patterns throughout."
        },
        {
          type: "Compression Analysis",
          icon: "Zap",
          status: "clean",
          confidence: 76,
          description: "Compression artifacts are consistent with single-generation encoding."
        }
      ],
      metadata: {
        device: "Samsung Galaxy S23",
        timestamp: "2024-07-22 09:15:42",
        duration: "00:02:34",
        resolution: "1920 x 1080",
        frameRate: "30 fps",
        codec: "H.264",
        bitrate: "8.2 Mbps"
      },
      timeline: [
        {
          timestamp: "00:00:15",
          event: "Face Detection",
          description: "Primary subject identified with high confidence",
          confidence: 94
        },
        {
          timestamp: "00:01:23",
          event: "Scene Change",
          description: "Background transition detected, analyzing consistency",
          confidence: 78
        },
        {
          timestamp: "00:02:01",
          event: "Audio Anomaly",
          description: "Brief audio distortion detected, investigating source",
          confidence: 45
        }
      ]
    }
  ];

  const handleFileSelect = (files) => {
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStage('upload');
    setCurrentFile(selectedFiles[0]);

    const stages = ['upload', 'analysis', 'deepfake', 'metadata'];
    
    for (let i = 0; i < stages.length; i++) {
      setCurrentStage(stages[i]);
      
      // Simulate progress for each stage
      for (let progress = 0; progress <= 100; progress += 10) {
        setAnalysisProgress((i * 100 + progress) / stages.length);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    // Generate mock results based on file types
    const results = selectedFiles.map(file => {
      if (file.type.startsWith('image/')) {
        return {
          ...mockResults[0],
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          preview: URL.createObjectURL(file)
        };
      } else {
        return {
          ...mockVideoResults[0],
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          preview: URL.createObjectURL(file)
        };
      }
    });

    setAnalysisResults(results);
    setIsAnalyzing(false);
  };

  const handleAnalyzeFiles = () => {
    if (selectedFiles.length > 0) {
      simulateAnalysis();
    }
  };

  const handleNewAnalysis = () => {
    setSelectedFiles([]);
    setAnalysisResults(null);
    setAnalysisProgress(0);
    setCurrentStage('upload');
    setCurrentFile(null);
  };

  const handleExportReport = () => {
    // Mock export functionality
    const reportData = {
      timestamp: new Date().toISOString(),
      files: analysisResults.length,
      summary: "Comprehensive media verification analysis report"
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fakeguard-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Media Upload Verification
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload images and videos to analyze for deepfakes, manipulation, and authenticity verification
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {!analysisResults ? (
              <>
                {/* Upload Zone */}
                <UploadZone 
                  onFileSelect={handleFileSelect}
                  isProcessing={isAnalyzing}
                />

                {/* File Preview */}
                {selectedFiles.length > 0 && (
                  <FilePreview
                    files={selectedFiles}
                    onRemoveFile={handleRemoveFile}
                    onAnalyzeFiles={handleAnalyzeFiles}
                  />
                )}

                {/* Features Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-card rounded-lg border border-border p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Deepfake Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced AI algorithms detect facial manipulation and synthetic content
                    </p>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-6 text-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Metadata Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Examine EXIF data, timestamps, and device information for authenticity
                    </p>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Video Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Frame-by-frame analysis with audio-video synchronization checks
                    </p>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-6 text-center">
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Batch Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Analyze multiple files simultaneously for efficient verification
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Analysis Results */
              <AnalysisResults
                results={analysisResults}
                onNewAnalysis={handleNewAnalysis}
                onExportReport={handleExportReport}
              />
            )}
          </div>
        </div>
      </main>

      {/* Analysis Progress Modal */}
      <AnalysisProgress
        currentFile={currentFile}
        progress={analysisProgress}
        stage={currentStage}
        isVisible={isAnalyzing}
      />
    </div>
  );
};

export default MediaUploadVerification;