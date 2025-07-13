"use client";

import { Box, Container } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function showHomePage() {
    if (pathname.startsWith("/admin")) {
      router.push("/admin/events");
    } else {
      router.push("/events");
    }
  }
  return (
    <Box>
      <Box
        bgcolor={"primary.main"}
        marginBottom={"20px"}
        padding={"10px"}
        color={"white"}
        fontSize={"1.5rem"}
      >
        <div onClick={showHomePage} className="cursor-pointer">Events</div>
      </Box>
      <Container>{children}</Container>
    </Box>
  );
}
