-- Create campus_zones table
CREATE TABLE public.campus_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id TEXT NOT NULL UNIQUE,
  zone_name TEXT NOT NULL,
  concern_level TEXT NOT NULL DEFAULT 'safe' CHECK (concern_level IN ('safe', 'warning', 'critical')),
  reports_count INTEGER NOT NULL DEFAULT 0,
  last_report_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create zone_reports table to track individual reports
CREATE TABLE public.zone_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id UUID REFERENCES public.campus_zones(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.student_profiles(id) ON DELETE SET NULL,
  report_type TEXT NOT NULL,
  description TEXT,
  severity TEXT NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.campus_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zone_reports ENABLE ROW LEVEL SECURITY;

-- RLS for campus_zones: Everyone can read (public data)
CREATE POLICY "Campus zones are publicly readable"
ON public.campus_zones
FOR SELECT
USING (true);

-- Service role can manage zones
CREATE POLICY "Service role can manage zones"
ON public.campus_zones
FOR ALL
USING (true)
WITH CHECK (true);

-- RLS for zone_reports: Students can create reports, admins can view all
CREATE POLICY "Anyone can create zone reports"
ON public.zone_reports
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Zone reports are publicly readable"
ON public.zone_reports
FOR SELECT
USING (true);

-- Function to update zone stats when a report is added
CREATE OR REPLACE FUNCTION public.update_zone_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update the zone's report count and last report time
  UPDATE public.campus_zones
  SET 
    reports_count = reports_count + 1,
    last_report_at = NEW.created_at,
    concern_level = CASE
      WHEN reports_count + 1 >= 10 THEN 'critical'
      WHEN reports_count + 1 >= 5 THEN 'warning'
      ELSE 'safe'
    END
  WHERE id = NEW.zone_id;
  
  RETURN NEW;
END;
$$;

-- Trigger to update zone stats on new report
CREATE TRIGGER on_zone_report_created
AFTER INSERT ON public.zone_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_zone_stats();

-- Insert initial campus zones
INSERT INTO public.campus_zones (zone_id, zone_name, concern_level, reports_count) VALUES
  ('library', 'Chanakya Bhawan', 'safe', 0),
  ('hostel-boys', 'BRS', 'safe', 0),
  ('hostel-girls', 'Shailputri', 'safe', 0),
  ('cafeteria', 'DD Canteen', 'safe', 0),
  ('academic-block', 'DDE Building', 'safe', 0),
  ('sports-complex', 'Campus Ground', 'safe', 0),
  ('admin-block', 'SPM Hostel', 'safe', 0),
  ('parking', 'Parking Area', 'safe', 0),
  ('lab-block', 'ISRO Building', 'safe', 0),
  ('auditorium', 'Aryabhatta Building', 'safe', 0),
  ('medical-center', 'Health Center', 'safe', 0),
  ('canteen', 'Fabricated', 'safe', 0);

-- Enable realtime for campus_zones
ALTER PUBLICATION supabase_realtime ADD TABLE public.campus_zones;