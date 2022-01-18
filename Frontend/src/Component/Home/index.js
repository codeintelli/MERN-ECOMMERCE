import React from "react";
import { CgMouse } from "react-icons/all";
import Product from "./ProductCard";
import "./style.css";
import MetaData from "../Layout/MetaData";
import { clearErrors, getProduct } from "../../Actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, err, products, productCount } = useSelector(
    (state) => state.products || {}
  );
  console.log(productCount);
  React.useEffect(() => {
    if (err) {
      alert.error(err);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, err, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Home" />
          <div className="banner">
            <p>Welcome to ecommerce!</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Product</h2>
          <div className="container" id="container">
            {products &&
              products.map((products) => <Product products={products} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
