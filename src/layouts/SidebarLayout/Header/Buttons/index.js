import {
  Alert,
  Snackbar,
  Typography,
  TextField,
  Divider,
  Chip,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import * as React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import { syncup, syncdown } from "src/handlers/Sync";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function handleFormChange3() {
  sessionStorage.removeItem("sessionid");
  window.location.reload();
}

function handleFormChange4() {
  if (sessionStorage.t_sessionid) {
    localStorage.clear();
    sessionStorage.sessionid = sessionStorage.t_sessionid;
    syncdown("router");
    syncdown("vlan");
    syncdown("switch");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

function HeaderButtons() {
  const [open2, setOpen2] = React.useState(false);
  const handleClick = () => {
    setOpen2(true);
  };
  const handleClose2 = () => setOpen2(false);
  const vertical = "top";
  const horizontal = "center";

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  function handleFormChange(event) {
    if (!sessionStorage.sessionid) {
      sessionStorage.sessionid = Math.floor(Math.random() * 90000) + 10000;
    }
    syncup(JSON.parse(localStorage.router_data), "router");
    syncup(JSON.parse(localStorage.switch_data), "switch");
    handleClose();
  }

  function issessionshared() {
    if (!sessionStorage.sessionid) {
      return (
        <Tooltip arrow title="You're not currently sharing you session">
          <Chip label="Session offline" variant="outlined" />
        </Tooltip>
      );
    } else {
      return (
        <Box component="span">
          <Button
            onClick={() => handleFormChange3()}
            variant="outlined"
            size="small"
            color="error"
            sx={{ mr: 2 }}
          >
            Stop session
          </Button>
          <Tooltip arrow title="Copy to clipboard">
            <Chip
              label={sessionStorage.sessionid}
              color="success"
              onClick={() => {
                navigator.clipboard.writeText(sessionStorage.sessionid);
                handleClick();
              }}
              variant="contained"
            />
          </Tooltip>
          <Snackbar
            open={open2}
            anchorOrigin={{ vertical, horizontal }}
            onClose={handleClose2}
            autoHideDuration={2000}
          >
            <Alert
              variant="filled"
              onClose={handleClose2}
              severity="success"
              sx={{ width: "100%" }}
            >
              Sessioncode copied to clipboard
            </Alert>
          </Snackbar>
        </Box>
      );
    }
  }

  return (
    <Box sx={{ mr: 1 }}>
      <Box sx={{ mx: 0.5 }} component="span">
        {issessionshared()}
        <Button
          startIcon={<GroupsIcon />}
          onClick={() => {
            handleOpen();
          }}
          sx={{ ml: 3, mr: 3 }}
          variant="contained"
        >
          Shared session
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h4" sx={{ mb: 1, ml: 2 }}>
              Enter a sessionskode to join a session
            </Typography>
            <Typography
              variant="h6"
              style={{ color: "#DD4B34" }}
              sx={{ ml: 5, mb: 2 }}
            >
              Existing configs will be overwritten
            </Typography>
            <TextField
              size="small"
              style={{ width: "35%" }}
              onChange={(event) => {
                sessionStorage.t_sessionid = event.target.value;
              }}
              inputProps={{ style: { color: "#FFC13D" } }}
              sx={{ left: "10%" }}
            ></TextField>
            <Button
              variant="contained"
              sx={{ ml: 2, left: "10%" }}
              size="medium"
              color="primary"
              onClick={() => handleFormChange4()}
            >
              Join session
            </Button>
            <Divider sx={{ m: 4, bgcolor: "#FFC13D" }}> Or </Divider>
            <Button
              onClick={(event) => handleFormChange(event)}
              variant="contained"
              sx={{ left: "30%" }}
              size="medium"
              color="success"
            >
              Share my session
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default HeaderButtons;
