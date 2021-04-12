import React, { useEffect, useState } from "react";
//import "./Editmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../global/DropDown";
import axios from "axios";
//import { FaEdit } from "react-icons/fa";

function OrderStatusEdit({
  index,
  orderID,
  setJsonData,
  data,
  Status,
  statusOption,
}) {
  const [selectedValue, setSelectedValue] = useState(Status);

  const onStatusSelect = (e) => {
    setSelectedValue(e);
  };

  const onSaveChange = () => {
    if (selectedValue) {
      var tempData = data.filter((data) => data);
      console.log(tempData, selectedValue);
      tempData[index].Status = selectedValue;
      console.log("data", tempData);
      setJsonData(tempData);
      axios
        .post("http://localhost:3001/update-order-status", {
          updatedStatus: selectedValue.label,
          orderID: orderID,
        })
        .then((response) => {
          if (response) {
            console.log(response);
          }
        });
    }
  };

  const closeButtonStyle = { fontSize: "2rem", marginRight: "1rem" };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-success m-1"
          style={{ width: 75, fontSize: "12px" }}
          data-toggle="modal"
          data-target={`#OrderStatusModal${index}`}
        >
          <FontAwesomeIcon icon={faEdit} style={{ marginRight: 5 }} />
          Edit
        </button>
      </div>

      {/* ------Modal------- */}
      <div
        className="modal fade"
        id={`OrderStatusModal${index}`}
        tabIndex="-1"
        aria-labelledby="showEditModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header m-0 p-0">
              <h5
                className="modal-title"
                id="showEditModalLabel"
                style={{
                  fontWeight: "bold",
                  marginLeft: "1rem",
                  padding: 0,
                  alignSelf: "center",
                }}
              >
                Update Status
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
              <DropDown
                selectedValue={selectedValue}
                ID={`statusDropDown${index}`}
                options={statusOption}
                onChange={onStatusSelect}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={onSaveChange}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderStatusEdit;
