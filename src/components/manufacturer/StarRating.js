import React, { Component, useState } from "react";
import Ratings from "react-ratings-declarative";

var ratings = [];
function Foo() {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState();
  const [totalFeedback, setTotalFeedback] = useState();

  const changeRating = (newRating) => {
    ratings.push(newRating);
    var totalRating = ratings.length;
    setAverageRating(ratings.reduce((a, v) => (a = a + v), 0) / totalRating);
    setRating(newRating);
    setTotalFeedback(totalRating);

    console.log(ratings);
  };

  return (
    <>
      <div>{averageRating}</div>
      <div>
        <Ratings
          rating={averageRating}
          widgetRatedColors="gold"
          widgetDimensions="30px"
          widgetSpacings="0px"
        >
          <Ratings.Widget widgetHoverColor="goldenrod" />
          <Ratings.Widget widgetHoverColor="goldenrod" />
          <Ratings.Widget widgetHoverColor="goldenrod" />
          <Ratings.Widget widgetHoverColor="goldenrod" />
          <Ratings.Widget widgetHoverColor="goldenrod" />
        </Ratings>
      </div>
      <div>{totalFeedback}</div>
      <div>
        <Ratings
          rating={rating}
          widgetRatedColors="gold"
          widgetDimensions="30px"
          widgetSpacings="0px"
          changeRating={changeRating}
        >
          <Ratings.Widget widgetHoverColor="goldenrod" />
          <Ratings.Widget widgetHoverColor="goldenrod" />
          <Ratings.Widget widgetHoverColor="goldenrod" />
          <Ratings.Widget widgetHoverColor="goldenrod" />
          <Ratings.Widget widgetHoverColor="goldenrod" />
        </Ratings>
      </div>
    </>
  );
}

export default Foo;
