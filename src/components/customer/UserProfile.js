import React, { useState, useEffect } from 'react';
import { GetCookiesInfo } from '../global/GlobalFunction';
import './UserProfile.css';
import { useHistory } from 'react-router';
import axios from 'axios';

const UserProf = () => {
    const {
        email,
        userName,
        lastName,
        phoneNumber,
        customerID,
        profileImage,
    } = GetCookiesInfo();
    const firstName = userName;
    const history = useHistory();

    const [imagePath, setImagePath] = useState();

    const onClickEditProfile = () => {
        window.location.href = `/${customerID}/customer-profile`;
    };
    const [customer, setCustomer] = useState();
    //#region get_customer_data_from_db
    useEffect(() => {
        axios
            .post(`http://localhost:3001/customer/${customerID}`)
            .then((response) => {
                if (response.data) {
                    console.log(response.data[0]);
                    setCustomer(response.data[0]);
                    if (response.data[0].Profile_Image) {
                        const { fileName, filePath } = JSON.parse(
                            response.data[0].Profile_Image
                        );
                        setImagePath(filePath);
                    }
                }
            });
    }, []);
    //#endregion

    return (
        <div className="container p-5">
            <div className="card h-100">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h3 className="mb-2 text-primary">
                                Profile Details
                            </h3>
                            {/* <h5 className="mb-3 font-weight-bold">Profile</h5> */}
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div
                                        className="user-avatar"
                                        style={{
                                            //alignItems: "center",
                                            marginTop: '50px',
                                        }}
                                    >
                                        <img
                                            src={imagePath}
                                            alt="Maxwell Admin"
                                            style={{
                                                borderRadius: '50%',
                                                borderColor: 'black',
                                            }}
                                        />
                                    </div>
                                    {customer && (
                                        <h5 className="user-name">
                                            {customer.First_Name}&nbsp;
                                            {customer.Last_Name}
                                        </h5>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            {customer && (
                                <div className="row gutters">
                                    <div className="col-12 mt-3">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-3">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        First Name :
                                                    </label>
                                                </div>
                                                <div className="col-9">
                                                    <p className="">
                                                        {customer.First_Name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-3">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Last Name :
                                                    </label>
                                                </div>
                                                <div className="col-9">
                                                    <p>{customer.Last_Name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-3">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Email :
                                                    </label>
                                                </div>
                                                <div className="col-9">
                                                    <p>{customer.Email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-3">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Phone Number :
                                                    </label>
                                                </div>
                                                <div className="col-9">
                                                    <p>
                                                        {customer.Phone_Number}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-3">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Address :
                                                    </label>
                                                </div>
                                                <div className="col-9">
                                                    <p>test test</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row gutters">
                                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div>
                                                    <button
                                                        type="button"
                                                        id="submit"
                                                        name="submit"
                                                        className="btn btn-primary mr-2"
                                                        onClick={
                                                            onClickEditProfile
                                                        }
                                                    >
                                                        Edit Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                <div>
                    <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-primary mr-2 mt-2"
                        onClick={() => {
                            history.push({
                                pathname: '/edit-projectlist',
                            });
                        }}
                    >
                        View My Projects
                    </button>
                </div>{' '}
            </div>
        </div>
    );
};

export default UserProf;
