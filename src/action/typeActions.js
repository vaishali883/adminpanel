import axios from "axios";

export const getAllTypesData = () => async (dispatch) => {
    const res = await axios.get("http://localhost:4000/typemusic/");
    const data = res.data.orders.map((data) => {
      return data;
    });
    dispatch({ type: "typesData", payload: data });
  };