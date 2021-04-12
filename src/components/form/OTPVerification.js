import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

function OTPVerification(props) {
    const [otp, setOtp] = useState(null);
    const [msg, setMsg] = useState(null);
    const [path, setPath] = useState(null);
    const location = useLocation();
    const history = useHistory();

    const handleOnchange = (arg) => {
        setOtp(arg.target.value);
    };
    const data = location.data;
    useEffect(() => {
        Axios.post(`http://${ipAddress}:3001/verify-password`).then(
            (response) => {
                setPath(response.data.locate);
            }
        );
    }, []);
    const onVerifyClick = (event) => {
        event.preventDefault();

        const { id } = props.match.params;
        //getting data from login
        console.log(data);

        Axios.post(`http://${ipAddress}:3001/verify`, {
            otp: otp,
            email: data,
        }).then((response) => {
            if (response.data.msg && response.data.isVerified) {
                console.log(response.data.msg);
                setMsg(response.data.msg);
                if (path == '/login/identity') {
                    history.push({ pathname: `/reset-password/${id}` });
                } else {
                    history.push('/login');
                }
            } else {
                setMsg(response.data.msg);
            }
        });
    };

    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">OTP Verification</h1>
                <form>
                    <input
                        id="otp"
                        type="text"
                        autoFocus
                        className="form-control"
                        placeholder="Enter Your OTP"
                        name="otp"
                        onChange={handleOnchange}
                        value={otp}
                    />
                </form>
                <hr className="my-4" />
                <p>Enter the OTP sent to you email address.</p>
                <button
                    className="btn btn-primary btn-lg d-flex ml-auto"
                    type="button"
                    onClick={onVerifyClick}
                >
                    Verify
                </button>
                <div className="text-center text-danger">{msg}</div>
            </div>
        </div>
    );
}

export default OTPVerification;
