import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { TextBox } from '../global/TextBox';
import './MaterialTag.css';
import { faTimesCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export default function OtherService({ getData }) {
    const [materialTags, setMaterialTags] = useState([]);
    const [newMaterial, setNewMaterial] = useState('');
    const [newFabService, setNewFabService] = useState();
    const [fabData, setFabData] = useState([]);
    const rowView = 'row m-1 d-flex justify-content-start align-items-center';

    const [errorService, SetErrorService] = useState();
    const [errormaterial, SetErrorMaterial] = useState();

    const handleOnChange = (e) => {
        try {
            SetErrorMaterial('');
            if (e.target.value == ',') {
                e.target.value = '';
            }
        } catch {}

        setNewMaterial(e.target.value);
    };

    const handleKeyDown = (e) => {
        SetErrorMaterial('');
        if ((e.keyCode === 13 || e.keyCode === 188) && e.target.value !== '') {
            let newMaterialTag = newMaterial.trim();
            if (materialTags.indexOf(newMaterialTag) === -1) {
                materialTags.push(newMaterialTag);
                setNewMaterial('');
            }
            e.target.value = '';
        }
    };

    const onRemoveMaterialTag = (tag) => {
        let i = materialTags.indexOf(tag);
        let tempMaterialTag = materialTags.filter((mTag) => mTag);
        tempMaterialTag.splice(i, 1);
        setMaterialTags(tempMaterialTag);
        setNewMaterial('');
    };

    const onhandleFabricationChange = (e) => {
        SetErrorService('');
        setNewFabService(e.target.value);
        console.log('hi', e.target.value);
    };

    const onClickAddBtn = () => {
        if (!newFabService || materialTags.length <= 0) {
            if (!newFabService) SetErrorService('Required!!');
            if (materialTags.length <= 0) SetErrorMaterial('Required!!');
        } else {
            console.log(newFabService, materialTags);
            let data = { serviceName: newFabService, materials: materialTags };

            const index = fabData.findIndex(
                (item) => item.serviceName == data.serviceName
            );
            if (index == -1) {
                fabData.push(data);
            }
            console.log('hello', fabData);
            setMaterialTags([]);
            getData(fabData);
        }
    };

    return (
        <div>
            <ViewFabData
                fabData={fabData}
                setFabData={setFabData}
                getData={getData}
            />
            <div className={rowView}>
                <div className="col-lg-2 pr-0  font-weight-bold">
                    Fabrication Service
                    <span className="col-sm-1 ml-1 p-0">:</span>
                </div>

                <div className="col-lg-4">
                    <TextBox
                        name="fabricationService"
                        onChange={onhandleFabricationChange}
                        value={newFabService}
                        error={errorService}
                    />
                </div>
            </div>

            <div className={rowView}>
                <div className="col-lg-2 pr-0 font-weight-bold">
                    Materials
                    <span className="col-sm-1 ml-1 p-0">:</span>
                </div>
                <div className="col-lg">
                    <div className="tags-input">
                        {materialTags.map((tag, index) => {
                            return (
                                <span key={index} className="tag">
                                    {tag}
                                    <FontAwesomeIcon
                                        className="ml-1"
                                        icon={faTimesCircle}
                                        onClick={() =>
                                            onRemoveMaterialTag(tag, index)
                                        }
                                    />
                                </span>
                            );
                        })}
                        <input
                            type="text"
                            onChange={handleOnChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Press Enter or Comma to add new Material"
                        />
                    </div>
                    {errormaterial && (
                        <div
                            className="text-danger"
                            style={{
                                fontSize: '10pt',
                            }}
                        >
                            {errormaterial}
                        </div>
                    )}
                </div>
            </div>
            <div className={rowView}>
                <div className="col-lg d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-primary btn-small mt-1"
                        onClick={onClickAddBtn}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export const ViewFabData = ({ fabData, setFabData, getData }) => {
    const onRemoveService = (item) => {
        const tempFabData = fabData.filter((item) => item);
        const index = tempFabData.indexOf(item);
        tempFabData.splice(index, 1);
        setFabData(tempFabData);
        getData(tempFabData);
        console.log('new', tempFabData);
    };
    var dataList;
    if (fabData) {
        dataList = fabData.map((item, index) => {
            return (
                <div className="row m-1" key={index}>
                    <div>
                        <div className="font-weight-bold m-1 text-primary">
                            {item.serviceName}
                            <span>
                                <FontAwesomeIcon
                                    className="ml-1 text-danger"
                                    style={{ cursor: 'pointer' }}
                                    icon={faTrashAlt}
                                    size="sm"
                                    onClick={() => onRemoveService(item)}
                                />
                            </span>
                        </div>
                        <div className="ml-3">
                            <ul
                                className="row m-auto"
                                style={{ listStyle: 'inside' }}
                            >
                                {item.materials.map((material, index) => {
                                    return (
                                        <div key={index}>
                                            <li className="mr-3">{material}</li>
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        });
    }
    return <div className="ml-2 mb-3">{dataList}</div>;
};

export const OtherServices = [
    {
        serviceName: 'Fiber Glass Resin Casting',
        materials: ['Silicone Mold', 'Resin ', 'Fiber Glass'],
    },
    {
        serviceName: 'Injection Molding',
        materials: [
            'Polypropylene (PP)',
            'HDPE ',
            'LDPE',
            'PVC',
            'Rubber/flexible',
            'ABS',
            'Nylon',
            'Polycarbonate (PC)',
            'Acryllic',
            'PET',
        ],
    },
    {
        serviceName: 'Investment Casting (Lost Wax)',
        materials: [
            'Copper',
            'Brass ',
            'Silver',
            'Gold',
            'Wax',
            'Special Alloys',
        ],
    },
];
