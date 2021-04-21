import axios from 'axios';
import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { GetCookiesInfo } from '../global/GlobalFunction';
import FormTextBox, { PasswordField } from '../global/TextBox';
import './UserProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

const EditUserProf = (props) => {
    const {
        email,
        userName,
        lastName,
        phoneNumber,
        customerID,
        profileImage,
        userStatus,
    } = GetCookiesInfo();
    const history = useHistory();
    const [imagePath, setImagePath] = useState(
        '/profileImage/3f9470b34a8e3f526dbdb022f9f19cf7.jpg'
    );
    const [error, setError] = useState();
    const { id } = props.match.params;
    console.log(id);

    //setUploadedImage(Image);
    const [customer, setCustomer] = useState();

    useEffect(() => {
        axios.post(`${window.host}/customer/${customerID}`).then((response) => {
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

    const handleOnchangeimage = (e) => {
        const formData = new FormData();
        const file = e.target.files;
        var data;

        formData.append('file', file[0]);
        formData.append('document', 'profileImage');
        formData.append('id', customerID);
        console.log(file, formData);
        axios
            .post(`${window.host}/imageupload`, formData, {
                document: 'documents',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                // console.log(response.data);
                // document.cookie = `userInfo = ${JSON.stringify(
                //   response.data
                // )}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;

                if (response.data.msg) console.log(response.data.msg);
                else {
                    console.log(response.data);
                    data = JSON.stringify(response.data);
                    console.log(data);

                    axios
                        .post(`${window.host}/changeimage`, {
                            id: customerID,
                            image: data,
                            userStatus: userStatus,
                        })
                        .then((response) => {
                            console.log(response.data);
                            // document.cookie = `userInfo = ${JSON.stringify(
                            //     response.data
                            // )}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;
                            // // window.location.reload();
                        });
                    const { fileName, filePath } = JSON.parse(data);
                    console.log(filePath);
                    setImagePath(filePath);
                }
            });
    };

    return (
        <div className="container p-5">
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div
                        className="card body account-settings"
                        style={{
                            paddingTop: '80px',
                            paddingBottom: '80px',
                            // display: "block",
                            //borderRadius: '20px',
                        }}
                    >
                        <div
                            className="user-profile"
                            style={{ borderRadius: '5px 10px 15px 20px' }}
                            id="image"
                        >
                            <div
                                className="user-avatar"
                                style={{ borderRadius: '5px 10px 15px 20px' }}
                            >
                                <a
                                    //href="#"
                                    aria-label="Change Profile Picture"
                                    className="change-pic"
                                >
                                    <div
                                        className="profile-pic"
                                        style={{
                                            backgroundImage: `url(${imagePath})`,
                                            borderRadius:
                                                '5px 10px 15px 20px solid',
                                            borderColor: 'black',
                                        }}
                                    >
                                        <i
                                            class="fa fa-file-image-o"
                                            aria-hidden="true"
                                        ></i>
                                        <span>Change Image</span>
                                    </div>
                                    <div className="overlay">
                                        <span
                                            //href="#"
                                            className="icon"
                                            //title="User Profile"
                                        >
                                            <FontAwesomeIcon
                                                //style={{ marginRight: 2 }}
                                                icon={faCamera}
                                                size="sm"
                                            />
                                            <input
                                                className="avatar-file h-100 w-100"
                                                type="file"
                                                name="file"
                                                accept="image/*"
                                                onChange={handleOnchangeimage}
                                            />
                                        </span>
                                    </div>
                                </a>

                                {/* 
                         <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="Maxwell Admin"
                            /> */}
                            </div>
                            {customer && (
                                <h5 className="user-name">
                                    {customer.First_Name}&nbsp;
                                    {customer.Last_Name}
                                </h5>
                            )}
                        </div>
                        {/* <div className="text-center">
                      <div className="file btn btn-sm btn-primary w-100">
                         Upload
                         <input className="avatar-file" type="file" name="file" accept="image/*"/>
                      </div>
                   </div> */}
                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        {customer && (
                            <Formik
                                initialValues={{
                                    email: customer.Email,

                                    firstName: customer.First_Name,
                                    lastName: customer.Last_Name,
                                    phoneNumber: customer.Phone_Number,
                                    Address: '',
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }
                                    if (!values.firstName) {
                                        errors.firstName = 'Required';
                                    }
                                    if (!values.lastName) {
                                        errors.lastName = 'Required';
                                    }
                                    if (!values.phoneNumber) {
                                        errors.phoneNumber = 'Required';
                                    }

                                    console.log(errors.firstName);
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        console.log('submit');
                                        axios
                                            .post(
                                                `${window.host}/editProfile`,
                                                {
                                                    id: customerID,
                                                    firstname: values.firstName,
                                                    lastname: values.lastName,
                                                    email: values.email,
                                                    phonenumber:
                                                        values.phoneNumber,
                                                }
                                            )
                                            .then((response) => {
                                                history.push({
                                                    pathname:
                                                        '/customer-profile',
                                                    //state: { email: email },
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
                                        <div className="card-body">
                                            <div className="row gutters">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <h3 className="mb-3 text-primary">
                                                        Edit Profile Details
                                                    </h3>
                                                    {/* 
                      <h5 className="mb-3 font-weight-bold">Profile</h5>
                      */}
                                                </div>

                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <label>First Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        name="firstName"
                                                        placeholder="Enter your first name"
                                                        onChange={handleChange}
                                                        value={values.firstName}
                                                    />

                                                    <span
                                                        className="text-danger"
                                                        style={{
                                                            fontSize: '10pt',
                                                        }}
                                                    >
                                                        {errors.firstName &&
                                                            touched.firstName &&
                                                            errors.firstName}
                                                    </span>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <label>Last Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="lastName"
                                                        placeholder="Enter your last name"
                                                        onChange={handleChange}
                                                        value={values.lastName}
                                                    />

                                                    <span
                                                        className="text-danger"
                                                        style={{
                                                            fontSize: '10pt',
                                                        }}
                                                    >
                                                        {errors.lastName &&
                                                            touched.lastName &&
                                                            errors.lastName}
                                                    </span>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control mb-2"
                                                        name="email"
                                                        placeholder="Email"
                                                        onChange={handleChange}
                                                        value={values.email}
                                                    />

                                                    <span
                                                        className="text-danger"
                                                        style={{
                                                            fontSize: '10pt',
                                                        }}
                                                    >
                                                        {errors.email &&
                                                            touched.email &&
                                                            errors.email}
                                                    </span>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <label>Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="phoneNumber"
                                                        placeholder="Phone Number"
                                                        onChange={handleChange}
                                                        value={
                                                            values.phoneNumber
                                                        }
                                                    />

                                                    <span
                                                        className="text-danger"
                                                        style={{
                                                            fontSize: '10pt',
                                                        }}
                                                    >
                                                        {errors.phoneNumber &&
                                                            touched.phoneNumber &&
                                                            errors.phoneNumber}
                                                    </span>
                                                </div>

                                                <div className="col-6">
                                                    <label>Address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        // rows="2"
                                                        placeholder="Address"
                                                    ></input>
                                                </div>
                                            </div>
                                            <div className="row gutters mt-3">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div>
                                                        <button
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                            type="submit"
                                                            className="btn btn-primary mr-2 float-right"
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        )}
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12"></div>
                <div className="col-9 mt-4">
                    <div className="card">
                        <div className="card-body">
                            {error && (
                                <div
                                    className="alert alert-warning"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            <Formik
                                initialValues={{
                                    old_password: '',
                                    new_password: '',
                                    confirm_password: '',
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.old_password) {
                                        errors.old_password = 'Required';
                                    }
                                    if (!values.new_password) {
                                        errors.new_password = 'Required';
                                    } else if (values.new_password.length < 6) {
                                        errors.new_password =
                                            'Password needs to be 6 characters or more';
                                    }
                                    if (!values.confirm_password) {
                                        errors.confirm_password = 'Required';
                                    } else if (
                                        values.confirm_password !==
                                        values.new_password
                                    ) {
                                        errors.confirm_password =
                                            'Password do not match';
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        console.log(values.email);
                                        axios
                                            .post(
                                                `${window.host}/change-password`,
                                                {
                                                    new_password:
                                                        values.new_password,
                                                    old_password:
                                                        values.old_password,
                                                    confirm_password:
                                                        values.confirm_password,
                                                    id: customerID,
                                                    userStatus: userStatus,
                                                }
                                            )
                                            .then((response) => {
                                                if (response.data.message) {
                                                    setError(
                                                        response.data.message
                                                    );
                                                } else {
                                                    history.push({
                                                        pathname:
                                                            '/userprofile',
                                                    });
                                                }
                                            });
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
                                        <h3 className="mb-3 text-primary">
                                            Change Password
                                        </h3>
                                        <div className="row gutters">
                                            <div className=" col-6">
                                                <label>Current Password</label>
                                                <PasswordField
                                                    type="password"
                                                    placeholder="Current password"
                                                    name="old_password"
                                                />
                                            </div>
                                            <div className=" col-6"></div>
                                            <div className=" col-6 mt-2">
                                                <label>New Password</label>
                                                <PasswordField
                                                    type="password"
                                                    placeholder="New password"
                                                    name="new_password"
                                                />
                                            </div>{' '}
                                            <div className=" col-6 mt-2">
                                                <label>Confirm Password</label>
                                                <PasswordField
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    name="confirm_password"
                                                />
                                            </div>
                                        </div>
                                        <div className="row gutters">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div>
                                                    <button
                                                        type="submit"
                                                        //id="submit"
                                                        //name="submit"
                                                        disabled={isSubmitting}
                                                        className="btn btn-primary mr-2 float-right"
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center mt-4">
                        <div>
                            {' '}
                            <button
                                type="button"
                                id="submit"
                                name="submit"
                                className="btn cancel-btn btn-primary mr-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>{' '}
                </div>
            </div>
        </div>
    );
};

export default EditUserProf;
