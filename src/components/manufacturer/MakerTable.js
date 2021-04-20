import { isEmptyArray } from 'formik';
import React, { useState, useEffect } from 'react';
//import Data from './Data.json';
import './MakerTable.css';

var list = null;
export default function MfgViewTable({ viewsData }) {
    const col = 'col-lg d-flex justify-content-center p-2 truncate';
    if (viewsData !== null) {
        list = viewsData.map((item, index) => {
            return (
                <div key={index}>
                    <ServiceList item={item} viewsData={viewsData} />
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

const ServiceList = ({ item, viewsData }) => {
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
                <div style={{ marginLeft: 2, fontWeight: 'bold' }}>
                    {`${item.fabricationService.label}`}
                </div>
            </div>

            <div>
                <MaterialDetailView
                    materialDetails={item.materialDetails}
                    viewsData={viewsData}
                />
            </div>
        </div>
    );
};

const MaterialDetailView = ({
    materialDetails,

    viewsData,
}) => {
    const materialDetailList = materialDetails.map((materialDetail, index) => {
        return (
            <tr key={index} style={{ fontSize: '14px' }}>
                <td className="align-middle">
                    {materialDetail.material.label}
                </td>
                <td className="align-middle">
                    {materialDetail.thickness.label}
                </td>
                <td className="align-middle">
                    {materialDetail.costUnit.label}
                </td>
                <td className="align-middle">{materialDetail.unitRate}</td>
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
                </tr>
            </thead>
            <tbody>{materialDetailList}</tbody>
        </table>
    );
};
