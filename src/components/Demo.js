import React, { Component } from 'react';
import logo from './assests/demo.png';
import demoVideo from './assests/demo.mp4';

class demo extends Component {
    state = {};
    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm">
                        <h2>How to get a quote</h2>

                        <span className="font-weight-bold">
                            &nbsp;&nbsp;Learn how to build your first quote:
                            upload your part and specify requirements.
                        </span>
                    </div>
                </div>
                {/*         <div className="col">
          <video src={demoVideo} autoPlay="true" />
        </div> */}
                <div className="row">
                    <div className="col">
                        <div className="row mt-5">
                            <div className="col-sm">
                                <h4>1. Uploading Parts</h4>

                                <span className="font-weight-bold">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Upload your
                                    CAD files (If you dont have design,request
                                    for design)
                                </span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm">
                                <h4>2. Configuring parts</h4>

                                <span className="font-weight-bold">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Select a
                                    manifacuturing process, material, quantity
                                    and thickness.
                                </span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm">
                                <h4>3. Select Hubs</h4>

                                <span className="font-weight-bold">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Select a
                                    fabrication hub according to required quote.
                                </span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm">
                                <h4>4. Quick quote overview & pricing</h4>

                                <span className="font-weight-bold">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Quick quote
                                    overview <br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pricing
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* <div
            className="col"
            style={{
              top: "100px",
              height: "300px",
              border: "3px solid red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <video
              src="https://youtu.be/5th-TfYL8L0"
              //autoPlay="true"
              style={{ justifyContent: "center" }}
            />
          </div> */}
                </div>

                <div className="row mt-5">
                    <div className="col-sm">
                        <div className="row">
                            <div className="col">
                                <img
                                    src={logo}
                                    alt=""
                                    class="img-fluid"
                                    size="200*200"
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default demo;
