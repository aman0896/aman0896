import axios from 'axios';
import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { GetCookiesInfo } from '../global/GlobalFunction';
import FormTextBox, { PasswordField } from '../global/TextBox';
import './UserProfile.css';
import { useHistory } from 'react-router';
import MfgProcessViewSelected from '../manufacturer/MfgProcessViewSelected';
import ManufacturerServiceSelect from './ManufacturerServiceSelect';
import {} from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

function EditManufacturerProfile(props) {
    const {
        email,
        userName,
        lastName,
        phoneNumber,
        manufacturerID,
        profileImage,
        contactPerson,
        userStatus,
    } = GetCookiesInfo();

    const history = useHistory();
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
    const { id } = props.match.params;

    //#region get_service_data_from_db
    useEffect(() => {
        axios.post(`${window.host}/manufacturer/${id}`).then((response) => {
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
                setSaveChangeButton(false);
                const { fileName, filePath } = JSON.parse(hub[0].Logo);
                setImagePath(filePath);
            }
        });
    }, []);
    //#endregion

    //#region show savechange button when service updated
    useEffect(() => {
        setSaveChangeButton(true);
    }, [hubService]);
    //#endregion

    console.log(registeredHubs, 'list', serviceList);
    var list;

    const handleOnchangeimage = (e) => {
        const formData = new FormData();
        const file = e.target.files;
        var data;

        formData.append('file', file[0]);
        formData.append('document', 'logo');
        formData.append('id', manufacturerID);
        console.log(file, formData);
        axios
            .post(`${window.host}/imageupload`, formData, {
                document: 'documents',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                // console.log(response.data);
                // document.cookie = `userInfo = ${JSON.stringify(
                //   response.data
                // )}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;

                if (response.data.msg) console.log(response.data.msg);
                else {
                    console.log(response.data);
                    data = JSON.stringify(response.data);
                    console.log(data);

                    axios
                        .post(`${window.host}/changeimage`, {
                            id: manufacturerID,
                            image: data,
                            userStatus: userStatus,
                        })
                        .then((response) => {
                            console.log(response.data);
                        });
                    const { fileName, filePath } = JSON.parse(data);
                    console.log(filePath);
                    setImagePath(filePath);
                }
            });
    };

    //#region show_service_addfield
    const onClickAddmore = () => {
        setShowAddField(!showAddField);
    };
    //#endregion

    //#region update_added_services_in_hubServices
    if (hubService)
        var services = hubService.filter((hubService) => hubService);
    const AddService = (data) => {
        var mateiralExist = false;
        var serviceExist = false;

        if (services.length > 0 && data) {
            services.map((service, index) => {
                if (
                    data.fabricationService.label ===
                    service.fabricationService.label
                ) {
                    serviceExist = true;
                    service.materialDetails.map((materialDetail) => {
                        if (
                            data.materialDetails[0].material.label ===
                            materialDetail.material.label
                        ) {
                            window.alert('Material Already Exist');
                            return (mateiralExist = true);
                        }
                    });
                    if (!mateiralExist) {
                        return (service.materialDetails = service.materialDetails.concat(
                            data.materialDetails[0]
                        ));
                    }
                }
            });
            if (!serviceExist) {
                services = services.concat(data);
            }
        } else {
            services = services.concat(data);
        }

        setIsExist(true);
        console.log(services);
        setHubService(services);
    };
    //#endregion

    //#region on Save Changes_Manufacturer_Services
    const OnSaveChange = () => {
        axios
            .post(`${window.host}/update-services/${id}`, {
                hubService: hubService,
            })
            .then((response) => {
                if (response.data) {
                    setSaveChangeButton(false);
                    console.log(response.data);
                    const { message } = response.data;
                    window.alert(message);
                }
            });
    };
    //#endregion

    return (
        <div className="container-fluid mb-5 p-5 border">
            <div className="row gutters container-border mx-5 p-4">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    {currentHub && (
                        <div className="card h-100 border-0">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile" id="image">
                                        <div className="user-avatar">
                                            <a
                                                aria-label="Change Profile Picture"
                                                className="change-pic"
                                            >
                                                <div
                                                    className="profile-pic"
                                                    style={{
                                                        backgroundImage: `url(${imagePath})`,
                                                        border:
                                                            '1px solid lightgray',
                                                    }}
                                                ></div>
                                                <div className="overlay">
                                                    <span
                                                        //href="#"
                                                        className="icon"
                                                        //title="User Profile"
                                                    >
                                                        <FontAwesomeIcon
                                                            //style={{ marginRight: 2 }}
                                                            icon={faCamera}
                                                            size="sm"
                                                        />
                                                        <input
                                                            className="avatar-file h-100 w-100"
                                                            type="file"
                                                            name="file"
                                                            onChange={
                                                                handleOnchangeimage
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                        <h5 className="user-name">
                                            {currentHub.Company_Name}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-body">
                            {currentHub && (
                                <Formik
                                    initialValues={{
                                        email: currentHub.Email,
                                        firstName: currentHub.Company_Name,
                                        contactPerson:
                                            currentHub.Contact_Person,
                                        phoneNumber: currentHub.Phone_Number,
                                        address: currentHub.Address,
                                    }}
                                    validate={(values) => {
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
                                        if (!values.contactPerson) {
                                            errors.contactPerson = 'Required';
                                        }
                                        if (!values.phoneNumber) {
                                            errors.phoneNumber = 'Required';
                                        }

                                        console.log(errors.firstName);
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            console.log('submit');
                                            axios
                                                .post(
                                                    `${window.host}/editManufacturerProfile`,
                                                    {
                                                        id: manufacturerID,
                                                        contactPerson:
                                                            values.contactPerson,
                                                        email: values.email,
                                                        phonenumber:
                                                            values.phoneNumber,
                                                    }
                                                )
                                                .then((response) => {
                                                    console.log(response.data);
                                                    history.push({
                                                        pathname:
                                                            '/manufacturer-profile',
                                                    });

                                                    window.location.reload();
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
                                            <h3 className="mb-2 text-primary">
                                                Basic Details
                                            </h3>
                                            <div className="row gutters">
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group no-bottom-border">
                                                        <label htmlFor="contactPerson">
                                                            Contact Person
                                                        </label>
                                                        <FormTextBox
                                                            type="text"
                                                            className="form-control"
                                                            name="contactPerson"
                                                            placeholder="Contact Person Name"
                                                            value={
                                                                values.contactPerson
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group no-bottom-border">
                                                        <label htmlFor="address">
                                                            Address
                                                        </label>
                                                        <FormTextBox
                                                            type="text"
                                                            className="form-control"
                                                            name="address"
                                                            placeholder="Enter Address"
                                                            value={
                                                                values.address
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group no-bottom-border">
                                                        <label htmlFor="PhoneNumber">
                                                            Phone Number
                                                        </label>
                                                        <FormTextBox
                                                            type="text"
                                                            className="form-control"
                                                            name="phoneNumber"
                                                            placeholder="Phone Number"
                                                            value={
                                                                values.phoneNumber
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group no-bottom-border">
                                                        <label htmlFor="email">
                                                            Email
                                                        </label>
                                                        <FormTextBox
                                                            type="email"
                                                            className="form-control"
                                                            name="email"
                                                            placeholder="Email"
                                                            value={values.email}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row gutters">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-right">
                                                    <div>
                                                        <button
                                                            // type="button"
                                                            type="submit"
                                                            name="submit"
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                            className="btn btn-primary mr-2"
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h3 className="mb-2 text-primary">
                                            Manufacturing Service
                                        </h3>
                                    </div>
                                </div>
                                {hubService && (
                                    <div className="">
                                        <MfgProcessViewSelected
                                            viewsData={hubService}
                                            updateviewsData={(updatedData) =>
                                                setHubService(updatedData)
                                            }
                                            profileEdit={true}
                                        />
                                    </div>
                                )}

                                <div className="row m-2 d-flex justify-content-end align-items-center">
                                    <span
                                        className="addmore-btn"
                                        onClick={onClickAddmore}
                                    >
                                        <FontAwesomeIcon
                                            className="mr-1"
                                            icon={faPlus}
                                        />
                                        Add more...
                                    </span>
                                </div>
                                <div
                                    className={
                                        showAddField
                                            ? 'addfield active'
                                            : 'addfield'
                                    }
                                >
                                    {hubService && (
                                        <ManufacturerServiceSelect
                                            getAddedService={AddService}
                                            profileEdit={true}
                                        />
                                    )}
                                    {hubService &&
                                        console.log('services', hubService)}
                                </div>
                            </div>

                            {saveChangeButton && (
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-right">
                                        <div>
                                            <button
                                                type="button"
                                                id="submit"
                                                name="submit"
                                                className="btn btn-primary mr-2"
                                                onClick={OnSaveChange}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-9 col-sm-9 col-9 mt-4">
                    <div className="card">
                        <div className="card-body">
                            {error && (
                                <div
                                    className="alert alert-warning"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            <Formik
                                initialValues={{
                                    old_password: '',
                                    new_password: '',
                                    confirm_password: '',
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.old_password) {
                                        errors.old_password = 'Required';
                                    }
                                    if (!values.new_password) {
                                        errors.new_password = 'Required';
                                    } else if (values.new_password.length < 6) {
                                        errors.new_password =
                                            'Password needs to be 6 characters or more';
                                    }
                                    if (!values.confirm_password) {
                                        errors.confirm_password = 'Required';
                                    } else if (
                                        values.confirm_password !==
                                        values.new_password
                                    ) {
                                        errors.confirm_password =
                                            'Password do not match';
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        console.log(values.email);
                                        axios
                                            .post(
                                                `${window.host}/change-password`,
                                                {
                                                    new_password:
                                                        values.new_password,
                                                    old_password:
                                                        values.old_password,
                                                    confirm_password:
                                                        values.confirm_password,
                                                    id: manufacturerID,
                                                    userStatus: userStatus,
                                                }
                                            )
                                            .then((response) => {
                                                if (response.data.message) {
                                                    setError(
                                                        response.data.message
                                                    );
                                                } else {
                                                    history.push({
                                                        pathname: '/',
                                                    });
                                                }
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
                                        <h3 className="mb-3 text-primary">
                                            Change Password
                                        </h3>
                                        <div className="row gutters">
                                            <div className=" col-6">
                                                <div className="form-group no-bottom-border">
                                                    <label htmlFor="currentPassword">
                                                        Current Password
                                                    </label>
                                                    <PasswordField
                                                        type="password"
                                                        placeholder="Current password"
                                                        name="old_password"
                                                    />
                                                </div>
                                            </div>
                                            <div className=" col-6"></div>
                                            <div className=" col-6">
                                                <div className="form-group no-bottom-border">
                                                    <label htmlFor="newPassword">
                                                        New Password
                                                    </label>
                                                    <PasswordField
                                                        type="password"
                                                        placeholder="New password"
                                                        name="new_password"
                                                    />
                                                </div>
                                            </div>{' '}
                                            <div className=" col-6">
                                                <div className="form-group no-bottom-border">
                                                    <label htmlFor="newPassword">
                                                        Confirm Password
                                                    </label>
                                                    <PasswordField
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        name="confirm_password"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row gutters">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="btn btn-primary mr-2 float-right"
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 col-sm-12 col-12 mt-4">
                    <div className="card">
                        {currentHub && (
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    briefDescriptiom:
                                        currentHub.Brief_Description,
                                    additionalDetails:
                                        currentHub.Additional_Details,
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.briefDescriptiom) {
                                        errors.briefDescriptiom = 'Required';
                                    }
                                    if (!values.additionalDetails) {
                                        errors.additionalDetails = 'Required';
                                    }
                                    console.log(errors);
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        axios
                                            .post(
                                                `${window.host}/update-details`,
                                                {
                                                    briefDescriptiom:
                                                        values.briefDescriptiom,
                                                    additionalDetails:
                                                        values.additionalDetails,

                                                    id: manufacturerID,
                                                }
                                            )
                                            .then((response) => {
                                                {
                                                    history.push({
                                                        pathname:
                                                            '/manufacturer-profile',
                                                    });
                                                }
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
                                        <div className="card-body">
                                            <h3 className="mb-3 text-primary">
                                                Brief Description
                                            </h3>
                                            <div className="row gutters">
                                                <div className="col-12">
                                                    <div className="form-group no-bottom-border">
                                                        <textarea
                                                            type="text"
                                                            className="form-control"
                                                            rows="4"
                                                            placeholder="Brief Description"
                                                            name="briefDescriptiom"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                values.briefDescriptiom
                                                            }
                                                        ></textarea>
                                                    </div>
                                                    <div
                                                        className="text-danger"
                                                        style={{
                                                            fontSize: '10pt',
                                                        }}
                                                    >
                                                        {errors.briefDescriptiom &&
                                                            touched.briefDescriptiom &&
                                                            errors.briefDescriptiom}
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="mb-3 text-primary">
                                                Additional Details
                                            </h3>
                                            <div className="row gutters">
                                                <div className="col-12">
                                                    <div className="form-group no-bottom-border">
                                                        <textarea
                                                            type="text"
                                                            className="form-control"
                                                            rows="4"
                                                            placeholder="Additional Details"
                                                            name="additionalDetails"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                values.additionalDetails
                                                            }
                                                        ></textarea>
                                                    </div>
                                                    <div
                                                        className="text-danger"
                                                        style={{
                                                            fontSize: '10pt',
                                                        }}
                                                    >
                                                        {errors.additionalDetails &&
                                                            touched.additionalDetails &&
                                                            errors.additionalDetails}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row gutters">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-right">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary mr-2"
                                                        disabled={isSubmitting}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        )}
                    </div>
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center mt-4">
                    <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn cancel-btn btn-primary"
                        onClick={() => {
                            window.location.href = '/manufacturer-profile';
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditManufacturerProfile;
