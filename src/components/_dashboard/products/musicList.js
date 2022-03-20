import PropTypes from "prop-types";
// material
import { Grid } from "@mui/material";
import MusicTypeCard from './musicTypeCard'
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

// const data = [
//   {
//     id: 1,
//     cover: "/images/morning.jpeg",
//     name:"Morning"
//   },
//   {
//     id: 2,
//     cover: "/images/natural.jpg",
//     name:"Natural"
//   },
//   {
//     id: 3,
//     cover: "/images/party.jpeg",
//     name:"Party"
//   },
//   {
//     id: 4,
//     cover: "/images/rain.jpeg",
//     name:"Rain"
//   },
//   {
//     id: 5,
//     cover: "/images/romantic.jpeg",
//     name:"Romantic"
//   },
//   {
//     id: 6,
//     cover: "/images/sad.jpg",
//     name:"Sad"
//   },
//   {
//     id: 7,
//     cover: "/images/soul.jpg",
//     name:"Soul"
//   },
//   {
//     id: 8,
//     cover: "/images/rock.jpg",
//     name:"Rock"
//   }
  
// ];

export default function ProductList({ products, ...other }) {
  const data = useSelector(state => state.type.typeData)
  return (
    <Grid container spacing={3} {...other}>
      {data.length > 0  ? data.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}>
          <MusicTypeCard product={product} />
        </Grid>
      )):<div style={{width:'100%',display:'flex',justifyContent:'center',letterSpacing:'1px',fontSize:'20px',marginTop:'20%'}}>No Types Found</div>}
    </Grid>
  );
}
