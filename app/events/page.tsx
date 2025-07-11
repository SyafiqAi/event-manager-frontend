"use client";

import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useEvents } from "./hooks/useEvents";
import { TextField } from "@mui/material";
import SearchInput from "../components/SearchInput";

// Dynamically import EventListTable with SSR disabled
const EventListTable = dynamic(() => import("./components/EventListTable"), {
  ssr: false,
});

export default function EventList() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [search, setSearch] = useState("");

  const res = useEvents({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    sortBy: sortModel[0]?.field,
    sortOrder: sortModel[0]?.sort ?? undefined,
    status: filterModel?.items[0]?.value,
    search,
  });

  // if (res.isLoading) return <CircularProgress />;

  return (
    <div>
      <SearchInput
        value={search}
        placeholder="Search event name or location"
        onDebouncedChange={setSearch}
      />
      <EventListTable
        data={res.data?.data}
        rowCount={res.data?.total ?? 0}
        isLoading={res.isFetching || res.isLoading}
        paginationModel={paginationModel}
        onPageChange={setPaginationModel}
        onSortModelChange={setSortModel}
        onFilterModelChange={setFilterModel}
      />
    </div>
  );
}
