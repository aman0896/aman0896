import React, { Component } from "react";
import Select from "react-select";
import DropDown from "../global/DropDown";
import Dropzone from "../global/Dropzone";
import { ManufacturerPageView } from "../form/ManufacturerSignup";
import { TextBox } from "../global/TextBox";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {} from "@fortawesome/free-regular-svg-icons";
// import {
//   faCaretDown,
//   faMinus,
//   faChevronCircleUp,
//   faChevronCircleDown,
// } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

var services = [];
class ManufacturerServiceSelect extends Component {
  state = {
    fabricationService: "",
    material: "",
    thickness: "",
    costUnit: "",
    unitRate: "",
    list: "",
    fabricationError: "",
    materialError: "",
    thicknessError: "",
    costUnitError: "",
    unitRateError: "",
    services: [],

    fabricationServiceList: [
      {
        value: 1,
        label: "3D Printing",
      },
      {
        value: 2,
        label: "CNC Carving",
      },
      {
        value: 3,
        label: "Laser Cutting",
      },
    ],
    thicknessList: [
      {
        value: 1,
        label: "5 mm",
      },
      {
        value: 2,
        label: "10 mm",
      },
      {
        value: 3,
        label: "15 mm",
      },
    ],
    materialList: [
      {
        value: 1,
        label: "Aluminium",
      },
      {
        value: 2,
        label: "Plastic",
      },
      {
        value: 3,
        label: "Metal",
      },
    ],
    costUnitList: [
      {
        value: 1,
        label: "Gram",
      },
      {
        value: 2,
        label: "Kg",
      },
      {
        value: 3,
        label: "Sq.feet",
      },
      {
        value: 3,
        label: "Minute",
      },
      {
        value: 3,
        label: "Cubic Inch",
      },
    ],
    delivery: [
      {
        value: 1,
        label: "Within 20km^2",
      },
      {
        value: 2,
        label: "All Nepal",
      },
      {
        value: 3,
        label: "Pickup",
      },
    ],
    otherServices: [
      {
        id: 1,
        label: "Design",
      },
      {
        id: 2,
        label: "ProtoTyping",
      },
      {
        id: 3,
        label: "Others",
      },
    ],
    acceptedFiles: [
      {
        value: 1,
        label: "pdf",
      },
      {
        value: 2,
        label: "jpeg",
      },
      {
        value: 3,
        label: "dxf",
      },
      {
        value: 3,
        label: "stl",
      },
      {
        value: 3,
        label: "obj",
      },
      {
        value: 3,
        label: "step",
      },
      {
        value: 3,
        label: "til",
      },
    ],
  };

  handleOnFabricationServiceChange = (e) => {
    this.setState({ fabricationError: "" });

    this.setState({ fabricationService: e });
  };

  handleOnMaterialChange = (e) => {
    this.setState({ materialError: "" });
    this.setState({ material: e });
  };

  handleOnCostUnitChange = (e) => {
    this.setState({ costUnitError: "" });
    this.setState({ costUnit: e });
  };

  handleOnThicknessChange = (e) => {
    this.setState({ thicknessError: "" });
    this.setState({ thickness: e });
  };

  handleOnUnitRateChange = (e) => {
    this.setState({ unitRateError: "" });
    this.setState({
      unitRate: e.target.value,
    });
  };

  onClickAdd = () => {
    var {
      fabricationService,
      material,
      thickness,
      costUnit,
      unitRate,
      error,

    } = this.state;
    if (
      !fabricationService ||
      !material ||
      !thickness ||
      !costUnit ||
      !unitRate
    ) {
      if (!fabricationService) {
        this.setState({ fabricationError: "Required!!!" });
      }
      if (!material) {
        this.setState({ materialError: "Required!!!" });
      }
      if (!thickness) {
        this.setState({ thicknessError: "Required!!!" });
      }
      if (!unitRate) {
        this.setState({ unitRateError: "Required!!!" });
      }
      if (!costUnit) {
        this.setState({ costUnitError: "Required!!!" });
      }
    } else {
      var data = {
        fabricationService,
        materialDetails: [
          {
            material,
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
          if (data.fabricationService === service.fabricationService) {
            serviceExist = true;
            service.materialDetails.map((materialDetail) => {
              if (
                data.materialDetails[0].material === materialDetail.material
              ) {
                console.log("Already Added");
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
        this.props.getService(services);
      }

      this.setState({
        fabricationService: "",
        material: "",
        thickness: "",
        costUnit: "",
        unitRate: "",
        error: "",
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
      otherServices,
      acceptedFiles,
      fabricationService,
      material,
      costUnit,
      unitRate,
      thickness,
    } = this.state;
    const style = {
      width: "100px",
    };

    const rowView = "row m-1 d-flex justify-content-center";
    const colView = "col-lg m-1";

    return (
      <div>
        <div className="row m-3 d-flex justify-content-center">
          <div className="col-lg-2 d-flex align-items-center">
            <span className="font-weight-bold">Fabrication Service:</span>
          </div>
          <div className="col-lg-4">
            <Select
              isClearable="true"
              name="fabricationService"
              id="fabricationService"
              options={fabricationServiceList}
              onChange={this.handleOnFabricationServiceChange}
              value={fabricationService}
            />
            <span
              className="text-danger"
              style={{
                fontSize: "10pt",
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
              ID="materials"
              options={materialList}
              selectedValue={material}
              onChange={this.handleOnMaterialChange}
              error={this.state.materialError}
            />
          </div>
          <div className={colView}>
            <ServiceSelectView
              label="Thickness :"
              ID="thickness"
              options={thicknessList}
              onChange={this.handleOnThicknessChange}
              selectedValue={thickness}
              error={this.state.thicknessError}
            />
          </div>

          <div className={colView}>
            <ServiceSelectView
              label="CostUnit :"
              ID="costUnit"
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
              ID="acceptedFiles"
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
              ID="acceptedFiles"
              options={delivery}
            />
          </div>

          <div className={colView}>
            <ServiceSelectView
              label="OtherServices :"
              ID="otherServices"
              options={otherServices}
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


      </div>
    );
  }
}

export default ManufacturerServiceSelect;

export function ServiceSelectView({
  label,
  placeholder,
  selectedValue,
  ID,
  options,
  onChange,
  getOptionLabel,
  getOptionValue,
  multipleSelect,
  error,
}) {
  return (
    <div className="row">
      <div className="col-4 d-flex align-items-center">
        <span className="font-weight-bold">{label}</span>
      </div>
      <div className="col">
        <DropDown
          placeholder={placeholder}
          value={selectedValue}
          id={ID}
          options={options}
          onChange={onChange}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          multipleSelect={multipleSelect}
        />
        <span
          className="text-danger"
          style={{
            fontSize: "10pt",
          }}
        >
          {error}
        </span>
      </div>
    </div>
  );
}
