import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

// Working landing page
const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: 'hsl(210 100% 8%)' }}>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <span className="flex h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }} />
        <span className="text-xs font-medium tracking-wide uppercase" style={{ color: '#10b981' }}>System Operational</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-semibold mb-6 tracking-wider" style={{ color: 'hsl(160 84% 45%)' }}>VANI</h1>
      <p className="text-xl md:text-2xl mb-4" style={{ color: 'hsl(160 84% 45% / 0.8)' }}>Anonymous, yet accountable</p>
      <p className="text-lg md:text-xl max-w-2xl text-center mb-10" style={{ color: 'hsl(0 0% 98% / 0.6)' }}>
        Verifiable Anonymous Network Intelligence.<br />Advanced governance for institutional transparency.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a 
          href="/portal" 
          className="px-8 py-4 rounded-lg font-medium text-lg transition-all hover:scale-105"
          style={{ backgroundColor: 'hsl(160 84% 45%)', color: 'hsl(210 100% 8%)' }}
        >
          Enter System →
        </a>
        <a 
          href="/admin/login" 
          className="px-8 py-4 rounded-lg font-medium text-lg transition-all hover:scale-105"
          style={{ backgroundColor: 'hsl(160 84% 45%)', color: 'hsl(210 100% 8%)' }}
        >
          Admin Login
        </a>
      </div>
      <p className="mt-12 text-sm" style={{ color: 'hsl(0 0% 98% / 0.4)' }}>Central University of Jammu • Team CYNOX</p>
    </div>
  );
};

const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'hsl(210 100% 8%)', color: 'white' }}>
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="opacity-70 mb-4">Page not found</p>
      <a href="/" className="text-emerald-400 hover:underline">Return home</a>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster theme="dark" position="top-right" richColors />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
