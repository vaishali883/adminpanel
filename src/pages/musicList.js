import { useFormik } from "formik";
import { useState } from "react";
// material
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
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
import plusFill from "@iconify/icons-eva/plus-fill";
// components
import { Link as RouterLink } from "react-router-dom";
import Page from "../components/Page";
import { MusicList, ProductSort } from "../components/_dashboard/products";
//
import PRODUCTS from "../_mocks_/products";
import AddSong from './AddSong'
import './musicList.css';

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

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Dashboard: Types | Music-UI">
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" sx={{ mb: 5 }} style={{marginTop:'10px'}}>
            Song List
          </Typography>
          <div style={{paddingBottom:'20px'}}>
          <SearchStyle
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
            style={{ height: "100%" ,marginTop:'10px'}}
            onClick={() => setModal(true)}
          >
            Add Song
          </Button>
        </div>
        <div className="wrapper">
          <div className="container">
            <div className="body_content">
              <div className="title">
                <span></span>
                <span>Title</span>
                <span>Artist</span>
                <span>Duration</span>
                <span></span>
                <span></span>
              </div>
              <div className="list"></div>
            </div>
          </div>
        </div>
      </Container>
      <AddSong toggleModal={() => setModal(!modal)} modalOpen={modal} />
    </Page>
  );
}
