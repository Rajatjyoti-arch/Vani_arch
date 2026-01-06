import { Navigate, useLocation } from 'react-router-dom';
import { useStudentSession } from '@/contexts/StudentSessionContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useStudentSession();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to student dashboard (which shows login) with return URL
    return <Navigate to="/student-dashboard" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
