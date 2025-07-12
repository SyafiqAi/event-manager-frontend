import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface PasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

export default function PasswordDialog({
  open,
  onClose,
  onConfirm,
}: PasswordDialogProps) {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    onConfirm(password);
    setPassword("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <TextField
          label="Enter Password"
          type="password"
          variant="filled"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
