import React, { Component } from "react";
import logo from "../assests/demo.png";

class AboutUs extends Component {
  state = {};
  render() {
    return (
      <div className="container py-5">
        <h1 className="text-primary mt-4">ABOUT US</h1>
        <p>
          The Makerko is a web of production platform, an online marketplace
          that connects local producers and end-users. End-users will have these
          ability to request the production of a product via the platform. This
          platform addresses local challenges in Nepal around production,
          including: incorrect designs for manufacturing, obtaining a workable
          prototype, lack of access to design/manufacturing experts and
          marketing and communication gaps. The makerko platform will make the
          capabilities of local producers more visible to consumers, as the
          producers offer new products and innovations. Users will then have the
          ability to upload a work order (with a product design if applicable)
          and be connected with a local producer that will execute the work
          order. The platform also brings together idle machines, decentralized
          technology tools, global and remote expertise, diverse skill sets, and
          a growing supplier network, making the product development process
          more reliable for consumers.
        </p>
      </div>
    );
  }
}

export default AboutUs;
