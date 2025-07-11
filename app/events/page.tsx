"use client";

import { CircularProgress } from "@mui/material";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useEvents } from "./hooks/useEvents";

// Dynamically import EventListTable with SSR disabled
const EventListTable = dynamic(() => import("./components/EventListTable"), {
  ssr: false,
});

export default function EventList() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([])

  const res = useEvents({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    sortBy: sortModel[0]?.field,
    sortOrder: sortModel[0]?.sort ?? undefined,
  });

  // if (res.isLoading) return <CircularProgress />;

  return (
    <EventListTable
      data={res.data?.data}
      rowCount={res.data?.total ?? 0}
      isLoading={res.isFetching || res.isLoading}
      paginationModel={paginationModel}
      onPageChange={setPaginationModel}
      onSortModelChange={setSortModel}
    />
  );
}
