"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Role } from "../interfaces/role.enum";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage({ role }: { role: Role }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const {access_token} = await register(data.email, data.password, data.name, role);

      localStorage.setItem("accessToken", access_token);
  
      router.push(role === Role.USER ? "/events" : "/admin/events");
    } catch(e) {
      console.log(e);
      alert(e)
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" mb={2}>
        Register {role}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="filled"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
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
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
