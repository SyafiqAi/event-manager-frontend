"use client";

import { Box, Container } from "@mui/material";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Box
        bgcolor={"primary.main"}
        marginBottom={"20px"}
        padding={"10px"}
        color={"white"}
        fontSize={"1.5rem"}
      >
        <div>Events</div>
      </Box>
      <Container>{children}</Container>
    </Box>
  );
}
