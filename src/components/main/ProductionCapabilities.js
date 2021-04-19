import React, { Component } from 'react';
import logo from '../assests/3dprinting.jpg';
import logo1 from '../assests/lasercutting.jpg';
import logo2 from '../assests/CNC.png';
import logo3 from '../assests/vacuum_forming.jpg';
import './technology.css';

function KnowledgeBankViewLeft({ title, info, image }) {
    return (
        <div
            className="col-sm-3 ml-5 mb-3 mt-4 pt-2 pb-2 border border-white"
            style={{ borderRadius: '5px' }}
        >
            <h4 className="text-primary">{title}</h4>
            <p
                className="lead"
                style={{
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.699)',
                }}
            >
                {info}
            </p>

            <img
                src={image}
                alt=""
                style={{
                    height: '40%',
                    width: '100%',
                    objectFit: 'cover',
                    marginBottom: '10px',
                }}
            />
        </div>
    );
}

function ViewDown({ title, info, image }) {
    return (
        <div
            className="col-lg-3 ml-5 mb-3 mt-4 pt-2 pb-2 border border-white"
            style={{ borderRadius: '5px' }}
        >
            <h4 className="text-primary">{title}</h4>
            <p
                className="lead"
                style={{
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.699)',
                }}
            >
                {info}
            </p>

            <img
                src={image}
                alt=""
                style={{
                    height: '40%',
                    width: '100%',
                    objectFit: 'cover',
                    marginBottom: '10px',
                }}
            />
        </div>
    );
}

class ProductionCapabilities extends Component {
    render() {
        return (
            <div className="container  pt-4 pb-4">
                <div
                    // id="knowledgeBank"
                    className="row  d-flex justify-content-center"
                    style={{ color: 'rgba(255, 255, 255, 0.699)' }}
                >
                    <div
                        className="row m-auto pb-2 d-flex justify-content-center"
                        style={{ width: '100%' }}
                    >
                        <div className="text-primary text-wrap">
                            <span style={{ fontSize: '2.5rem' }}>
                                {'Production Capabilities'}
                            </span>
                        </div>
                    </div>
                    <KnowledgeBankViewLeft
                        title="3D Printing"
                        info={
                            <span>
                                Rapid prototyping and customized product
                                development made easy with additive
                                manufacturing.
                                <br /> <br />
                                
                                <div className="text-primary">
                                    #Medical #Dental #IndustrialProduct
                                    #Prototyping #Architecture #Art&Craft
                                </div>
                            </span>
                        }
                        image={logo}
                    />
                    <KnowledgeBankViewLeft
                        title="LASER Cutting"
                        info={
                            <span>
                                For precision 2D profile cutting, template and
                                decoration items.
                                <br />
                                <br />
                                <br />
                                <br /> <br />
                                
                                <div className="text-primary">
                                    #Signage #Garment #Architecture #Art&Craft{' '}
                                </div>
                            </span>
                        }
                        image={logo1}
                    />
                    <KnowledgeBankViewLeft
                        title="Plasma Cutting"
                        info={
                            <span>
                                Quick and simple way to cut any metal that
                                conducts electricity such as steel, stainless
                                steel, aluminium, copper, brass and other
                                conductive metals.
                                <br />
                                <br />
                                <div className="text-primary">
                                    #Signage #MetalCut #Engineering
                                    #Construction
                                </div>{' '}
                            </span>
                        }
                        image={logo2}
                    />{' '}
                    <KnowledgeBankViewLeft
                        title="CNC Carving"
                        info={
                            <span>
                                Effective both for 2D and 3D model making in
                                versatile materials - wood, composite, metal and
                                styrofoam.
                                <br />
                                <br />
                                <div className="text-primary">
                                    #Furniture #Signage #Interior #Decoration
                                    #Architecture #Prototyping
                                </div>
                            </span>
                        }
                        image={logo3}
                    />
                    <KnowledgeBankViewLeft
                        title="Vacuum Forming"
                        info={
                            <span>
                                Multiply your product from one to many with
                                affordable custom molds.
                                <br />
                                <br />
                                <br />
                                <div className="text-primary">
                                    {' '}
                                    #ChocolateMold #Art&Craft #Packaging
                                    <br />
                                </div>
                                <br />
                            </span>
                        }
                        image={logo3}
                    />
                </div>
                <div
                    className="row m-auto pb-2 d-flex justify-content-center"
                    style={{ width: '100%' }}
                >
                    <div className="text-primary">
                        <span style={{ fontSize: '1.5rem' }}>
                            Other Local manufacturing:
                        </span>
                    </div>
                    <div className="text-primary">
                        <span style={{ fontSize: '1.5rem' }}>
                            Injection Molding / Tool and Die Making / Casting /
                            Metal Fabrication / Wood Working
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductionCapabilities;
