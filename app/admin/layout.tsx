import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <AdminSidebar />
      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Spacer for mobile header */}
        <div className="h-14 lg:h-0" />
        <main className="min-h-screen p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
