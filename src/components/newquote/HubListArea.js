import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import CardView from '../global/card';

var list = null;
function HubListArea({ title, HubList }) {
    const [selectedCardIndex, setSelectedCardIndex] = useState('');
    const [search, setsearch] = useState();
    var companyList = [];

    // console.log(Hublist.hublist);
    if (HubList) {
        companyList = HubList.hublist;
        console.log(companyList);
    }

    const onClickVisitProfile = (currentHub, services) => {
        const manufacturerInfo = { currentHub, services };
        const name = currentHub.Company_Name;
        const id = currentHub.Manufacturer_ID;

        window.location.href = `/manufacturer-list/${id}/${name}`;
    };

    const searchSpace = (event) => {
        let keyword = event.target.value;
        setsearch(keyword);
    };

    if (companyList && companyList.length > 0) {
        let serviceData = '';
        // console.log(companyList.Logo);
        //var filesData = JSON.parse(companyList.Logo);

        list = companyList
            .filter((data) => {
                if (search == null) return data;
                else if (
                    data.Company_Name.toLowerCase().includes(
                        search.toLowerCase()
                    ) ||
                    data.Address.toLowerCase().includes(search.toLowerCase())
                ) {
                    console.log(data);
                    return data;
                }
            })
            .map((company, index) => {
                if (company.Material_Name) {
                    var services = JSON.parse(company.Material_Name);
                    serviceData = services.map((service) => {
                        return (
                            <span className="text-wrap" key={service.value}>
                                {service.label},{' '}
                            </span>
                        );
                    });
                }

                if (selectedCardIndex === index) {
                    var selected = true;
                } else {
                    selected = false;
                }

                return (
                    <div key={index}>
                        <CardView
                            // files={filesData}
                            services={serviceData}
                            currentHub={company}
                            currentIndex={index}
                            companyList={companyList}
                            visitProfile={onClickVisitProfile}
                            selected={selected}
                            setSelected={setSelectedCardIndex}
                        />
                    </div>
                );
            });
    } else {
        list = (
            <div className="container">
                <h4 className="text-secondary d-flex justify-content-center align-items-center">
                    NO HUB FOUND
                </h4>
            </div>
        );
    }

    return (
        <div>
            <div className="col-sm">
                <h5>{title}</h5>
            </div>
            {companyList && companyList.length > 0 && (
                <div
                    style={{ flex: 1, marginBottom: '20px', marginTop: '20px' }}
                >
                    <div id="searchbar">
                        <input
                            className="form-control"
                            type="text"
                            title="Search"
                            placeholder="Search by location, Name"
                            style={{
                                paddingRight:"40px"
                            }}
                            onChange={(e) => searchSpace(e)}
                        />{' '}
                        <i id="search" className="fa fa-search"></i>
                    </div>
                </div>
            )}
            <div className="container">
                <Scrollbars
                    className="text-dark"
                    style={{
                        width: '100%',
                        height: 350,
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        borderColor: 'darkgrey',
                        borderWidth: '1px',
                    }}
                    autoHide
                >
                    {list != null && (
                        <div className="row mt-3 ml-auto">{list}</div>
                    )}
                </Scrollbars>
            </div>
        </div>
    );
}

export default HubListArea;
