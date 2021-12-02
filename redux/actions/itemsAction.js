import urlAxios from "../../apis/axiosApi";
import { ActionTypes } from "../contants/action-types";
export const getitems = (id) => async (dispatch) => {
  const response = await urlAxios.get(`restaurant/details/${id}`);
  //   console.log(response.data);
  dispatch({ type: ActionTypes.GET_ITEMS, payload: response.data.data });
};

export const addtocard =
  (userId, resturantId, itemId, quantity) => async (dispatch) => {
    try {
      const cardData = new FormData();
      cardData.append("user_id", userId);
      cardData.append("restaurant_id", resturantId);
      cardData.append("item_id", itemId);
      cardData.append("quantity", quantity);
      const response = await urlAxios.post("cartItem/addtocart", cardData);
      const result = response.data;
      if (result.success) {
        alert("successfully added");
        dispatch({ type: ActionTypes.ADD_TO_CARD, payload: result });
      } else {
        alert(result.message);
      }
    } catch (e) {

      alert("Somthing wron please try again");
    }
  };

  export const removeItem = () => {
    return {
      type: ActionTypes.REMOVE_SELECTED_ITEM,
    };
  };
