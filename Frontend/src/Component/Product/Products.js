import React from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../Actions/productAction";
import Loader from "../Layout/Loader";
import { useAlert } from "react-alert";

const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, err, products, productCount } = useSelector(
    (state) => state.products
  );
  console.log(products);
  console.log(productCount);
  React.useEffect(() => {
    if (err) {
      alert.error(err);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, err, alert]);
  return <>{loading ? <Loader /> : <>{products.products[0].name}</>}</>;
};
// {Adding All Filters in frontend} {Login & Registration Component} {Loading & Updating User} {Change, Forgot & Reset Password}
export default Products;
