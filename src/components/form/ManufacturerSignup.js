import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import MfgProcessViewSelected, {
    ExpandTable,
} from '../manufacturer/MfgProcessViewSelected';
import ManufacturerServiceSelect from '../manufacturer/ManufacturerServiceSelect';
import FormTextBox from '../global/TextBox';
import DropDown from '../global/DropDown';
import OtherService from '../manufacturer/OtherServices';
import Location from '../manufacturer/Location';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

class ManufacturerSignup extends Component {
    state = {
        manufacturerType: '',
        mfgProcessData: [],
        alreadyExist: false,
        error: '',
        uploadedFiles: [],
        uploadedLogo: [],
        briefDescription: '',
        otherServices: undefined,
        latlngPosition: undefined,
        additionalDetail: '',
    };
    handleOnchange = (e) => {
        const formData = new FormData();
        const file = e.target.files;
        var document = 'documents';

        formData.append('file', file[0]);
        formData.append('document', 'documents');
        axios
            .post(`http://${window.host}/imageupload`, formData, {
                document: 'documents',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if (response.data.msg) console.log(response.data.msg);
                else {
                    console.log(response.data);
                    var data = JSON.stringify(response.data);
                    //var int = typeof data;
                    //console.log(data, typeof data);
                    this.setState({ uploadedFiles: data });
                }

                // this.setState({
                //   uploadedFiles: [...this.state.uploadedFiles, data],
                // });

                // this.setState({
                //   fileName: response.data.fileName,
                //   filePath: response.data.filePath,
                // });
            });
    };

    handleOnchangeLogo = (e) => {
        const formData = new FormData();
        const file = e.target.files;
        var document = 'documents';

        formData.append('file', file[0]);
        formData.append('document', 'logo');
        console.log(file, formData);
        axios
            .post(`http://${window.host}/imageupload`, formData, {
                document: 'documents',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if (response.data.msg) console.log(response.data.msg);
                else {
                    var data = JSON.stringify(response.data);
                    //var int = typeof data;
                    //console.log(data, typeof data);
                    this.setState({ uploadedLogo: data });
                }

                // this.setState({
                //   uploadedFiles: [...this.state.uploadedFiles, data],
                // });

                // this.setState({
                //   fileName: response.data.fileName,
                //   filePath: response.data.filePath,
                // });
            });
    };

    handleCompanyStatus = (obj) => {
        this.setState({ manufacturerType: obj });
    };

    GetServiceData = (serviceData) => {
        if (serviceData) {
            this.setState({ mfgProcessData: serviceData });
        }
    };

    onDescriptionAdd = (e) => {
        this.setState({
            briefDescription: e.target.value,
        });
    };

    onChangeAdditionalDetail = (e) => {
        this.setState({
            additionalDetail: e.target.value,
        });
    };

