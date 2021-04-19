import React, { Component } from 'react';
import HomePage from '../main/Homepage';
import Login from '../form/Login';
import NavBar from '../main/navBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from '../main/aboutUs';
import NewQuote from '../newquote/NewQuote';
import Register from '../form/Register';
import Modal from '../global/Modal';
import RequestCode from '../RequestCode';
import OTPVerification from '../form/OTPVerification';
import Technology from '../main/technology';
import demo from '../Demo';
//import quotation from "../quotation";
import featureProject from '../featureProject/FeatureProjectList';
import validation from '../validation';
import '../main/navbar.css';
import Feature from '../featureProject/inputFeatureProject';
import ResetPassword from '../form/ResetPassword';
import ForgotPassword from '../form/ForgotPassword';
import DetailFeature from '../featureProject/FeatureProjectViewPage';
import ManufacturingHubsView from '../manufacturer/MfgHubsViewPage';
import ManufacturerSignup from '../form/ManufacturerSignup';
import ManufacturerViewProfile from '../manufacturer/ManufacturerViewProfile';
import Footer from './footer';
import UserProfile from '../customer/UserProfile';
//import MakerProfile from "../Profiles/MakerProfile";
import UserProfileEdit from '../customer/UserProfileEdit';
//import MakerProfileEdit from "../Profiles/MakerProfileEdit";
import ChangePass from '../form/ChangePass';
import Editfeature from '../featureProject/EditFeatureProject';
import { GetCookiesInfo } from '../global/GlobalFunction';
import ProtectedRoute from './ProtectedRoute';
import OpenStreet from './OpenStreetMap';
import ModalDelete from '../featureProject/ModalDelete';
import Printing from '../3d-printing/Blog.js';
import Forming from '../vacuum-forming/Blog.js';
import MakerProf from '../manufacturer/MakerProfile';
import EditManufacturerProfile from '../manufacturer/MakerProfileEdit';

import CustomerOrderStatus from '../orderstatus/CustomerOrderStatus';
import ManufacturerOrderStatus from '../orderstatus/ManufacturerOrderStatus';
import EditFeatureProjectList from '../featureProject/EditFeatureProjectList';

function Routing({ isAuth, currentUser }) {
    return (
        <div>
            <Modal
                title="Place an Order"
                option1="I don't have a design"
                option2="I  have a design"
                id="placeOrderModal"
                link1="request-quote"
                link2="new-quote"
            />{' '}
            <Modal
                title="SignUp"
                option1="As Client"
                option2="As Maker"
                id="signmodal"
                link1="register"
                link2="/manufacturer-signup"
            />
            {/* <ModalDelete /> */}
            {/* <div className="p-4"></div> */}
            <Router>
                <div className="p-4">
                    <NavBar isAuth={isAuth} currentUser={currentUser} />
                </div>
                <div>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/about-us" component={AboutUs} />
                        <Route
                            path="/login/:path"
                            exact
                            component={ForgotPassword}
                        />
                        <Route
                            path="/verify"
                            exact
                            component={OTPVerification}
                        />
                        <Route
                            path="/verify/:id"
                            exact
                            component={OTPVerification}
                        />
                        <ProtectedRoute
                            path="/new-quote"
                            component={NewQuote}
                            isAuth={isAuth}
                            redirectionPage="/login"
                        />
                        <Route path="/register" component={Register} />
                        <Route path="/request-quote" component={ModalDelete} />
                        <ProtectedRoute
                            path="/request-quote"
                            component={RequestCode}
                            isAuth={isAuth}
                            redirectionPage="/login"
                        />
                        <Route path="/verify" component={OTPVerification} />
                        <Route
                            path="/manufacturer-signup"
                            component={ManufacturerSignup}
                        />
                        <Route path="/technology" component={Technology} />
                        {/* <Route
              path="/manufacturerdetail"
              component={ManufacturerViewProfile}
            /> */}
                        {/* <Route path="/demo" component={OpenStreet} /> */}
                        <Route
                            path="/feature-project"
                            exact
                            component={featureProject}
                        />

                        <Route
                            path="/validation-page/:uid"
                            component={validation}
                        />

                        {/* <Route path="/feature" component={Feature} /> */}
                        <ProtectedRoute
                            path="/feature"
                            component={Feature}
                            isAuth={isAuth}
                            redirectionPage="/login"
                        />
                        {/* <Route path="/detail-feature" component={DetailFeature} /> */}
                        <Route
                            path="/feature-project/:id/:title"
                            component={DetailFeature}
                        />
                        {/* <Route path="/demo" component={demo} /> */}
                        <Route
                            path="/feature-project"
                            component={featureProject}
                        />
                        <Route
                            path="/validation-page/:uid"
                            component={validation}
                        />
                        <Route
                            path="/reset-password/:id"
                            exact
                            component={ResetPassword}
                        />
                        <Route path="/feature" component={Feature} />
                        <Route
                            path="/detail-feature"
                            component={DetailFeature}
                        />
                        <Route
                            path="/manufacturer-list"
                            exact
                            component={ManufacturingHubsView}
                        />
                        <Route
                            path="/manufacturer-list/:id/:companyname"
                            component={ManufacturerViewProfile}
                        />
                        <Route
                            path="/client/:id/order-status"
                            component={CustomerOrderStatus}
                        />
                        <Route
                            path="/maker/:id/order-status"
                            component={ManufacturerOrderStatus}
                        />
                        <Route
                            path="/manufacturer-profile"
                            exact
                            component={MakerProf}
                        />
                        <Route
                            path="/:id/manufacturer-profile/"
                            exact
                            component={EditManufacturerProfile}
                        />

                        <Route
                            path="/customer-profile"
                            exact
                            component={UserProfile}
                        />
                        <Route
                            path="/:id/customer-profile/"
                            exact
                            component={UserProfileEdit}
                        />
                        <Route path="/change-password" component={ChangePass} />
                        <Route
                            path="/edit-project"
                            exact
                            component={Editfeature}
                        />
                        <Route
                            path="/edit-projectlist/:id/:title"
                            component={DetailFeature}
                        />
                        <Route path="/3d-printing" component={Printing} />
                        <Route path="/vacuum-forming" component={Forming} />
                        <ProtectedRoute
                            path="/edit-projectlist"
                            component={EditFeatureProjectList}
                            isAuth={isAuth}
                            redirectionPage="/login"
                        />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default Routing;
