import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CommunityHub from "./pages/CommunityHub";
import Complaints from "./pages/Complaints";
import Directory from "./pages/Directory";
import Polls from "./pages/Polls";
import SecretaryDashboard from "./pages/secretary/SecretaryDashboard";
import MemberRequests from "./pages/secretary/MemberRequests";
import AllComplaints from "./pages/secretary/AllComplaints";
import ComplaintHeatmap from "./pages/secretary/ComplaintHeatmap";
import SecretaryPolls from "./pages/secretary/SecretaryPolls";
import AreaHeadDashboard from "./pages/areahead/AreaHeadDashboard";
import CommunityRequests from "./pages/areahead/CommunityRequests";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Resident Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community-hub" element={<CommunityHub />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Secretary Routes */}
          <Route path="/secretary/dashboard" element={<SecretaryDashboard />} />
          <Route path="/secretary/members" element={<MemberRequests />} />
          <Route path="/secretary/complaints" element={<AllComplaints />} />
          <Route path="/secretary/polls" element={<SecretaryPolls />} />
          
          {/* Area Head Routes */}
          <Route path="/area-head/dashboard" element={<AreaHeadDashboard />} />
          <Route path="/area-head/communities" element={<CommunityRequests />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
