"use client";

import { CircularProgress } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
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
    pageSize: 1,
  });

  const res = useEvents(paginationModel.page + 1, paginationModel.pageSize);

  if (res.isLoading) return <CircularProgress />;

  return (
    <EventListTable
      data={res.data?.data}
      rowCount={res.data?.total ?? 0}
      isLoading={res.isFetching}
      paginationModel={paginationModel}
      onPageChange={(model) => setPaginationModel(model)}
    />
  );
}
