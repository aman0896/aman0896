import React, { Component } from "react";
import logo from "../assests/3dprinting.jpg";
import logo1 from "../assests/lasercutting.jpg";
import logo2 from "../assests/CNC.png";
import Technology from "./technology";
import "./technology.css";

function title(props, props1, props2, id) {
  return (
    <div className="row h-100 align-items-center">
      <div className="col-lg-6">
        <h2 className="display-4 text-white">{props}</h2>

        <span className="lead text-white">{props1}</span>

        <img
          src={props2}
          alt=""
          className="img-fluid"
          style={{ height: "300px", paddingLeft: "10px" }}
        />
      </div>
      <div className="col-lg-6">
        <h2 className="display-4 text-white">{props}</h2>

        <span className="lead text-white">{props1}</span>

        <img
          src={props2}
          alt=""
          className="img-fluid"
          style={{ height: "300px", paddingLeft: "10px" }}
        />
      </div>
    </div>
  );
}
function mirrorSection(props, props1, props2, id) {
  return <div></div>;
}
class technology extends Component {
  render() {
    const style = {
      height: "auto",
      background: "rgb(58, 57, 57)",
    };
    return (
      <div id="technology">
        
      </div>
    );
  }
}

export default technology;
