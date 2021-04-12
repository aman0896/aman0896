import React, { Component } from 'react';
//import "./feature.css";
import { Modal } from 'react-bootstrap';
import Axios from 'axios';
import {
    ContactsOutlined,
    DesktopWindows,
    LaptopWindows,
} from '@material-ui/icons';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { Formik } from 'formik';
import Cookies from 'universal-cookie';
import { GetCookiesInfo } from '../global/GlobalFunction';
import './feature.css';
import '../customer/UserProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};
let file = [];
class Editfeature extends Component {
    constructor() {
        super();

        ClassicEditor.defaultConfig = {
            toolbar: {
                items: [
                    'bold',
                    'italic',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'redo',
                    'undo',
                ],
            },

            language: 'en',
            default: 'My default value',
        };
        var today = new Date(),
            date =
                today.getFullYear() +
                '-' +
                (today.getMonth() + 1) +
                '-' +
                today.getDate();
        this.state = {
            date: date,
        };
        this.imgRef = React.createRef();
        this.onImgLoad = this.onImgLoad.bind(this);
        this.onchange = this.onchange.bind(this);
    }
    state = {
        setShow: true,
        process: '',
        material: '',
        title: '',
        summary: '',
        userinfo: '',
        data: '',
        fileName: '',
        filePath: '',
        description: '',
        id: '',
        Summary: '',
        Description: '',
        previewImage: [],
    };
    onImgLoad({ target: img }) {
        // this.setState({
        //   height: img.offsetHeight,
        //   width: img.naturalWidth,
        // });
    }

    componentDidMount() {
        const location = this.props.location;
        const data = location.state;

        console.log(data);
        this.setState({ id: data });
        Axios.post(`http://${ipAddress}:3001/edit-project`, { id: data }).then(
            (response) => {
                if (response.data) {
                    console.log(response.data);
                    // var list = JSON.stringify(response.data[0]);
                    // console.log(list)
                    const { filePath } = JSON.parse(response.data[0].Image);
                    const imagePath = JSON.parse(response.data[0].Files);
                    this.setState({
                        title: response.data[0].Title,
                        process: response.data[0].Fabrication_Process,
                        material: response.data[0].Material,
                        imagePath: filePath,
                        Summary: response.data[0].Summary,
                        Description: response.data[0].Description,
                        previewImage: imagePath,
                    });
                }
            }
        );
    }

    handleChange = (e, editor) => this.setState({ summary: editor.getData() });

    handleChangedescription = (e, editor) =>
        this.setState({ description: editor.getData() });

