import { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import editFill from "@iconify/icons-eva/edit-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import { Icon } from "@iconify/react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import EditArtist from '../../../pages/EditArtist';
import SnackbarModule from "../../../pages/sanckbar";
// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "90%",
  height: "90%",
  objectFit: "cover",
  position: "absolute",
  borderRadius: "50%",
  display: "flex",
  marginLeft:'5%'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const navigate = useNavigate();
  const [model,setModel] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const { artist_Image, artist_name,_id,songs } = product;

  const artistPage = () => {
    localStorage.setItem(
      "artistName",
      JSON.stringify({ name: artist_name, image: artist_Image,songs:songs,id:_id })
    );
    navigate("/dashboard/artistPage");
  };
  const handleSnackbarClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const deleteArtist = (id) => {
    axios
    .delete(`http://localhost:4000/artist/${_id}`)
    .then((res) => {
      setOpen(true);
      setMsg("Artist Deleted Successfully!");
      setSeverity("success");
    })
    .catch(() => {
      setOpen(true);
      setMsg("Oops!! Something went wrong!!");
      setSeverity("error");
    });
  }

  return (
    <div className="ArtistList" style={{ backgroundColor: "lightcyan", padding: "20px",borderRadius:'20px' }}>
       <SnackbarModule
        open={open}
        message={msg}
        handleSnackbarClose={handleSnackbarClose}
        severity={severity}
      />
      <Box sx={{ pt: "100%", position: "relative" }}>
        <ProductImgStyle
          src={`http://localhost:4000/${artist_Image}`}
          onClick={() => artistPage()}
        />
      </Box>
      <Link to="#" color="inherit" underline="hover" component={RouterLink} style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="subtitle2"
          noWrap
          style={{
            fontSize: "20px",
            // display: "flex",
            // justifyContent: "center",
          }}
        >
          {artist_name}
        </Typography>
        <div style={{display:'flex'}}>
            <Icon
              icon={editFill}
              width={35}
              height={28}
              style={{ cursor: "pointer" }}
              onClick={() => setModel(true)}
            />
            <Icon
              style={{
                cursor: "pointer",
              }}
              icon={trash2Outline}
              width={24}
              height={24}
              onClick={() => deleteArtist()}
            />
          </div>
      </Link>
      <EditArtist modalOpen={model} toggleModal={() => setModel(!model)} data={product} />
    </div>
  );
}
