import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik } from 'formik';
import { GetCookiesInfo } from '../global/GlobalFunction';
import './feature.css';
import Axios from 'axios';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');


let file = [];
class feature extends Component {
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
                    'link',
                    'undo',
                    'redo',
                    'fontFamily',
                ],
            },
            fontFamily: {
                options: [
                    'default',
                    'Ubuntu, Arial, sans-serif',
                    'Ubuntu Mono, Courier New, Courier, monospace',
                ],
            },
            fontSize: {
                options: [9, 11, 13, 'default', 17, 19, 21],
            },

            language: 'en',
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
        error: '',
        uploadedImage: [],
        file,
        previewImage: [],
    };

    handleChange = (e, editor) => this.setState({ summary: editor.getData() });

    handleChangedescription = (e, editor) =>
        this.setState({ description: editor.getData() });

    onchange = (e) => {
        const formData = new FormData();
        const files = e.target.files;
        var images = [];

        for (let i = 0; i < e.target.files.length; i++) {
            images.push(URL.createObjectURL(e.target.files[i]));
        }
        console.log(images);
        this.setState({ previewImage: images });

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
            if (response.data.msg) {
                console.log(response.data.msg);
                this.setState({ error: response.data.msg });
            } else {
                console.log(response.data);
                var data = JSON.stringify(response.data);

                console.log(data, typeof data);
                this.setState({ uploadedFiles: data });
            }
        });
    };
    handleImageOnChange = (e) => {
        const formData = new FormData();
        const files = e.target.files;

        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
        });

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
                var data = JSON.stringify(response.data);
                //var int = typeof data;
                console.log(data, typeof data);
                this.setState({ uploadedImage: data });
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
            uploadedImage,
            file,
            previewImage,
        } = this.state;

        return (
            <div>
                <div className="container">
                    {' '}
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div
                            className="col-sm-6 card card-body mt-5 "                       
                        >
                            <h5 className="font-weight-bold ">
                                Feature Project
                            </h5>
                            <Formik
                                initialValues={{
                                    process: '',
                                    material: '',
                                    title: '',
                                    summary: '',
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

                                    if (!description) {
                                        errors.description = 'Required';
                                    }
                                    if (!uploadedFiles) {
                                        errors.fileName = 'Required Photos';
                                    }
                                    if (!summary) {
                                        errors.summary = 'Required';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        const {
                                            email,
                                            customerID,
                                        } = GetCookiesInfo();
                                        console.log(uploadedFiles);
                                        if (!error) {
                                            Axios.post(
                                                `http://${ipAddress}:3001/feature-project`,
                                                {
                                                    id: customerID,
                                                    process: values.process,
                                                    material: values.material,
                                                    summary: summary,
                                                    title: values.title,
                                                    userinfo: email,
                                                    date: date,
                                                    description: description,
                                                    files: uploadedFiles,
                                                    image: uploadedImage,
                                                }
                                            ).then((response) => {
                                                console.log('data');
                                                console.log(response.data);
                                            });
                                            window.location.href = '/';
                                        }

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
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg">
                                                <div className="mb-2">
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
                                                        onChange={handleChange}
                                                        noValidate
                                                        value={values.title}
                                                    />
                                                    <span className="text-danger  text-center">
                                                        {errors.title &&
                                                            touched.title &&
                                                            errors.title}
                                                    </span>
                                                </div>
                                            </div>{' '}
                                        </div>
                                        <div className="row">
                                            <div className="col-lg">
                                                <div className="mb-2">
                                                    <label className="font-weight-bold small">
                                                        Manufacturing Process:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="procces"
                                                        className="form-control"
                                                        placeholder="eg. CNC, Injection Molding,"
                                                        name="process"
                                                        onChange={handleChange}
                                                        value={values.process}
                                                        noValidate
                                                    />{' '}
                                                    <span className="text-danger  text-center">
                                                        {errors.process &&
                                                            touched.process &&
                                                            errors.process}
                                                    </span>
                                                </div>{' '}
                                            </div>{' '}
                                            <div className="col-lg">
                                                <div className="mb-2">
                                                    <label className="font-weight-bold small">
                                                        Materials:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="material"
                                                        className="form-control"
                                                        placeholder="eg. Polypropylene (PP), PVC,"
                                                        name="material"
                                                        onChange={handleChange}
                                                        value={values.material}
                                                    />{' '}
                                                    <span className="text-danger  text-center">
                                                        {errors.material &&
                                                            touched.material &&
                                                            errors.material}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg">
                                                <div className="mb-2">
                                                    <label
                                                        className="font-weight-bold small"
                                                        htmlFor="title"
                                                    >
                                                        Choose Main Photo of
                                                        Project:
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
                                                        placeholder=""
                                                        name="file"
                                                        onChange={(e) =>
                                                            this.handleImageOnChange(
                                                                e
                                                            )
                                                        }
                                                        accept=".jpeg, .png, or .jpg"
                                                    />
                                                   
                                                    <span className="text-danger  text-center">
                                                        {errors.fileName &&
                                                            touched.fileName &&
                                                            errors.fileName}
                                                    </span>
                                                </div>
                                            </div>{' '}
                                            {file && (
                                                <div className="col-lg">
                                                    <img
                                                        src={file}
                                                        style={{
                                                            height: '150px',
                                                            width: '150px',
                                                            border:
                                                                '1px solid gray',
                                                            borderRadius: '4px',
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                className="font-weight-bold small"
                                                htmlFor="title"
                                            >
                                                Upload Other Multiple Photos of
                                                Project:
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
                                            <span className="text-danger  text-center">
                                                {errors.fileName &&
                                                    touched.fileName &&
                                                    errors.fileName}
                                            </span>
                                        </div>{' '}
                                        <div className="row pl-3">
                                            {previewImage &&
                                                previewImage.map((image) => (
                                                    <div className="col">
                                                        <img
                                                            src={image}
                                                            style={{
                                                                height: '150px',
                                                                width: '150px',
                                                                border:
                                                                    '1px solid gray',
                                                                borderRadius:
                                                                    '4px',
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                className="font-weight-bold small"
                                                htmlFor="summary"
                                            >
                                                Summary of the Project (Key
                                                Features) :
                                            </label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                placeholder="Enter summary of project"
                                                config={{
                                                    placeholder:
                                                        'Add summary of Project',
                                                    fontFamily: {
                                                        options: [
                                                            'default',
                                                            'Ubuntu, Arial, sans-serif',
                                                            'Ubuntu Mono, Courier New, Courier, monospace',
                                                        ],
                                                    },
                                                }}
                                                onChange={(e, editor) => {
                                                    this.handleChange(
                                                        e,
                                                        editor
                                                    );
                                                }}
                                            ></CKEditor>{' '}
                                            <span className="text-danger  text-center">
                                                {errors.summary &&
                                                    touched.summary &&
                                                    errors.summary}
                                            </span>
                                        </div>{' '}
                                       
                                        <div className="mb-2">
                                            <label className="font-weight-bold small">
                                                Detail Description :
                                            </label>
                                            <CKEditor
                                                editor={ClassicEditor}                                           
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
                                            <span className="text-danger  text-center">
                                                {errors.description &&
                                                    touched.description &&
                                                    errors.description}
                                            </span>
                                        </div>{' '}
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            disabled={isSubmitting}
                                            style={{
                                                width: '150px',
                                                margin: 'auto',
                                            }}
                                        >
                                            Add Project
                                        </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div style={{ paddingBottom: '54px' }}></div>
                </div>
            </div>
        );
    }
}

export default feature;
