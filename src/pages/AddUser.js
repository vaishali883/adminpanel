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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 850,
  bgcolor: "background.paper",
  textAlign: "center",
  color: "black",
  borderRadius: "25px",
  
};

const AddUser = ({ modalOpen, toggleModal }) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [phhno, setPhnno] = useState("");
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [isFormInvalidPass, setIsFormInvalidPass] = useState(false);
  const [isFormInvalidCPass, setIsFormInvalidCPass] = useState(false);
  const [isFormInvalidEmail, setIsFormInvalidEmail] = useState(false);
  const [isFormInvalidbirth, setisFormInvalidBirth] = useState("");
  const [isFormInvalidphhno, setisFormInvalidPhnno] = useState();
  const [severity, setSeverity] = useState("");

  const [value, setValue] = React.useState("active");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
    // window.location.reload();
  };

  const save = () => {
    if (username === "") {
      setIsFormInvalid(true);
    } else {
      setIsFormInvalid(false);
    }
    if (pass === "") {
      setIsFormInvalidPass(true);
    } else {
      setIsFormInvalidPass(false);
    }
    if (cpass === "") {
      setIsFormInvalidCPass(true);
    } else {
      setIsFormInvalidCPass(false);
    }
    if (email === "") {
      setIsFormInvalidEmail(true);
    } else {
      setIsFormInvalidEmail(false);
    }
    if (birth === "") {
      setisFormInvalidBirth(true);
    } else {
      setisFormInvalidBirth(false);
    }
    if (phhno === "") {
      setisFormInvalidPhnno(true);
    } else {
      setisFormInvalidPhnno(false);
    }
    const data = {
      user_name: username,
      password: pass,
      Email: email,
      cofirm_password: cpass,
      birthday: birth,
      phhno: phhno,
      gender: gender,
    };
    axios
      .post("http://localhost:4000/user/", data)
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
    <div >
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
        style={{overflow:'scroll'}}
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
              <h3 style={{ fontSize: "30px" }}> Add User </h3>
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
          <form>
            <div style={{ marginTop: "12vh" }}>
              <TextField
                error={isFormInvalid}
                helperText={isFormInvalid && "User Name required"}
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "80%" }}
              />
            </div>
            <div style={{ marginTop: "2vh" }}>
              <TextField
                error={isFormInvalidPass}
                helperText={isFormInvalidPass && "Password required"}
                id="outlined-basic"
                label="Password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                variant="outlined"
                style={{ width: "80%" }}
              />
            </div>
            <div style={{ marginTop: "2vh" }}>
              <TextField
                error={isFormInvalidCPass}
                helperText={isFormInvalidCPass && "Confirm Password required"}
                id="outlined-basic"
                label="Cofirm Password"
                type="password"
                value={cpass}
                onChange={(e) => setCpass(e.target.value)}
                variant="outlined"
                style={{ width: "80%" }}
              />
            </div>
            <div style={{ marginTop: "2vh" }}>
              <TextField
                error={isFormInvalidEmail}
                helperText={isFormInvalidEmail && "Email required"}
                id="outlined-basic"
                label="Email Id"
                variant="outlined"
                style={{ width: "80%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "2vh" }}>
              <TextField
                error={isFormInvalidbirth}
                helperText={isFormInvalidbirth && "Birth Date required"}
                id="outlined-basic"
                label="BirthDay"
                variant="outlined"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                style={{ width: "80%" }}
              />
            </div>
            <div style={{ marginTop: "2vh" }}>
              <TextField
                error={isFormInvalidphhno}
                helperText={isFormInvalidphhno && "Phone Number required"}
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                type="number"
                value={phhno}
                onChange={(e) => setPhnno(e.target.value)}
                style={{ width: "80%" }}
              />
            </div>
            {/* <div style={{ marginTop: "2vh" }}>
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
            <div style={{ marginTop: "2vh" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginLeft: "11%",
                  fontSize: "19px",
                }}
              >
                Gender{" "}
                <span style={{ marginLeft: "5%" }}>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
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
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddUser;
