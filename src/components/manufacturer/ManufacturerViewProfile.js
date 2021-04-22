import React, { Component, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faEnvelope,
    faMapMarker,
    faUser,
    faChevronRight,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faChrome } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import StarRating, {
    AverageRatingNum,
    OverallRatings,
    StarRatingAverage,
    TotalRatings,
} from '../starrating/StarRating';
import { OtherServices } from './OtherServices';
import MfgProcessViewSelected from './MfgProcessViewSelected';

function ManufacturerViewProfile(props) {
    const [data, setData] = useState();
    const [serviceList, setServiceList] = useState([]);
    const [filePath, setFilePath] = useState();
    const [averageRating, setAverageRating] = useState();
    const [totalRatings, setTotalRatings] = useState();
    const [overallRatingArray, setOverallRatingArray] = useState();
    const [otherServices, setOtherServices] = useState([]);
    const { id } = props.match.params;

    var [hubService, setHubService] = useState();

    useEffect(() => {
        axios.post(`${window.host}/manufacturer/${id}`).then((response) => {
            if (response.data) {
                const { hub, services } = response.data;
                setData(hub[0]);
                setServiceList(services);
                if (hub[0].Other_Services) {
                    setOtherServices(JSON.parse(hub[0].Other_Services));
                }

                const { fileName, filePath } = JSON.parse(hub[0].Logo);
                setFilePath(filePath);
            }
        });
    }, []);

    useEffect(() => {
        axios.post(`${window.host}/manufacturer/${id}`).then((response) => {
            if (response.data) {
                const { hub, services } = response.data;
                // setCurrentHub(hub[0]);
                const hubService = services.map((service) => {
                    console.log(service);
                    const { Name, Material_Name, Service_ID } = service;
                    var data = {
                        fabricationService: {
                            value: Service_ID,
                            label: Name,
                        },
                        materialDetails: JSON.parse(Material_Name),
                    };
                    return data;
                });
                setHubService(hubService);
            }
        });
    }, []);

    //#region view_otherservices
    const otherServiceList = otherServices.map((otherService, index) => {
        const serviceName = otherService.serviceName;
        const materials = otherService.materials;
        return (
            <div key={index} className="pl-4">
                <ul
                    className="p-1 m-0 text-primary"
                    style={{ listStyle: 'none' }}
                >
                    <li>
                        <OtherService
                            service={serviceName}
                            materials={materials}
                        />
                    </li>
                </ul>
            </div>
        );
    });
    //#endregion

    var src = '';
    var services = serviceList.map((service, index) => {
        const { Name } = service;
        if (Name === 'CNC Carving') {
            src = '/Service/CNCCarving.jpg';
        } else if (Name === '3D Printing') {
            src = '/Service/3dprinting.jpg';
        } else if (Name === 'Laser Cutting') {
            src = '/Service/LaserCutting.jpg';
        }

        return (
            <div key={index}>
                <div className="col">
                    <span className="mt-2 text-light">
                        <img
                            src={src}
                            style={{
                                width: '140px',
                                height: '140px',
                                borderStyle: 'solid',
                                borderColor: 'lightblue',
                                borderWidth: '2px',
                                borderRadius: '5px',
                            }}
                            alt=""
                        />
                        <h6
                            className="p-2"
                            style={{
                                backgroundColor: 'grey',
                                borderRadius: '5px',
                                width: '140px',
                                textAlign: 'center',
                            }}
                        >
                            {Name}
                        </h6>
                    </span>
                </div>
            </div>
        );
    });

    return (
        <>
            {data && filePath && (
                <div style={{ backgroundColor: 'lightgray' }}>
                    <div
                        className="pt-3 mt-3 d-flex justify-content-center"
                        style={{
                            backgroundColor: 'white',
                            boxShadow: '1px 2px 2px	#A9A9A9',
                        }}
                    >
                        <div
                            className="d-flex align-items-end pb-3"
                            style={{
                                backgroundImage: 'url(/coverpic.png)',
                                height: '400px',
                                width: '70rem',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div
                                className="container"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div
                                            style={{
                                                width: '150px',
                                                height: '130px',
                                            }}
                                        >
                                            <img
                                                src={filePath}
                                                style={{
                                                    width: '150px',
                                                    height: '130px',
                                                }}
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-sm text-white d-flex align-items-center">
                                            <h1>{data.Company_Name}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="mt-3 m-2">
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '100px',
                                    backgroundColor: 'white',
                                    borderRadius: '5px',
                                    boxShadow: '1px 2px 2px	#A9A9A9',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <div>
                                    <StarRatingView
                                        averageRating={averageRating}
                                        totalRatings={totalRatings}
                                    />
                                </div>

                                <div>
                                    <div
                                        className="row d-flex justify-content-center"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        Delivery:
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        Within 20km
                                    </div>
                                </div>
                                <div className="mr-2">
                                    <div
                                        className="row d-flex justify-content-center"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        Location:
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        {data.Address}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row m-auto">
                            <div className="col-lg-4 m-2">
                                <div className="row">
                                    <div
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            boxShadow: '1px 2px 2px	#A9A9A9',
                                        }}
                                    >
                                        <div className="row m-auto">
                                            <h4 className="text-dark pl-3 pt-3 font-weight-bold">
                                                Fabrication Services
                                            </h4>
                                        </div>
                                        <div className="row pb-2 d-flex justify-content-center">
                                            {services}
                                        </div>
                                    </div>
                                </div>
                                {otherServices.length > 0 && (
                                    <div className="row mt-3">
                                        <div
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                backgroundColor: 'white',
                                                borderRadius: '5px',
                                                boxShadow: '1px 2px 2px	#A9A9A9',
                                                paddingBottom: 5,
                                            }}
                                        >
                                            <div className="row m-auto">
                                                <h4 className="text-dark pl-3 pt-3 font-weight-bold">
                                                    Other Services:
                                                </h4>
                                            </div>

                                            <div className="row m-auto d-flex flex-column">
                                                {otherServiceList}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="row mt-3">
                                    <div
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            boxShadow: '1px 2px 2px	#A9A9A9',
                                        }}
                                    >
                                        <div className="row m-auto pl-3 pt-3">
                                            <h4 className="font-weight-bold">
                                                Contact Information
                                            </h4>
                                        </div>
                                        <ContactInformationView
                                            icon={faPhone}
                                            label="Phone"
                                            info={data.Phone_Number}
                                        />
                                        <ContactInformationView
                                            icon={faEnvelope}
                                            label="Email"
                                            info={data.Email}
                                        />
                                        <ContactInformationView
                                            icon={faChrome}
                                            label="Website"
                                            info="www.promechminds.com"
                                        />
                                        <ContactInformationView
                                            icon={faMapMarker}
                                            label="Location"
                                            info={data.Address}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg mt-2 m-2">
                                <div className="row">
                                    <div
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            boxShadow: '1px 2px 2px	#A9A9A9',
                                        }}
                                    >
                                        <h4 className="text-dark pl-3 pt-3 font-weight-bold">
                                            About {data.Company_Name}
                                        </h4>
                                        <p
                                            className="pl-3 pr-3 pb-3"
                                            style={{
                                                fontSize: 14,
                                                textAlign: 'justify',
                                            }}
                                        >
                                            {data.Brief_Description}
                                        </p>
                                    </div>
                                </div>
                                <div className="row border mt-3">
                                    <div
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            boxShadow: '1px 2px 2px	#A9A9A9',
                                        }}
                                    >
                                        <div className="mb-3">
                                            <h4 className="text-dark pl-3 pt-3 font-weight-bold m-0">
                                                Manufacturing Services
                                            </h4>
                                        </div>
                                        {hubService && (
                                            <div
                                                className=""
                                                style={{ width: '100%' }}
                                            >
                                                <MfgProcessViewSelected
                                                    viewsData={hubService}
                                                    deleteicon={false}
                                                    profileEdit={true}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="row border mt-3">
                                    <div
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            boxShadow: '1px 2px 2px	#A9A9A9',
                                        }}
                                    >
                                        <div className="mb-3">
                                            <h4 className="text-dark pl-3 pt-3 font-weight-bold m-0">
                                                Rate this Manufacturing Hub
                                            </h4>
                                            <span
                                                className="text-secondary pl-3 pt-3"
                                                style={{ fontSize: '16px' }}
                                            >
                                                Tell others what you think
                                            </span>
                                        </div>
                                        <div className="pl-3 pr-3 pb-3 d-flex justify-content-center">
                                            <StarRating
                                                widgetDimensions="35px"
                                                widgetSpacing="25px"
                                                setAverageRating={
                                                    setAverageRating
                                                }
                                                setTotalRatings={
                                                    setTotalRatings
                                                }
                                                overallRatingArray={
                                                    setOverallRatingArray
                                                }
                                            />
                                        </div>

                                        {/* <div>
                                            <div>
                                                <h4 className="text-dark pl-3 pt-3 font-weight-bold m-0">
                                                    Ratings
                                                </h4>
                                            </div>

                                            <div className="row m-2 p-3 d-flex align-items-center">
                                                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                                                    <div
                                                        className="row p-0"
                                                        style={{
                                                            fontSize: '4rem',
                                                        }}
                                                    >
                                                        <AverageRatingNum
                                                            averageRating={
                                                                averageRating
                                                            }
                                                        />
                                                    </div>
                                                    <div className="row">
                                                        <StarRatingAverage
                                                            averageRating={
                                                                averageRating
                                                            }
                                                            widgetDimensions="15px"
                                                            widgetSpacing="20px"
                                                        />
                                                    </div>
                                                    <div className="row">
                                                        <TotalRatings
                                                            totalRatings={
                                                                totalRatings
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <OverallRatings
                                                        overallRatingArray={
                                                            overallRatingArray
                                                        }
                                                        totalRatings={
                                                            totalRatings
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ManufacturerViewProfile;

const ContactInformationView = ({ icon, label, info }) => {
    return (
        <>
            <div className="row m-auto pl-3">
                <span className="col-1">
                    <FontAwesomeIcon icon={icon} size="1x" />
                </span>
                <span className="col font-weight-bold" style={{ fontSize: 18 }}>
                    {label}
                </span>
            </div>
            <div className="row m-auto pl-3 pb-2">
                <span className="ml-5 text-primary">{info}</span>
            </div>
        </>
    );
};

const StarRatingView = ({ averageRating = 4.2, totalRatings = 123456789 }) => {
    //const averageRating = 2;
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    style={{
                        display: 'flex',
                        backgroundColor: 'goldenrod',
                        borderRadius: '50%',
                        height: '60px',
                        width: '60px',
                        position: 'absolute',
                        zIndex: 1,
                        fontSize: '26px',
                        fontWeight: 'bold',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black',
                    }}
                >
                    <AverageRatingNum averageRating={averageRating} />
                </div>
                <div>
                    <div
                        className="ml-3"
                        style={{
                            backgroundColor: 'white',
                            borderTopRightRadius: '50px',
                            borderBottomRightRadius: '50px',
                            height: '40px',
                            width: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            paddingRight: 15,
                            border: '2px solid goldenrod',
                        }}
                    >
                        <StarRatingAverage
                            averageRating={averageRating}
                            widgetDimensions="20px"
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            fontSize: '14px',
                            width: '200px',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <TotalRatings totalRatings={totalRatings} />
                    </div>
                </div>
            </div>
        </>
    );
};

const OtherService = ({ service, materials }) => {
    const [visibleMaterial, setVisibleMaterial] = useState(false);

    const onClickChevron = () => {
        setVisibleMaterial(!visibleMaterial);
    };

    const chaveronToggleOn = {
        marginRight: 5,
        transition: 'all 0.5s ease',
        transform: 'rotate(90deg)',
    };

    const chaveronToggleOff = {
        marginRight: 5,
        transition: 'all 0.5s ease',
    };

    return (
        <div>
            <span>
                <FontAwesomeIcon
                    style={
                        visibleMaterial ? chaveronToggleOn : chaveronToggleOff
                    }
                    icon={faChevronRight}
                    onClick={() => onClickChevron()}
                    size="sm"
                />
                {service}
            </span>

            {visibleMaterial && (
                <ul
                    className="pl-5"
                    style={{
                        fontSize: '14px',
                        color: 'black',
                    }}
                >
                    {materials.map((material, index) => {
                        return <li key={index}>{material}</li>;
                    })}
                </ul>
            )}
        </div>
    );
};
