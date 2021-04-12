import React, { Component } from 'react';
import Select from 'react-select';
import DropDown from '../global/DropDown';
import { TextBox } from '../global/TextBox';
import {} from '@fortawesome/free-regular-svg-icons';
import {
    GetFabricationServices,
    GetMaterialFromFabrication,
} from '../global/GlobalFunction';

var services = [];
class ManufacturerServiceSelect extends Component {
    state = {
        selectedFabrication: '',
        selectedMaterial: '',
        thickness: '',
        costUnit: '',
        unitRate: '',
        fabricationError: '',
        materialError: '',
        thicknessError: '',
        costUnitError: '',
        unitRateError: '',
        fabricationServiceList: [],
        materialList: [],
        thicknessList: [
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
        ],

        costUnitList: [
            {
                value: 1,
                label: 'Gram',
            },
            {
                value: 2,
                label: 'Kg',
            },
            {
                value: 3,
                label: 'Sq.feet',
            },
            {
                value: 3,
                label: 'Minute',
            },
            {
                value: 3,
                label: 'Cubic Inch',
            },
        ],
        delivery: [
            {
                value: 1,
                label: 'Within 20km^2',
            },
            {
                value: 2,
                label: 'All Nepal',
            },
            {
                value: 3,
                label: 'Pickup',
            },
        ],
        acceptedFiles: [
            {
                value: 1,
                label: 'pdf',
            },
            {
                value: 2,
                label: 'jpeg',
            },
            {
                value: 3,
                label: 'dxf',
            },
            {
                value: 3,
                label: 'stl',
            },
            {
                value: 3,
                label: 'obj',
            },
            {
                value: 3,
                label: 'step',
            },
            {
                value: 3,
                label: 'til',
            },
        ],
    };

    componentDidMount() {
        GetFabricationServices((err, fabricationServices) => {
            if (!err)
                this.setState({ fabricationServiceList: fabricationServices });
        });
    }

    handleOnFabricationServiceChange = (e) => {
        this.setState({ selectedFabrication: e });
        if (e) {
            const serviceID = e.Service_ID;
            GetMaterialFromFabrication(serviceID, (err, materials) => {
                if (!err) {
                    this.setState({
                        materialList: materials,
                        selectedMaterial: materials[0],
                    });
                }
            });
        } else {
            this.setState({
                materialList: [],
                selectedMaterial: [],
            });
        }
        this.setState({ fabricationError: '' });
    };

    handleOnMaterialChange = (e) => {
        console.log(e);
        this.setState({ selectedMaterial: e, materialError: '' });
    };

    handleOnCostUnitChange = (e) => {
        this.setState({ costUnitError: '' });
        this.setState({ costUnit: e });
    };

    handleOnThicknessChange = (e) => {
        this.setState({ thicknessError: '' });
        this.setState({ thickness: e });
    };

    handleOnUnitRateChange = (e) => {
        this.setState({ unitRateError: '' });
        this.setState({
            unitRate: e.target.value,
        });
    };

    onClickAdd = () => {
        var {
            selectedFabrication,
            selectedMaterial,
            thickness,
            costUnit,
            unitRate,
            error,
        } = this.state;
        if (
            !selectedFabrication ||
            !selectedMaterial ||
            !thickness ||
            !costUnit ||
            !unitRate
        ) {
            if (!selectedFabrication) {
                this.setState({ fabricationError: 'Required!!!' });
            }
            if (!selectedMaterial) {
                this.setState({ materialError: 'Required!!!' });
            }
            if (!thickness) {
                this.setState({ thicknessError: 'Required!!!' });
            }
            if (!unitRate) {
                this.setState({ unitRateError: 'Required!!!' });
            }
            if (!costUnit) {
                this.setState({ costUnitError: 'Required!!!' });
            }
        } else {
            var data = {
                selectedFabrication,
                materialDetails: [
                    {
                        selectedMaterial,
                        thickness,
                        costUnit,
                        unitRate,
                    },
                ],
            };
            var mateiralExist = false;
            var serviceExist = false;
            if (services.length > 0) {
                services.map((service, index) => {
                    if (
                        data.selectedFabrication === service.selectedFabrication
                    ) {
                        serviceExist = true;
                        service.materialDetails.map((materialDetail) => {
                            if (
                                data.materialDetails[0].selectedMaterial ===
                                materialDetail.selectedMaterial
                            ) {
                                console.log('Already Added');
                                this.props.isExist(true);
                                return (mateiralExist = true);
                            }
                        });
                        if (!mateiralExist) {
                            return (service.materialDetails = service.materialDetails.concat(
                                data.materialDetails[0]
                            ));
                        }
                    }
                });
                if (!serviceExist) {
                    services = services.concat(data);
                }
            } else {
                services = services.concat(data);
            }

            if (this.props.profileEdit) {
                this.props.getAddedService(data);
            } else {
                console.log('hub', services);
                this.props.getService(services);
            }

            this.setState({
                selectedFabrication: '',
                selectedMaterial: '',
                thickness: '',
                costUnit: '',
                unitRate: '',
                error: '',
            });
        }
    };

