import React, { Component } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');
import axios from 'axios';

const cookies = new Cookies();
var cookieData = cookies.get('userInfo');

class EditProfile extends Component {
    state = { firstname: '', lastName: '', phoneNumber: '', email: '', id: '' };

    handleOnchange = (e) => this.setState({ [e.target.name]: e.target.value });
    componentDidMount() {
        //Get cookie data of cookie name "userInfo"
        console.log(cookieData);
        if (cookieData) {
            if (cookieData.userInfo) {
                this.setState({
                    id: cookieData.userInfo[0].Customer_ID,
                    firstName: cookieData.userInfo[0].First_Name,
                    lastName: cookieData.userInfo[0].Last_Name,
                    phoneNumber: cookieData.userInfo[0].Phone_Number,
                    email: cookieData.userInfo[0].Email,
                });
            }
        }
    }
    render() {
        const { email, firstName, lastName, phoneNumber, id } = this.state;
        return (
            <div style={{ background: 'rgb(58, 57, 57)', padding: '2rem' }}>
                <div
                    className="container"
                    style={{
                        backgroundColor: 'white',
                        boxShadow: '2px 2px 2px	#A9A9A9',
                        paddingTop: '1rem',
                        paddingButtom: '2rem',
                    }}
                >
                    <div>
                        <Formik
                            initialValues={{
                                email: '',

                                firstName: '',
                                lastName: '',
                                phoneNumber: '',
                            }}
                            validate={(values) => {
                                /*                       initialValues={{ email: "", password: "", firstname:"",lastname="",phoneNumber="",confirm_password="" }}
                      validate={(values) => { */
                                const errors = {};
                                if (!email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                        email
                                    )
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!this.state.firstName) {
                                    errors.firstName = 'Required';
                                }
                                if (!lastName) {
                                    errors.lastName = 'Required';
                                }
                                if (!phoneNumber) {
                                    errors.phoneNumber = 'Required';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    //cookieData.userInfo[0].firstname = firstName;
                                    // console.log(cookieData.userInfo[0].firstname);
                                    axios
                                        .post(`${window.host}/editProfile`, {
                                            id: id,
                                            firstname: firstName,
                                            lastname: lastName,
                                            email: email,
                                            phonenumber: phoneNumber,
                                        })
                                        .then((response) => {
                                            console.log(response.data);
                                            document.cookie = `userInfo = ${JSON.stringify(
                                                response.data
                                            )}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;

                                            // if (response.data.message) {
                                            //   this.setState({ error: response.data.message });
                                            // } else {
                                            this.props.history.push({
                                                pathname: '/userprofile',
                                                state: { email: email },
                                                //send data to verify page
                                            });

                                            window.location.reload();
                                        });

                                    //this.setState({ loading: false });
                                    setSubmitting(false);
                                }, 100);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className={rowView}>
                                        <div className={colView}>
                                            <ManufacturerPageView
                                                label="Full Name :"
                                                placeholder="Enter Name"
                                                name="manufacturerName"
                                            />
                                        </div>
                                        <div className={colView}>
                                            <div className="row">
                                                <div className="col-4 d-flex align-items-center">
                                                    <span className="font-weight-bold">
                                                        Company Status :
                                                    </span>
                                                </div>
                                                <div className="col">
                                                    <DropDown
                                                        options={
                                                            manufacturerTypes
                                                        }
                                                        selectedValue={
                                                            manufacturerType
                                                        }
                                                        onChange={
                                                            this
                                                                .handleCompanyStatus
                                                        }
                                                        getOptionLabel={(
                                                            options
                                                        ) => options.type}
                                                    />
                                                    <span
                                                        className="text-danger"
                                                        style={{
                                                            fontSize: '10pt',
                                                        }}
                                                    >
                                                        {errors.manufacturerType &&
                                                            touched.manufacturerType &&
                                                            errors.manufacturerType}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group mb-3">
                                                <label
                                                    className="font-weight-bold small"
                                                    htmlFor="firstName"
                                                >
                                                    First Name:
                                                </label>
                                                <input
                                                    id="firstName"
                                                    type="text"
                                                    autoFocus
                                                    className="form-control"
                                                    //placeholder="Enter First name"
                                                    name="firstName"
                                                    onChange={
                                                        this.handleOnchange
                                                    }
                                                    value={this.state.firstName}
                                                />
                                                <span className="text-danger  text-center">
                                                    {errors.firstName &&
                                                        touched.firstName &&
                                                        errors.firstName}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group mb-3">
                                                <label
                                                    className="font-weight-bold small"
                                                    htmlFor="lastName"
                                                >
                                                    Last Name:
                                                </label>
                                                <input
                                                    id="lastName"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Last name"
                                                    name="lastName"
                                                    onChange={
                                                        this.handleOnchange
                                                    }
                                                    value={this.state.lastName}
                                                />
                                                <span className="text-danger  text-center">
                                                    {errors.lastName &&
                                                        touched.lastName &&
                                                        errors.lastName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group mb-3">
                                                <label
                                                    className="font-weight-bold small"
                                                    htmlFor="phoneNumber"
                                                >
                                                    Phone Number:
                                                </label>
                                                <input
                                                    id="phoneNumber"
                                                    type="tel"
                                                    className="form-control"
                                                    placeholder="Enter phone number"
                                                    name="phoneNumber"
                                                    onChange={
                                                        this.handleOnchange
                                                    }
                                                    value={
                                                        this.state.phoneNumber
                                                    }
                                                />{' '}
                                                <span className="text-danger  text-center">
                                                    {errors.phoneNumber &&
                                                        touched.phoneNumber &&
                                                        errors.phoneNumber}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group mb-3">
                                                <label
                                                    className="font-weight-bold small"
                                                    htmlFor="email"
                                                >
                                                    Email address:
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    name="email"
                                                    onChange={
                                                        this.handleOnchange
                                                    }
                                                    value={this.state.email}
                                                />{' '}
                                                <span className="text-danger  text-center">
                                                    {errors.email &&
                                                        touched.email &&
                                                        errors.email}
                                                </span>
                                            </div>
                                        </div>{' '}
                                    </div>
                                    <div className="row">
                                        <div className="col"></div>
                                        <div className="col"></div>
                                        <div
                                            className="col"
                                            style={{ paddingLeft: '150px' }}
                                        >
                                            <div>
                                                <button
                                                    disabled={isSubmitting}
                                                    className="btn btn-primary mx-auto"
                                                    type="submit"
                                                    //style={{ width: "150px" }}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div
                                                style={{ paddingRight: '50px' }}
                                            >
                                                <a
                                                    //disabled={isSubmitting}
                                                    className="btn btn-primary"
                                                    href="/"
                                                    //type="submit"
                                                >
                                                    Cancel
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>{' '}
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfile;
