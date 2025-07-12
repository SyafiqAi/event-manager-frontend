"use client";

import { useRouter } from "next/navigation";
import { useEvents } from "../admin/events/hooks/useEvents";
import TitlebarImageList from "./components/thumbnailGallery";

export default function EventsPage() {
  const eventsQuery = useEvents({});

  const router = useRouter();
  function showEventPage(eventId: number) {
    router.push(`events/${eventId}`)
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
