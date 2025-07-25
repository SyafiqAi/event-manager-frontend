"use client";

import { getProfile, login } from "@/services/authService";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Role } from "../interfaces/role.enum";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: { email: "", password: "" } });

  const router = useRouter();
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { access_token } = await login(data.email, data.password);
      localStorage.setItem("accessToken", access_token);

      const { role } = await getProfile();

      router.push(role === Role.USER ? "/events" : "/admin/events");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="filled"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                variant="filled"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Typography variant="body2" textAlign="center">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Register here
            </Link>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
}
