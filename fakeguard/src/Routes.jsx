import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistration from "pages/user-registration";
import MainDashboard from "pages/main-dashboard";
import ArticleUrlVerification from "pages/article-url-verification";
import MediaUploadVerification from "pages/media-upload-verification";
import TextContentVerification from "pages/text-content-verification";
import VerificationResultsDetail from "pages/verification-results-detail";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MainDashboard />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/article-url-verification" element={<ArticleUrlVerification />} />
        <Route path="/media-upload-verification" element={<MediaUploadVerification />} />
        <Route path="/text-content-verification" element={<TextContentVerification />} />
        <Route path="/verification-results-detail" element={<VerificationResultsDetail />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;