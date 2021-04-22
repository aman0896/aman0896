import axios from 'axios';
import { Formik } from 'formik';

import { useHistory, useLocation } from 'react-router-dom';
import './loginPage.css';
import FormTextBox from '../global/TextBox';
import React, { useState } from 'react';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

export default function ForgotPassword(props) {
    const location = useLocation();
    const [error, setErrors] = useState();

    const data = location.data;
    const history = useHistory();
    //handleOnchange = (e) => this.setState({ [e.target.name]: e.target.value });
    console.log(props);
    return (
        <React.Fragment>
            <div className="loginPage">
                <div>
                    <div className="card card-body" id="loginCard">
                        <h3 className="text-center">Forget Password</h3>
                        <hr />
                        {error && (
                            <div className="alert alert-warning" role="alert">
                                {error}
                            </div>
                        )}
                        <div>
                            <Formik
                                initialValues={{ email: '' }}
                                validate={(values) => {
                                    //this.setState({ email: values.email });
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Required email address';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        axios
                                            .post(
                                                `${window.host}/reset-password`,
                                                {
                                                    email: values.email,
                                                    path:
                                                        window.location
                                                            .pathname,
                                                }
                                            )
                                            .then((response) => {
                                                if (response.data.message) {
                                                    setErrors(
                                                        response.data.message
                                                    );
                                                } else {
                                                    const id = response.data;
                                                    window.location.href = `/verify/${id}`;
                                                    // history.push({
                                                    //     pathname: `/verify/${values.email}`,
                                                    //     data: values.email,
                                                    //     state: {
                                                    //         email: values.email,
                                                    //     },
                                                    //     //send data to verify page
                                                    // });
                                                    console.log(values.email);
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
                                        <div className="row m-1 pb-1 d-flex align-items-center">
                                            <label className="font-weight-bold">
                                                Email:
                                            </label>
                                            <FormTextBox
                                                type="email"
                                                placeholder="Enter Email"
                                                name="email"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary mt-1"
                                            style={{ width: '100%' }}
                                        >
                                            Reset Password Here
                                        </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
