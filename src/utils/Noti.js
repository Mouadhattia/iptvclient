import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Noti({ time, setNotification, notification,severity,message }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification(false);
  };

  return (
    <Snackbar open={notification} autoHideDuration={time} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%",fontSize:"14px" }}>
      {message}
      </Alert>
    </Snackbar>
  );
}
