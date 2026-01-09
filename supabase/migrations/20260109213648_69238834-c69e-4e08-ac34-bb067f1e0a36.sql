-- Create storage bucket for evidence files
INSERT INTO storage.buckets (id, name, public)
VALUES ('evidence-vault', 'evidence-vault', false);

-- Create RLS policies for evidence-vault bucket
CREATE POLICY "Users can upload their own evidence"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'evidence-vault');

CREATE POLICY "Users can view their own evidence"
ON storage.objects FOR SELECT
USING (bucket_id = 'evidence-vault');

CREATE POLICY "Users can delete their own evidence"
ON storage.objects FOR DELETE
USING (bucket_id = 'evidence-vault');

-- Create stealth_vault table to track uploaded evidence
CREATE TABLE public.stealth_vault (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'other',
  file_size TEXT,
  secret_metadata TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stealth_vault ENABLE ROW LEVEL SECURITY;

-- RLS policies for stealth_vault
CREATE POLICY "Users can view their own vault files"
ON public.stealth_vault FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own vault files"
ON public.stealth_vault FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can delete their own vault files"
ON public.stealth_vault FOR DELETE
USING (true);