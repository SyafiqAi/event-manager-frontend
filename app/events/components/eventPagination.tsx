"use client";

import { Pagination, Stack } from "@mui/material";

interface EventPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function EventPagination({
  page,
  totalPages,
  onPageChange,
}: EventPaginationProps) {
  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        size="medium"
      />
    </Stack>
  );
}
