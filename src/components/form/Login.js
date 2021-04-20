import { Formik } from 'formik';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './loginPage.css';
import FormTextBox, { PasswordField } from '../global/TextBox';
import { Route, Switch, Link } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import Register from './Register';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        error: null,
        users: null,
        hidden: true,
        flag: '',
        loggedInStatus: '',
    };

    onClickVerify = (event) => {
        event.preventDefault();
        axios
            .post(`http://${window.host}/verify-login`, {
                email: this.state.email,
            })
            .then((response) => {
                if (response.data.message) {
                    this.props.history.push({
                        pathname: '/verify',
                        data: this.state.email,
                        state: { email: this.state.email },
                        //send data to verify page
                    });
                    console.log(this.state.email);
                }
            });
    };

    render() {
        const {
            email,
            password,
            error,
            hidden,
            flag,
            loggedInStatus,
            props,
        } = this.state;
        const { match } = this.props;
        const url = match.path;
        return (
            <React.Fragment>
                <div className="loginPage">
                    <div>
                        <div className="card card-body" id="loginCard">
                            <div className="text-center">
                                <i className="fa fa-user fa-2x text-primary"></i>
                            </div>

                            <h3 className="text-center">Sign In</h3>
                            <hr />
                            {error && (
                                <div
                                    className="alert alert-warning"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            <div>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validate={(values) => {
                                        this.setState({ email: values.email });
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = 'Required';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                                values.email
                                            )
                                        ) {
                                            errors.email =
                                                'Invalid email address';
                                        }
                                        if (!values.password) {
                                            errors.password = 'Required';
                                        } else if (values.password.length < 6) {
                                            errors.password =
                                                'Password must contain atleast 6 letters';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            axios
                                                .post(
                                                    `http://${window.host}/login`,
                                                    {
                                                        email: values.email,
                                                        password:
                                                            values.password,
                                                    }
                                                )
                                                .then((response) => {
                                                    if (
                                                        response.data.userInfo
                                                    ) {
                                                        var date = new Date();
                                                        date.setFullYear(
                                                            date.getFullYear() +
                                                                1
                                                        );
                                                        document.cookie = `userInfo = ${JSON.stringify(
                                                            response.data
                                                        )}; expires= ${date.toUTCString()}; path=/`; //Storing login info value in Cookie
                                                    }

                                                    if (
                                                        response.data.message &&
                                                        response.data
                                                            .verified === 0
                                                    ) {
                                                        this.setState({
                                                            error:
                                                                response.data
                                                                    .message,
                                                            hidden: false,
                                                            email: values.email,
                                                        });
                                                    } else if (
                                                        response.data.message
                                                    ) {
                                                        this.setState({
                                                            error:
                                                                response.data
                                                                    .message,
                                                        });
                                                    } else {
                                                        window.location.href =
                                                            '/';
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
                                                <FormTextBox
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    name="email"
                                                />
                                            </div>
                                            <div className="row m-auto border">
                                                <PasswordField
                                                    type="password"
                                                    placeholder="Enter Password"
                                                    name="password"
                                                    style={{
                                                        paddingRight: '30px',
                                                    }}
                                                />
                                            </div>
                                            <span className="text-center small">
                                                Forget your password?{' '}
                                                <a href={`${url}/identity`}>
                                                    {' '}
                                                    Reset it Here
                                                </a>
                                            </span>
                                            <span className="row d-flex justify-content-center m-2">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="btn btn-primary d-flex justify-content-center"
                                                >
                                                    Sign In
                                                </button>
                                            </span>
                                        </form>
                                    )}
                                </Formik>
                                <span className="text-center small d-flex justify-content-center text-primary">
                                    <p
                                        type="button"
                                        hidden={hidden}
                                        onClick={this.onClickVerify}
                                    >
                                        Click here to verify
                                    </p>
                                </span>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <span className="text-center small">
                                    Do not have an account?{' '}
                                    <a
                                        type="button"
                                        className="text-primary"
                                        data-toggle="modal"
                                        data-target="#signmodal"
                                    >
                                        Sign up
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
