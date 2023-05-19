import axios from "axios";

export const getAllSongData = () => async (dispatch) => {
    const res = await axios.get("http://localhost:4000/songs/");
    const data = res.data.products.map((data) => {
      return {...data,isSelected:false};
    });
    dispatch({ type: "songData", payload: data });
  };