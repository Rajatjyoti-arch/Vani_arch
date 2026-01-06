import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { StudentSessionProvider } from "@/contexts/StudentSessionContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { DeadManSwitchProvider } from "@/contexts/DeadManSwitchContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminProtectedRoute } from "@/components/admin/AdminProtectedRoute";

// Pages
import LandingPage from "@/pages/LandingPage";
import PortalSelection from "@/pages/PortalSelection";
import Index from "@/pages/Index";
import StudentDashboard from "@/pages/StudentDashboard";
import AnonymousCredentialing from "@/pages/AnonymousCredentialing";
import EvidenceRepository from "@/pages/EvidenceRepository";
import GovernanceMatrix from "@/pages/GovernanceMatrix";
import ResolutionLedger from "@/pages/ResolutionLedger";
import PublicLedger from "@/pages/PublicLedger";
import HelpDocumentation from "@/pages/HelpDocumentation";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import GDPRCompliance from "@/pages/GDPRCompliance";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminSetup from "@/pages/admin/AdminSetup";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminResolutions from "@/pages/admin/AdminResolutions";
import AdminResolutionDetail from "@/pages/admin/AdminResolutionDetail";
import AdminPasswordReset from "@/pages/admin/AdminPasswordReset";
import AdminUpdatePassword from "@/pages/admin/AdminUpdatePassword";
import AcceptInvite from "@/pages/admin/AcceptInvite";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <StudentSessionProvider>
        <AdminAuthProvider>
          <DeadManSwitchProvider>
            <TooltipProvider>
              <Toaster position="top-right" richColors theme="dark" />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/portal" element={<PortalSelection />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/gdpr" element={<GDPRCompliance />} />
                <Route path="/public-ledger" element={<PublicLedger />} />
                
                {/* Student Routes */}
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/identity" element={<AnonymousCredentialing />} />
                <Route
                  path="/vault"
                  element={
                    <ProtectedRoute>
                      <EvidenceRepository />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/arena"
                  element={
                    <ProtectedRoute>
                      <GovernanceMatrix />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ledger"
                  element={
                    <ProtectedRoute>
                      <ResolutionLedger />
                    </ProtectedRoute>
                  }
                />
                <Route path="/help" element={<HelpDocumentation />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/setup" element={<AdminSetup />} />
                <Route path="/admin/password-reset" element={<AdminPasswordReset />} />
                <Route path="/admin/update-password" element={<AdminUpdatePassword />} />
                <Route path="/admin/accept-invite" element={<AcceptInvite />} />
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/resolutions"
                  element={
                    <AdminProtectedRoute>
                      <AdminResolutions />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/resolutions/:id"
                  element={
                    <AdminProtectedRoute>
                      <AdminResolutionDetail />
                    </AdminProtectedRoute>
                  }
                />
                
                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DeadManSwitchProvider>
        </AdminAuthProvider>
      </StudentSessionProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
