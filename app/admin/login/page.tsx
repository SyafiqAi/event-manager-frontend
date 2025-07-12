"use client";

import LoginForm from "@/app/components/LoginPage";
import { Role } from "@/app/interfaces/role.enum";

export default function AdminLoginPage() {
  return (
    <div>
      <LoginForm role={Role.ADMIN} />
    </div>
  );
}
