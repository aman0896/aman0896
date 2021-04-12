import React from "react";
import Button from "./Button";

function Modal({ title, option1, option2, id, link1, link2, showModal }) {
  return (
    <div>
      {console.log(showModal)}
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        aria-labelledby="placeOrderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeOrderModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm p-2">
                  <Button
                    btnName={option1}
                    styleClass="btn btn-primary btn-lg w-100"
                    link={link1}
                  />
                </div>
                <div className="col-sm p-2">
                  <Button
                    btnName={option2}
                    styleClass="btn btn-primary btn-lg w-100"
                    link={link2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
