import { Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { endOfDay } from "date-fns";
import { useState } from "react";

interface DateInputProps {
  onFromDateChange: (date: Date | null) => void;
  onToDateChange: (date: Date | null) => void;
}

export default function DateInputToFrom({
  onFromDateChange,
  onToDateChange,
}: DateInputProps) {
  const handleToDateChange = (date: Date | null) => {
    if (date) {
      onToDateChange(endOfDay(date));
    } else {
      onToDateChange(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{display: 'flex'}}>
      <DatePicker
        label="From"
        onChange={onFromDateChange}
        slotProps={{ textField: { variant: "filled", fullWidth: true} }}
      />
      <DatePicker
        label="To"
        onChange={handleToDateChange}
        slotProps={{ textField: { variant: "filled", fullWidth: true} }}
      />
      </Box>
    </LocalizationProvider>
  );
}
