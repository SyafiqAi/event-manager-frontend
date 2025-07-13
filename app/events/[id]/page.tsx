"use client";
import { useGetOneEvent } from "@/app/admin/events/hooks/useGetOneEvent";
import { getEventPosterImgUrl } from "@/lib/getEventPosterImgUrl";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function showEventPage() {
  const { data: event } = useGetOneEvent();

  if (!event) {
    return <Box>Event not found</Box>;
  }

  return (
    <Box sx={{ p: 2 }} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <img
        src={getEventPosterImgUrl(event.posterUrl)}
        alt={event.name}
        style={{ maxHeight: "800px", borderRadius: "8px" }}
      />
      <Typography variant="h5" gutterBottom>
        {event.name}
      </Typography>
      <Typography variant="body1">
        {new Date(event.startDate).toDateString()} -{" "}
        {new Date(event.endDate).toDateString()}
      </Typography>
      <Typography variant="body1">Location: {event.location}</Typography>
      <Typography variant="body1">Status: {event.status}</Typography>
    </Box>
  );
}
