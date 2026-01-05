import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { DeadManSwitchProvider } from "@/contexts/DeadManSwitchContext";
import { StudentSessionProvider } from "@/contexts/StudentSessionContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";

import LandingPage from "./pages/LandingPage";
import PortalSelection from "./pages/PortalSelection";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import PublicLedger from "./pages/PublicLedger";
import ResolutionLedger from "./pages/ResolutionLedger";
import EvidenceRepository from "./pages/EvidenceRepository";
import GovernanceMatrix from "./pages/GovernanceMatrix";
import AnonymousCredentialing from "./pages/AnonymousCredentialing";
import GDPRCompliance from "./pages/GDPRCompliance";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HelpDocumentation from "./pages/HelpDocumentation";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminSetup from "./pages/admin/AdminSetup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminResolutions from "./pages/admin/AdminResolutions";
import AdminResolutionDetail from "./pages/admin/AdminResolutionDetail";
import AcceptInvite from "./pages/admin/AcceptInvite";
import AdminPasswordReset from "./pages/admin/AdminPasswordReset";
import AdminUpdatePassword from "./pages/admin/AdminUpdatePassword";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminProtectedRoute } from "./components/admin/AdminProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <SettingsProvider>
          <DeadManSwitchProvider>
            <StudentSessionProvider>
              <AdminAuthProvider>
                <OnboardingProvider>
                  <Toaster position="top-right" richColors theme="dark" />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/portal" element={<PortalSelection />} />
                      <Route path="/submit" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                      <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
                      <Route path="/ledger" element={<PublicLedger />} />
                      <Route path="/resolutions" element={<ResolutionLedger />} />
                      <Route path="/evidence" element={<ProtectedRoute><EvidenceRepository /></ProtectedRoute>} />
                      <Route path="/governance" element={<GovernanceMatrix />} />
                      <Route path="/credentials" element={<ProtectedRoute><AnonymousCredentialing /></ProtectedRoute>} />
                      <Route path="/gdpr-compliance" element={<GDPRCompliance />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/help" element={<HelpDocumentation />} />
                      
                      {/* Admin Routes */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin/setup" element={<AdminSetup />} />
                      <Route path="/admin/accept-invite" element={<AcceptInvite />} />
                      <Route path="/admin/password-reset" element={<AdminPasswordReset />} />
                      <Route path="/admin/update-password" element={<AdminUpdatePassword />} />
                      <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                      <Route path="/admin/resolutions" element={<AdminProtectedRoute><AdminResolutions /></AdminProtectedRoute>} />
                      <Route path="/admin/resolutions/:id" element={<AdminProtectedRoute><AdminResolutionDetail /></AdminProtectedRoute>} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </OnboardingProvider>
              </AdminAuthProvider>
            </StudentSessionProvider>
          </DeadManSwitchProvider>
        </SettingsProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
