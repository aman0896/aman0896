import { rgbToHex } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './card.css';

const CardView = (props) => {
    const [shadow, setShadow] = useState('1px 2px 5px	#A9A9A9');
    const [services, setServices] = useState();

    const onMouseEnter = () => {
        setShadow('1px 3px 20px	#A9A9A9');
        //setColor("rgb(240,240,240)");
    };
    const onMouseLeave = () => {
        setShadow('1px 2px 5px	#A9A9A9');
        //setColor("");
    };

    const onCardSelect = (index, currentHub) => {
        props.setSelected(index);
        props.getSelectedHub(currentHub);
    };

    const GetLogo = (Logo) => {
        if (Logo) {
            const { fileName, filePath } = JSON.parse(Logo);
            return filePath;
        }
    };

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-hub-services', {
                hubID: props.currentHub.Manufacturer_ID,
            })
            .then((response) => {
                if (response) {
                    var hubService = response.data;
                    setServices(hubService);
                }
            });
    }, [props]);

    const GetHubServices = (hubID) => {
        if (services) {
            var service = services.map((service) => {
                const { Name, Manufacturer_ID } = service;
                if (hubID == Manufacturer_ID) {
                    return Name + ', ';
                }
            });
            return <span>{service}</span>;
        }
    };

    return (
        <div>
            <Card
                onClick={() =>
                    onCardSelect(props.currentIndex, props.currentHub)
                }
                className="m-2"
                style={{ padding: 10 }}
                style={{
                    fontFamily: 'Roboto',
                    boxShadow: shadow,
                    height: '300px',
                    width: '230px',
                    backgroundColor: 'rgb(240,240,240)',
                    cursor: 'pointer',
                    borderColor: props.selected ? '#44aadd' : '',
                    borderWidth: props.selected ? '3px' : '',
                }}
                onMouseEnter={() => onMouseEnter()}
                onMouseLeave={() => onMouseLeave()}
            >
                <Card.Img
                    variant="top"
                    src={GetLogo(props.currentHub.Logo)}
                    style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                    }}
                />
                <div
                    className="d-inline-block text-truncate p-2"
                    style={{ height: '500px' }}
                >
                    <Card.Title
                        className="text-primary mb-2"
                        style={{ fontWeight: 'bold' }}
                    >
                        {props.currentHub.Company_Name}
                        <div className="border border-top border-3 mb-1" />
                    </Card.Title>
                    <Card.Subtitle
                        style={{ fontSize: '12px', marginBottom: '5pt' }}
                    >
                        {props.currentHub.Address}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: '15px', color: 'black' }}>
                        <span style={{ fontWeight: 'bold' }}>Services</span>
                        <div style={{ fontSize: '12px' }}>
                            {GetHubServices(props.currentHub.Manufacturer_ID)}
                        </div>
                    </Card.Text>
                </div>
                <span className=" m-2 d-flex justify-content-center">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                            props.visitProfile(props.currentHub, services)
                        }
                    >
                        Visit Profile
                    </button>
                </span>
            </Card>
        </div>
    );
};

export default CardView;

export const ManufacturingHubListView = (props) => {
    //const [services, setServices] = useState();
    //#endregion manufacturerInfo
    var services = [];
    var hubName = '';
    var hubID = '';
    var email = '';
    var briefDetail = '';
    var manufacturingServices = '';
    var materialList = '';
    var FileName = '';
    var FilePath = '';
    if (props.registeredHub && props.serviceList && props.materialList) {
        var files = JSON.parse(props.registeredHub.Logo);
        FileName = files.fileName;
        FilePath = files.filePath;
        hubID = props.registeredHub.Manufacturer_ID;
        hubName = props.registeredHub.Name;
        email = props.registeredHub.Email;
        //#region get_service_list
        props.serviceList.forEach((service) => {
            if (hubID == service.Manufacturer_ID) {
                services = services.concat(service);
                manufacturingServices += service.Name + ',';
            }
        });
        var sn = manufacturingServices.lastIndexOf(',');
        manufacturingServices = manufacturingServices.substring(0, sn);
        //#endregion

        //#region get_material_list
        console.log('material', props.serviceList, 'ss', props.materialList);
        props.materialList.map((materialDetails) => {
            console.log('md', materialDetails);
            materialList +=
                materialDetails.selectedMaterial.Material_Name + ',';
        });

        var mn = materialList.lastIndexOf(',');

        materialList = materialList.substring(0, mn);
        //#endregion

        briefDetail = props.registeredHub.Brief_Description;
    }
    //#endregion
    if (props.registeredHub) {
        hubName = props.registeredHub.Company_Name;
    }
    var dateObj;
    var dateString;
    //console.log(props.registeredHub.Logo);
    // var files = JSON.parse(props.registeredHub.Logo);
    // var FileName = files[0].fileName;
    // var FilePath = files[0].filePath;

    return (
        <div className="style">
            {props.registeredHub && (
                <div
                    className="col-xs p-2"
                    key={props.registeredHub.Manufacturer_ID}
                >
                    <div
                        className="card"
                        style={{
                            width: '300px',
                            height: '450px',
                            borderRadius: '5px',
                            boxShadow: '2px 2px 2px	#A9A9A9',
                        }}
                    >
                        <img
                            className="card-img-top"
                            src={FilePath}
                            alt={FileName}
                            style={{
                                width: '100%',
                                height: '180px',
                                objectFit: 'cover',
                                borderTopLeftRadius: '5px',
                            }}
                        />
                        <div
                            className="p-2"
                            style={{
                                maxHeight: '250px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            <div className="card-title">{hubName}</div>
                            <div className="email">{email}</div>
                            <div className="date">
                                {
                                    ((dateObj = new Date()),
                                    (dateString = dateObj.toLocaleDateString()))
                                }
                            </div>
                            <div className="hr-line" />
                            <div className="body-view">
                                <div className="sub-title">Process:</div>
                                <div className="body-text">
                                    {manufacturingServices}
                                </div>
                                <div className="sub-title">Material:</div>
                                <div className="material-title">
                                    <div className="body-text">
                                        {materialList}
                                    </div>
                                </div>
                                <div className="sub-title">
                                    Brief introduction of the company:
                                </div>
                                <div className="body-text">{briefDetail}</div>
                            </div>
                        </div>
                        {/* <span id="readmore">
                            <span
                                className="text-primary"
                                href=""
                                onClick={() =>
                                    props.readMore(
                                        props.registeredHub,
                                        services
                                    )
                                }
                            >
                                {'Read More..>>'}
                            </span>
                        </span> */}
                        <div
                            className="p-2 readmore-div"
                            onClick={() =>
                                props.readMore(props.registeredHub, services)
                            }
                        >
                            <span
                                id="readmore"
                                //className="text-primary"
                            >
                                {'Read More'}
                            </span>
                            <span className="mt-1 ml-1">
                                {' '}
                                <i className="fas fa-angle-double-right fa-1x"></i>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
