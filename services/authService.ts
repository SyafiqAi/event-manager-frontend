import { Role } from "@/app/interfaces/role.enum";

export const login = async (email: string, password: string) => {
  const url = `http://localhost:9000/auth/login`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to login");
  }

  return await res.json();
};

export const register = async (
  email: string,
  password: string,
  name: string,
  role: Role,
) => {
  const url = `http://localhost:9000/auth/register`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, name, role }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to register");
  }

  return await res.json();
};

export const getProfile = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const url = `http://localhost:9000/auth/profile`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to get profile");
  }

  return await res.json();
};
