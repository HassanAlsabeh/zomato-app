import { combineReducers } from "redux";
import {
  itemReducer,
  selectedItemReducer,
  addCardReducer,
} from "./itemReducer";
import { restaurantReducer } from "./restaurantReducer";
import { updateuserInfoReducer } from "./userInfoReducer";
import { cartItemReducer } from "./cartItemReducer";
import { userReducer } from "./userReducer";
import { orderItemReducer } from "./orderItemReducer";

const reducers = combineReducers({
  data: restaurantReducer,
  item: selectedItemReducer,
  items: itemReducer,
  userdata: userReducer,
  registerusers: userReducer,
  addCard: addCardReducer,
  cartItem: cartItemReducer,
  orderItems: orderItemReducer,
});

export default reducers;
