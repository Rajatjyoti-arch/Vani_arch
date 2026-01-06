import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface StudentProfile {
  id: string;
  enrollment_no: string;
  email: string;
  ghost_name: string;
  avatar: string;
  reputation: number;
  reports_submitted: number;
  created_at: string;
  is_verified?: boolean;
}

interface StudentSessionContextType {
  studentProfile: StudentProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const StudentSessionContext = createContext<StudentSessionContextType | undefined>(undefined);

const STORAGE_KEY = 'student_profile';

export function StudentSessionProvider({ children }: { children: ReactNode }) {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from localStorage on mount
  useEffect(() => {
    const loadProfile = () => {
      try {
        const storedProfile = localStorage.getItem(STORAGE_KEY);
        if (storedProfile) {
          const profile = JSON.parse(storedProfile) as StudentProfile;
          setStudentProfile(profile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            setStudentProfile(JSON.parse(e.newValue));
          } catch {
            setStudentProfile(null);
          }
        } else {
          setStudentProfile(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const refreshProfile = async () => {
    if (!studentProfile?.email) return;
    
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('email', studentProfile.email.toLowerCase())
        .single();
      
      if (error) {
        console.error('Error refreshing profile:', error);
        return;
      }
      
      if (data) {
        setStudentProfile(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStudentProfile(null);
  };

  return (
    <StudentSessionContext.Provider
      value={{
        studentProfile,
        isAuthenticated: !!studentProfile,
        isLoading,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </StudentSessionContext.Provider>
  );
}

export function useStudentSession() {
  const context = useContext(StudentSessionContext);
  if (context === undefined) {
    throw new Error('useStudentSession must be used within a StudentSessionProvider');
  }
  return context;
}