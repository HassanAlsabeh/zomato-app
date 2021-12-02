import { ActionTypes } from "../contants/action-types";

const initialState = {
  cartItems: [],
  checkoutItems: [],
};

export const cartItemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CARTITEMFETCH:
      return {
        cartItems: payload,
      };
    case ActionTypes.REMOVE_SELECTED_ITEMCART:
      return {
        cartItems: [],
      };
    case ActionTypes.CHECKOUT:
      return {
        checkoutItems: payload,
      };
    case ActionTypes.DELETE_ORDER_ITEM:
      return [...state, {}];

    default:
      return state;
  }
};
