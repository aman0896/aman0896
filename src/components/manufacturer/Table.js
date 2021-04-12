import React, { useState, useEffect } from "react";
import Data from "../Data.json";
import "./MakerTable.css";
const MakerTable = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-lg-12">
            <h1 className="text-center">Maker Details</h1>
          </div>
          <div className="col-lg-10 offset-lg-1">
            <table className="table mt-2">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Manufacturing Process</th>
                  <th scope="col">Material</th>
                  <th scope="col">Cost Unit</th>
                  <th scope="col">Unit Rate</th>
                  <th scope="col">MoQ</th>
                  <th scope="col">Accepted Files</th>
                  <th scope="col">Lead Time</th>
                  <th scope="col">Additional Details</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.manufacturing_Process}</td>
                    <td>{row.material}</td>
                    <td>{row.cost_unit}</td>
                    <td>
                      <div>{row.unit_rate.price_1}</div>
                      <div>{row.unit_rate.price_2}</div>
                    </td>
                    <td>{row.MoQ}</td>
                    <td>{row.accepted_files}</td>
                    <td>{row.lead_time}</td>
                    <td>{row.additional_details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakerTable;
