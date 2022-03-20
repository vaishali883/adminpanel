import axios from "axios";

export const getAllArtistData = () => async (dispatch) => {
    const res = await axios.get("http://localhost:4000/artist/");
    const data = res.data.products.map((data) => {
      return data;
    });
    dispatch({ type: "artistData", payload: data });
  };