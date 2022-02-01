import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  adminProductEDReducer,
  AdminProductReducer,
  newProductReducer,
  newReviewReducer,
  productDetailReducer,
  productReducer,
} from "./Reducers/productReducer";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUserReducer,
  userDetailsReducer,
} from "./Reducers/userReducer";
import { cartReducer } from "./Reducers/cartReducer";
import {
  allOrderReducer,
  getOrderReducer,
  newOrderReducer,
  orderDetailReducer,
  orderReducer,
} from "./Reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailReducer,
  adminProduct: AdminProductReducer,
  newProduct: newProductReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  getOrder: getOrderReducer,
  orderDetails: orderDetailReducer,
  newReview: newReviewReducer,
  EditDelProduct: adminProductEDReducer,
  allOrders: allOrderReducer,
  order: orderReducer,
  allUser: allUserReducer,
  userDetail: userDetailsReducer,
});

// if the value is in cart otherwise it will be blank and we can store cartitems in localstorage
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