    render() {
        const {
            fabricationServiceList,
            materialList,
            thicknessList,
            costUnitList,
            delivery,
            acceptedFiles,
            selectedFabrication,
            selectedMaterial,
            costUnit,
            unitRate,
            thickness,
        } = this.state;
        const style = {
            width: '100px',
        };

        const rowView = 'row m-1 d-flex justify-content-center';
        const colView = 'col-lg m-1';

        return (
            <div>
                <div className="row m-1 d-flex justify-content-center">
                    <div className="col-lg-2 pr-0 d-flex align-items-center">
                        <span className="font-weight-bold">
                            Fabrication Service:
                        </span>
                    </div>
                    <div className="col-lg-5 ">
                        <Select
                            isClearable="true"
                            name="fabricationService"
                            id="fabricationService"
                            options={fabricationServiceList}
                            onChange={this.handleOnFabricationServiceChange}
                            value={selectedFabrication}
                            getOptionLabel={(options) => options.Name}
                            getOptionValue={(options) => options.Service_ID}
                        />
                        <span
                            className="text-danger"
                            style={{
                                fontSize: '10pt',
                            }}
                        >
                            {this.state.fabricationError}
                        </span>
                    </div>
                </div>
                <div className={rowView}>
                    <div className={colView}>
                        <ServiceSelectView
                            label="Materials : "
                            options={materialList}
                            selectedValue={selectedMaterial}
                            onChange={this.handleOnMaterialChange}
                            getOptionLabel={(options) => options.Material_Name}
                            getOptionValue={(options) => options.Material_ID}
                            error={this.state.materialError}
                        />
                    </div>
                    <div className={colView}>
                        <ServiceSelectView
                            label="Thickness :"
                            options={thicknessList}
                            onChange={this.handleOnThicknessChange}
                            selectedValue={thickness}
                            error={this.state.thicknessError}
                        />
                    </div>
                    <div className={colView}>
                        <ServiceSelectView
                            label="CostUnit :"
                            options={costUnitList}
                            onChange={this.handleOnCostUnitChange}
                            selectedValue={costUnit}
                            error={this.state.costUnitError}
                        />
                    </div>
                </div>
                <div className={rowView}>
                    <div className={colView}>
                        <TextBox
                            label="Unit Rate :"
                            name="unitRate"
                            onChange={this.handleOnUnitRateChange}
                            value={unitRate}
                            error={this.state.unitRateError}
                        />
                    </div>
                    <div className={colView}>
                        <TextBox label="MoQ :" name="moq" />
                    </div>
                    <div className={colView}>
                        <ServiceSelectView
                            label="Accepted Files :"
                            options={acceptedFiles}
                            //onChange={this.handleOnCostUnitChange}
                            //selectedValue={costUnit}
                        />
                    </div>
                </div>
                <div className={rowView}>
                    <div className={colView}>
                        <TextBox label="Lead Time :" name="leadTime" />
                    </div>
                    <div className={colView}>
                        <ServiceSelectView
                            label="Delivery :"
                            options={delivery}
                        />
                    </div>
                </div>
                <div className={rowView}>
                    <div className="col-lg d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-primary btn-small"
                            onClick={this.onClickAdd}
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* <DragAndDrop
          title="Upload Photos"
          fileNote="jpeg, png, and other image file format"
          requirementNote="Image size must not be greater than 10 MB"
          accept="Image/*"
        /> */}
            </div>
        );
    }
}

export default ManufacturerServiceSelect;

const ServiceSelectView = (props) => {
    return (
        <div className="row">
            <div className="col-lg-4 d-flex align-items-center">
                <span className="font-weight-bold">{props.label}</span>
            </div>
            <div className="col-lg">
                <DropDown {...props} />
                <span
                    className="text-danger"
                    style={{
                        fontSize: '10pt',
                    }}
                >
                    {props.error}
                </span>
            </div>
        </div>
    );
};
