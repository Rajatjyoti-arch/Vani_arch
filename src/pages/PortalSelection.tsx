import { useNavigate } from "react-router-dom";
import { UserCheck, Shield, ArrowLeft, Lock } from "lucide-react";
import { VaniLogo } from "@/components/ui/VaniLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import authBg from "@/assets/auth-bg.png";

const PortalSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={authBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <VaniLogo variant="icon" size="sm" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-white tracking-[0.15em] uppercase" style={{ fontSize: "15px" }}>
                VANI
              </span>
              <span className="text-[10px] text-white/50 hidden sm:block">
                Central University of Jammu
              </span>
            </div>
          </div>

          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Select Your Portal
            </h1>
            <p className="text-white/70">
              Choose how you would like to access the VANI system
            </p>
          </div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Student Portal */}
            <div
              className="group cursor-pointer rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20"
              onClick={() => navigate("/student-dashboard")}
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Student Portal
                </h2>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  Access anonymous credentialing, submit grievances, and track
                  resolution progress with full privacy protection.
                </p>
                <Button
                  className="w-full bg-white text-purple-900 hover:bg-white/90 font-semibold shadow-lg transition-all duration-300"
                  size="lg"
                >
                  Enter as Student
                </Button>
              </div>
            </div>

            {/* Authority Portal */}
            <div
              className="group cursor-pointer rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/20"
              onClick={() => navigate("/admin/login")}
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Administrative Oversight
                </h2>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  Restricted access for governance officers and resolution
                  committees. Manage cases and institutional analytics.
                </p>
                <Button
                  className="w-full bg-white text-purple-900 hover:bg-white/90 font-semibold shadow-lg transition-all duration-300"
                  size="lg"
                >
                  Institutional Personnel Login
                </Button>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Lock className="w-4 h-4 text-white/80" />
              <span className="text-xs text-white/70">
                Zero-Knowledge Authentication Available
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Central University of Jammu. VANI
            Governance System.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortalSelection;
