import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ products }) => {
  const ratings_star = products.ratings;
  console.log(ratings_star);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerHeight < 600 ? 20 : 25,
    // value: Number(products.ratings),
    value: ratings_star,
    isHalf: true,
  };
  // how much discount_percentage we want to give Admin define here
  let discount = (Number(products.price) * 40) / 100;
  let discount_price = discount + Number(products.price);
  // products.images.url =
  //   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXxlbnwwfHwwfHw%3D&w=1000&q=80";
  return (
    <>
      <Link className="productCard" to={`product/${products._id}`}>
        <img src={products.images[0].url} alt={products.name} />
        <p>{products.name}</p>
        <div>
          <ReactStars {...options} />
          <span>({products.numOfReviews})</span>
        </div>
        <span>
          ₹{products.price}{" "}
          <span className="discount_price">₹{discount_price}</span>
        </span>
      </Link>
    </>
  );
};

export default ProductCard;
