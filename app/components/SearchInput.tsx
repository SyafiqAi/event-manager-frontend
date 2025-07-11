"use client";

import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

type DebouncedSearchFieldProps = {
  value?: string;
  onDebouncedChange: (value: string) => void;
  delay?: number;
  placeholder?: string;
};

export default function DebouncedSearchField({
  value = "",
  onDebouncedChange,
  delay = 500,
  placeholder = "Search...",
}: DebouncedSearchFieldProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebouncedChange(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay, onDebouncedChange]);

  return (
    <TextField
      variant="filled"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={placeholder}
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      fullWidth
    />
  );
}
