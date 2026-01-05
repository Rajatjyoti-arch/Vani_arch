import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { StudentSessionProvider } from "@/contexts/StudentSessionContext";
import LandingPage from "@/pages/LandingPage";
import PortalSelection from "@/pages/PortalSelection";

const queryClient = new QueryClient();

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="opacity-70 mb-4">Page not found</p>
      <Link to="/" className="text-primary hover:underline">Return home</Link>
    </div>
  </div>
);

const AdminLoginPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground">
    <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
    <div className="w-full max-w-sm space-y-4">
      <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-card border border-border" />
      <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-card border border-border" />
      <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium">Sign In</button>
    </div>
    <Link to="/" className="mt-8 text-muted-foreground hover:text-foreground">← Back to Home</Link>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <StudentSessionProvider>
        <TooltipProvider>
          <Toaster position="top-right" richColors theme="dark" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/portal" element={<PortalSelection />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </StudentSessionProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
