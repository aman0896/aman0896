import React, { Component } from 'react';
import './homePage.css';
import logo from '../assests/logo.jpg';
import Button from '../global/Button';
import Technology from './technology';
import About from './aboutUs';
import { Link } from 'react-router-dom';
//import Technology from "./technology";
import Cookies from 'universal-cookie';
import onGetInstantBtnClick from '../global/GlobalFunction';
import { Overlay } from 'react-bootstrap';
import Footer from './footer';
import ProductionCapabilities from './ProductionCapabilities';

const cookies = new Cookies();

class HomePage extends Component {
    state = {
        showModal: '',
    };
    render() {
        return (
            <div className="view">
                <div
                    style={{
                        backgroundImage: 'url(/landingpage_image/homepage.jpg)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{
                            backgroundColor: 'rgba(16, 14, 10, 0.9)',
                            width: '100%',
                            height: '100vh',
                            //paddingTop: "80px"
                        }}
                    >
                        <div className="mb-3" style={titleStyle}>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="mt-3 mb-3 " style={textStyle}>
                            <p>
                                A web of production platform, an online
                                marketplace that connects local producers and
                                end-users. End-users will have the ability to
                                request the production of a product via the
                                platform.
                            </p>
                        </div>

                        <div className="mt-3 mb-3">
                            <Button
                                btnName="Request for Quote"
                                styleClass="btn btn-primary btn-lg d-flex justify-content-center"
                                toggle="modal"
                                target={this.state.showModal}
                                onClick={() =>
                                    this.setState({
                                        showModal: onGetInstantBtnClick(),
                                    })
                                }
                            />
                        </div>
                        <div className="mt-3" style={textStyle}>
                            <p>
                                {' '}
                                Hundreds of local makers with amazing
                                manufacturing resources are waiting for your
                                order. Do you have something cool to make it
                                locally?
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="container-fluid"
                    id="knowledgeBank"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
                >
                    <ProductionCapabilities />
                    <div className="d-flex justify-content-center pb-5">
                        <Button
                            btnName="Visit Knowledge Bank "
                            styleClass="btn btn-primary btn-lg d-flex justify-content-center"
                            toggle="modal"
                            target={this.state.showModal}
                            onClick={() =>
                                (window.location.href = '/knowledgebank1')
                            }
                        />
                    </div>
                </div>

                <div
                    className="d-flex flex-column "
                    style={{
                        // backgroundColor: "rgba(0, 0, 0, 0.9)",
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'rgba(30, 24, 31, 0.9)',
                            paddingTop: '20px',
                        }}
                    >
                        <div className="container-fluid row">
                            <div className="pl-3">
                                <p className="text">
                                    Explore our manufacturing hubs to select
                                    from the portfolio of local makers. Users
                                    can sort and filter makers by their
                                    preferred company name, manufacturing
                                    process, material and location. Users know
                                    makers’ production capabilities, products,
                                    services, materials and rates by visiting
                                    their portfolio.
                                </p>{' '}
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mt-4 mb-4">
                            <Button
                                btnName="Explore Manufacturing Hubs"
                                styleClass="btn btn-primary btn-lg"
                                onClick={() =>
                                    (window.location.href = '/manufacturer')
                                }
                            />
                            {/* <div className="mt-5">
              <Link
                to="/manufacturer-signup"
                style={{ textDecoration: "underline" }}
                className="mt-5"
              >
                Are you a Maker? Sign Up to build your portfolio.
              </Link>
            </div> */}
                        </div>
                        <Link
                            to="/manufacturer-signup"
                            className="d-flex justify-content-center pr-5 text-primary pb-4"
                            style={{
                                textDecoration: 'underline',
                                color: '#0069d9',

                                fontSize: '20px',
                                fontStyle: 'italic',
                            }}
                        >
                            Are you a Maker? Sign Up to build your portfolio
                        </Link>
                    </div>
                    <div style={{ backgroundColor: 'rgba(16, 14, 40, 0.9)' }}>
                        <div className="container-fluid row">
                            <div className="mt-4 pl-3">
                                <p className="text">
                                    Share what you make. Someone might be in
                                    need of it. The Makerko platform provides
                                    makers and innovators greater visibility to
                                    their business and product ideas. Explore
                                    featured projects to learn how local
                                    innovators and makers are applying
                                    manufacturing technologies to bring good to
                                    humanity.
                                </p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <Button
                                btnName="View Featured Projects"
                                styleClass="btn btn-primary btn-lg"
                                onClick={() =>
                                    (window.location.href = '/feature-project')
                                }
                            />
                        </div>
                        <Link
                            to="/feature"
                            className="d-flex justify-content-center pr-5 text-primary pb-4 pt-4"
                            style={{
                                textDecoration: 'underline',
                                color: '#0069d9',

                                fontSize: '20px',
                                fontStyle: 'italic',
                            }}
                        >
                            Share your innovation/product/project to feature in
                            our platform
                        </Link>
                        {/* <Link
                        to="/manufacturer-signup"
                        className="d-flex justify-content-center mt-3 text-primary"
                        style={{
                            textDecoration: 'underline',
                            //color: "#0069d9",
                            // marginLeft: "100px",
                            fontSize: '20px',
                            fontStyle: 'italic',
                        }}
                    >
                        Learn How to place orders
                    </Link> */}
                        <div className="pt-4"></div>
                    </div>
                </div>
                <Footer></Footer>

                {/* <div className="container-fluid">
          <About />
        </div> */}
            </div>
        );
    }
}

export default HomePage;

const titleStyle = {
    color: 'rgba(255, 255, 255, 0.699)',
};

const textStyle = {
    color: 'rgba(255, 255, 255, 0.699)',
    width: '70%',
    lineHeight: 2,
    fontSize: '120%',
    textAlign: 'center',
};
