import axios from "axios";

export const getAlluserData = () => async (dispatch) => {
  const res = await axios.get("http://localhost:4000/user/");
  const data = res.data.orders.map((data) => {
    return data;
  });
  dispatch({ type: "userdata", payload: data });
};


