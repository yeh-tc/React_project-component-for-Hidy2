import * as React from "react";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


export default function FailApiWarning() {
  const [open, setOpen] = useState(true);
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{ zIndex: 999 }}
      >
        <Alert onClose={handleClose} severity="error">
          Opps! There are some problems from chemistry data server!
        </Alert>
      </Snackbar>
    </div>
  );
}
