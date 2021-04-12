import Axios from 'axios';
import React, { Component } from 'react';
import { ManufacturingHubListView } from '../global/card';
import '../main/style.css';

class ManufacturingHubsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredHubs: [],
            serviceList: [],
            search: '',
        };
    }

    componentDidMount() {
        //#region Get all Registered Hubs and Its services
        Axios.post('http://localhost:3001/registeredhubs').then((response) => {
            if (response.data) {
                const { manufacturerList, serviceList } = response.data;
                manufacturerList.map((hub) => {
                    var services = [];
                    serviceList.map((service) => {
                        if (hub.Manufacturer_ID == service.Manufacturer_ID) {
                            services = services.concat(service);
                            hub.services = services;
                            return hub;
                        }
                    });
                });
                this.setState({
                    registeredHubs: manufacturerList,
                    serviceList: serviceList,
                });
            }
        });
        //#endregion
    }
    onClickReadMore = (currentHub, services) => {
        const { match } = this.props;
        const name = currentHub.Company_Name;
        const id = currentHub.Manufacturer_ID;
        window.location.href = `${match.path}/${id}/${name}`;
    };

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword });
    };

    render() {
        const { registeredHubs, serviceList, search } = this.state;
        var materials;
        return (
            <div
                className="style"
                style={{
                    paddingLeft: '50px',
                    backgroundColor: 'lightgray',
                    overflowX: 'hidden',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    height: '95vh',
                }}
            >
                {console.log('sdsad', registeredHubs)}
                {/* <form
          class="example"
          // action="/action_page.php"
          style={{ margin: "auto", maxWidth: "500px" }}
        >
          <input
            type="text"
            placeholder="Search by hubs,location "
            name="search2"
            onChange={(e) => this.searchSpace(e)}
          />

          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form> */}
                <div
                    style={{ flex: 1, marginBottom: '20px', marginTop: '20px' }}
                >
                    <div id="searchbar">
                        <input
                            className="form-control"
                            type="text"
                            title="Search"
                            placeholder="Search by hubs, location, process, material"
                            style={{
                                outline: 'none',
                            }}
                            onChange={(e) => this.searchSpace(e)}
                        />{' '}
                        <i id="search" className="fa fa-search"></i>
                    </div>
                </div>

                <div className="row pl-4 pt-2">
                    <ManufacturingHubListView />
                    {registeredHubs
                        .filter((data) => {
                            if (search == null) return data;
                            else if (
                                data.Company_Name.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                data.Email.toLowerCase().includes(
                                    search.toLowerCase()
                                )
                            ) {
                                //console.log(data);
                                return data;
                            } else {
                                var result;
                                if (data.services) {
                                    data.services.filter((service) => {
                                        if (
                                            service.Name.toLowerCase().includes(
                                                search.toLowerCase()
                                            )
                                        ) {
                                            console.log('data', data);
                                            result = data;
                                        }
                                    });
                                }
                                if (result) return result;
                            }
                        })
                        .map((registeredHub, index) => {
                            //#region Geting servicelist of current hub
                            var materialList = [];
                            var materialExist = false;
                            console.log('service', serviceList);
                            serviceList.forEach((service) => {
                                if (
                                    registeredHub.Manufacturer_ID ===
                                    service.Manufacturer_ID
                                ) {
                                    materials = JSON.parse(
                                        service.Material_Name
                                    );
                                    console.log('mm', service.Material_Name);

                                    // if (materials.length > 0) {
                                    //     materials.forEach((material) => {
                                    //         if (materialList.length > 0) {
                                    //             materialList.forEach((item) => {
                                    //                 if (
                                    //                     material.label ===
                                    //                     item.label
                                    //                 ) {
                                    //                     materialExist = true;
                                    //                 }
                                    //             });
                                    //         }
                                    //         if (!materialExist) {
                                    //             materialList = materialList.concat(
                                    //                 material
                                    //             );
                                    //         }
                                    //         materialExist = false;
                                    //     });
                                    // }
                                }
                            });
                            //#endregion

                            return (
                                <div key={index}>
                                    {console.log('material', materials)}
                                    <ManufacturingHubListView
                                        key={registeredHub.ID}
                                        registeredHub={registeredHub}
                                        serviceList={serviceList}
                                        materialList={materials}
                                        index={index}
                                        readMore={this.onClickReadMore}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

export default ManufacturingHubsView;
