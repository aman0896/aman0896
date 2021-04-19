import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../global/Button';
import { Link, animateScroll as scroll } from 'react-scroll';
import axios from 'axios';

//import PlaceOrder from "./placeOrder";
import './navbar.css';
//import Login from "./Login";
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { GetCookiesInfo } from '../global/GlobalFunction';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

const cookies = new Cookies();

var cookieData = cookies.get('userInfo');
if (cookieData) var userStatus = cookieData.userStatus;

function LoginButton(props) {
    return (
        <li className="dropdown nav-item">
            <a
                className="nav-link"
                href="#"
                data-toggle="dropdown"
                style={{ color: 'white' }}
            >
                <i className="fa fa-fw fa-user fa-lg"></i>
                Login
            </a>
            <ul className="dropdown-menu bg-primary">
                <li>
                    <a
                        className="dropdown-item  no-bottom-border"
                        href="/login"
                    >
                        {' '}
                        Login
                    </a>
                </li>
                <li>
                    <a
                        className="dropdown-item  no-bottom-border"
                        href="/register"
                        type="button"
                        data-toggle="modal"
                        data-target="#signmodal"
                    >
                        {' '}
                        Sign Up
                    </a>
                </li>
            </ul>
        </li>
    );
}

function LogoutButton({ username, customerID, manufacturerID }, props) {
    const onclick = () => {
        document.cookie = `userInfo = ; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/`; //Clearing the Cookie information
        window.location.href = '/';
        this.setState({ loggedIn: false });
    };
    console.log(props);
    const onClickEditProfileClient = () => {
        window.location.href = '/customer-profile';
    };

    const onClickEditProfileMaker = () => {
        window.location.href = '/manufacturer-profile';
    };
    return (
        <li className="dropdown nav-item">
            <a
                className="nav-link no-bottom-border"
                href="#"
                data-toggle="dropdown"
                style={{ color: 'white' }}
            >
                {/* <img src="/projectUploads/avatar.jpg" alt="Avatar" className="avatar"></img> */}
                <i className="fa fa-fw fa-user fa-lg"></i>
                <span>{username.charAt(0)}</span>
            </a>

            <ul className="dropdown-menu bg-primary dropdown-menu-left">
                {userStatus === 'client' ? (
                    <div>
                        <li>
                            <button
                                className="dropdown-item"
                                href="/"
                                onClick={onClickEditProfileClient}
                            >
                                My Profile
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    window.location.href = `/client/${customerID}/order-status`;
                                }}
                            >
                                My Orders
                            </button>
                        </li>
                    </div>
                ) : (
                    <div>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    window.location.href = `/maker/${manufacturerID}/order-status`;
                                }}
                            >
                                {' '}
                                Orders
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                href="/"
                                onClick={onClickEditProfileMaker}
                            >
                                My Profile
                            </button>
                        </li>
                    </div>
                )}
                <li>
                    <button className="dropdown-item" onClick={onclick}>
                        {' '}
                        Log Out
                    </button>
                </li>{' '}
            </ul>
        </li>
    );
}

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPageName: window.location.pathname,
            username: '',
            loggedIn: false,
            customerID: '',
            manufacturerID: '',
        };
    }
    onScroll = () => {
        //scroll.scrollTo("/#technology");
        window.location.href = '/#technology';
    };

    async componentDidMount() {
        console.log('userInfo', this.props);
        const { currentUser, isAuth } = this.props;
        // const uid = cookies.get('uid');
        // const accessToken = uid;
        // console.log(accessToken);
        // const { REACT_APP_JWT_AUTH_TOKEN } = process.env;
        // console.log('token', REACT_APP_JWT_AUTH_TOKEN);
        // jwt.verify(accessToken, REACT_APP_JWT_AUTH_TOKEN, (err, userInfo) => {
        //     console.log('hello for cookie', err);
        //     if (userInfo) {
        //         console.log('user', userInfo);
        //     }
        // });
        var userInfo = undefined;
        if (currentUser && isAuth) {
            this.setState({ loggedIn: isAuth });
            if (currentUser) {
                await axios
                    .post('http://localhost:3001/get-customer-info', {
                        uid: currentUser,
                    })
                    .then((response) => {
                        if (response) {
                            userInfo = response.data;
                        }
                    });
            }
        }
        if (userInfo != undefined) {
            const { First_Name } = userInfo[0];
            this.setState({ username: First_Name });
        }
    }
    GetPageName() {
        const { currentPageName } = this.state;
    }

    render() {
        const { currentPageName } = this.state;
        let navClassName =
            'navbar fixed-top navbar-expand-lg navbar-dark bg-primary';

        let navButton = 'btn  btn-xs btn-outline-light pt-2 pb-2 mt-2';

        let navBrandClasses = 'navbar-brand no-bottom-border';
        const navBrandClass =
            currentPageName === '/' ? navBrandClasses : navBrandClasses + ' '; //Updated by Manashi

        const aboutUsActive =
            currentPageName === '/about-us' ? 'active nav-link' : 'nav-link';

        const howItWorksActive =
            currentPageName === '/demo' ? 'active nav-link' : 'nav-link';

        const manufactureActive =
            currentPageName === '/manufacture' ? 'active nav-link' : 'nav-link';

        const featureProjectActive =
            currentPageName === '/feature-project'
                ? 'nav-item nav-link dropdown-toggle'
                : 'nav-link nav-item dropdown-toggle';

        const isLoggedIn = this.state.loggedIn;
        let button;
        console.log(isLoggedIn);
        if (isLoggedIn) {
            button = (
                <LogoutButton
                    username={this.state.username}
                    customerID={this.state.customerID}
                    manufacturerID={this.state.manufacturerID}
                />
            );
        } else {
            button = <LoginButton onClick={this.props.onclick} />;
        }

        return (
            <div className="container">
                {console.log(this.props)}
                <nav className={navClassName} id="navbar">
                    <a className="navbar-brand no-bottom-border" href="/">
                        <span style={{ fontSize: '2rem', marginLeft: '2rem' }}>
                            MAKERKO
                        </span>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end">
                        <div style={{ color: 'white' }}>
                            <ul className="nav" style={{ color: 'white' }}>
                                <li>
                                    <Button
                                        btnName="Request for Quote"
                                        styleClass={navButton}
                                        visibility={
                                            currentPageName === '/new-quote'
                                                ? true
                                                : false
                                        }
                                        toggle="modal"
                                        target="#placeOrderModal"
                                    />
                                </li>
                                <li className="">
                                    <NavLink
                                        activeClassName="active"
                                        className="nav-link"
                                        style={{ color: 'white' }}
                                        to="/manufacturer-list"
                                    >
                                        Manufacturing Hubs
                                    </NavLink>
                                </li>

                                <li className="dropdown nav-item">
                                    <a
                                        className="nav-link"
                                        href="#"
                                        data-toggle="dropdown"
                                        style={{ color: 'white' }}
                                    >
                                        Feature Project
                                    </a>
                                    <ul className="dropdown-menu bg-primary">
                                        <li>
                                            <a
                                                className="dropdown-item  no-bottom-border"
                                                href="/feature-project"
                                            >
                                                List of Projects
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item  no-bottom-border"
                                                href="/feature"
                                            >
                                                {' '}
                                                Add a project
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown nav-item">
                                    <a
                                        className="nav-link"
                                        href="#"
                                        data-toggle="dropdown"
                                        style={{ color: 'white' }}
                                    >
                                        Knowledge Bank
                                    </a>
                                    <ul className="dropdown-menu bg-primary">
                                        <li>
                                            <a
                                                className="dropdown-item  no-bottom-border"
                                                href="/3d-printing"
                                            >
                                                {' '}
                                                3D PRINTING
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item  no-bottom-border"
                                                href="/vacuum-forming"
                                            >
                                                {' '}
                                                VACCUM FORMING
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="">
                                    <Link
                                        to="about"
                                        className="nav-link"
                                        activeClassName="active"
                                        spy={true}
                                        hashSpy={true}
                                        smooth={true}
                                        duration={500}
                                        offset={-80}
                                        style={{ color: 'white' }}
                                        onClick={(e) => {
                                            window.location.href = '/#about';
                                        }}
                                    >
                                        About Us
                                    </Link>
                                </li>

                                <li className="" style={{ color: 'white' }}>
                                    {button}
                                </li>
                            </ul>{' '}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default NavBar;
