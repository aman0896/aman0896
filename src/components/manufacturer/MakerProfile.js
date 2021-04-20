import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { GetCookiesInfo } from '../global/GlobalFunction';
import MfgProcessViewSelected from './MfgProcessViewSelected';
import './UserProfile.css';

const MakerProf = () => {
    const {
        email,
        userName,
        lastName,
        phoneNumber,
        manufacturerID,
        profileImage,
        contactPerson,
        Website,
        userStatus,
    } = GetCookiesInfo();

    const [error, setError] = useState();
    const [registeredHubs, setRegisteredHubs] = useState();
    const [serviceList, setServiceList] = useState([]);
    const [uploadedImage, setUploadedImage] = useState([]);
    const [currentHub, setCurrentHub] = useState();
    var [hubService, setHubService] = useState();
    const [imagePath, setImagePath] = useState();
    const [showAddField, setShowAddField] = useState(false);
    const [saveChangeButton, setSaveChangeButton] = useState(false);
    const [isExist, setIsExist] = useState(false);
    //#region get_service_data_from_db
    useEffect(() => {
        axios
            .post(`http://${window.host}/manufacturer/${manufacturerID}`)
            .then((response) => {
                if (response.data) {
                    const { hub, services } = response.data;
                    setCurrentHub(hub[0]);
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
                    // setSaveChangeButton(false);
                    const { fileName, filePath } = JSON.parse(hub[0].Logo);
                    setImagePath(filePath);
                }
            });
    }, []);
    //#endregion

    const onClickEditProfile = () => {
        window.location.href = `/${manufacturerID}/manufacturer-profile`;
    };

    var Image;
    if (profileImage) {
        Image = JSON.parse(profileImage);
    }

    useEffect(() => {
        if (profileImage) setUploadedImage(Image);
    }, []);

    return (
        <div className="container-fluid mb-5">
            <div className="row gutters container-border mx-5 p-4">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            {currentHub && (
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img src={imagePath} alt="" />
                                        </div>

                                        <h5 className="user-name">
                                            {currentHub.Company_Name}
                                        </h5>
                                    </div>
                                    <div class="about">
                                        <h5>Brief Description</h5>
                                        <p class="text-justify">
                                            {currentHub.Brief_Description}
                                        </p>
                                    </div>
                                    <div class="about">
                                        <h5>Additional Details</h5>
                                        <p class="text-justify">
                                            {currentHub.Additional_Details}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            {currentHub && (
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h3 className="mb-5 text-primary">
                                            My Account
                                        </h3>
                                        {/* <h5 className="mb-3 font-weight-bold">Profile</h5> */}
                                    </div>
                                    <div className="col-lg-6 mt-3">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-5">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Company Name :
                                                    </label>
                                                </div>
                                                <div className="col-7">
                                                    <p className="">
                                                        {
                                                            currentHub.Company_Name
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mt-3">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-5">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Company Status :
                                                    </label>
                                                </div>
                                                <div className="col-7">
                                                    <p>Individual</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-5">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Address :
                                                    </label>
                                                </div>
                                                <div className="col-7">
                                                    <p>Kathmandu</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-5">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Contact Person :
                                                    </label>
                                                </div>
                                                <div className="col-7">
                                                    <p>
                                                        {
                                                            currentHub.Contact_Person
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-5">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Phone Number :
                                                    </label>
                                                </div>
                                                <div className="col-7">
                                                    <p>
                                                        {
                                                            currentHub.Phone_Number
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-5">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Email :
                                                    </label>
                                                </div>
                                                <div className="col-7">
                                                    <p>{currentHub.Email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-2">
                                                    <label
                                                        className="font-weight-bold"
                                                        for="website"
                                                    >
                                                        Website :
                                                    </label>
                                                </div>
                                                <div className="col-7 ml-4">
                                                    <p>{currentHub.Website}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                                        <h3 className="mb-5 text-primary">
                                            Manufacturing Service
                                        </h3>
                                        {/* <h5 className="mb-3 font-weight-bold">Profile</h5> */}
                                    </div>
                                    {hubService && (
                                        <div
                                            className=""
                                            style={{ width: '100%' }}
                                        >
                                            <MfgProcessViewSelected
                                                viewsData={hubService}
                                                updateviewsData={(
                                                    updatedData
                                                ) => setHubService(updatedData)}
                                                deleteicon={false}
                                                profileEdit={true}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="row gutters mt-5">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div>
                                        <button
                                            type="button"
                                            id="submit"
                                            name="submit"
                                            className="btn btn-primary mr-2"
                                            onClick={onClickEditProfile}
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakerProf;
