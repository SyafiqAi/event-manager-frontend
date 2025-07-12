"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import InputFileUpload from "../components/UploadFileButton";
import { useForm, Controller } from "react-hook-form";
import DateInput from "@/app/components/DateInput";
import { EventFormValues } from "../interfaces/eventFormValues.interface";
import { createEventWithThumbnail } from "@/lib/createEventWithThumbnail";

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
    alert("ok");
  } catch (e) {
    console.log(e);
    alert(`error: ${e}`);
  }
};

export default function CreateNewEvent() {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
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
        <Controller
          name="thumbnail"
          control={control}
          rules={{
            required: "Thumbnail is required",
          }}
          render={({ field }) => (
            <InputFileUpload
              onChange={(e) => {
                field.onChange(e);
                handleFileChange(e);
              }}
            />
          )}
        />{" "}
        {errors.thumbnail && (
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.thumbnail.message}
          </span>
        )}
        {previewUrl && (
          <Box mt={2}>
            <img
              src={previewUrl}
              alt="Event Poster Preview"
              style={{ maxWidth: "300px", borderRadius: "8px" }}
            />
          </Box>
        )}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
