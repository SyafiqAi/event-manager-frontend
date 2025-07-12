"use client"

import RegisterPage from "@/app/components/RegistrationForm";
import { Role } from "@/app/interfaces/role.enum";

export default function AdminRegistrationPage() {
    return <div>
        <RegisterPage role={Role.ADMIN} />
    </div>
}