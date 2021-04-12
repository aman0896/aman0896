import React from "react";
import PropTypes from "prop-types";

export default function Button({
  btnName,
  styleClass,
  visibility,
  toggle,
  target,
  onClick,
  link,
}) {
  return (
    <a href={link}>
      <button
        className={styleClass}
        style={{ fontSize: "16px" }}
        data-toggle={toggle}
        data-target={target}
        hidden={visibility}
        onClick={onClick}
      >
        {btnName}
      </button>
    </a>
  );
}
Button.propTypes = {
  styleClass: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  visibility: PropTypes.bool,
  toggle: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  styleClass: "btn-primary",
};
