import { ActionTypes } from "../contants/action-types";

const initialState = {
  items: [],
  addCard: [],
};

export const selectedItemReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_ITEM:
      return { ...state, ...payload };
    //   case ActionTypes.REMOVE_SELECTED_PRODUCT:
    //     return {};
    default:
      return state;
  }
};

export const itemReducer = (state = initialState.items, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_ITEMS:
      return { items: payload };
    case ActionTypes.REMOVE_SELECTED_ITEM:
      return {
        state: [],
      };
    //   case ActionTypes.FETCH_PRODUCTS:
    //   return { ...state, products: payload };
    default:
      return state;
  }
};
export const addCardReducer = (
  state = initialState.addCard,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.ADD_TO_CARD:
      return { addCard: payload };

    default:
      return state;
  }
};
