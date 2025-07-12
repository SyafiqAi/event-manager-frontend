"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
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

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Register data:", data);
    alert("Registered!");
    // Call your registration service here
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" mb={2}>
        Register
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
