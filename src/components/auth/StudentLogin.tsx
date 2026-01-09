import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Loader2, Mail, GraduationCap, Shield, Lock, Eye, EyeOff, Check, X, ArrowRight } from 'lucide-react';
import { VaniLogo } from '@/components/ui/VaniLogo';
import { useStudentSession } from '@/contexts/StudentSessionContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}

function getPasswordStrength(password: string): PasswordStrength {
  const checks = {
    minLength: password.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;
  
  if (passedChecks <= 1) return { score: 20, label: 'Very Weak', color: 'bg-red-500', checks };
  if (passedChecks === 2) return { score: 40, label: 'Weak', color: 'bg-orange-500', checks };
  if (passedChecks === 3) return { score: 60, label: 'Fair', color: 'bg-yellow-500', checks };
  if (passedChecks === 4) return { score: 80, label: 'Good', color: 'bg-lime-500', checks };
  return { score: 100, label: 'Strong', color: 'bg-green-500', checks };
}

export function StudentLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading: sessionLoading } = useStudentSession();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  // Redirect if already authenticated
  useEffect(() => {
    if (!sessionLoading && isAuthenticated) {
      const returnUrl = (location.state as { from?: string })?.from || '/student-dashboard';
      navigate(returnUrl, { replace: true });
    }
  }, [isAuthenticated, sessionLoading, navigate, location]);

  // Validate enrollment number format
  const validateEnrollmentNo = (value: string): boolean => {
    const enrollmentRegex = /^(22|23|24|25)BE(CSE|MNC|CCS|ECE|ECA)[A-Z]?\d{1,3}$/i;
    return enrollmentRegex.test(value);
  };

  // Validate email format
  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async () => {
    if (!enrollmentNo.trim() || !email.trim()) {
      toast.error('Please enter both enrollment number and email');
      return;
    }

    if (!validateEnrollmentNo(enrollmentNo)) {
      toast.error('Invalid enrollment number format. Example: 23BEMNC42');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password) {
      toast.error('Please enter a password');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: {
          action: isSignUp ? 'register' : 'login',
          enrollment_no: enrollmentNo.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
          password,
        },
      });

      if (error) {
        console.error('Auth error:', error);
        toast.error('Authentication failed. Please try again.');
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      if (data?.success && data?.profile) {
        localStorage.setItem('student_profile', JSON.stringify(data.profile));
        toast.success(isSignUp ? 'Account created! Welcome!' : 'Welcome back!');
        const returnUrl = (location.state as { from?: string })?.from || '/student-dashboard';
        navigate(returnUrl, { replace: true });
        window.location.href = returnUrl;
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setPassword('');
    setConfirmPassword('');
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <VaniLogo size="lg" className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Student Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Secure anonymous reporting platform
          </p>
        </div>

        {/* Sliding Container */}
        <div className="relative bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[520px]">
            
            {/* Left Panel - Sign In (visible when !isSignUp on desktop, always accessible) */}
            <div className={cn(
              "w-full md:w-1/2 p-8 flex flex-col justify-center transition-all duration-500",
              isSignUp ? "hidden md:flex" : "flex"
            )}>
              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-bold text-foreground">Welcome Back</h2>
                  <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-enrollment" className="text-sm font-medium">
                      Enrollment Number
                    </Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-enrollment"
                        type="text"
                        placeholder="e.g., 23BECSE42"
                        value={enrollmentNo}
                        onChange={(e) => setEnrollmentNo(e.target.value.toUpperCase())}
                        className={cn(
                          "pl-10 pr-10",
                          enrollmentNo && (validateEnrollmentNo(enrollmentNo) 
                            ? "border-green-500 focus-visible:ring-green-500/20" 
                            : "border-red-500 focus-visible:ring-red-500/20")
                        )}
                        disabled={isLoading}
                      />
                      {enrollmentNo && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {validateEnrollmentNo(enrollmentNo) ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {enrollmentNo && !validateEnrollmentNo(enrollmentNo) && (
                      <p className="text-xs text-red-500">Format: YearBEBranch[Section]Roll (e.g., 23BECSE42)</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading && !isSignUp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>

                {/* Mobile toggle */}
                <div className="md:hidden text-center pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">Don't have an account?</p>
                  <Button variant="outline" onClick={toggleMode} className="w-full">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Panel - Sign Up (visible when isSignUp on desktop) */}
            <div className={cn(
              "w-full md:w-1/2 p-8 flex flex-col justify-center transition-all duration-500",
              isSignUp ? "flex" : "hidden md:flex"
            )}>
              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-bold text-foreground">Create Account</h2>
                  <p className="text-sm text-muted-foreground mt-1">Join the secure platform</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-enrollment" className="text-sm font-medium">
                      Enrollment Number
                    </Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-enrollment"
                        type="text"
                        placeholder="e.g., 23BECSE42"
                        value={enrollmentNo}
                        onChange={(e) => setEnrollmentNo(e.target.value.toUpperCase())}
                        className={cn(
                          "pl-10 pr-10",
                          enrollmentNo && (validateEnrollmentNo(enrollmentNo) 
                            ? "border-green-500 focus-visible:ring-green-500/20" 
                            : "border-red-500 focus-visible:ring-red-500/20")
                        )}
                        disabled={isLoading}
                      />
                      {enrollmentNo && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {validateEnrollmentNo(enrollmentNo) ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    <p className={cn(
                      "text-xs",
                      enrollmentNo && !validateEnrollmentNo(enrollmentNo) ? "text-red-500" : "text-muted-foreground"
                    )}>
                      {enrollmentNo && !validateEnrollmentNo(enrollmentNo) 
                        ? "Invalid format. Example: 23BECSE42, 24BEMNC15" 
                        : "Branches: CSE, MNC, CCS, ECE, ECA"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium">
                      Create Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {isSignUp && password && (
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Strength</span>
                          <span className={`font-medium ${
                            passwordStrength.score <= 40 ? 'text-red-500' : 
                            passwordStrength.score <= 60 ? 'text-yellow-500' : 
                            'text-green-500'
                          }`}>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <Progress 
                          value={passwordStrength.score} 
                          className="h-1.5"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading && isSignUp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>

                {/* Mobile toggle */}
                <div className="md:hidden text-center pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">Already have an account?</p>
                  <Button variant="outline" onClick={toggleMode} className="w-full">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sliding Overlay Panel (Desktop only) */}
            <div className={cn(
              "hidden md:flex absolute top-0 h-full w-1/2 bg-primary transition-all duration-500 ease-in-out z-20",
              isSignUp ? "left-0" : "left-1/2"
            )}>
              <div className="flex flex-col items-center justify-center p-8 text-center text-primary-foreground w-full">
                <Shield className="w-16 h-16 mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-3">
                  {isSignUp ? 'Welcome Back!' : 'Hello, Student!'}
                </h3>
                <p className="text-sm opacity-90 mb-6 max-w-xs">
                  {isSignUp 
                    ? 'Already have an account? Sign in to access your secure dashboard.'
                    : 'New to VANI? Create an account to start using the anonymous reporting platform.'
                  }
                </p>
                <Button 
                  variant="outline" 
                  onClick={toggleMode}
                  className="border-2 border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  {isSignUp ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Security Badge */}
                <div className="mt-8 flex items-center gap-2 text-xs text-primary-foreground/70">
                  <Lock className="h-3.5 w-3.5" />
                  <span>End-to-end encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <Button
            variant="link"
            onClick={() => navigate('/')}
            className="text-muted-foreground text-sm"
          >
            ← Return to Platform
          </Button>
        </div>
      </div>
    </div>
  );
}
