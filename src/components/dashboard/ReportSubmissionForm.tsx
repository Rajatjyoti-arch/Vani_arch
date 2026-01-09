import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, Loader2, MapPin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useStudentSession } from "@/contexts/StudentSessionContext";
import { toast } from "sonner";

interface CampusZone {
  id: string;
  zone_id: string;
  zone_name: string;
}

const REPORT_TYPES = [
  { value: "harassment", label: "Harassment" },
  { value: "safety", label: "Safety Concern" },
  { value: "infrastructure", label: "Infrastructure Issue" },
  { value: "misconduct", label: "Misconduct" },
  { value: "discrimination", label: "Discrimination" },
  { value: "other", label: "Other" },
];

export function ReportSubmissionForm() {
  const { studentProfile } = useStudentSession();
  const [open, setOpen] = useState(false);
  const [zones, setZones] = useState<CampusZone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [reportType, setReportType] = useState<string>("");
  const [severity, setSeverity] = useState<string>("low");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      fetchZones();
    }
  }, [open]);

  const fetchZones = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('campus_zones')
        .select('id, zone_id, zone_name')
        .order('zone_name');

      if (error) throw error;
      setZones(data || []);
    } catch (error) {
      console.error("Error fetching zones:", error);
      toast.error("Failed to load campus zones");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedZone || !reportType) {
      toast.error("Please select a zone and report type");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('zone_reports')
        .insert({
          zone_id: selectedZone,
          student_id: studentProfile?.id || null,
          report_type: reportType,
          description: description.trim() || null,
          severity: severity,
          status: 'pending',
        });

      if (error) throw error;

      toast.success("Report submitted successfully");
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedZone("");
    setReportType("");
    setSeverity("low");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Report Concern
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Submit Campus Report
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {/* Zone Selection */}
            <div className="space-y-2">
              <Label>Campus Zone *</Label>
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a zone" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>
                      {zone.zone_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Report Type */}
            <div className="space-y-2">
              <Label>Report Type *</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <Label>Severity Level</Label>
              <RadioGroup value={severity} onValueChange={setSeverity} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="text-green-500 font-normal cursor-pointer">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="text-yellow-500 font-normal cursor-pointer">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="text-red-500 font-normal cursor-pointer">High</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea
                placeholder="Provide additional details about the concern..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {description.length}/500
              </p>
            </div>

            {/* Anonymous Notice */}
            <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
              <p>🔒 Your identity is protected. Reports are submitted anonymously.</p>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || !selectedZone || !reportType}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