    onchange = (e) => {
        //let file = e.target.files;
        const height = this.imgRef.current.clientHeight;
        const width = this.imgRef.current.clientWidth;
        this.setState({
            height: height,
            width: width,
        });

        const formData = new FormData();
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        formData.append('document', 'projectUploads');
        console.log(files, formData);
        Axios.post(`http://${ipAddress}:3001/imageupload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            if (response.data.msg) console.log(response.data.msg);
            else {
                console.log(response.data);
                var data = JSON.stringify(response.data);
                //var int = typeof data;
                console.log(data, typeof data);
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

        // alert(`
        //   Height : ${height}
        //   Width : ${width}
        // `);
    };
    handleImageOnChange = (e) => {
        const formData = new FormData();
        const files = e.target.files;

        formData.append('file', files[0]);

        formData.append('document', 'projectMainPhoto');
        console.log(files, formData);
        Axios.post(`http://${ipAddress}:3001/imageupload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            if (response.data.msg) {
                console.log(response.data.msg);
                this.setState({ error: response.data.msg });
            } else {
                console.log(response.data);
                var image = JSON.stringify(response.data);
                //var int = typeof data;

                Axios.post(`http://${ipAddress}:3001/changeimage`, {
                    id: this.state.id,
                    image: image,
                    userStatus: 'feature',
                }).then((response) => {
                    console.log(response.data);
                    // document.cookie = `userInfo = ${JSON.stringify(
                    //     response.data
                    // )}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;
                    // // window.location.reload();
                });
                const { fileName, filePath } = JSON.parse(image);
                console.log(filePath);
                this.setState({ imagePath: filePath });
            }
        });
    };

    render() {
        const {
            process,
            material,
            title,
            date,
            summary,
            userinfo,
            description,
            error,
            loading,
            fileName,
            fileURL,
            filePath,
            uploadedFiles,
            width,
            height,
            id,
            imagePath,
            Summary,
            Description,
            previewImage,
        } = this.state;

        return (
            <div className="">
                <div className="container">
                    {' '}
                    <div className="row mt-4">
                        <div className="col-sm-3 mt-3">
                            <div
                                className="card body account-settings"
                                style={{
                                    paddingTop: '80px',
                                    paddingBottom: '80px',
                                    // display: "block",
                                    //borderRadius: '20px',
                                }}
                            >
                                <div
                                    className="user-profile"
                                    style={{
                                        borderRadius: '5px 10px 15px 20px',
                                    }}
                                >
                                    <div
                                        className="user-avatar"
                                        style={{
                                            borderRadius: '5px 10px 15px 20px',
                                        }}
                                    >
                                        <a
                                            aria-label="Change Profile Picture"
                                            className="change-pic"
                                        >
                                            <div
                                                className="profile-pic"
                                                style={{
                                                    backgroundImage: `url(${imagePath})`,
                                                    borderRadius:
                                                        '5px 10px 15px 20px solid',
                                                    borderColor: 'black',
                                                }}
                                            >
                                                <input
                                                    className="avatar-file h-100 w-100"
                                                    type="file"
                                                    name="file"
                                                    // accept="image/*"
                                                    onChange={
                                                        this.handleImageOnChange
                                                    }
                                                />

                                                <span className="glyphicon glyphicon-camera"></span>
                                                <span>Change Image</span>
                                            </div>
                                        </a>

                                        {/* 
                         <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="Maxwell Admin"
                            /> */}
                                    </div>
                                    {title && (
                                        <h5 className="user-name">{title}</h5>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-sm-6 card card-body mt-3"
                            style={
                                {
                                    // backgroundColor: 'white',
                                    //borderRadius: '10px',
                                    //boxShadow: '2px 2px 2px	#A9A9A9',
                                }
                            }
                        >
                            <h5 className="font-weight-bold ">
                                Feature Project
                            </h5>
                            {console.log('title', title, JSON.stringify(title))}
                            {
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        process: process,
                                        material: material,
                                        title: title,
                                        //date: "",
                                        summary: 'aaaaaa',
                                        userinfo: '',
                                        data: '',
                                        fileName: '',
                                        filePath: '',
                                        description: '',
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.title) {
                                            errors.title = 'Required';
                                        }
                                        if (!values.process) {
                                            errors.process = 'Required';
                                        }
                                        if (!values.material) {
                                            errors.material = 'Required';
                                        }

                                        // if (!values.date) {
                                        //   errors.date = "Required";
                                        // }
                                        if (!description) {
                                            errors.description = 'Required';
                                        }
                                        // if (!fileName) {
                                        //   errors.fileName = "Required Photos";
                                        // }
                                        if (!summary) {
                                            errors.summary = 'Required';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            // let stringData = "";
                                            // if (uploadedFiles) {
                                            //   stringData = JSON.stringify(uploadedFiles);
                                            // }
                                            const {
                                                email,
                                                customerID,
                                            } = GetCookiesInfo();
                                            console.log(uploadedFiles);
                                            Axios.post(
                                                `http://${ipAddress}:3001/update-project`,
                                                {
                                                    customerID: customerID,
                                                    process: values.process,
                                                    material: values.material,
                                                    summary: summary,
                                                    title: values.title,
                                                    userinfo: email,
                                                    date: date,
                                                    //fileName: fileName,
                                                    //fileURL: filePath,
                                                    description: description,
                                                    // files: uploadedFiles,
                                                    projectID: id,
                                                }
                                            ).then((response) => {
                                                console.log('data');
                                                console.log(response.data);
                                            });
                                            window.location.href = '/';

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
                                            {console.log(values)}
                                            <div className="row">
                                                <div className="col-lg">
                                                    <div className="form-group mb-2">
                                                        <label
                                                            className="font-weight-bold small"
                                                            htmlFor="title"
                                                        >
                                                            Title of Project:
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="title"
                                                            className="form-control"
                                                            placeholder="Enter title of project"
                                                            name="title"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={values.title}
                                                        />
                                                        <span className="text-danger  text-center">
                                                            {errors.title &&
                                                                touched.title &&
                                                                errors.title}
                                                        </span>
                                                    </div>
                                                </div>{' '}
                                                <div className="col-lg">
                                                    <div className="form-group mb-2">
                                                        <label className="font-weight-bold small">
                                                            Manufacturing
                                                            Process:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="procces"
                                                            className="form-control"
                                                            placeholder="Enter manufacturing process"
                                                            name="process"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                values.process
                                                            }
                                                        />{' '}
                                                        <span className="text-danger  text-center">
                                                            {errors.process &&
                                                                touched.process &&
                                                                errors.process}
                                                        </span>
                                                    </div>{' '}
                                                </div>{' '}
                                            </div>
                                            <div className="row">
                                                <div className="col-lg">
                                                    <div className="form-group mb-2">
                                                        <label className="font-weight-bold small">
                                                            Materials:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="material"
                                                            className="form-control"
                                                            placeholder="Enter material used"
                                                            name="material"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                values.material
                                                            }
                                                        />{' '}
                                                        <span className="text-danger  text-center">
                                                            {errors.material &&
                                                                touched.material &&
                                                                errors.material}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="mb-2">
                                                <label
                                                    className="font-weight-bold small"
                                                    htmlFor="title"
                                                >
                                                    Upload Other Multiple Photos
                                                    of Project:
                                                </label>
                                                <input
                                                    type="file"
                                                    id="title"
                                                    className="form-control"
                                                    placeholder="Upload Photos of Project"
                                                    style={{
                                                        height: '45px',
                                                        textAlign: 'center',
                                                    }}
                                                    multiple
                                                    placeholder=""
                                                    name="file"
                                                    onChange={(e) =>
                                                        this.onchange(e)
                                                    }
                                                    accept=".jpeg, .png, or .jpg"
                                                    ref={this.imgRef}
                                                    onLoad={this.onImgLoad}
                                                />
                                                {/* dimensions width:{width}, height:{height} */}
                                            {/* <span className="text-danger  text-center">
                                                    {errors.fileName &&
                                                        touched.fileName &&
                                                        errors.fileName}
                                                </span>
                                            </div>
                                            <div className="row pl-3">
                                                {previewImage &&
                                                    previewImage.map(
                                                        (image) => (
                                                            <div
                                                                className="col"
                                                                id="image"
                                                            >
                                                                <img
                                                                    src={
                                                                        image.filePath
                                                                    }
                                                                    style={{
                                                                        height:
                                                                            '150px',
                                                                        width:
                                                                            '150px',
                                                                        border:
                                                                            '1px solid gray',
                                                                        borderRadius:
                                                                            '4px',
                                                                    }}
                                                                />
                                                                <div className="overlay">
                                                                    <span
                                                                        //href="#"
                                                                        className="icon text-danger"
                                                                        //title="User Profile"
                                                                        onclick={() => {
                                                                           onClickDelete(
                                                                               image.filePath
                                                                           );
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            //style={{ marginRight: 2 }}
                                                                            icon={
                                                                                faTrashAlt
                                                                            }
                                                                            size="sm"
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    )} */}
                                            <div className="form-group mb-2">
                                                <label
                                                    className="font-weight-bold small"
                                                    htmlFor="summary"
                                                >
                                                    Summary of the Project (Key
                                                    Features) :
                                                </label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={Summary}
                                                    placeholder="Enter summary of project"
                                                    config={{
                                                        placeholder:
                                                            'Add summary of Project',
                                                        default: 'dataaaa',
                                                    }}
                                                    elements={{
                                                        default: 'data',
                                                    }}
                                                    onChange={(e, editor) => {
                                                        this.handleChange(
                                                            e,
                                                            editor
                                                        );
                                                    }}
                                                    value={values.summary}
                                                ></CKEditor>{' '}
                                                <span className="text-danger  text-center">
                                                    {errors.summary &&
                                                        touched.summary &&
                                                        errors.summary}
                                                </span>
                                            </div>{' '}
                                            {/* <div className="form-group mb-2">
                      <label
                        className="font-weight-bold small"
                        htmlFor="userinfo"
                      >
                        User info:
                      </label>

                      <input
                        type="email"
                        id="userinfo"
                        className="form-control"
                        placeholder="Enter email address"
                        name="userinfo"
                        onChange={handleChange}
                        value={userinfo}
                      />
                      <span className="text-danger  text-center">
                        {errors.userinfo && touched.userinfo && errors.userinfo}
                      </span>
                    </div>{" "} */}
                                            {/* <div className="form-group mb-2">
                                  <label
                                    className="font-weight-bold small"
                                    htmlFor="userinfo"
                                  >
                                    Date:
                                  </label>

                                  <input
                                    type="date"
                                    id="date"
                                    className="form-control"
                                    placeholder=""
                                    name="date"
                                    onChange={handleChange}
                                    value={values.date}
                                  />
                                  <span className="text-danger  text-center">
                                    {errors.date && touched.date && errors.date}
                                  </span>
                                </div>{" "} */}
                                            <div className="form-group mb-2">
                                                <label className="font-weight-bold small">
                                                    Detail Description :
                                                </label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={Description}
                                                    config={{
                                                        placeholder:
                                                            'Add description',
                                                    }}
                                                    onChange={(e, editor) => {
                                                        this.handleChangedescription(
                                                            e,
                                                            editor
                                                        );
                                                    }}
                                                ></CKEditor>
                                                {/* <CKEditor
                              editor={ClassicEditor}
                              onChange={(e, editor) => {
                                this.handleChange(e, editor);
                              }}
                            ></CKEditor> */}
                                                {/* <textarea
                        type="text"
                        id="description"
                        className="form-control"
                        placeholder="Enter detail description of project"
                        name="description"
                        onChange={handleChange}
                        value={values.description}
                      /> */}
                                                <span className="text-danger  text-center">
                                                    {errors.description &&
                                                        touched.description &&
                                                        errors.description}
                                                </span>
                                            </div>{' '}
                                            <div className="row">
                                                <div className="col">
                                                    {' '}
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block"
                                                        disabled={isSubmitting}
                                                        style={{
                                                            width: '150px',
                                                            margin: 'auto',
                                                        }}
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                                <div className="col">
                                                    {' '}
                                                    <a
                                                        type="submit"
                                                        className="btn btn-primary btn-block"
                                                        style={{
                                                            width: '150px',
                                                            margin: 'auto',
                                                        }}
                                                        href="/edit-projectlist"
                                                    >
                                                        Cancel
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            }
                        </div>
                    </div>
                    <div style={{ paddingBottom: '54px' }}></div>
                </div>
            </div>
        );
    }
}

export default Editfeature;
