import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, Clock, Eye, Loader2, MapPin, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ZoneReport {
  id: string;
  zone_id: string;
  report_type: string;
  description: string | null;
  severity: string;
  status: string;
  created_at: string;
  campus_zones: {
    zone_name: string;
  } | null;
}

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: Clock },
  reviewed: { label: "Reviewed", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Eye },
  resolved: { label: "Resolved", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: CheckCircle },
};

const SEVERITY_CONFIG = {
  low: { label: "Low", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  medium: { label: "Medium", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  high: { label: "High", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export function ReportManagement() {
  const [reports, setReports] = useState<ZoneReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const fetchReports = async () => {
    try {
      let query = supabase
        .from('zone_reports')
        .select(`
          id,
          zone_id,
          report_type,
          description,
          severity,
          status,
          created_at,
          campus_zones (
            zone_name
          )
        `)
        .order('created_at', { ascending: false });

      if (filterStatus !== "all") {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('admin_reports_management')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'zone_reports'
        },
        () => {
          fetchReports();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filterStatus]);

  const updateReportStatus = async (reportId: string, newStatus: string) => {
    setUpdatingId(reportId);
    try {
      const { error } = await supabase
        .from('zone_reports')
        .update({ status: newStatus })
        .eq('id', reportId);

      if (error) throw error;
      toast.success(`Report marked as ${newStatus}`);
    } catch (error) {
      console.error("Error updating report:", error);
      toast.error("Failed to update report status");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatReportType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ');
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-white text-base flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Zone Reports Management
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px] bg-slate-900 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => fetchReports()}
            className="border-slate-600"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No reports found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => {
              const statusConfig = STATUS_CONFIG[report.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
              const severityConfig = SEVERITY_CONFIG[report.severity as keyof typeof SEVERITY_CONFIG] || SEVERITY_CONFIG.low;
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={report.id}
                  className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-white font-medium">
                          {report.campus_zones?.zone_name || 'Unknown Zone'}
                        </span>
                        <Badge variant="outline" className={severityConfig.color}>
                          {severityConfig.label}
                        </Badge>
                        <Badge variant="outline" className={statusConfig.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-300 mb-1">
                        Type: {formatReportType(report.report_type)}
                      </p>
                      {report.description && (
                        <p className="text-sm text-slate-400 line-clamp-2">
                          {report.description}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 mt-2">
                        Reported: {formatDate(report.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                            onClick={() => updateReportStatus(report.id, 'reviewed')}
                            disabled={updatingId === report.id}
                          >
                            {updatingId === report.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <>
                                <Eye className="h-3 w-3 mr-1" />
                                Review
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20"
                            onClick={() => updateReportStatus(report.id, 'resolved')}
                            disabled={updatingId === report.id}
                          >
                            {updatingId === report.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Resolve
                              </>
                            )}
                          </Button>
                        </>
                      )}
                      {report.status === 'reviewed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20"
                          onClick={() => updateReportStatus(report.id, 'resolved')}
                          disabled={updatingId === report.id}
                        >
                          {updatingId === report.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolve
                            </>
                          )}
                        </Button>
                      )}
                      {report.status === 'resolved' && (
                        <span className="text-xs text-emerald-400">✓ Resolved</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
