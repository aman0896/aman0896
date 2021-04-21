import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import 'react-phone-input-2/lib/bootstrap.css';
import './registrationPage.css';
import FormTextBox, { PasswordField } from '../global/TextBox';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');
class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirm_password: '',
            error: '',
            ischecked: false,
        };
        this.handleChecked = this.handleChecked.bind(this);
    }
    handleChecked() {
        this.setState({ isChecked: !this.state.isChecked });
    }

    render() {
        const { email, password, error, isChecked } = this.state;

        return (
            <React.Fragment>
                <div className="registrationPage">
                    <div>
                        <div className="card card-body" id="registrationCard">
                            <div className="text-center mb-3">
                                <i className="fa fa-user fa-2x text-primary"></i>
                            </div>
                            <h3 className="text-center mb-4 text-primary">
                                Create an account
                            </h3>
                            <hr />

                            <div>
                                <div>
                                    <Formik
                                        initialValues={{
                                            email: '',
                                            password: '',
                                            firstName: '',
                                            lastName: '',
                                            phoneNumber: '',
                                            confirm_password: '',
                                            isChecked: false,
                                        }}
                                        validate={(values) => {
                                            /*                       initialValues={{ email: "", password: "", firstname:"",lastname="",phoneNumber="",confirm_password="" }}
                      validate={(values) => { */
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
                                            if (!values.firstName) {
                                                errors.firstName = 'Required';
                                            }
                                            if (!values.lastName) {
                                                errors.lastName = 'Required';
                                            }
                                            if (values.password.length < 6) {
                                                errors.password =
                                                    'Password must contain atleast 6 letters';
                                            } else if (
                                                values.password !==
                                                values.confirm_password
                                            ) {
                                                errors.confirm_password =
                                                    'Password did not match';
                                            } else if (!isChecked) {
                                                errors.isChecked =
                                                    'Please accept the terms of use to continue.';
                                            }
                                            return errors;
                                        }}
                                        onSubmit={(
                                            values,
                                            { setSubmitting }
                                        ) => {
                                            setTimeout(() => {
                                                axios
                                                    .post(
                                                        `${window.host}/register`,
                                                        {
                                                            firstName:
                                                                values.firstName,
                                                            lastName:
                                                                values.lastName,
                                                            password:
                                                                values.password,
                                                            email: values.email,
                                                            phoneNumber:
                                                                values.phoneNumber,
                                                        }
                                                    )
                                                    .then((response) => {
                                                        if (
                                                            response.data
                                                                .message
                                                        ) {
                                                            this.setState({
                                                                error:
                                                                    response
                                                                        .data
                                                                        .message,
                                                            });
                                                        } else {
                                                            this.props.history.push(
                                                                {
                                                                    pathname:
                                                                        '/verify',
                                                                    state: {
                                                                        email:
                                                                            values.email,
                                                                    },
                                                                    //send data to verify page
                                                                }
                                                            );
                                                            window.location.reload();
                                                            console.log(
                                                                values.email
                                                            );
                                                        }
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
                                            handleSubmit,
                                            isSubmitting,
                                            /* and other goodies */
                                        }) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row mb-2">
                                                    <div className="col">
                                                        <div>
                                                            <FormTextBox
                                                                placeholder="First name"
                                                                name="firstName"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div>
                                                            <FormTextBox
                                                                placeholder="Last name"
                                                                name="lastName"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col">
                                                        <div>
                                                            <FormTextBox
                                                                placeholder="Email Address"
                                                                name="email"
                                                                type="email"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col">
                                                        <div>
                                                            <PasswordField
                                                                placeholder="Password"
                                                                name="password"
                                                                type="password"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div>
                                                            <PasswordField
                                                                placeholder="Confirm Password"
                                                                name="confirm_password"
                                                                type="password"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col">
                                                        <div>
                                                            <FormTextBox
                                                                placeholder="City"
                                                                name="city"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div>
                                                            <FormTextBox
                                                                placeholder="State"
                                                                name="state"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div>
                                                            <FormTextBox
                                                                placeholder="Country"
                                                                name="country"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-3">
                                                        <div>
                                                            <FormTextBox
                                                                type="tel"
                                                                placeholder="+977"
                                                                name="contryCode"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-5">
                                                        <div>
                                                            <FormTextBox
                                                                type="tel"
                                                                placeholder="Phone Number"
                                                                name="phoneNumber"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col d-flex justify-content-center">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                name="checkbox"
                                                                className="custom-control-input"
                                                                id="defaultUnchecked"
                                                                onChange={
                                                                    this
                                                                        .handleChecked
                                                                }
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                for="defaultUnchecked"
                                                            >
                                                                I agree with{' '}
                                                                <Link to="/">
                                                                    terms of use
                                                                </Link>
                                                            </label>
                                                            <div>
                                                                <span className="text-danger  text-center">
                                                                    {errors.isChecked &&
                                                                        touched.isChecked &&
                                                                        errors.isChecked}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col">
                                                        <div className="text-center">
                                                            <button
                                                                disabled={
                                                                    isSubmitting
                                                                }
                                                                className="btn btn-primary"
                                                                type="submit"
                                                            >
                                                                Sign up
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                    {error && (
                                        <p className="text-danger mb-2 text-center">
                                            {error}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col d-flex justify-content-center">
                                    <span className="text-center">
                                        Already have an account ?
                                        <a href="Login">
                                            <span>Login</span>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Register;
