import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import './TextBox.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const eye = <FontAwesomeIcon icon={faEye} />;

const FormTextBox = ({ type, placeholder, name, style, value }) => {
    const { errors, touched, handleChange } = useFormikContext();
    return (
        <>
            <input
                type={type}
                id={name}
                style={style}
                className="form-control"
                placeholder={placeholder}
                name={name}
                onChange={handleChange(name)}
                value={value}
            />
            <div
                className="text-danger"
                style={{
                    fontSize: '10pt',
                }}
            >
                {errors[name] && touched[name] && errors[name]}
            </div>
        </>
    );
};

FormTextBox.prototype = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
};

FormTextBox.defaultProps = {
    type: 'text',
    style: { borderRadius: '5px' },
};

export default FormTextBox;

export const TextBox = ({
    type,
    placeholder,
    name,
    style,
    error,
    onChange,
    label,
    value
}) => {
    return (
        <>
            {label ? (
                <div className="row">
                    <div className="col-4 d-flex align-items-center">
                        <span className="font-weight-bold">{label}</span>
                    </div>
                    <div className="col">
                        <input
                            type={type}
                            style={style}
                            className="form-control"
                            placeholder={placeholder}
                            name={name}
                            onChange={onChange}
                            value={value}
                        />
                        <div
                            className="text-danger"
                            style={{
                                fontSize: '10pt',
                            }}
                        >
                            {error}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <input
                        type={type}
                        style={style}
                        className="form-control"
                        placeholder={placeholder}
                        name={name}
                            onChange={onChange}
                            value={value}
                    />
                    <div
                        className="text-danger"
                        style={{
                            fontSize: '10pt',
                        }}
                    >
                        {error}
                    </div>
                </>
            )}
        </>
    );
};
TextBox.prototype = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
};

TextBox.defaultProps = {
    type: 'text',
    style: { borderRadius: '3px' },
};

export const PasswordField = ({ type, placeholder, name, style }) => {
    const { errors, touched, handleChange } = useFormikContext();
    const [types, setTypes] = useState(type);
    //setTypes(type);

    const handleClick = () => setTypes(types ? false : true);

    return (
        <div style={{ flex: 1}}>
            {console.log(types)}
            <div id="passwordbox">
                <input
                    type={types ? 'password' : 'text'}
                    id={name}
                    style={{ paddingRight: '30px' }}
                    className="form-control"
                    placeholder={placeholder}
                    name={name}
                    onChange={handleChange(name)}
                />{' '}
                {/* <i
          id="icon"
          onClick={handleClick}
          className={types ? "fa fa-eye" : "fa fa-eye-slash"}
        /> */}
                <ion-icon
                    id="icon"
                    onClick={handleClick}
                    name={types ? 'eye' : 'eye-off'}
                ></ion-icon>
            </div>

            <div
                className="text-danger"
                style={{
                    fontSize: '10pt',
                }}
            >
                {errors[name] && touched[name] && errors[name]}
            </div>
        </div>
    );
};

PasswordField.prototype = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
};

PasswordField.defaultProps = {
    type: 'text',
    style: { borderRadius: '5px' },
};
<script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>;
