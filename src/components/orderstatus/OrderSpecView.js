import React, { useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderSpecView = ({ orderData, index }) => {
  const [show, showModal] = useState(false);

  let iconStyles = { marginRight: "0.5rem" };

  //Destructing order_details
  const {
    Model_Name,
    Fabrication_Service,
    Material,
    Thickness,
    Quantity,
    Amount,
    Model_Path,
  } = orderData;

  const closeButtonStyle = { fontSize: "2rem", marginRight: "1rem" };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-primary m-1"
          style={{ width: 75, fontSize: "12px" }}
          data-toggle="modal"
          data-target={`#OrderSpecModal${index}`}
        >
          <FontAwesomeIcon icon={faEye} style={{ marginRight: 5 }} />
          View
        </button>
      </div>

      <div
        className="modal fade"
        id={`OrderSpecModal${index}`}
        tabIndex="-1"
        aria-labelledby="showViewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered  d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="modal-content" style={{ fontSize: "14px" }}>
              <div className="modal-header m-0 p-0">
                <h5
                  className="modal-title"
                  id="showViewModalLabel"
                  style={{
                    fontWeight: "bold",
                    marginLeft: "1rem",
                    padding: 0,
                    alignSelf: "center",
                  }}
                >
                  Order Specification
                </h5>
                <span
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  aria-hidden="true"
                  style={closeButtonStyle}
                >
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Model Name</th>
                      <th scope="col">Fabrication Process</th>
                      <th scope="col">Material</th>
                      <th scope="col">Thickness</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: "21%" }}>{Model_Name}</td>
                      <td style={{ width: "21%" }}>{Fabrication_Service}</td>
                      <td style={{ width: "21%" }}>{Material}</td>
                      <td style={{ width: "7%" }}>{Thickness}</td>
                      <td style={{ width: "3%" }}>{Quantity}</td>
                      <td className="align-middle" style={{ width: "7%" }}>
                        {Amount}
                      </td>
                      <td style={{ width: "7%" }}>
                        <a href={Model_Path}>
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ fontSize: "12px" }}
                          >
                            Download
                          </button>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSpecView;
