import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import editFill from "@iconify/icons-eva/edit-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import { Icon } from "@iconify/react";
import axios from "axios";
import SnackbarModule from "../../../pages/sanckbar";
// utils
import { fCurrency } from "../../../utils/formatNumber";
//
import Label from "../../Label";
import ColorPreview from "../../ColorPreview";
import EditType from "../../../pages/EditType";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "90%",
  height: "90%",
  objectFit: "cover",
  position: "absolute",
  borderRadius: "10%",
  marginLeft: "5%",
  marginTop: "5%",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { Image, Music_type,_id } = product;
  const [model, setModel] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const deleteType = () => {
    axios
    .delete(`http://localhost:4000/typemusic/${_id}`)
    .then((res) => {
      setOpen(true);
      setMsg("Type Deleted Successfully!");
      setSeverity("success");
    })
    .catch(() => {
      setOpen(true);
      setMsg("Oops!! Something went wrong!!");
      setSeverity("error");
    });
  }
  const handleSnackbarClose = () => {
    setOpen(false);
    window.location.reload();
  };
  return (
    <div>  <SnackbarModule
    open={open}
    message={msg}
    handleSnackbarClose={handleSnackbarClose}
    severity={severity}
  /><Card>
      <Box sx={{ pt: "90%", position: "relative" }}>
        <ProductImgStyle src={`http://localhost:4000/${Image}`} />
      </Box>
      <Stack spacing={2} sx={{ p: 1 }}>
        <Link
          to="#"
          color="inherit"
          underline="hover"
          component={RouterLink}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="subtitle2"
            noWrap
            style={{ fontSize: "20px", marginLeft: "10px", marginBottom: "2%" }}
          >
            {Music_type}
          </Typography>
          <div style={{ display: "flex" }}>
            <Icon
              icon={editFill}
              width={45}
              height={28}
              style={{ cursor: "pointer", marginRight: "2px" }}
              onClick={() => setModel(true)}
            />
            <Icon
              style={{
                marginRight: "15%",
                cursor: "pointer",
              }}
              icon={trash2Outline}
              width={34}
              height={24}
              onClick={() => deleteType()}
            />
          </div>
        </Link>
      </Stack>
    </Card>
    <EditType
        modalOpen={model}
        toggleModal={() => setModel(!model)}
        data={product}
      /></div>
  );
}
