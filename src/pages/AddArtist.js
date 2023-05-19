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
  height: 530,
  bgcolor: "background.paper",
  textAlign: "center",
  color: "black",
  borderRadius: "25px",
};

const AddArtist = ({ modalOpen, toggleModal }) => {
  const [artistname, setArtistname] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const [isFormInvalidName, setIsFormInvalidCName] = useState(false);
  const [isFormInvalidEmail, setIsFormInvalidEmail] = useState(false);

  const [value, setValue] = React.useState("active");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const save = () => {
    if (artistname === "") {
      setIsFormInvalidCName(true);
    } else {
      setIsFormInvalidCName(false);
    }
    if (email === "") {
      setIsFormInvalidEmail(true);
    } else {
      setIsFormInvalidEmail(false);
    }
    const data = new FormData();
    data.append("artist_name",artistname);
    data.append("Email",email);
    data.append("artist_Image",image);
    if(!(artistname === "") && !(email === "") && image){
    axios
      .post("http://localhost:4000/artist/", data,{
        headers: {
          'content-type': 'multipart/form-data' // do not forget this 
         }
      } )
      .then((res) => {
        setOpen(true);
        setMsg("Artist Added Successfully!");
        setSeverity("success");
      })
      .catch(() => {
        setOpen(true);
        setMsg("Oops!! Something went wrong!!");
        setSeverity("error");
      });
    }
  };

  console.log(image)

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
              <h3 style={{ fontSize: "30px" }}> Add Artist </h3>
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
            error={isFormInvalidName}
            helperText={isFormInvalidName && "Artist Name required"}
              id="outlined-basic"
              label="Artist Name"
              variant="outlined"
              value={artistname}
              onChange={(e) => setArtistname(e.target.value)}
              style={{ width: "80%" }}
            />
          </div>
          <div style={{ marginTop: "3vh" }}>
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
          <div
            style={{
              marginTop: "4vh",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Artist Image &nbsp; : &nbsp;
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              required
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
              marginTop: "8%",
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

export default AddArtist;
