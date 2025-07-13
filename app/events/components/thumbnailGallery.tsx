import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Event } from "@/app/admin/events/interfaces/event.interface";
import { Box } from "@mui/material";

export default function TitlebarImageList({
  eventsList,
  onEventClick,
}: {
  eventsList: Event[];
  onEventClick: (id: number) => void;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {eventsList.map((event) => (
        <ImageListItem key={event.posterUrl} sx={{ cursor: "pointer" }}>
          <img
            onClick={() => {
              onEventClick(event.id);
            }}
            src={`http://localhost:9000${event.posterUrl}`}
            alt={event.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={event.name}
            subtitle={event.status}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${event.name}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </Box>
  );
}