    render() {
        const style = {
            width: '100px',
        };
        const manufacturerTypes = [
            {
                value: 1,
                type: 'Registered Company',
            },
            {
                value: 2,
                type: 'Individual/Hobbyist',
            },
        ];

        const rowView = 'row m-1 d-flex justify-content-center';
        const colView = 'col-lg m-1';

        const {
            manufacturerType,
            mfgProcessData,
            alreadyExist,
            error,
            uploadedFiles,
            uploadedLogo,
            briefDescription,
            otherServices,
            latlngPosition,
            additionalDetail,
        } = this.state;
        return (
            <React.Fragment>
                <div style={{ background: 'rgb(58, 57, 57)', padding: '2rem' }}>
                    <div
                        className="container"
                        style={{
                            backgroundColor: 'white',
                            boxShadow: '2px 2px 2px	#A9A9A9',
                            paddingTop: '1rem',
                            paddingButtom: '2rem',
                        }}
                    >
                        <div>
                            <Formik
                                initialValues={{
                                    email: '',
                                    manufacturerName: '',
                                    password: '',
                                    phoneNumber: '',
                                    confirm_password: '',
                                    manufacturerType: '',
                                    contactPerson: '',
                                    website: '',
                                    verificationDocument: '',
                                    address: '',
                                    additionalDetail: '',
                                    briefDescription: '',
                                    //briefDescription: briefDescription,
                                }}
                                validate={(values) => {
                                    /* initialValues={{ email: "", password: "", firstname:"",lastname="",phoneNumber="",confirm_password="" }}
                      validate={(values) => { */
                                    const errors = {};
                                    //if (!briefDiscription) errors.briefDiscription = "Required!!";
                                    if (!values.manufacturerName)
                                        errors.manufacturerName = 'Required!!';

                                    if (!values.address)
                                        errors.address = 'Required!!';
                                    if (!values.phoneNumber)
                                        errors.phoneNumber = 'Required!!';
                                    if (!values.contactPerson)
                                        errors.contactPerson = 'Required!!';
                                    if (!manufacturerType)
                                        errors.manufacturerType = 'Required!!';
                                    if (!values.email) {
                                        errors.email = 'Required!!';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }
                                    if (!values.password)
                                        errors.password = 'Required!!';
                                    else if (values.password.length < 6) {
                                        errors.password =
                                            'Password must contain atleast 6 letters';
                                    }
                                    if (
                                        values.password !==
                                        values.confirm_password
                                    ) {
                                        errors.confirm_password =
                                            'Password did not match';
                                    }
                                    if (mfgProcessData.length === 0) {
                                        errors.process = 'Add process';
                                    }
                                    if (!briefDescription)
                                        errors.briefDescription = 'Required!!';
                                    if (!additionalDetail)
                                        errors.additionalDetail = 'Required!!';
                                    if (!uploadedFiles)
                                        errors.uploadedFiles = 'Required!!';
                                    if (!uploadedLogo)
                                        errors.uploadedLogo = 'Required!!';
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        let stringData = '';
                                        let otherServicesData = '';
                                        let latitude = undefined;
                                        let longitude = undefined;
                                        console.log('0000');
                                        if (mfgProcessData) {
                                            stringData = JSON.stringify(
                                                mfgProcessData
                                            );
                                            console.log(JSON.parse(stringData));
                                        }
                                        if (otherServices) {
                                            otherServicesData = JSON.stringify(
                                                otherServices
                                            );
                                        }
                                        if (latlngPosition) {
                                            latitude = latlngPosition.lat;
                                            longitude = latlngPosition.lng;
                                            console.log(latitude, longitude);
                                        }
                                        axios
                                            .post(
                                                `http://${window.host}/manufacturer-signup`,
                                                {
                                                    email: values.email,
                                                    name:
                                                        values.manufacturerName,
                                                    password: values.password,
                                                    contactPerson:
                                                        values.contactPerson,
                                                    phoneNumber:
                                                        values.phoneNumber,
                                                    contactPerson:
                                                        values.contactPerson,
                                                    documentPath: uploadedFiles,
                                                    website: values.website,
                                                    manufacturerType: manufacturerType,
                                                    serviceList: stringData,
                                                    logo: uploadedLogo,
                                                    address: values.address,
                                                    otherServices: otherServicesData,
                                                    briefDescription: briefDescription,
                                                    latitude: latitude,
                                                    longitude: longitude,
                                                    additionalDetail: additionalDetail,
                                                }
                                            )
                                            .then((response) => {
                                                //window.location.href = "/quotation";
                                                if (response.data.message) {
                                                    this.setState({
                                                        error:
                                                            response.data
                                                                .message,
                                                    });
                                                } else {
                                                    this.props.history.push({
                                                        pathname: '/verify',
                                                        state: {
                                                            email: values.email,
                                                        },
                                                        //send data to verify page
                                                    });
                                                    window.location.reload();
                                                    console.log(values.email);
                                                }
                                            });
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleSubmit,
                                    isSubmitting,
                                    /* and other goodies */
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="p-2">
                                            <div className="row">
                                                <div className="col p-2 d-flex justify-content-center">
                                                    <h1>
                                                        Register Your Company
                                                        here.....
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="row p-2">
                                                <div className="col p-2 d-flex align-items-center bg-primary text-white">
                                                    <span className="font-weight-bold">
                                                        Profile Details
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={rowView}>
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Full Name :"
                                                        placeholder="Enter Name"
                                                        name="manufacturerName"
                                                    />
                                                </div>
                                                <div className={colView}>
                                                    <div className="row">
                                                        <div className="col-lg-4 d-flex align-items-center">
                                                            <span className="font-weight-bold">
                                                                Company Status :
                                                            </span>
                                                        </div>
                                                        <div className="col-lg">
                                                            <DropDown
                                                                options={
                                                                    manufacturerTypes
                                                                }
                                                                selectedValue={
                                                                    manufacturerType
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleCompanyStatus
                                                                }
                                                                getOptionLabel={(
                                                                    options
                                                                ) =>
                                                                    options.type
                                                                }
                                                            />
                                                            <span
                                                                className="text-danger"
                                                                style={{
                                                                    fontSize:
                                                                        '10pt',
                                                                }}
                                                            >
                                                                {errors.manufacturerType &&
                                                                    touched.manufacturerType &&
                                                                    errors.manufacturerType}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={rowView}>
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Address :"
                                                        name="address"
                                                        placeholder="Enter Address"
                                                    />
                                                </div>
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Contact Person :"
                                                        name="contactPerson"
                                                        placeholder="Contact Person Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className={rowView}>
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Phone Number :"
                                                        name="phoneNumber"
                                                        placeholder="Phone number"
                                                    />
                                                </div>
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Email :"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Enter Email"
                                                    />
                                                </div>
                                            </div>
                                            <div className={rowView}>
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Password :"
                                                        name="password"
                                                        type="password"
                                                        placeholder="Enter password"
                                                    />
                                                </div>
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Confirm Password :"
                                                        name="confirm_password"
                                                        type="password"
                                                        placeholder="Confirm password"
                                                    />
                                                </div>
                                            </div>
                                            <div className={rowView}>
                                                <div className={colView}>
                                                    <ManufacturerPageView
                                                        label="Website :"
                                                        name="website"
                                                        placeholder="Enter Website"
                                                    />
                                                </div>

                                                <div className={colView}>
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-4 ">
                                                            <span className="font-weight-bold">
                                                                {' '}
                                                                Upload Document:
                                                            </span>
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                type="file"
                                                                id="title"
                                                                className="form-control"
                                                                // placeholder="Upload Photos of Project"
                                                                style={{
                                                                    height:
                                                                        '45px',
                                                                    textAlign:
                                                                        'center',
                                                                }}
                                                                placeholder=""
                                                                name="file"
                                                                onChange={(e) =>
                                                                    this.handleOnchange(
                                                                        e
                                                                    )
                                                                }
                                                                accept=".jpeg, .png, or .jpg"
                                                                //ref={this.imgRef}
                                                                //onLoad={this.onImgLoad}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={rowView}>
                                                <div className={colView}>
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-4 ">
                                                            <span className="font-weight-bold">
                                                                Brief
                                                                Description :
                                                            </span>
                                                        </div>
                                                        <div className="col">
                                                            <textarea
                                                                id="description"
                                                                type="text"
                                                                width="100"
                                                                rows="3"
                                                                className="form-control"
                                                                cols="35"
                                                                placeholder="Brief description"
                                                                name="description"
                                                                resize="none"
                                                                value={
                                                                    this.state
                                                                        .briefDiscription
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onDescriptionAdd
                                                                }
                                                            />
                                                            <span
                                                                className="text-danger"
                                                                style={{
                                                                    fontSize:
                                                                        '10pt',
                                                                }}
                                                            >
                                                                {errors.briefDiscription &&
                                                                    touched.briefDiscription &&
                                                                    errors.briefDiscription}
                                                            </span>
                                                            <div
                                                                className="text-danger"
                                                                style={{
                                                                    fontSize:
                                                                        '10pt',
                                                                }}
                                                            >
                                                                {errors.briefDescription &&
                                                                    touched.briefDescription &&
                                                                    errors.briefDescription}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={colView}>
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-4 ">
                                                            <span className="font-weight-bold">
                                                                {' '}
                                                                Upload Company's
                                                                Logo:
                                                            </span>
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                type="file"
                                                                id="logo"
                                                                className="form-control"
                                                                // placeholder="Upload Photos of Project"
                                                                style={{
                                                                    height:
                                                                        '45px',
                                                                    textAlign:
                                                                        'center',
                                                                }}
                                                                placeholder=""
                                                                name="file"
                                                                onChange={(e) =>
                                                                    this.handleOnchangeLogo(
                                                                        e
                                                                    )
                                                                }
                                                                accept=".jpeg, .png, or .jpg"
                                                                //ref={this.imgRef}
                                                                //onLoad={this.onImgLoad}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row p-2">
                                                <div className="col p-2 d-flex align-items-center bg-primary text-white">
                                                    <span className="font-weight-bold">
                                                        Manufacturing Service
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-danger  text-center">
                                                {errors.process &&
                                                    touched.process &&
                                                    errors.process}
                                            </span>
                                            {alreadyExist && (
                                                <div
                                                    className="alert alert-warning alert-dismissible fade show"
                                                    role="alert"
                                                >
                                                    Material Already Added.
                                                    <button
                                                        type="button"
                                                        style={{
                                                            alignSelf: 'center',
                                                        }}
                                                        className="close"
                                                        onClick={() => {
                                                            this.setState({
                                                                alreadyExist: false,
                                                            });
                                                        }}
                                                    >
                                                        <span area-hidden="true">
                                                            &times;
                                                        </span>
                                                    </button>
                                                </div>
                                            )}
                                            <div>
                                                <div>
                                                    {mfgProcessData && (
                                                        <MfgProcessViewSelected
                                                            viewsData={
                                                                mfgProcessData
                                                            }
                                                            updateviewsData={(
                                                                updatedData
                                                            ) =>
                                                                this.setState({
                                                                    mfgProcessData: updatedData,
                                                                })
                                                            }
                                                        />
                                                    )}
                                                </div>

                                                <ManufacturerServiceSelect
                                                    getService={
                                                        this.GetServiceData
                                                    }
                                                    isExist={(isAlreadyExist) =>
                                                        this.setState({
                                                            alreadyExist: isAlreadyExist,
                                                        })
                                                    }
                                                />
                                                <div className="row p-2">
                                                    <div className="col p-2 d-flex align-items-center bg-primary text-white">
                                                        <span className="font-weight-bold">
                                                            Other Services
                                                        </span>
                                                    </div>
                                                </div>
                                                {console.log(
                                                    'other',
                                                    this.state.otherServices
                                                )}
                                                <OtherService
                                                    getData={(data) =>
                                                        this.setState({
                                                            otherServices: data,
                                                        })
                                                    }
                                                />
                                                <div className="row p-2">
                                                    <div className="col p-2 d-flex align-items-center bg-primary text-white">
                                                        <span className="font-weight-bold">
                                                            Pin Your Location
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={rowView}>
                                                    <div className={colView}>
                                                        <Location
                                                            getLatLng={(
                                                                position
                                                            ) =>
                                                                this.setState({
                                                                    latlngPosition: position,
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row p-2">
                                                    <div className="col p-2 d-flex align-items-center bg-primary text-white">
                                                        <span className="font-weight-bold">
                                                            Additional Details
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={rowView}>
                                                    <div className={colView}>
                                                        <div>
                                                            <textarea
                                                                type="text"
                                                                width="100"
                                                                rows="3"
                                                                className="form-control"
                                                                placeholder="Additional Details"
                                                                name="additionalDetail"
                                                                resize="none"
                                                                value={
                                                                    this.state
                                                                        .additionalDetail
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onChangeAdditionalDetail
                                                                }
                                                            ></textarea>
                                                        </div>
                                                        <div
                                                            className="text-danger"
                                                            style={{
                                                                fontSize:
                                                                    '10pt',
                                                            }}
                                                        >
                                                            {errors.additionalDetail &&
                                                                touched.additionalDetail &&
                                                                errors.additionalDetail}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className="row p-3 d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="btn btn-primary"
                                                >
                                                    Submit
                                                </button>
                                                <div
                                                    className="text-danger"
                                                    style={{
                                                        fontSize: '15pt',
                                                    }}
                                                >
                                                    {error}
                                                </div>
                                            </span>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ManufacturerSignup;

export function ManufacturerPageView({
    label,
    placeholder,
    type,
    name,
    style,
}) {
    return (
        <div className="row d-flex align-items-center">
            <div className="col-lg-4 ">
                <span className="font-weight-bold">{label}</span>
            </div>
            <div className="col-lg">
                <FormTextBox
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    style={style}
                />
            </div>
        </div>
    );
}
