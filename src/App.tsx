
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FeaturesPage from "./pages/FeaturesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import PricingPage from "./pages/PricingPage";
import DemoPage from "./pages/DemoPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FAQPage from "./pages/FAQPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage"; // Nieuwe import

// Dashboard
import DashboardLayout from "./components/layouts/DashboardLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AnalyzerPage from "./pages/Dashboard/AnalyzerPage";
import KeywordResearchPage from "./pages/Dashboard/KeywordResearchPage";
import RankTrackingPage from "./pages/Dashboard/RankTrackingPage";
import ContentToolsPage from "./pages/Dashboard/ContentToolsPage";
import SettingsPage from "./pages/Dashboard/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/ad-campagne" element={<LandingPage />} /> {/* Nieuwe route */}
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="analyzer" element={<AnalyzerPage />} />
            <Route path="keywords" element={<KeywordResearchPage />} />
            <Route path="rank-tracking" element={<RankTrackingPage />} />
            <Route path="content" element={<ContentToolsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            {/* All other routes show "Coming Soon" */}
            <Route path="*" element={<div>Coming Soon</div>} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
