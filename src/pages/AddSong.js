import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Close from "@material-ui/icons/Close";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import SnackbarModule from "./sanckbar";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  textAlign: "center",
  color: "black",
  borderRadius: "25px",
};

const AddSong = ({ modalOpen, toggleModal }) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(true);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const [value, setValue] = React.useState("active");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
    window.location.reload();
  }

  const save = () => {
    const data = {
      user_name: username,
      password: pass,
      Email: email,
    };
    axios
      .post("http://localhost:4000/api/", data)
      .then((res) => {
        setOpen(true);
        setMsg("User Added Successfully!");
        setSeverity("success");
      })
      .catch(() => {
        setOpen(true);
        setMsg("Oops!! Something went wrong!!");
        setSeverity("error");
      });
  };

  return (
    <div>
        <SnackbarModule
          open={open}
          message={msg}
          handleSnackbarClose={handleSnackbarClose}
          severity={severity}
        />
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <AppBar
            style={{
              boxShadow: "10px black",
              borderRadius: "25px 25px 0px 0px",
              fontSize: `10px`,
              backgroundColor: "#46ac55",
              color: "white",
              padding: "5px",
            }}
          >
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleModal}
                aria-label="close"
              ></IconButton>
              <h3 style={{fontSize:'30px'}}> Add Song </h3>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  toggleModal();
                }}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: "15vh" }}>
            <TextField
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "80%" }}
            />
          </div>
          <div style={{ marginTop: "3vh" }}>
            <TextField
              id="outlined-basic"
              label="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              variant="outlined"
              style={{ width: "80%" }}
            />
          </div>
          <div style={{ marginTop: "3vh" }}>
            <TextField
              id="outlined-basic"
              label="Email Id"
              variant="outlined"
              style={{ width: "80%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div style={{ marginTop: "3vh" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: "11%",
                fontSize: "19px",
              }}
            >
              Verified{" "}
              <span style={{ marginLeft: "5%" }}>
                <Switch
                  checked={role}
                  onChange={(e) => setRole(e.target.checked)}
                />
              </span>
            </div>
          </div> */}
          <div style={{ marginTop: "3vh" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: "11%",
                fontSize: "19px",
              }}
            >
              Status{" "}
              <span style={{ marginLeft: "5%" }}>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="banned"
                    control={<Radio />}
                    label="Banned"
                  />
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Active"
                  />
                </RadioGroup>
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3%",
              marginRight: "5%",
            }}
          >
            <Button
              style={{
                backgroundColor: "#46ac55",
                color: "white",
                padding: "10px",
                height: 50,
                width: 150,
                fontSize: "large",
                margin: "10px",
                borderRadius: "10px",
              }}
              onClick={() => save()}
              size="lg"
            >
              Submit
            </Button>{" "}
            <Button
              style={{
                backgroundColor: "#46ac55",
                color: "white",
                padding: "10px",
                height: 50,
                width: 150,
                fontSize: "large",
                margin: "10px",
                borderRadius: "10px",
              }}
              onClick={toggleModal}
              size="lg"
            >
              Cancel
            </Button>{" "}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddSong;
