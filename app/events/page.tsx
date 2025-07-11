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
import DateInputExample from "../components/DateInput";
import { useRouter } from "next/router";

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

  const [toDate, setToDate] = useState<Date | null>();
  const [fromDate, setFromDate] = useState<Date | null>();

  const res = useEvents({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    sortBy: sortModel[0]?.field,
    sortOrder: sortModel[0]?.sort ?? undefined,
    status: filterModel?.items[0]?.value,
    search,
    toDate: toDate ?? undefined,
    fromDate: fromDate ?? undefined,
  });

  // if (res.isLoading) return <CircularProgress />;
  
  const router = useRouter();
  function onRowClick(id: number) {
    alert(id);
  }
  
  return (
    <div>
      <SearchInput
        value={search}
        placeholder="Search event name or location"
        onDebouncedChange={setSearch}
      />
      <DateInputExample
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />
      <EventListTable
        data={res.data?.data}
        rowCount={res.data?.total ?? 0}
        isLoading={res.isFetching || res.isLoading}
        paginationModel={paginationModel}
        onPageChange={setPaginationModel}
        onSortModelChange={setSortModel}
        onFilterModelChange={setFilterModel}
        onRowClick={onRowClick}
      />
    </div>
  );
}
