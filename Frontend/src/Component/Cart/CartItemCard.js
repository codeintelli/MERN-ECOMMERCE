import React from "react";
import "./cartItemCard.css";
import { Link } from "react-router-dom";
const CartItemCard = ({ item, deleteCartItem }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product-list/${item.product}`}>{item.name}</Link>
        <span>{`Price: ${item.price}`}</span>
        <p onClick={() => deleteCartItem(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
