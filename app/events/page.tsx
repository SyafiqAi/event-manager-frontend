"use client";

import {
  CircularProgress,
  Typography
} from "@mui/material";
import { useEvents } from "./hooks/useEvents";
import dynamic from "next/dynamic";

// Dynamically import EventListTable with SSR disabled
const EventListTable = dynamic(() => import('./components/EventListTable'), {
  ssr: false,
});



export default function EventList() {
  const { data, isLoading, isError, error } = useEvents();

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">{(error as Error).message}</Typography>;

  return (
    <EventListTable data={data?.data} />
  );
}
