import React, { Component } from "react";
import logo from "../assests/3dprinting.jpg";
import logo1 from "../assests/lasercutting.jpg";
import logo2 from "../assests/CNC.png";
import logo3 from "../assests/vacuum_forming.jpg";
import "./technology.css";

function KnowledgeBankViewLeft({ title, info, image }) {
  return (
    <div
      className="col ml-4 mb-3 mt-4 pt-2 pb-2 border border-primary"
      style={{ borderRadius: "5px" }}
    >
      <h4 className="text-primary">{title}</h4>
      <p className="lead" style={{ fontSize: "15px",color: "rgba(255, 255, 255, 0.699)"}}>
        {info}
      </p>

      <img
        src={image}
        alt=""
        style={{
          height: "40%",
          width: "100%",
          objectFit: "cover",
          marginBottom: "10px",
        }}
      />
    </div>
  );
}
function KnowledgeBankViewRight({ title, info, image }) {
  return (
    <div className="row">
      {/* <div className="col">
        <img
          src={image}
          alt=""
          style={{ height: "50%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="col">
        <h2 className="text-white">{title}</h2>
        <p className="lead text-white">{info}</p>
      </div>{" "}
      <div className="col">
        <img
          src={image}
          alt=""
          style={{ height: "50%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="col">
        <h2 className="text-white">{title}</h2>
        <p className="lead text-white">{info}</p>
      </div> */}
    </div>
  );
}
class KnowledgeBank extends Component {
  render() {
    return (
      <div className="container pt-4 pb-4">
        <div
          id="knowledgeBank"
          className="row"
          style={{ color: "rgba(255, 255, 255, 0.699)" }}
        >
          <div
            className="row m-auto pb-2 d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <div className="text-primary text-wrap">
              <span style={{ fontSize: "2.5rem" }}>
                {"Production Capabilities"}
              </span>
            </div>
          </div>
          <KnowledgeBankViewLeft
            title="3D Printing"
            info={
              <span>
                Rapid prototyping and customized product development made easy
               
                <br /> #Medical #Dental #IndustrialProduct
              
              </span>
            }
            image={logo}
          />
          <KnowledgeBankViewLeft
            title="Laser Printing"
            info={
              <span>
                For precision 2D profile cutting, template and decoration items.
                <br />
                <br />
                #Signage #Garment #Architecture #Art&Craft
              </span>
            }
            image={logo1}
          />
          <KnowledgeBankViewLeft
            title="CNC Carving"
            info={
              <span>
                Effective both for 2D and 3D model making in versatile materials
                - wood, composite, metal.
                <br /> #Furniture #Signage #Interior #Decoration #Architecture
              </span>
            }
            image={logo2}
          />{" "}
          <KnowledgeBankViewLeft
            title="Vaccum Forming"
            info={
              <span>
                Multiply your product from one to many with affordable custom
                molds for your chocolates, soap, crafts, packaging and what not!
                <br /> #ChocolateMold #Art&Craft
              </span>
            }
            image={logo3}
          />
        </div>
      </div>
    );
  }
}

export default KnowledgeBank;
