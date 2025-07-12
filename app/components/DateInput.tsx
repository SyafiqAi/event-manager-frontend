import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { endOfDay } from "date-fns";
import { useState } from "react";

interface DateInputProps {
  onDateChange: (date: Date | null) => void;
  label: string;
  error?: boolean;
  helperText?: string;
}

export default function DateInput({
  onDateChange,
  label,
  error = false,
  helperText = "",
}: DateInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        onChange={onDateChange}
        slotProps={{
          textField: { variant: "filled", size: "small", error, helperText },
        }}
      />
    </LocalizationProvider>
  );
}
