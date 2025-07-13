"use client";

import DateInput from "@/app/components/DateInput";
import { createEventWithThumbnail } from "@/lib/createEventWithThumbnail";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputFileUpload from "../../components/UploadFileButton";
import { useGetOneEvent } from "../../hooks/useGetOneEvent";
import { updateEventWithThumbnail } from "@/lib/updateEvent";
import { useParams, useRouter } from "next/navigation";
import { UpdateEventFormValues } from "../../interfaces/updateEventFormValues";
import { EventStatus } from "../../interfaces/eventStatus.enum";
import ImageUploadPreview from "../../components/UploadFileButton";
import { getEventPosterImgUrl } from "@/lib/getEventPosterImgUrl";

export default function UpdateEvent() {
  const router = useRouter();
  const onSubmit = async (eventId: number, data: UpdateEventFormValues) => {
    if (!data.fromDate || !data.toDate) return;

    try {
      await updateEventWithThumbnail(eventId, {
        name: data.name,
        location: data.location,
        fromDate: data.fromDate,
        toDate: data.toDate,
        thumbnail: data.thumbnail,
        status: data.status,
      });
      alert("Event Updated.");
      router.push("/admin/events");
    } catch (e) {
      console.log(e);
      alert(`error: ${e}`);
    }
  };

  const { error, data, isLoading } = useGetOneEvent();
  const { id: eventId } = useParams();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UpdateEventFormValues>({
    defaultValues: {
      name: "",
      location: "",
      fromDate: null,
      toDate: null,
      thumbnail: null,
      status: EventStatus.ONGOING,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        location: data.location,
        fromDate: data.startDate ? new Date(data.startDate) : null,
        toDate: data.endDate ? new Date(data.endDate) : null,
        thumbnail: null,
        status: data.status,
      });

      setPreviewUrl(getEventPosterImgUrl(data.posterUrl));
    }
  }, [data, reset]);

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
        Update Event
      </Typography>

      <form
        onSubmit={handleSubmit((values) => onSubmit(Number(eventId), values))}
      >
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
                    value={field.value}
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
                    value={field.value}
                    label="To"
                    onDateChange={field.onChange}
                    error={!!errors.toDate}
                    helperText={errors.toDate?.message}
                  />
                )}
              />
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <FormControl
                    variant="filled"
                    size="small"
                    error={!!errors.status}
                  >
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      {...field}
                      labelId="status-label"
                      value={field.value ?? ""} // handle undefined case
                    >
                      <MenuItem value={EventStatus.ONGOING}>Ongoing</MenuItem>
                      <MenuItem value={EventStatus.COMPLETED}>
                        Completed
                      </MenuItem>
                    </Select>
                    <FormHelperText>{errors.status?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Stack>
          </Grid>
          <Grid size={6}>
            <Controller
              name="thumbnail"
              control={control}
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
