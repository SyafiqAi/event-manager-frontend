"use client";

import RequireAdmin from "@/app/components/RequireAdmin";
import RequireAuth from "@/app/components/RequireAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <RequireAdmin>{children}</RequireAdmin>
    </RequireAuth>
  );
}
