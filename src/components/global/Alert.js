import react, { useState, useEffect } from 'react';

export default function Alert(props) {
    return (
        <div className="col-md">
            <div className="alert alert-danger" role="alert">
                {props.message}
            </div>
        </div>
    );
}
