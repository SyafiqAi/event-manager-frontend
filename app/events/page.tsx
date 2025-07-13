"use client";

import { useRouter } from "next/navigation";
import { useEvents } from "../admin/events/hooks/useEvents";
import TitlebarImageList from "./components/thumbnailGallery";
import { Pagination, Typography } from "@mui/material";
import EventPagination from "./components/eventPagination";
import { useState } from "react";

export default function EventsPage() {
    const [page, setPage] = useState(1);

  const eventsQuery = useEvents({page});

  const router = useRouter();
  function showEventPage(eventId: number) {
    router.push(`events/${eventId}`);
  }

  return (
    <div>
      <Typography variant="h4" mb={3}>
        Events
      </Typography>
      <TitlebarImageList
        onEventClick={showEventPage}
        eventsList={eventsQuery.data?.data ?? []}
      />
      <EventPagination
        page={page}
        totalPages={eventsQuery.data?.totalPages??0}
        onPageChange={(newPage) => {
          setPage(newPage); // or whatever state setter you're using
        }}
      />
    </div>
  );
}
