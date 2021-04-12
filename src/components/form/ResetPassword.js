
import Axios from "axios";
import { Formik } from "formik";

import { useHistory, useLocation } from "react-router-dom";
import "./loginPage.css";
import FormTextBox, { PasswordField } from "../global/TextBox";
import React from "react";

const localIpUrl = require("local-ip-url");
const ipAddress = localIpUrl("public");



export default function Reset(props) {
  const location = useLocation();

  const data = location.data;
  const history = useHistory();

  const { id } = props.match.params;
  console.log(id)
  //handleOnchange = (e) => this.setState({ [e.target.name]: e.target.value });

  return (
    <React.Fragment>
      
      <div className="loginPage">
        <div>
          <div className="card card-body" id="loginCard">
            <h3 className="text-center">Reset Password</h3>
            <hr />
            {/* {error && (
              <div className="alert alert-warning" role="alert">
                {error}
              </div>
            )} */}
            <div>
              <Formik
                initialValues={{ password: "", confirm_password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.password) {
                    errors.password = "Required";
                  } else if (values.password.length < 6) {
                    errors.password =
                      "Password needs to be 6 characters or more";
                  }
                  if (!values.confirm_password) {
                    errors.confirm_password = "Required";
                  } else if (values.confirm_password !== values.password) {
                    errors.confirm_password = "Password do not match";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                   // console.log(values.email);
                    Axios.post(`http://${ipAddress}:3001/new-password`, {
                      password: values.password,
                      confirm_password: values.confirm_password,
                      id: id,
                    }).then((response) => {
                      history.push({
                        pathname: "/login",
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
                        placeholder="New password"
                        name="password"
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
                      style={{ width: "100%" }}
                    >
                      Change Password
                    </button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="row mt-3">
              <a className="col text-primary" href="/login">
                Back to Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
