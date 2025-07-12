"use client";

import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useEvents } from "../events/hooks/useEvents";
import { Button, TextField } from "@mui/material";
import SearchInput from "../../components/SearchInput";
import DateInputToFrom from "../../components/DateInputToFrom";
import { useRouter } from "next/navigation";
import PasswordDialog from "./components/PasswordConfirmationForDelete";
import { deleteEvent } from "@/services/eventService";

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
  function showNewEventPage() {
    router.push("/events/create");
  }

  function showUpdateEventPage(eventId: number) {
    router.push(`/admin/events/${eventId}/update`);
  }

  //#region delete
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedEventId(id);
    setPasswordDialogOpen(true);
  };

  const handleConfirmDelete = async (password: string) => {
    setPasswordDialogOpen(false);
    console.log("Deleting event", selectedEventId, "with password:", password);
    try {
      await deleteEvent(selectedEventId!, password)
      alert("Event Deleted.")
      await res.refetch()
    } catch (e) {
      console.log(e)
      alert(e)
    }
  };
  //#endregion
  return (
    <div>
      <SearchInput
        value={search}
        placeholder="Search event name or location"
        onDebouncedChange={setSearch}
      />
      <DateInputToFrom
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />
      <EventListTable
        onRowDelete={handleDeleteClick}
        data={res.data?.data}
        rowCount={res.data?.total ?? 0}
        isLoading={res.isFetching || res.isLoading}
        paginationModel={paginationModel}
        onPageChange={setPaginationModel}
        onSortModelChange={setSortModel}
        onFilterModelChange={setFilterModel}
        onRowClick={showUpdateEventPage}
      />
      <Button onClick={showNewEventPage} variant="contained">
        New Event
      </Button>
      <PasswordDialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
