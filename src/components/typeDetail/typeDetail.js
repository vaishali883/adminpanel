import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import axios from "axios";
import SnackbarModule from "../../pages/sanckbar";
import plusFill from "@iconify/icons-eva/plus-fill";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Link as RouterLink } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";

import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Close from "@material-ui/icons/Close";
import { getAllSongData } from "../../action/songAction";
import { Icon } from "@iconify/react";
import './typeDetail.css'

const ProductImgStyle = styled("img")({
  top: 0,
  width: "20%",
  height: "45%",
  marginTop:'7%',
  marginLeft:'5%',
  objectFit: "cover",
  position: "absolute",
  borderRadius: "10%"
});


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  textAlign: "center",
  color: "black",
  borderRadius: "25px",
};


const TypeDetail = () => {

  const [checked, setChecked] = React.useState([1]);
  const [modal, setModal] = React.useState(false);
  const [song, setSong] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const songsData = useSelector((state) => state.songs.songData);
  const songs = JSON.parse(localStorage.getItem("typeData")).songs;
  const artist_id = JSON.parse(localStorage.getItem("typeData")).id;
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSongData());
  }, []);

  useEffect(() => {
    const res = songsData.filter(({ _id: id1 }) => songs.some(({ _id : id2}) => id2 === id1));

    const result = res.map(song => {
      return {...song,isSelected:true}
    })
    

    let arr3 = songsData.map((item, i) => Object.assign({}, item, result[i]));
    setSong(arr3)

  }, [songsData]);
  console.log(song);
  const image = `http://localhost:4000/${
    JSON.parse(localStorage.getItem("typeData")).image
  }`;


  const handleClickSong = (id,check) => {
    const res = song.map(songs => {
      if(songs._id == id){
        return {...songs,isSelected:check}
      }else{
        return songs;
      }
    });
    setSong(res)
  };

  const handleSnackbarClose = () => {
    setOpen(false);
    window.location.reload();
  }

  const save = () => {
    let array = []
    const data = new FormData();
    song.map(songs => {
      if(songs.isSelected === true){
        array.push(songs)
        return data.append("songs",songs._id);
      }
    })
    localStorage.setItem(
      "typeData",
      JSON.stringify({ name: JSON.parse(localStorage.getItem("typeData")).name, image: JSON.parse(localStorage.getItem("typeData")).image,songs:array,id:artist_id })
    );
    if(data){
    axios
      .put(`http://localhost:4000/typemusic/${artist_id}`, data,{
        headers: {
          'content-type': 'multipart/form-data' // do not forget this 
         }
      } )
      .then((res) => {
        setOpen(true);
        setMsg("Song Edited Successfully!");
        setSeverity("success");
      })
      .catch(() => {
        setOpen(true);
        setMsg("Oops!! Something went wrong!!");
        setSeverity("error");
      });
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: 'flex-start' }}>
        <div>
          <Box>
            <ProductImgStyle src={image} />
          </Box>
        </div>
        <h1 style={{marginLeft:'40%',marginTop:'5%',fontWeight:'bold'}}>{JSON.parse(localStorage.getItem("typeData")).type}</h1>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          startIcon={<Icon icon={plusFill} />}
          onClick={() => setModal(true)}
          style={{ height: "100%", marginTop: "6%", marginLeft: "25%" }}
        >
          Assign Song
        </Button>
      </div>
      <div className="wrapper" style={{marginTop:'20%'}}>
      <div className="container_artist">
            <div className="body_content_artist">
              <div className="title">
              <span>Title</span>
                <span>Artist</span>
                <span>Song</span>
                <span>Delete</span>
              </div>
              <div className="list">
                 { songs ? songs.map(song => 
                  { 
                    return <div className="list_block">
                  <span className="song_title">{song.name}</span>
                  <span className="song_artist">{song.artistName}</span>
                  <span className="track"><audio id="audio" controls><source src={`http://localhost:4000/songs/name/?name=${song.music}`} type="audio/mp3"></source></audio></span>
                 
                  </div>
                }):''
                }
              </div>
            </div>
          </div>
        </div>
        <SnackbarModule
        open={open}
        message={msg}
        handleSnackbarClose={handleSnackbarClose}
        severity={severity}
      />

      <Modal
        open={modal}
        onClose={() => setModal(!modal)}
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
            {" "}
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setModal(!modal)}
                aria-label="close"
              ></IconButton>
              <h3 style={{ fontSize: "30px" }}>Assign Songs</h3>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setModal(!modal)}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: "15vh" }}>
            <List
              dense
              sx={{
                width: "100%",
                maxWidth: 600,
                maxHeight: 350,
                overflow: "auto",
                bgcolor: "background.paper",
              }}
            >
              {song.map((song) => {
                const labelId = `checkbox-list-secondary-label-${song._id}`;
                return (
                  <div>
                    <ListItem
                      key={song._id}
                      style={{ paddingLeft: "10px" }}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(song)}
                          checked={song.isSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(e) => handleClickSong(song._id,e.target.checked)}
                        />
                      }
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemText id={labelId}>
                          <span style={{ fontSize: "20px" }}>
                            {`${song.name}`}
                            <br></br>
                            <span
                              style={{ fontSize: "15px" }}
                            >{`${song.artistName}`}</span>
                          </span>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <br></br>
                  </div>
                );
              })}
            </List>
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
              onClick={() => setModal(!modal)}
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

export default TypeDetail;
