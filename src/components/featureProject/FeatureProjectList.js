import React from 'react';

import '../main/style.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './feature.css';
import { useHistory, useLocation } from 'react-router-dom';
import '../form/registrationPage.css';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');
import ReactHtmlParser from 'react-html-parser';
import { GetCookiesInfo } from '../global/GlobalFunction';
import axios from 'axios';
import '../global/card.css';

function FeatureProjectList(props) {
    const [featureProject, setfeatureProject] = useState([]);
    const [search, setsearch] = useState();
    const [flag, setflag] = useState(false);
    const [path, setpath] = useState();

    var dateObj;
    var dateString;
    var projectList;
    var bool;
    var filterProjectList;
    useEffect(() => {
        Axios.get(`http://${ipAddress}:3001/feature-project`).then(
            (response) => {
                if (response.data) {
                    console.log(response.data);
                    setfeatureProject(response.data);
                }
            }
        );
    }, []);
    const onClickReadMore = (ID, title) => {
        const { match } = props;
        const name = title;
        const id = ID;
        console.log(name, id, `${match.path}/${id}/${name}`);
        window.location.href = `${match.path}/${id}/${name}`;
    };

    const searchSpace = (event) => {
        let keyword = event.target.value;
        setsearch(keyword);
    };

    let FilesData = '';
    var list = featureProject
        .filter((data) => {
            if (search == null) return data;
            else if (
                data.Material.toLowerCase().includes(search.toLowerCase()) ||
                data.Fabrication_Process.toLowerCase().includes(
                    search.toLowerCase()
                ) ||
                data.Title.toLowerCase().includes(search.toLowerCase())
            ) {
                console.log(data);
                return data;
            }
        })
        .map((project, index) => {
            if (project.Files) {
                var files = JSON.parse(project.Files);
                var FileName = files[1].fileName;
                var FilePath = files[1].filePath;
            }
            if (project.Files) {
                var files = JSON.parse(project.Image);
                var ImageFileName = files.fileName;
                var ImageFilePath = files.filePath;
            }

            return (
                <div className="col-xs p-2" key={project.Project_ID}>
                    <div
                        className="card "
                        style={{
                            //background: "#3e3d3d",
                            width: '300px',
                            //borderRadius: "2%",
                            height: '450px',
                            // backgroundColor: "lightgray",
                            // border: "5pt solid white",
                            borderRadius: '5px',
                            boxShadow: '2px 2px 2px	#A9A9A9',
                        }}
                    >
                        <div>
                            {console.log(flag)}

                            <div>
                                <img
                                    className="card-img-top"
                                    src={ImageFilePath}
                                    alt={ImageFileName}
                                    //width={300}
                                    // height={200}
                                    style={{
                                        width: '100%',
                                        height: '180px',
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '5px',
                                    }}
                                />
                                <div
                                    className="p-2"
                                    style={{
                                        maxHeight: '250px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    <div className="card-title">
                                        {project.Title}
                                    </div>
                                    <div className="email">{project.Email}</div>
                                    <div className="date">
                                        {
                                            ((dateObj = new Date(project.Date)),
                                            (dateString = dateObj.toLocaleDateString()))
                                        }
                                    </div>
                                    <div className="hr-line" />
                                    <div className="body-view">
                                        <div className="sub-title">
                                            Process:
                                        </div>
                                        <div className="body-text">
                                            {project.Fabrication_Process}
                                        </div>
                                        <div className="sub-title">
                                            Material:
                                        </div>
                                        <div className="material-title">
                                            <div className="body-text">
                                                {project.Material}
                                            </div>
                                        </div>
                                        <div className="sub-title">
                                            Summary:
                                        </div>
                                        <div className="body-text">
                                            {ReactHtmlParser(project.Summary)}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            position: 'absolute',
                                            alignItems: 'center',
                                            bottom: 0,

                                            cursor: 'pointer',
                                            marginRight: '1rem',
                                            color: '#007bff',
                                        }}
                                        onClick={() =>
                                            onClickReadMore(
                                                project.Project_ID,
                                                project.Title
                                            )
                                        }
                                    >
                                        <span
                                            id="readmore"
                                            //className="text-primary"
                                        >
                                            {'Read More'}
                                        </span>
                                        <span className="mt-1 ml-1">
                                            {' '}
                                            <i className="fas fa-angle-double-right fa-1x"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

    return (
        <div style={{ backgroundColor: 'lightgray', minHeight: '95vh' }}>
            <div
                className="style"
                style={{
                    paddingLeft: '50px',
                    backgroundColor: 'lightgray',
                    overflowX: 'hidden',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                }}
            >
                {/* <form
                    class="example"
                    // action="/action_page.php"
                    style={{ margin: 'auto', maxWidth: '500px' }}
                >
                    <input
                        type="text"
                        placeholder="Search by date, manufacturing process, material"
                        name="search2"
                        onChange={(e) => searchSpace(e)}
                    />
                    <button type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </form> 
                {/* <div
                    className="bar"
                    style={{ margin: 'auto', maxWidth: '500px' }}
                >
                    <input
                        class="searchbar"
                        type="text"
                        title="Search"
                        placeholder="Search by date, manufacturing process, material"
                    ></input>
                    <i class="fa fa-search" id="search"></i>
                </div> */}

                {/* <div class="row">
                    <div class="col-md-12 col-xs-12">
                        <div class="searchbar">
                            <div class="form-group ">
                                <input
                                    type="text"
                                    className="bar"
                                    placeholder="Search by date, manufacturing process, material"
                                    style={{
                                        width: '400px',
                                        height: '44px',
                                        outline: 'none',
                                    }}
                                    className="form-control"
                                />
                                <a href="#">
                                    <i
                                        style={{
                                           // marginLeft: '1px',
                                            top: '-30px',
                                        }}
                                        className="fa fa-search"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div
                    style={{ flex: 1, marginBottom: '20px', marginTop: '20px' }}
                >
                    <div id="searchbar">
                        <input
                            className="form-control"
                            type="text"
                            title="Search"
                            placeholder="Search by date, manufacturing process, material"
                            style={{
                                outline: 'none',
                            }}
                            onChange={(e) => searchSpace(e)}
                        />{' '}
                        <i id="search" className="fa fa-search"></i>
                    </div>
                </div>

                <div className="row pl-4 pt-2">
                    {list}
                    {/* {featureProject.map((item) => (
          <div className="col-xs p-2" key={item.id}>
            {item.Files != null
              ? console.log(item.Files[0].fileName)
              : console.log("null")}
            <div
              className="card"
              style={{
                //background: "#3e3d3d",
                width: "300px",
                //borderRadius: "2%",
                height: "555px",
                backgroundColor: "#b3d9ff",
                border: "2px solid",
                borderRadius: "3%",
                boxShadow: "2px 2px 2px	#A9A9A9",
              }}
            >
              <div>
                <div>
                  <img
                    className="card-img-top p-2"
                    src={item.FileURL}
                    alt={item.FileName}
                    style={{
                      width: "100%",
                      height: "200px",
                      borderBottom: "2px solid",
                      borderRight: "2px solid",
                      borderRadius: "3%",
                      boxShadow: "5px 5px 5px	#A9A9A9",
                    }}
                  />
                  <div className="pl-2 pt-2 ">
                    <h5
                      style={{
                        // color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </h5>
                    <h6>{item.userinfo}</h6>{" "}
                    <h6>
                      {
                        ((dateObj = new Date(item.date)),
                        (dateString = dateObj.toLocaleDateString()))
                      }
                    </h6>
                    <span className="font-weight-bold">Summary:</span>{" "}
                    <p className="a" style={{ height: "60px" }}>
                      {ReactHtmlParser(item.summary)}
                    </p>
                    <span className="font-weight-bold">Process:</span>{" "}
                    <span style={{ display: "block", height: "10px" }}>
                      {" "}
                      {item.process}
                    </span>
                    <br />
                    <span className="font-weight-bold">Material:</span>{" "}
                    <span style={{ display: "block", height: "10px" }}>
                      {" "}
                      {item.material}
                    </span>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
              <span id="readmore">
                <text
                  className="text-primary"
                  href=""
                  onClick={() => onClickReadMore(item.id)}
                >
                  {"Read More..>>"}
                </text>
              </span>
            </div>
          </div>
        ))} */}
                </div>
                {/* <div style={{backgroundColor:"lightgray",paddingTop:"30px"}}></div> */}
            </div>
        </div>
    );
}

export default FeatureProjectList;
