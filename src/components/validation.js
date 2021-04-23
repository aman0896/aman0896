import React, { useState, useEffect } from 'react';
import axios from 'axios';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');
//const ipAddress = "192.168.88.236";
console.log(ipAddress);

function Validation() {
    const [orderInfo, setOrderInfo] = useState();
    const [tableTitle, setTableTitle] = useState([
        'OrderID',
        'CustomerID',
        'Date',
        'OrderType',
        'ModelName',
        'FabricationService',
        'Material',
        'Thickness',
        'Quantity',
        'Download',
        'Validation',
    ]);

    useEffect(() => {
        axios.get(`${window.host}/validation`).then((response) => {
            if (response.data) {
                const data = response.data.orderSpecification;
                console.log(data);
                setOrderInfo(data);
            }
        });
    }, []);

    const titles = tableTitle.map((title, index) => {
        return (
            <th key={index} scope="col">
                {title}
            </th>
        );
    });

    const GetOrderType = (orderType) => {
        var stringData = JSON.stringify(orderType);
        var data = stringData.replace(/[\[\\\]"]+/g, '');
        return data;
        // props.serviceList.forEach((service) => {
        //     if (hubID == service.Manufacturer_ID) {
        //         services = services.concat(service);
        //         manufacturingServices += service.Name + ',';
        //     }
        // });
        // var sn = manufacturingServices.lastIndexOf(',');
        // manufacturingServices = manufacturingServices.substring(0, sn);
    };

    if (orderInfo) {
        var data = orderInfo.map((item, index) => {
            return (
                <tr key={index}>
                    <td
                        className="align-middle text-center"
                        style={{ width: '5%' }}
                    >
                        {item.Order_ID}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '5%' }}
                    >
                        {item.Customer_ID}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '5%' }}
                    >
                        {item.Date}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '5%' }}
                    >
                        {GetOrderType(item.Order_Type)}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '18%' }}
                    >
                        {item.Model_Name}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '18%' }}
                    >
                        {item.Fabrication_Service}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '18%' }}
                    >
                        {item.Material}
                    </td>
                    <td
                        style={{ width: '5%' }}
                        className="align-middle text-center"
                    >
                        {item.Thickness}
                    </td>
                    <td
                        style={{ width: '5%' }}
                        className="align-middle text-center"
                    >
                        {item.Quantity}
                    </td>
                    <td
                        style={{ width: '8%' }}
                        className="align-middle text-center"
                    >
                        <a href={item.Model_Path}>
                            <button className="btn btn-primary btn-sm">
                                Download
                            </button>
                        </a>
                    </td>
                    <td
                        style={{ width: '23%' }}
                        className="align-middle text-center"
                    >
                        <button
                            style={{ width: 80 }}
                            className="btn btn-success btn-sm m-1"
                        >
                            Valid
                        </button>
                        <button
                            style={{ width: 80 }}
                            className="btn btn-danger btn-sm m-1"
                        >
                            Invalid
                        </button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className="pt-5 mt-3">
            <div className="container-fluid">
                {/* <div className="row">
                    <div
                        className="col-sm-2 bg-light d-flex justify-content-center align-items-center"
                        style={{ width: '120px', height: '150px' }}
                    >
                        User Image
                    </div>
                    <div className="col">
                        <h1>
                            {userInfo.First_Name + ' ' + userInfo.Last_Name}
                        </h1>
                        <h5>User Address</h5>
                        <p>
                            {userInfo.Email} <br />
                            {userInfo.Phone_Number}
                        </p>
                    </div>
                </div> */}

                <h1 className="mt-3">File Validation</h1>

                <div>
                    <table className=" table table-striped table-bordered ">
                        <thead>
                            <tr
                                className="text-center"
                                style={{ fontSize: '12px' }}
                            >
                                {titles}
                            </tr>
                        </thead>
                        <tbody
                            className="justify-content-center"
                            style={{ fontSize: '12px' }}
                        >
                            {data}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Validation;
