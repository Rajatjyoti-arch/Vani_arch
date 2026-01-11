import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, Bell, Shield, Database, Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">
            Configure system preferences and administrative options
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600/20 rounded-lg">
                  <Bell className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-white">Notifications</CardTitle>
                  <CardDescription className="text-slate-400">
                    Configure how you receive alerts and updates
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-reports" className="text-slate-300">
                  New report notifications
                </Label>
                <Switch id="new-reports" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="resolution-updates" className="text-slate-300">
                  Resolution status updates
                </Label>
                <Switch id="resolution-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="system-alerts" className="text-slate-300">
                  System health alerts
                </Label>
                <Switch id="system-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-white">Security</CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage security and access settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor" className="text-slate-300">
                  Two-factor authentication
                </Label>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="session-timeout" className="text-slate-300">
                  Auto session timeout (30 min)
                </Label>
                <Switch id="session-timeout" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Database className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-white">Data Management</CardTitle>
                  <CardDescription className="text-slate-400">
                    Configure data retention and archival policies
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-archive" className="text-slate-300">
                  Auto-archive resolved cases (90 days)
                </Label>
                <Switch id="auto-archive" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="anonymize" className="text-slate-300">
                  Anonymize archived data
                </Label>
                <Switch id="anonymize" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
