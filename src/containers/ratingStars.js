import React from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";

function RatingStars(props) {
  const { rating } = props;
  return (
    <StarRatings
      rating={rating}
      starRatedColor="var(--pink-primary)"
      name="rating"
      className="avoid-hover"
      starDimension="30px"
      starSpacing="5px"
    />
  );
}

RatingStars.propTypes = {
  rating: PropTypes.number,
};

export default RatingStars;
