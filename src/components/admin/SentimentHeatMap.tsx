import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CampusZone {
  id: string;
  zone_id: string;
  zone_name: string;
  concern_level: string;
  reports_count: number;
  last_report_at: string | null;
}

const CONCERN_COLORS = {
  safe: { bg: "bg-emerald-500/20", border: "border-emerald-500/50", text: "text-emerald-400" },
  warning: { bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-400" },
  critical: { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400" },
};

export function SentimentHeatMap() {
  const [zones, setZones] = useState<CampusZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchZones = async () => {
    try {
      const { data, error } = await supabase
        .from('campus_zones')
        .select('*')
        .order('zone_name');

      if (error) {
        console.error("Error fetching zones:", error);
        setZones([]);
        return;
      }

      setZones(data || []);
    } catch (err) {
      console.error("Error fetching zones:", err);
      setZones([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('admin_campus_zones_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'campus_zones'
        },
        () => {
          fetchZones();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getColorScheme = (level: string) => {
    return CONCERN_COLORS[level as keyof typeof CONCERN_COLORS] || CONCERN_COLORS.safe;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-20 bg-slate-700/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (zones.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        No zone data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {zones.map((zone) => {
        const colors = getColorScheme(zone.concern_level);
        return (
          <div
            key={zone.id}
            className={`p-3 rounded-lg border ${colors.bg} ${colors.border} transition-all hover:scale-[1.02] cursor-pointer`}
          >
            <p className="text-xs text-slate-400 truncate">{zone.zone_name}</p>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-lg font-bold ${colors.text}`}>
                {zone.reports_count}
              </span>
              <span className={`text-[10px] uppercase ${colors.text}`}>
                {zone.concern_level}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
