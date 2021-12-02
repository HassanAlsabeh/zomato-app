import urlAxios from "../../apis/axiosApi";
import { ActionTypes } from "../contants/action-types";

export const fetchOrderItem = (id) => {
  return async function (dispatch) {
    try {
      const response = await urlAxios.get(`/user/list/${id}`);
      const data = response.data;
     
      dispatch({ type: ActionTypes.FETCH_ORDER_ITEM, payload: data });
    } catch (err) {
      if (err.response) {
        console.log(err.response.message);
      }
      console.log(err.message);
    }
  };
};
