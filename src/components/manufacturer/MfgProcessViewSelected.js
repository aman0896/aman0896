import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
    faChevronCircleUp,
    faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import '../orderstatus/Table.css';

var list = null;
export default function MfgProcessViewSelected({
    viewsData,
    updateviewsData,
    deleteicon = true,
    profileEdit,
}) {
    const col = 'col-lg d-flex justify-content-center p-2 truncate';

    if (viewsData !== null) {
        list = viewsData.map((item, index) => {
            return (
                <div key={index}>
                    <ServiceList
                        item={item}
                        updateviewsData={updateviewsData}
                        viewsData={viewsData}
                        deleteicon={deleteicon}
                        profileEdit={profileEdit}
                    />
                </div>
            );
        });
    }
    return <div>{list}</div>;
}

// const expandTable = {
//   position: "realative",
//   width: "100%",
//   height: "auto",
//   transition: "all 0.5s ease",
//   overflow: "hidden",
//   borderRadius: "3px",
// };

// const collapseTable = {
//   position: "realative",
//   display: "flex",

//   height: "30px",
//   transition: "all 0.5s ease",
//   overflow: "hidden",
//   borderRadius: "3px",
// };

const ServiceList = ({
    item,
    updateviewsData,
    viewsData,
    deleteicon,
    profileEdit,
}) => {
    const [expandToggle, setExpandToggle] = useState(false);
    const onExpandToggleClick = () => {
        setExpandToggle(!expandToggle);
    };
    console.log(viewsData);
    return (
        <div className="m-1">
            <div
                className="d-flex justify-content-between align-items-center pl-3 pr-3 "
                style={{
                    backgroundColor: 'lightgray',
                    height: '30px',
                    borderRadius: '3px',
                    position: 'relative',
                }}
            >
                {profileEdit ? (
                    <div style={{ marginLeft: 2, fontWeight: 'bold' }}>
                        {`${item.fabricationService.label}`}
                    </div>
                ) : (
                    <div style={{ marginLeft: 2, fontWeight: 'bold' }}>
                        {`${item.selectedFabrication.Name}`}
                    </div>
                )}
                {deleteicon && (
                    <div style={{ marginRight: 3 }}>
                        <FontAwesomeIcon
                            style={{ transition: 'all 0.5s ease' }}
                            icon={
                                expandToggle
                                    ? faChevronCircleUp
                                    : faChevronCircleDown
                            }
                            onClick={() => onExpandToggleClick()}
                        />
                    </div>
                )}
            </div>
            {expandToggle && (
                <div>
                    <MaterialDetailView
                        materialDetails={item.materialDetails}
                        updateviewsData={updateviewsData}
                        viewsData={viewsData}
                        deleteicon={deleteicon}
                        profileEdit={profileEdit}
                    />
                </div>
            )}
            {!deleteicon && (
                <div>
                    <MaterialDetailView
                        materialDetails={item.materialDetails}
                        updateviewsData={updateviewsData}
                        viewsData={viewsData}
                        deleteicon={deleteicon}
                        profileEdit={profileEdit}
                    />
                </div>
            )}
        </div>
    );
};

const MaterialDetailView = ({
    materialDetails,
    updateviewsData,
    viewsData,
    deleteicon,
    profileEdit,
}) => {
    const onDeleteClick = (materialDetail) => {
        const tempData = viewsData.map((data) => {
            const filteredData = data.materialDetails.filter((mdata) => {
                if (mdata !== materialDetail) {
                    console.log('filtered');
                    return mdata;
                }
            });
            data.materialDetails = filteredData;
            return data;
        });
        const newTempData = tempData.filter((data) => {
            if (data.materialDetails.length > 0) {
                console.log('data');
                return data;
            }
        });
        updateviewsData(newTempData);
    };
    const materialDetailList = materialDetails.map((materialDetail, index) => {
        return (
            <tr key={index} style={{ fontSize: '14px' }}>
                {profileEdit ? (
                    <td className="align-middle">
                        {materialDetail.selectedMaterial.Material_Name}
                    </td>
                ) : (
                    <td className="align-middle">
                        {materialDetail.selectedMaterial.Material_Name}
                    </td>
                )}
                <td className="align-middle">
                    {materialDetail.thickness.label}
                </td>
                <td className="align-middle">
                    {materialDetail.costUnit.label}
                </td>
                <td className="align-middle">{materialDetail.unitRate}</td>
                {deleteicon && (
                    <td className="align-middle">
                        <span
                            className="text-danger"
                            style={{ cursor: 'pointer' }}
                            onClick={() => onDeleteClick(materialDetail)}
                        >
                            <FontAwesomeIcon
                                style={{ marginRight: 2 }}
                                icon={faTrashAlt}
                                size="sm"
                            />
                            Delete
                        </span>
                    </td>
                )}
            </tr>
        );
    });
    return (
        <table className="table table-sm table-striped">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Materials</th>
                    <th scope="col">Thickness</th>
                    <th scope="col">Cost Unit</th>
                    <th scope="col">Unit Rate</th>
                    {deleteicon && <th scope="col">Action</th>}
                </tr>
            </thead>
            <tbody>{materialDetailList}</tbody>
        </table>
    );
};
