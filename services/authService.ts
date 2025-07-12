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
