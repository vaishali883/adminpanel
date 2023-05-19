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
  height: 500,
  bgcolor: "background.paper",
  textAlign: "center",
  color: "black",
  borderRadius: "25px",
};

const AddSong = ({ modalOpen, toggleModal }) => {
  const [songname, setSongname] = useState("");
  const [artistname, setArtistname] = useState("");
  const [songFile, setSongFile] = useState();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const [isFormInvalidName, setIsFormInvalidCName] = useState(false);
  const [isFormInvalidArtistname, setIsFormInvalidArtistName] = useState(false);

  const [value, setValue] = React.useState("active");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const save = () => {
    if (songname === "") {
      setIsFormInvalidCName(true);
    } else {
      setIsFormInvalidCName(false);
    }
    if (artistname === "") {
      setIsFormInvalidArtistName(true);
    } else {
      setIsFormInvalidArtistName(false);
    }
    const data = new FormData();
    data.append("name",songname);
    data.append("artistName",artistname);
    data.append("music",songFile);
    if(!(songname === "") && !(artistname === "") && songFile){
    axios
      .post("http://localhost:4000/songs/", data,{
        headers: {
          'content-type': 'multipart/form-data' // do not forget this 
         }
      } )
      .then((res) => {
        setOpen(true);
        setMsg("Song Added Successfully!");
        setSeverity("success");
      })
      .catch(() => {
        setOpen(true);
        setMsg("Oops!! Something went wrong!!");
        setSeverity("error");
      });
    }
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
              <h3 style={{ fontSize: "30px" }}> Add Song </h3>
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
             helperText={isFormInvalidName && "Song Name required"}
              id="outlined-basic"
              label="Song Name"
              variant="outlined"
              value={songname}
              onChange={(e) => setSongname(e.target.value)}
              style={{ width: "80%" }}
            />
          </div>
          <div style={{ marginTop: "3vh" }}>
            <TextField
             error={isFormInvalidArtistname}
             helperText={isFormInvalidArtistname && "Artist Name required"}
              id="outlined-basic"
              label="Artist Name"
              variant="outlined"
              style={{ width: "80%" }}
              value={artistname}
              onChange={(e) => setArtistname(e.target.value)}
            />
          </div>
          <div
            style={{
              marginTop: "4vh",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Song File Enter &nbsp; : &nbsp;
            <input
              accept="mp3/*"
              style={{ display: "none" }}
              id="raised-button-file"
              // value={image}
              onChange={(e) => setSongFile(e.target.files[0])}
              type="file"
            />
            <label htmlFor="raised-button-file" style={{marginLeft:'15px'}}>
              <Button variant="raised" component="span" style={{backgroundColor:'#46ac55',color:'white'}}>
                Upload
              </Button>
            </label>
            <span style={{fontWeight:'300',fontSize:'17px',marginLeft:'15px'}}>{songFile ? songFile.name : ''}</span>
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

export default AddSong;
