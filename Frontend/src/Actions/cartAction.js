import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../Constants/cartConstant";
import axios from "axios";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/product/${id}`
  );
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// remove from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_TO_CART, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save Shipping Info
export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
