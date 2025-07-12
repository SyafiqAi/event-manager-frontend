'use client'

import DateInputToFrom from "@/app/components/DateInputToFrom";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import InputFileUpload from "../components/UploadFileButton";

export default function CreateNewEvent() {
  const [toDate, setToDate] = useState<Date | null>();
  const [fromDate, setFromDate] = useState<Date | null>();
  const [thumbnailFile, setThumbnailFile] = useState<FileList | null>();

  return (
    <div>
      <TextField label="Event Name" />
      <TextField label="Location" />
      <DateInputToFrom
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      <InputFileUpload onChange={setThumbnailFile} />

      <Button variant="outlined">Submit</Button>
    </div>
  );
}
