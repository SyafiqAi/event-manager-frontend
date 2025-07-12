"use client";

import { useEvents } from "../admin/events/hooks/useEvents";
import TitlebarImageList from "./components/thumbnailGallery";

export default function EventsPage() {
  const eventsQuery = useEvents({});
  function showEventPage(eventId: number) {
    alert(eventId);
  }
  return (
    <div>
      <TitlebarImageList
        onEventClick={showEventPage}
        eventsList={eventsQuery.data?.data ?? []}
      />
    </div>
  );
}
