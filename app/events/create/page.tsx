'use client'

import DateInputExample from "@/app/components/DateInput";
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
      <DateInputExample
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      <InputFileUpload onChange={setThumbnailFile} />

      <Button variant="outlined">Submit</Button>
    </div>
  );
}
