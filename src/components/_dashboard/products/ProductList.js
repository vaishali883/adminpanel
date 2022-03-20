import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ShopProductCard from "./ProductCard";

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

// const data1 = [
//   {
//     id: 1,
//     cover: "/images/a1.jpg",
//     name:"Arjit Singh"
//   },
//   {
//     id: 2,
//     cover: "/images/a2.jpg",
//     name:"Neha Kakar"
//   },
//   {
//     id: 3,
//     cover: "/images/a3.jpg",
//     name:"Arman Malik"
//   },
//   {
//     id: 4,
//     cover: "/images/a4.jpg",
//     name:"dhavni Bhanushali"
//   },
//   {
//     id: 5,
//     cover: "/images/a5.jpg",
//     name:"Jubin Natiyal"
//   },
//   {
//     id: 6,
//     cover: "/images/a6.jpg",
//     name:"Zadean"
//   },
//   {
//     id: 7,
//     cover: "/images/a7.jpg",
//     name:"Guru Randhawa"
//   },
//   {
//     id: 8,
//     cover: "/images/a8.jpg",
//     name:"Shreya Ghosal"
//   },
//   {
//     id: 9,
//     cover: "/images/a9.jpg",
//     name:"Badshah"
//   },

// ];

export default function ProductList({ products, ...other }) {
  const data = useSelector((state) => state.artist.artistData);
  return (
    <Grid container spacing={3} {...other}>
      {data.length > 0 ? data.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      )) : <div style={{width:'100%',display:'flex',justifyContent:'center',letterSpacing:'1px',fontSize:'20px',marginTop:'20%'}}>No Artist Found</div>}
    </Grid>
  );
}
