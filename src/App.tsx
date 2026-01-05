import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const queryClient = new QueryClient();

// Inline Landing Page
const LandingPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-emerald-500/10 border border-emerald-500/20">
      <span className="flex h-2 w-2 rounded-full animate-pulse bg-emerald-500" />
      <span className="text-xs font-medium tracking-wide uppercase text-emerald-500">System Operational</span>
    </div>
    <h1 className="text-6xl md:text-8xl font-semibold mb-6 tracking-wider text-primary">VANI</h1>
    <p className="text-xl md:text-2xl mb-4 text-primary/80">Governance without bias</p>
    <p className="text-lg md:text-xl max-w-2xl text-center mb-10 text-muted-foreground">
      Verifiable Anonymous Network Intelligence.<br />Advanced governance for institutional transparency.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <Link 
        to="/portal" 
        className="px-8 py-4 rounded-lg font-medium text-lg transition-all hover:scale-105 bg-primary text-primary-foreground text-center"
      >
        Enter System →
      </Link>
      <Link 
        to="/admin/login" 
        className="px-8 py-4 rounded-lg font-medium text-lg transition-all hover:scale-105 border border-primary/50 text-primary hover:bg-primary/10 text-center"
      >
        Admin Login
      </Link>
    </div>
    <p className="mt-12 text-sm text-muted-foreground">Central University of Jammu • Team CYNOX</p>
  </div>
);

// Inline Portal Selection
const PortalSelection = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground">
    <h1 className="text-4xl font-bold mb-8">Select Your Portal</h1>
    <div className="flex gap-6">
      <Link to="/dashboard" className="px-8 py-6 bg-primary text-primary-foreground rounded-xl text-center">
        <div className="text-2xl mb-2">👤</div>
        Student Portal
      </Link>
      <Link to="/admin/login" className="px-8 py-6 bg-secondary text-secondary-foreground rounded-xl text-center">
        <div className="text-2xl mb-2">🛡️</div>
        Admin Portal
      </Link>
    </div>
    <Link to="/" className="mt-8 text-muted-foreground hover:text-foreground">← Back to Home</Link>
  </div>
);

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
    <Toaster position="top-right" richColors theme="dark" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal" element={<PortalSelection />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
