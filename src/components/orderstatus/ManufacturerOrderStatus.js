import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OrderSpecView from './OrderSpecView';
import OrderStatusEdit from './OrderStatusEdit';
import './Table.css';
function ManufacturerOrderStatus(props) {
    const [data, setData] = useState();
    const [orderData, setOrderData] = useState();
    const { id } = props.match.params;

    useEffect(() => {
        axios.post(`${window.host}/${id}/order-status`).then((response) => {
            if (response) {
                if (response.data) {
                    const data = response.data;
                    setOrderData(data);
                }
            }
        });
        // const json = localStorage.getItem("items");
        // setSavedItems(JSON.parse(json));
        // const savedItems = JSON.parse(json);
    }, []);

    return (
        <div className="container">
            <div className="out-table">
                <div className="table-heading">
                    <span className="m-auto">Order status</span>
                </div>
                <div className="inside-table">
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Order Type</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Delivery Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData &&
                                orderData.map((item, index) => {
                                    //Destructing
                                    var {
                                        Customer_ID,
                                        Order_ID,
                                        Order_Type,
                                        Date,
                                        Status,
                                        Delivery_Address,
                                    } = item;
                                    statusOption.map((option) => {
                                        if (option.label == Status) {
                                            Status = option;
                                        }
                                    });
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{Order_ID}</th>
                                            <td>{Customer_ID}</td>
                                            <td>{Order_Type}</td>
                                            <td>{Date}</td>
                                            <td>
                                                <span
                                                    className={
                                                        Status.label ==
                                                        'Pending'
                                                            ? 'badge badge-warning'
                                                            : Status.label ==
                                                              'Completed'
                                                            ? 'badge badge-success'
                                                            : Status.label ==
                                                              'Building'
                                                            ? 'badge badge-secondary'
                                                            : Status.label ==
                                                              'Delivered'
                                                            ? 'badge badge-danger'
                                                            : ''
                                                    }
                                                >
                                                    {Status.label}
                                                </span>
                                            </td>
                                            <td>{'delivery_address'}</td>
                                            <td className="d-flex">
                                                <OrderStatusEdit
                                                    data={orderData}
                                                    Status={Status}
                                                    index={index}
                                                    orderID={Order_ID}
                                                    statusOption={statusOption}
                                                    setJsonData={(jsonData) =>
                                                        setOrderData(jsonData)
                                                    }
                                                />
                                                <OrderSpecView
                                                    orderData={item}
                                                    index={index}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManufacturerOrderStatus;

const statusOption = [
    {
        value: 1,
        label: 'Pending',
    },
    {
        value: 2,
        label: 'Building',
    },
    {
        value: 3,
        label: 'Completed',
    },
    {
        value: 4,
        label: 'Delivered',
    },
];
