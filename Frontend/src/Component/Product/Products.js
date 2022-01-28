import React from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../Actions/productAction";
import Loader from "../Layout/Loader";
import { useAlert } from "react-alert";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../Layout/MetaData";

const Products = ({ match }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [price, setPrice] = React.useState([0, 50000]);
  const [category, setCategory] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
    ProductCategories,
  } = useSelector((state) => state.products);
  const keyword = match.params.keyword;
  // let count = filterProductCount;

  let priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating, error, alert]);
  return (
    <>
      <MetaData title="Products" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} products={product} />
              ))}
          </div>

          {/* if we want to display filter and category when any user can search to perform this only put {keyword && Your data} otherwise remove it  */}

          {keyword && (
            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={50000}
              />

              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {ProductCategories &&
                  ProductCategories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
              </ul>

              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={rating}
                  onChange={(e, newRating) => setRating(newRating)}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </fieldset>
            </div>
          )}

          {resultPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Products;
