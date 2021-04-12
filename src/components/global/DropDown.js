import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const DropDown = ({
    placeholder,
    ID,
    options,
    onChange,
    selectedValue,
    getOptionLabel,
    getOptionValue,
    multipleSelect,
}) => {
    const style = { borderRadius: '3px' };
    return (
        <Select
            placeholder={placeholder}
            styles={style}
            value={selectedValue}
            isClearable="true"
            id={ID}
            options={options}
            onChange={onChange}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isMulti={multipleSelect}
        />
    );
};

DropDown.prototype = {};

DropDown.defaultProps = {
    className: 'text-dark',
    isClearable: 'true',
};

export default DropDown;
