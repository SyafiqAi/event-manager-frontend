"use client";

import RegisterPage from "@/app/components/RegistrationForm";
import { Role } from "@/app/interfaces/role.enum";

export default function UserRegistrationPage() {
  return (
    <div>
      <RegisterPage role={Role.USER} />
    </div>
  );
}
