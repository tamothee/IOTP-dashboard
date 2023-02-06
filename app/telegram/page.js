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
  const [password, setpassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [idPopup, setIdPopup] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [deviceId, setDeviceId] = React.useState("");
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
      <Dialog open={open} onClose={handleIdPopup}>
        <DialogTitle>Add Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new device, please fill up the forms below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name-input"
            label="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password-input"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(event) => {
              setpassword(event.target.value);
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

      <Dialog open={idPopup} onClose={handleIdPopup}>
        <DialogTitle>Device ID</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid justifyContent="center" alignItems="center" spacing={4}>
              <div>
                Your device has been successfully been inserted. This is your
                Device ID. <b> DO NOT SHARE THIS WITH ANYONE.</b> Put this ID in
                your device to pair with your account.
              </div>
              <Stack
                direction={"row"}
                justifyContent="center"
                alignItems="center"
              >
                <Box>{deviceId}</Box>
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(deviceId);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Stack>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleIdPopup();
              window.location.reload();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
