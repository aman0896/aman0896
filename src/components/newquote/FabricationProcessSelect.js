import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import DropDown from '../global/DropDown';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

function FabricationProcessSelect({ title, parentCallback }) {
    const thickness = [
        {
            value: 1,
            label: '5 mm',
        },
        {
            value: 2,
            label: '10 mm',
        },
        {
            value: 3,
            label: '15 mm',
        },
    ];

    const quantity = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
    ];

    const [selectedFabrication, setfabricationlabel] = useState();
    const [selectedMaterial, setSelectedMaterial] = useState();
    const [fabricationService, setFabricationService] = useState();
    const [materials, setMaterials] = useState();
    const [selectedThickness, setSelectedThickness] = useState();
    const [selectedQuantity, setSelectedQuantity] = useState();
    const [hublist, setHubList] = useState();

    const onFabricationServiceChange = (obj) => {
        setfabricationlabel(obj);
        if (obj != null) {
            axios
                .post(`http://${window.host}/materials`, {
                    fabricationID: obj.Service_ID,
                })
                .then((response) => {
                    if (response.data) {
                        setSelectedMaterial(response.data[0]);
                        setMaterials(response.data);
                    }
                });
        } else {
            setSelectedMaterial(null);
            setMaterials();
        }

        if (obj != null) {
            console.log(obj);
            axios
                .post(`http://${window.host}/hublist`, {
                    fabricationService: obj.Name,
                })
                .then((response) => {
                    if (response.data.length > 0) {
                        setHubList(response.data);
                    } else {
                        setHubList([]);
                    }
                });
        }
    };

    const onMaterialChange = (obj) => {
        setSelectedMaterial(obj);
    };

    const onthicknessChange = (obj) => {
        setSelectedThickness(obj);
    };

    const onQuantityChange = (obj) => {
        setSelectedQuantity(obj);
    };

    useEffect(() => {
        parentCallback({
            selectedFabrication,
            selectedMaterial,
            selectedThickness,
            selectedQuantity,
            hublist,
        });
    }, [
        selectedFabrication,
        selectedMaterial,
        selectedQuantity,
        selectedThickness,
        hublist,
    ]);

    useEffect(() => {
        axios
            .post(`http://${window.host}/fabricationservice`)
            .then((response) => {
                if (response.data) {
                    setFabricationService(response.data);
                }
            });
    }, []);

    return (
        <div className=" mt-1 text-nowrap">
            <div className="col-md">
                <h5>
                    {title}
                    <span style={{ color: 'red' }}>*</span>
                </h5>
            </div>
            <div className="row mt-3 ml-auto">
                <div className="col-md mb-1">
                    <DropDown
                        placeHolder="Select Fabrication..."
                        selectedValue={selectedFabrication}
                        ID="fabricationService"
                        options={fabricationService}
                        onChange={onFabricationServiceChange}
                        getOptionLabel={(options) => options.Name}
                        getOptionValue={(options) => options.Service_ID}
                    />
                </div>
                <div className="col-md mb-1">
                    <DropDown
                        placeholder="Select Material..."
                        selectedValue={selectedMaterial}
                        ID="materials"
                        options={materials}
                        onChange={onMaterialChange}
                        getOptionLabel={(options) => options.Material_Name}
                        getOptionValue={(options) => options.Material_ID}
                    />
                </div>
                <div className="col-md mb-1">
                    <DropDown
                        placeholder="Select Thickness..."
                        selectedValue={selectedThickness}
                        ID="thickness"
                        options={thickness}
                        onChange={onthicknessChange}
                    />
                </div>
                <div className="col-md mb-1">
                    <DropDown
                        placeholder="Enter Quantity..."
                        selectedValue={selectedQuantity}
                        ID="quantity"
                        options={quantity}
                        onChange={onQuantityChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default FabricationProcessSelect;
