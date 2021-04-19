import { imageOverlay } from 'leaflet';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import logo from '../assests/uk_aid.png';
import Data from './Data.json';

const styles = {
    height: '100px',
    width: '100px',
};
const Footer = () => {
    const [shadow, setShadow] = useState('1px 2px 5px	#A9A9A9');
    const [flag, setFlag] = useState(false);
    const onMouseEnter = () => {
        setShadow('1px 3px 20px	#A9A9A9');
        //setColor("rgb(240,240,240)");
    };
    const onMouseLeave = () => {
        setShadow('1px 2px 5px	#A9A9A9');
        //setColor("");
    };
    return (
        <footer
            id="about"
            className="bg-black"
            style={{ backgroundColor: 'rgba(16, 20, 10, 0.9)' }}
        >
            <div className="container  d-flex justify-content-center flex-column text-white ">
                <h1 className="text-primary  d-flex justify-content-center  pt-4">
                    ABOUT US
                </h1>
                <p className="footer-text" style={{ paddingLeft: '10px' }}>
                    The Makerko is a web of production platform, an online
                    marketplace that connects local producers and end-users.
                    End-users will have the ability to request the production of
                    a product via the platform.
                    <br /> This platform addresses local challenges in Nepal
                    around production, including: incorrect designs for
                    manufacturing, obtaining a workable prototype, lack of
                    access to design/manufacturing experts and marketing and
                    communication gaps.
                    <br /> The makerko platform will make the capabilities of
                    local producers more visible to consumers, as the producers
                    offer new products and innovations. Users will then have the
                    ability to upload a work order (with a product design if
                    applicable) and be connected with a local producer that will
                    execute the work order.
                    <br /> The platform also brings together idle machines,
                    decentralized technology tools, global and remote expertise,
                    diverse skill sets, and a growing supplier network, making
                    the product development process more reliable for consumers.
                </p>
            </div>

            <div className="container-fluid bg-black">
                <h2 className="text-primary  d-flex justify-content-center   pt-4 mb-4">
                    PARTNERS AND COLLABATORS
                </h2>
                <div className="row mt-4 pt-4 d-flex">
                    {console.log(Data)}
                    {Data.map((item) => (
                        <div className="col-md footer-column">
                            <a href={item.href} className="figure">
                                <img src={item.src} className="image-hover" />
                            </a>
                        </div>
                    ))}

                    {/* <div className="col-md footer-column">
                        <a href="https://medium.com/covidaction">
                            <img
                                src="/assests/covid_action.png"
                                className="githubIcon"
                                style={styles}
                            />
                        </a>
                    </div>{' '}
                    <div className="col-md footer-column">
                        <a href="https://medium.com/frontier-technologies-hub">
                            <img
                                src="/assests/forntier.png"
                                className="githubIcon"
                                style={styles}
                            />
                        </a>
                    </div>{' '}
                    <div className="col-md footer-column">
                        <a href="https://www.ukaiddirect.org/">
                            <img
                                src="/assests/uk_aid.png"
                                className="githubIcon"
                                style={styles}
                            />
                        </a>
                    </div>
                    <div className="col-md footer-column">
                        <a href="https://www.imcworldwide.com/">
                            <img
                                src="/assests/imc.png"
                                className="githubIcon"
                                style={styles}
                            />
                        </a>
                    </div> */}
                </div>
                <div className="row pt-5">
                    <div className="col-md-3 footer-column">
                        {/* <div className="logo text-center">
                          <img src={logo} className="" alt="logo" width="110" />
                      </div> */}
                    </div>

                    <div className="col-md-3 footer-column">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span className="footer-title">
                                    Capabilities
                                </span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    3D Printing
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    CNC Carving
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Laser Printing
                                </a>
                            </li>
                            {/* <li className="nav-item">
              <a className="nav-link" href="#">Frequently asked questions</a>
            </li> */}
                        </ul>
                    </div>
                    <div className="col-md-3 footer-column">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span className="footer-title">Materials</span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Mat One
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Mat Two
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Mat Three
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3 footer-column">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span className="footer-title">
                                    Contact & Support
                                </span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">
                                    <i className="fas fa-phone"></i>+97701546789
                                </span>
                            </li>
                            {/* <li className="nav-item">
              <a className="nav-link" href="#"><i className="fas fa-comments"></i>Live chat</a>
            </li> */}
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="fas fa-envelope"></i>Contact
                                    us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="fas fa-star"></i>Give feedback
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center">
                    <i className="fas fa-ellipsis-h"></i>
                </div>

                <div className="row text-center">
                    <div className="col-md-3 box">
                        <span className="copyright quick-links">
                            Copyright &copy; Your Website{' '}
                            {new Date().getFullYear()}
                        </span>
                    </div>
                    <div className="col-md-4 box offset-md-1">
                        <ul className="list-inline social-buttons">
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            {/*  <li className="list-inline-item">
              <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            </li> */}
                        </ul>
                    </div>
                    <div className="col-md-4 box">
                        <ul className="list-inline quick-links">
                            <li className="list-inline-item">
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">Terms of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
