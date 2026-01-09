-- Add password_hash column to student_profiles
ALTER TABLE public.student_profiles 
ADD COLUMN password_hash TEXT;

-- Drop the student_otp_codes table since we no longer need OTPs
DROP TABLE IF EXISTS public.student_otp_codes;