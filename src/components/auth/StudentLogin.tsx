import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Mail, GraduationCap, Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { VaniLogo } from '@/components/ui/VaniLogo';
import { useStudentSession } from '@/contexts/StudentSessionContext';
import { supabase } from '@/integrations/supabase/client';

type LoginStep = 'credentials' | 'password';

export function StudentLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading: sessionLoading } = useStudentSession();
  
  const [step, setStep] = useState<LoginStep>('credentials');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!sessionLoading && isAuthenticated) {
      const returnUrl = (location.state as { from?: string })?.from || '/student-dashboard';
      navigate(returnUrl, { replace: true });
    }
  }, [isAuthenticated, sessionLoading, navigate, location]);

  // Validate enrollment number format
  const validateEnrollmentNo = (value: string): boolean => {
    const enrollmentRegex = /^(22|23|24|25)BE(CSE|MNC|CCS)[A-Z]?\d{1,3}$/i;
    return enrollmentRegex.test(value);
  };

  // Validate email format
  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleCheckUser = async () => {
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

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: {
          action: 'check',
          enrollment_no: enrollmentNo.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
        },
      });

      if (error) {
        console.error('Check user error:', error);
        toast.error('Failed to check user. Please try again.');
        return;
      }

      setIsNewUser(!data.exists || !data.hasPassword);
      setStep('password');
    } catch (error) {
      console.error('Check user error:', error);
      toast.error('Failed to check user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!password) {
      toast.error('Please enter a password');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (isNewUser && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('student-auth', {
        body: {
          action: isNewUser ? 'register' : 'login',
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
        toast.success(isNewUser ? 'Account created! Welcome!' : 'Welcome back!');
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

  const handleBack = () => {
    setStep('credentials');
    setPassword('');
    setConfirmPassword('');
    setIsNewUser(false);
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <VaniLogo size="lg" className="mx-auto" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Student Portal</h1>
            <p className="text-muted-foreground text-sm">
              Secure anonymous reporting platform
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg py-2 px-4 border border-border/50">
          <Shield className="h-3.5 w-3.5 text-primary" />
          <span>End-to-end encrypted • Your identity remains anonymous</span>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">
              {step === 'credentials' ? 'Enter Your Details' : (isNewUser ? 'Create Password' : 'Enter Password')}
            </CardTitle>
            <CardDescription>
              {step === 'credentials' 
                ? 'Enter your enrollment number and email'
                : (isNewUser ? 'Create a password to secure your account' : 'Enter your password to login')
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 'credentials' ? (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="enrollment" className="text-sm font-medium">
                      Enrollment Number
                    </Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="enrollment"
                        type="text"
                        placeholder="e.g., 23BEMNC42"
                        value={enrollmentNo}
                        onChange={(e) => setEnrollmentNo(e.target.value.toUpperCase())}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Format: YearBEBranchRoll (e.g., 23BEMNC42, 24BECSE15)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckUser}
                  disabled={isLoading || !enrollmentNo.trim() || !email.trim()}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      {isNewUser ? 'Create Password' : 'Password'}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={isNewUser ? 'Create a strong password' : 'Enter your password'}
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
                    {isNewUser && (
                      <p className="text-xs text-muted-foreground">
                        Minimum 6 characters
                      </p>
                    )}
                  </div>

                  {isNewUser && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleSubmit}
                    disabled={isLoading || !password || (isNewUser && !confirmPassword)}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isNewUser ? 'Creating Account...' : 'Logging in...'}
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        {isNewUser ? 'Create Account' : 'Login'}
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="w-full text-muted-foreground"
                  >
                    ← Back to credentials
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer Link */}
        <div className="text-center">
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
