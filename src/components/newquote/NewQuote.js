import React, { Component } from 'react';
import Dropzone from '../global/Dropzone';
import HubListArea from './HubListArea';
import '../global/dropZone.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { GetCookiesInfo } from '../global/GlobalFunction';
import FabricationProcessSelect from './FabricationProcessSelect';
import Alert from '../global/Alert';

const cookies = new Cookies();

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

var CryptoJS = require('crypto-js');

const SECRET_KEY = 'FabHubs@promech';

class NewQuote extends Component {
    constructor() {
        super();
        this.state = {
            categories: [
                { id: 1, value: 'Request for Prototype' },
                { id: 2, value: 'Check Design' },
                { id: 3, value: 'Request Quotation' },
            ],
            checkedItems: new Map(),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        filename: '',
        filepath: '',
        email: '',
        dropDownData: null,
        message: '',
        isSuccess: true,
        fileData: null,
        user: '',
        errMsg: undefined,
        fileUpload: false,
        acceptFile: 'pdf, jpeg, dxf, stl, obj, step, tif',
    };
    handleChange(event) {
        var isChecked = event.target.checked;
        var item = event.target.value;

        this.setState((prevState) => ({
            checkedItems: prevState.checkedItems.set(item, isChecked),
        }));
    }
    handleSubmit(event) {
        console.log(this.state.checkedItems);
        event.preventDefault();
    }

    onClickValidate = () => {
        const { email, customerID } = GetCookiesInfo();
        const { dropDownData, fileData } = this.state;
        if (
            !dropDownData.selectedFabrication ||
            !dropDownData.selectedMaterial ||
            !dropDownData.selectedThickness ||
            !dropDownData.selectedQuantity
        ) {
            return this.setState({
                errMsg: 'All Fields are required',
            });
        } else if (!fileData) {
            return this.setState({
                errMsg: 'File not Selected',
            });
        }

        //Encryption
        var encryptedUserID = CryptoJS.AES.encrypt(
            email,
            SECRET_KEY
        ).toString();
        var encryptedKey = encryptedUserID.replace(/\//g, 'slash');
        console.log(encryptedKey);

        //const userID = email;
        const fabricationProcess = dropDownData.selectedFabrication.Name;
        const material = dropDownData.selectedMaterial.Material_Name;
        const thickness = dropDownData.selectedThickness.label;
        const quantity = dropDownData.selectedQuantity.label;
        const { fileName, filePath } = fileData;
        const validationPageUrl = `http://${window.host}/validation-page/${encryptedKey}`;

        const fileURL = `http://${ipAddress}:3000/${filePath}`;

        axios
            .post(`http://${window.host}/order-specification`, {
                modelName: fileName,
                fabricationService: fabricationProcess,
                material: material,
                thickness: thickness,
                quantity: quantity,
                modelPath: fileURL,
                customerID: customerID,
                //#region old declaration
                // id: userID,
                // filename: fileName,
                // fabricationprocess: fabricationProcess,
                // material: material,
                // thickness: thickness,
                // quantity: quantity,
                // fileurl: fileURL,
                //#endregion
                validationPagePath: validationPageUrl,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.message) {
                    this.setState({
                        message: response.data.message,
                        isSuccess: false,
                    });
                }
            });
    };

    handleCallback = (childData) => {
        this.setState({ errMsg: '' });
        console.log(childData);
        this.setState({ dropDownData: childData });
    };

    dropzoneHandleCallback = (childData) => {
        this.setState({ errMsg: '' });
        this.setState({ fileData: childData });
    };

    render() {
        const { isSuccess, dropDownData, errMsg } = this.state;
        return (
            <div
                className="p-3"
                // style={{
                //   backgroundColor: "rgb(58, 57, 57)",
                //   height: "auto",
                // }}
            >
                <div
                    className="container mt-5 mb-5"
                    style={{
                        borderRadius: '5px',
                        borderColor: 'lightgray',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                    }}
                >
                    <div className="p-3">
                        All fields with <span style={{ color: 'red' }}>*</span>{' '}
                        are required
                    </div>
                    {errMsg && (
                        <div className="pl-3">
                            <Alert message={errMsg} />
                        </div>
                    )}
                    <div className="p-3">
                        <FabricationProcessSelect
                            title="Fabrication Process"
                            parentCallback={this.handleCallback}
                        />
                    </div>
                    <hr
                        style={{
                            borderColor: 'lightgray',
                            boxShadow: '0px 3px 2px gray',
                        }}
                    />
                    <div className="p-3">
                        <Dropzone
                            title="Upload File"
                            fileNote="pdf, jpeg, dxf, stl, obj, step, tif"
                            requirementNote="File size < 15 MB"
                            parentCallback={this.dropzoneHandleCallback}
                            user={this.state.user}
                            error={this.state.errMsg}
                            fileUpload={this.state.fileUpload}
                        />
                    </div>
                    <hr
                        style={{
                            borderColor: 'lightgray',
                            boxShadow: '0px 3px 2px gray',
                        }}
                    />
                    <div className="p-3">
                        <HubListArea
                            title="Select Your Hub"
                            HubList={dropDownData}
                        />
                    </div>
                    <hr
                        style={{
                            borderColor: 'lightgray',
                            boxShadow: '0px 3px 2px gray',
                        }}
                    />{' '}
                    <div
                        className="row p-3 mt-5"
                        style={{
                            backgroundColor: 'white',
                        }}
                    >
                        {this.state.categories.map((item) => (
                            <div className="col ml-4">
                                <h5>
                                    <input
                                        type="checkbox"
                                        value={item.id}
                                        onChange={this.handleChange}
                                        style={{
                                            marginRight: '10px',
                                            marginLeft: '10px',
                                        }}
                                    />
                                    {item.value}
                                </h5>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            //onClick={this.onClickValidate}
                        >
                            Validate
                        </button>
                    </div>
                    <div
                        className="alert alert-secondary"
                        role="alert"
                        hidden={isSuccess}
                    >
                        {this.state.message}
                    </div>
                </div>
            </div>
        );
    }
}

export default NewQuote;
