"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Grid, IconButton } from "@mui/material";

import { mongodbContext } from "../MongoHandler";

export default function AddDevice() {
  const [name, setName] = React.useState("");
  const [idPopup, setIdPopup] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { mongodb, user, permission, app } = React.useContext(mongodbContext);
  async function write() {
    setLoading(true);
    if (user) {
        
    }
    setLoading(false);
  }

  const handleIdPopup = () => {
    setIdPopup(!idPopup);
  };

  return (
    <div>
      <Dialog open={idPopup} onClose={handleIdPopup}>
        <DialogTitle>Add Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Add in your telegram id to receive alerts
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="telegramid-input"
            label="Telegram ID"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopup}>Cancel</Button>
          <LoadingButton loading={loading} variant="contained" onClick={write}>
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
