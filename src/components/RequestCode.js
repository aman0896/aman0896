import React, { Component } from 'react';
import Dropzone from './global/Dropzone';

class RequestCode extends Component {
    state = {};
    render() {
        const style = {
            width: '20%',
        };
        return (
            <div className="container ">
                <div className="p-4"></div>
                <Dropzone
                    className="mt-4"
                    title="1. Upload Product photographs or inspirations
"
                    fileNote="jpeg, png, svg, and other image file format"
                    requirementNote="Image size must not be greater than 10 MB"
                    accept="Image/*"
                />
                <Dropzone
                    title="2. Submit Sketches or drawings
"
                    fileNote="jpeg, png, svg, and other image file format"
                    requirementNote="Image size must not be greater than 10 MB"
                    accept="Image/*"
                />
                <div className="row mt-5">
                    <div className="col-sm">
                        <h4>3. Description of your project</h4>
                    </div>
                </div>
                <div className="row ">
                    <div className="col">
                        <div>
                            <textarea
                                className="mb-4 form-control"
                                input="text"
                                row="10"
                                cols="1"
                                size="100"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="mx-auto" style={style}>
                    <button type="submit" className="btn btn-primary btn-block">
                        Submit
                    </button>
                </div>
                <div className="p-4"></div>
            </div>
        );
    }
}

export default RequestCode;
