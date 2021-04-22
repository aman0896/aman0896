import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Foo from '../manufacturer/StarRating';
import data from './Data.json';
import Table from './ManufacturerOrderStatus';
import './Table.css';

function CustomerOrderStatus(props) {
    const [savedItems, setSavedItems] = useState();
    const { id } = props.match.params;
    const [orderData, setOrderData] = useState();

    useEffect(() => {
        axios.post(`${window.host}/${id}/order-status`).then((response) => {
            if (response) {
                if (response.data) {
                    const data = response.data;
                    console.log(data);
                    setOrderData(data);
                }
            }
        });
        const json = localStorage.getItem('items');
        setSavedItems(JSON.parse(json));
        // const savedItems = JSON.parse(json);
    }, []);

    return (
        <div className="container">
            <div className="out-table">
                <div className="table-heading">
                    <span className="m-auto">Order Status</span>
                </div>

                <div className="inside-table">
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Order Type</th>
                                <th scope="col">ModelName</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Manufacturer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData &&
                                orderData.map((data) => (
                                    <tr key={data.Order_ID}>
                                        <th scope="row">{data.Order_ID}</th>
                                        <td>{data.Order_Type}</td>
                                        <td>{data.Model_Name}</td>
                                        <td>{data.Date}</td>
                                        <td>
                                            <span
                                                className={
                                                    data.Status == 'Pending'
                                                        ? 'badge badge-warning'
                                                        : data.Status ==
                                                          'Completed'
                                                        ? 'badge badge-success'
                                                        : data.Status ==
                                                          'Building'
                                                        ? 'badge badge-secondary'
                                                        : data.Status ==
                                                          'Delivered'
                                                        ? 'badge badge-danger'
                                                        : ''
                                                }
                                            >
                                                {data.Status}
                                            </span>
                                        </td>
                                        <td>{''}</td>
                                        <td>{data.Manufacturer_ID}</td>
                                    </tr>
                                ))}
                            {/* {savedItems.map(row => (
                <tr key={row.order_id}>
                    <th scope='row'>{row.order_id}</th>
                    <td>{row.date}</td>
                    <td>{row.status}</td>
                    <td>{row.order_details.amount}</td>
                </tr>
            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CustomerOrderStatus;
