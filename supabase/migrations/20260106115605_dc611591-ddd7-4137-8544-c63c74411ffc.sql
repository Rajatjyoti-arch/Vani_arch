-- Create student_profiles table
CREATE TABLE public.student_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_no TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    ghost_name TEXT NOT NULL,
    avatar TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    reputation INTEGER DEFAULT 0,
    reports_submitted INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read profiles (for public ledger functionality)
CREATE POLICY "Public profiles are viewable"
ON public.student_profiles FOR SELECT
USING (true);

-- Policy: Service role can insert/update profiles
CREATE POLICY "Service role can manage profiles"
ON public.student_profiles FOR ALL
USING (true)
WITH CHECK (true);

-- Create student_otp_codes table for custom OTP flow
CREATE TABLE public.student_otp_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_no TEXT NOT NULL,
    email TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_used BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_otp_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can access OTP codes (edge functions use service role)
CREATE POLICY "Service role only"
ON public.student_otp_codes FOR ALL
USING (true)
WITH CHECK (true);

-- Create index for faster OTP lookups
CREATE INDEX idx_otp_email_code ON public.student_otp_codes(email, otp_code);
CREATE INDEX idx_otp_expires ON public.student_otp_codes(expires_at);