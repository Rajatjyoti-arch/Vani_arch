-- Create arena_negotiations table for resolution process
CREATE TABLE public.arena_negotiations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vault_file_id UUID REFERENCES public.stealth_vault(id) ON DELETE CASCADE,
  grievance_text TEXT NOT NULL,
  negotiation_log JSONB NOT NULL DEFAULT '[]'::jsonb,
  final_consensus TEXT,
  sentinel_score INTEGER NOT NULL DEFAULT 50,
  governor_score INTEGER NOT NULL DEFAULT 50,
  status TEXT NOT NULL DEFAULT 'in_progress',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.arena_negotiations ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view negotiations"
ON public.arena_negotiations FOR SELECT
USING (true);

CREATE POLICY "Users can create negotiations"
ON public.arena_negotiations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update negotiations"
ON public.arena_negotiations FOR UPDATE
USING (true);