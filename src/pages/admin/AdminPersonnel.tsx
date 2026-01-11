import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Mail } from "lucide-react";
import { InviteAdminModal } from "@/components/admin/InviteAdminModal";

export default function AdminPersonnel() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Personnel Management</h1>
            <p className="text-slate-400 mt-1">
              Manage administrative staff and their access levels
            </p>
          </div>
          <InviteAdminModal />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Total Admins
              </CardTitle>
              <Users className="w-4 h-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1</div>
              <p className="text-xs text-slate-500 mt-1">Active administrators</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Pending Invites
              </CardTitle>
              <Mail className="w-4 h-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-slate-500 mt-1">Awaiting acceptance</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Access Level
              </CardTitle>
              <Shield className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Full</div>
              <p className="text-xs text-slate-500 mt-1">Administrative access</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Administrative Staff</CardTitle>
            <CardDescription className="text-slate-400">
              View and manage all users with administrative privileges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Personnel list will be displayed here</p>
              <p className="text-sm mt-2">Use the "Invite Administrator" button to add new administrators</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
