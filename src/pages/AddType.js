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
  height: 350,
  bgcolor: "background.paper",
  textAlign: "center",
  color: "black",
  borderRadius: "25px",
};

const AddType = ({ modalOpen, toggleModal }) => {
  const [typeName, setTypename] = useState("");
  const [image, setImage] = useState();
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
    const data = new FormData();
    data.append("Music_type",typeName);
    data.append("Image",image);
    axios
      .post("http://localhost:4000/typemusic/", data,{
        headers: {
          'content-type': 'multipart/form-data' // do not forget this 
         }
      } )
      .then((res) => {
        setOpen(true);
        setMsg("Type Added Successfully!");
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
              <h3 style={{fontSize:'30px'}}> Add Type </h3>
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
              label="Type Name"
              variant="outlined"
              value={typeName}
              onChange={(e) => setTypename(e.target.value)}
              style={{ width: "80%" }}
            />
          </div>
          <div
            style={{
              marginTop: "5vh",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Type Image &nbsp; : &nbsp;
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              // value={image}
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
            />
            <label htmlFor="raised-button-file" style={{marginLeft:'15px'}}>
              <Button variant="raised" component="span" style={{backgroundColor:'#46ac55',color:'white'}}>
                Upload
              </Button>
            </label>
            <span style={{fontWeight:'300',fontSize:'17px',marginLeft:'15px'}}>{image ? image.name : ''}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5%",
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

export default AddType;
