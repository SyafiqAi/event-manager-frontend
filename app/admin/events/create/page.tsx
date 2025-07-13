"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InputFileUpload from "../components/UploadFileButton";
import { useForm, Controller } from "react-hook-form";
import DateInput from "@/app/components/DateInput";
import { EventFormValues } from "../interfaces/eventFormValues.interface";
import { createEventWithThumbnail } from "@/lib/createEventWithThumbnail";
import { useRouter } from "next/navigation";
import ImageIcon from "@mui/icons-material/Image";
import ImageUploadPreview from "../components/UploadFileButton";

export default function CreateNewEvent() {
  const router = useRouter();
  const onSubmit = async (data: EventFormValues) => {
    if (!data.fromDate || !data.toDate || !data.thumbnail) return;

    try {
      await createEventWithThumbnail({
        name: data.name,
        location: data.location,
        fromDate: data.fromDate,
        toDate: data.toDate,
        thumbnail: data.thumbnail,
      });
      alert("Event Created");
      router.push("/admin/events");
    } catch (e) {
      console.log(e);
      alert(`error: ${e}`);
    }
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    defaultValues: {
      name: "",
      location: "",
      fromDate: null,
      toDate: null,
      thumbnail: null,
    },
  });

  const fromDateValue = watch("fromDate");

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Create Event
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} columns={{ xs: 1, md: 12 }}>
          <Grid size={6}>
            <Stack
              spacing={2}
              height={"100%"}
              display={"flex"}
              flex={"col"}
              justifyContent={"center"}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: "Event name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Event Name"
                    variant="filled"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Location"
                    variant="filled"
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />
              <Controller
                name="fromDate"
                control={control}
                rules={{
                  required: "From date is required",
                }}
                render={({ field }) => (
                  <DateInput
                    label="From"
                    onDateChange={field.onChange}
                    error={!!errors.fromDate}
                    helperText={errors.fromDate?.message}
                  />
                )}
              />
              <Controller
                name="toDate"
                control={control}
                rules={{
                  required: "From date is required",
                  validate: (toDate) =>
                    !toDate || !fromDateValue || toDate >= fromDateValue
                      ? true
                      : "To date must be after From date",
                }}
                render={({ field }) => (
                  <DateInput
                    label="To"
                    onDateChange={field.onChange}
                    error={!!errors.toDate}
                    helperText={errors.toDate?.message}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid size={6}>
            <Controller
              name="thumbnail"
              control={control}
              rules={{
                required: "Thumbnail is required",
              }}
              render={({ field }) => (
                <ImageUploadPreview
                  onChange={(e) => {
                    field.onChange(e);
                    handleFileChange(e);
                  }}
                  previewUrl={previewUrl}
                />
              )}
            />

            {errors.thumbnail && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.thumbnail.message}
              </span>
            )}
          </Grid>
        </Grid>
        <Container
          sx={{
            marginTop: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              width: { xs: "100%", md: "150px" },
            }}
          >
            Submit
          </Button>
        </Container>
      </form>
    </Box>
  );
}
