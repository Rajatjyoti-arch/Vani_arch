import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
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
}

interface StudentSessionContextType {
  user: User | null;
  session: Session | null;
  studentProfile: StudentProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const StudentSessionContext = createContext<StudentSessionContextType | undefined>(undefined);

// Generate a unique ghost name
function generateGhostName(): string {
  const adjectives = ["Silent", "Shadow", "Phantom", "Mystic", "Crypto", "Stealth", "Hidden", "Veiled", "Masked", "Ghost"];
  const nouns = ["Witness", "Voice", "Observer", "Guardian", "Sentinel", "Watcher", "Speaker", "Advocate", "Reporter", "Agent"];
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${randomNum}`;
}

// Generate a random avatar emoji
function generateAvatar(): string {
  const avatars = ["👻", "🎭", "🦊", "🐺", "🦉", "🐲", "🦅", "🐈‍⬛", "🕵️", "🥷"];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

export function StudentSessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrCreateProfile = async (authUser: User) => {
    try {
      // Try to get existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('email', authUser.email?.toLowerCase())
        .maybeSingle();

      if (fetchError && !fetchError.message.includes('no rows')) {
        console.error('Error fetching profile:', fetchError);
        return;
      }

      if (existingProfile) {
        // Update verification status if needed
        if (!existingProfile.is_verified) {
          await supabase
            .from('student_profiles')
            .update({ is_verified: true })
            .eq('id', existingProfile.id);
        }
        setStudentProfile(existingProfile);
      } else {
        // Create new profile
        const enrollmentNo = authUser.user_metadata?.enrollment_no || 'UNKNOWN';
        const newProfile = {
          enrollment_no: enrollmentNo,
          email: authUser.email?.toLowerCase() || '',
          ghost_name: generateGhostName(),
          avatar: generateAvatar(),
          is_verified: true,
          reputation: 0,
          reports_submitted: 0,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('student_profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          // If profile already exists (race condition), try fetching again
          if (createError.message.includes('duplicate')) {
            const { data: retryProfile } = await supabase
              .from('student_profiles')
              .select('*')
              .eq('email', authUser.email?.toLowerCase())
              .single();
            if (retryProfile) {
              setStudentProfile(retryProfile);
            }
          }
        } else {
          setStudentProfile(createdProfile);
        }
      }
    } catch (error) {
      console.error('Profile fetch/create error:', error);
    }
  };

  const refreshProfile = async () => {
    if (user?.email) {
      const { data } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('email', user.email.toLowerCase())
        .single();
      if (data) {
        setStudentProfile(data);
      }
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer profile fetch to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchOrCreateProfile(session.user);
          }, 0);
        } else {
          setStudentProfile(null);
        }
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchOrCreateProfile(session.user);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setStudentProfile(null);
  };

  return (
    <StudentSessionContext.Provider
      value={{
        user,
        session,
        studentProfile,
        isAuthenticated: !!session && !!user,
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