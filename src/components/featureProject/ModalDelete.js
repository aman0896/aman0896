// import { useState } from "react";

// function ModalDelete(props) {
//  const [showModal, setShow] = useState(false);

//   return (
//     <div id="myModal" className="modal fade">
//       {console.log(props, "delete")}
//       <div className="modal-dialog modal-confirm">
//         <div className="modal-content">
//           <div className="modal-header flex-column">
//             {/* <div className="icon-box">
//               <i className="material-icons">&#xE5CD;</i>
//             </div> */}
//             <h4 className="modal-title w-100">Are you sure?</h4>
//             <button
//               type="button"
//               className="close"
//               data-dismiss="modal"
//               aria-hidden="true"
//             >
//               &times;
//             </button>
//           </div>
//           <div className="modal-body">
//             <p>Do you really want to delete the project?</p>
//           </div>
//           <div className="modal-footer justify-content-center">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               data-dismiss="modal"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={() => {
//                 console.log("delete");
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ModalDelete;

import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');
function ModalDelete({ showModal, handleClose, Project_ID }) {
    var show = showModal;
    const onClickDelete = (e) => {
        e.preventDefault();

        axios
            .post(`http://${ipAddress}:3001/delete-project`, {
                id: Project_ID,
            })
            .then((response) => {
                console.log('data');
            });

        handleClose();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Are you Sure?</Modal.Title>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                        onClick={handleClose}
                    >
                        &times;
                    </button>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete the project?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={onClickDelete}
                        closeButton
                    >
                        Delete
                    </Button>
                    {/* <button
                        type="button"
                        // className="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                        onClick={() => {
                            onClickDelete;
                            handleClose;
                        }}
                    >
                        Delete
                    </button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;
