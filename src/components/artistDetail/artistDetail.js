import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import './artistDetail.css'

const ProductImgStyle = styled("img")({
  top: 0,
  width: "20%",
  height: "45%",
  marginTop:'7%',
  marginLeft:'5%',
  objectFit: "cover",
  position: "absolute",
  borderRadius: "50%"
});

const ArtistDetail = () => {
  const image = `http://localhost:4000/${JSON.parse(localStorage.getItem("artistName")).image}`

  return (
    <div>
      <div style={{ display: "flex", justifyContent: 'flex-start' }}>
        <div>
          <Box>
            <ProductImgStyle src={image} />
          </Box>
        </div>
        <h1 style={{marginLeft:'40%',marginTop:'5%',fontWeight:'bold'}}>{JSON.parse(localStorage.getItem("artistName")).name}</h1>
      </div>
      <div className="wrapper">
          <div className="container_artist">
            <div className="body_content_artist">
              <div className="title">
                {/* <span></span>
                <span>Title</span>
                <span>Artist</span>
                <span>Duration</span>
                <span></span>
                <span></span> */}
              </div>
              <div className="list_artist"></div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ArtistDetail;
