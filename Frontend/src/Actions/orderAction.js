import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/orderConstant";
import axios from "axios";
import Cookies from "js-cookie";
const token_Data = Cookies.get("token");
let config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token_Data}`,
  },
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } = await axios.post(
      `http://localhost:5000/api/v1/order`,
      order,
      config
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get(
      "http://localhost:5000/api/v1/user/order",
      config
    );
    // console.log(data);
    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    // console.log(error.response);
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/order/${id}`,
      config
    );
    // console.log(data);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
