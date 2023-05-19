import { useFormik } from "formik";
import { useState,useEffect } from "react";
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
import { useDispatch } from "react-redux";
import plusFill from "@iconify/icons-eva/plus-fill";
// components
import { Link as RouterLink } from "react-router-dom";
import Page from "../components/Page";
import { MusicList, ProductSort } from "../components/_dashboard/products";
//
import PRODUCTS from "../_mocks_/products";
import { getAllTypesData } from "../action/typeActions";
import AddType from "./AddType";

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

  useEffect(() => {
    dispatch(getAllTypesData());
  }, []);

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

  function mySearchFunction() {
    let song;
    let input = document.getElementById("searchBar").value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName("typeList");
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
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" sx={{ mb: 5 }} style={{ marginTop: "10px" }}>
            Types
          </Typography>
          <div style={{ paddingBottom: "50px" }}>
            <SearchStyle
               onKeyUp={() => mySearchFunction()}
               id="searchBar"
              placeholder="Search Types..."
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
            New Type
          </Button>
        </div>
        <MusicList products={PRODUCTS} />
      </Container>
      <AddType toggleModal={() => setModal(!modal)} modalOpen={modal} />
    </Page>
  );
}
