import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// material
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import {
  Container,
  Stack,
  Typography,
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import searchFill from "@iconify/icons-eva/search-fill";
import { styled } from "@mui/material/styles";
import axios from "axios";
import plusFill from "@iconify/icons-eva/plus-fill";
// components
import { Link as RouterLink } from "react-router-dom";
import Page from "../components/Page";
import { MusicList, ProductSort } from "../components/_dashboard/products";
import SnackbarModule from './sanckbar'
import PRODUCTS from "../_mocks_/products";
import AddSong from "./AddSong";
import "./musicList.css";
import playSvg from "./play.svg";
import pauseSvg from "./pause.svg";
import download from "./download.svg"
import { getAllSongData } from "../action/songAction";

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [modal, setModal] = useState(false);
  const songs = useSelector(state => state.songs.songData);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      gender: "",
      category: "",
      colors: "",
      priceRange: "",
      rating: "",
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
  });

  const deleteSong = (id) => {
    axios
    .delete(`http://localhost:4000/songs/${id}`)
    .then((res) => {
      setOpen(true);
      setMsg("Song Deleted Successfully!");
      setSeverity("success");
    })
    .catch(() => {
      setOpen(true);
      setMsg("Oops!! Something went wrong!!");
      setSeverity("error");
    });
  }

  useEffect(() => {
    dispatch(getAllSongData());
  }, []);

  const handleSnackbarClose = () => {
    setOpen(false);
    window.location.reload();
  };

  function mySearchFunction() {
    let song;
    let input = document.getElementById("searchBar").value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName("list_block");
    for (var i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
      } else {
        console.log(x[i]);
        x[i].style.display = "";
        song = x[i];
      }
    }
  }

  return (
    <Page title="Dashboard: Types | Music-UI">
      <SnackbarModule
    open={open}
    message={msg}
    handleSnackbarClose={handleSnackbarClose}
    severity={severity}
  />
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" sx={{ mb: 5 }} style={{ marginTop: "10px" }}>
            Song List
          </Typography>
          <div style={{ paddingBottom: "20px" }}>
            <SearchStyle 
              onKeyUp={() => mySearchFunction()}
              id="searchBar"
              placeholder="Search Songs..."
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              }
            />
          </div>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            style={{ height: "100%", marginTop: "10px" }}
            onClick={() => setModal(true)}
          >
            Add Song
          </Button>
        </div>
        <div className="wrapper">
          <div className="container">
            <div className="body_content">
              <div className="title">
                {/* <span></span> */}
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
                  <span>  <Icon
              style={{
                marginRight: "15%",
                cursor: "pointer",
              }}
              icon={trash2Outline}
              width={34}
              height={24}
              onClick={() => deleteSong(song._id)}
            /></span>
                  {/* <span className="download_btn"><a target="_blank" ><img src={download}></img></a></span> */}
                  </div>
                }):''
                }
              </div>
            </div>
          </div>
        
        </div>
      </Container>
      <AddSong toggleModal={() => setModal(!modal)} modalOpen={modal} />
    </Page>
  );
}
