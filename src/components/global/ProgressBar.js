import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress" style={{ width: "10rem" }}>
      <div
        className="progress-bar progress-bar-striped"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
