import axios from 'axios';
import { Formik } from 'formik';

import { useHistory, useLocation } from 'react-router-dom';
import './loginPage.css';
import FormTextBox, { PasswordField } from '../global/TextBox';
import React from 'react';
import { GetCookiesInfo } from '../global/GlobalFunction';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

export default function ChangePass() {
    const location = useLocation();

    const data = location.data;
    const history = useHistory();
    const email = GetCookiesInfo();
    //handleOnchange = (e) => this.setState({ [e.target.name]: e.target.value });

    return (
        <React.Fragment>
            <div className="loginPage">
                <div>
                    <div className="card card-body" id="loginCard">
                        <h3 className="text-center">Change My Password</h3>
                        <hr />
                        {/* {error && (
              <div className="alert alert-warning" role="alert">
                {error}
              </div>
            )} */}
                        <div>
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
                                        values.password
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
                                                `http://${window.host}:3001/change-password`,
                                                {
                                                    new_password:
                                                        values.new_password,
                                                    old_password:
                                                        values.old_password,
                                                    confirm_password:
                                                        values.confirm_password,
                                                    email: email,
                                                }
                                            )
                                            .then((response) => {
                                                history.push({
                                                    pathname: '/login',
                                                });
                                                console.log(values.email);
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
                                            <PasswordField
                                                type="password"
                                                placeholder="Current password"
                                                name="old_password"
                                            />
                                        </div>
                                        <div className="row m-1 pb-1 d-flex align-items-center">
                                            <PasswordField
                                                type="password"
                                                placeholder="New password"
                                                name="new_password"
                                            />
                                        </div>
                                        <div className="row m-1 d-flex align-items-center">
                                            <PasswordField
                                                type="password"
                                                placeholder="Confirm Password"
                                                name="confirm_password"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary mt-1"
                                            style={{ width: '100%' }}
                                        >
                                            Update Password
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
