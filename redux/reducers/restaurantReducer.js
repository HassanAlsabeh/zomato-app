import { ActionTypes } from "../contants/action-types";

const initialState = {
  restaurants: [],
};

export const restaurantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_RESTAURANT:
      return {
        restaurants: payload,
      };
    default:
      return state;
  }
};
