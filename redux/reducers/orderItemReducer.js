import { ActionTypes } from "../contants/action-types";

const initialState = {
    orderItems: [],
};

export const orderItemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_ORDER_ITEM:
      return {
        orderItems: payload,
      };
    default:
      return state;
  }
};
