import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { StudentSessionProvider } from "@/contexts/StudentSessionContext";
import { DeadManSwitchProvider } from "@/contexts/DeadManSwitchContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

const queryClient = new QueryClient();

// Temporary landing page while debugging
const TempLandingPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#001f3f', color: 'white' }}>
    <h1 className="text-5xl font-bold mb-4" style={{ color: '#22c55e' }}>VANI</h1>
    <p className="text-xl opacity-70">Verifiable Anonymous Network Intelligence</p>
    <p className="mt-8 text-sm opacity-50">Central University of Jammu</p>
    <a href="/admin/login" className="mt-8 px-6 py-3 rounded-lg" style={{ backgroundColor: '#22c55e', color: '#001f3f' }}>
      Enter System
    </a>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <StudentSessionProvider>
        <DeadManSwitchProvider>
          <AdminAuthProvider>
            <BrowserRouter>
              <TooltipProvider>
                <Toaster />
                <Routes>
                  <Route path="/" element={<TempLandingPage />} />
                  <Route path="*" element={<div style={{ padding: 40, color: 'white', backgroundColor: '#001f3f', minHeight: '100vh' }}>Page not found</div>} />
                </Routes>
              </TooltipProvider>
            </BrowserRouter>
          </AdminAuthProvider>
        </DeadManSwitchProvider>
      </StudentSessionProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;