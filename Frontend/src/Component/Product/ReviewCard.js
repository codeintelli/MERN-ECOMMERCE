import React from "react";
import { Rating } from "@material-ui/lab";
import profilePng from "../../Images/Profile.png";
const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p className="textCapitalize">{review.name}</p>
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    </>
  );
};

export default ReviewCard;
