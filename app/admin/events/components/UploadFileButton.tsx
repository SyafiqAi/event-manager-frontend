"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Container } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ImageUploadPreview({
  previewUrl,
  onChange,
}: {
  previewUrl: string | null;
  onChange: (fileList: FileList | null) => void;
}) {
  return (
    <Container
      sx={{
        marginTop: "10px",
        width: "100%",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        backgroundColor: previewUrl ? null : "lightgray",
      }}
    >
      <label style={{ width: "100%", height: "100%", cursor: "pointer" }}>
        {previewUrl ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "black",
            }}
          >
            <img
              src={previewUrl}
              alt="Event Poster Preview"
              style={{
                maxHeight: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
                display: "block",
                margin: "0 auto",
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "black",
            }}
          >
            <ImageIcon sx={{ fontSize: 64 }} />
            <div>Click to upload thumbnail</div>
          </Box>
        )}
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={(event) => onChange(event.target.files)}
        />
      </label>
    </Container>
  );
}
