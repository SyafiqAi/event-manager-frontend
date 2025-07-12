"use client";

import { getProfile } from "@/services/authService";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Role } from "../interfaces/role.enum";

interface RequireAdminProps {
  children: React.ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (!isLoading && user && user.role !== Role.ADMIN) {
      router.push("/unauthorized");
    }
  }, [user, isLoading, router]);
  
  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Checking access...
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
