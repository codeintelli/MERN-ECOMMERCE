import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ products }) => {
  const ratings_star = products.ratings;

  const options = {
    size: "large",
    value: ratings_star,
    readOnly: true,
    precision: 0.5,
  };
  // how much discount_percentage we want to give Admin define here
  let discount = (Number(products.price) * 40) / 100;
  let discount_price = discount + Number(products.price);

  return (
    <>
      <Link className="productCard" to={`../../product-list/${products._id}`}>
        <img src={products.images[0].url} alt={products.name} />
        <p>{products.name}</p>
        <div>
          <Rating {...options} />
          <span className="productCardSpan">({products.numOfReviews}) </span>
        </div>
        <span className="product_price">
          ₹{products.price}{" "}
          <span className="discount_price">₹{discount_price}</span>
        </span>
      </Link>
    </>
  );
};

export default ProductCard;
