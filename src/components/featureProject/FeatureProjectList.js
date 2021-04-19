import React from 'react';
import '../main/style.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './feature.css';
import ReactHtmlParser from 'react-html-parser';
import '../global/card.css';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

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
    const [shadow, setShadow] = useState('1px 2px 5px	#A9A9A9');
    const [ID, setID] = useState();
    const [selected, setSelected] = useState(false);

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
    const onMouseEnter = (id) => {
        console.log('id', id);
        setID(id);
        // if (featureProject.Project_ID == id) setShadow('1px 3px 20px	#A9A9A9');
        //setColor("rgb(240,240,240)");
    };
    const onMouseLeave = (id) => {
        setID(0);
        setShadow('1px 2px 5px	#A9A9A9');
    };

    const onClickReadMore = (ID, title) => {
        setID(ID);
        //setSelected(true);
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
                            width: '300px',
                            height: '480px',
                            borderRadius: '5px',

                            boxShadow:
                                project.Project_ID == ID
                                    ? '10px 3px 20px #A9A9A9'
                                    : shadow,
                            borderColor:
                                project.Project_ID == ID ? '#A9A9A9' : '',
                            borderWidth: project.Project_ID == ID ? '3px' : '',
                        }}
                        onMouseEnter={() => onMouseEnter(project.Project_ID)}
                        onMouseLeave={() => onMouseLeave(project.Project_ID)}
                        onClick={() =>
                            onClickReadMore(project.Project_ID, project.Title)
                        }
                    >
                        <div>
                            <div>
                                <img
                                    className="card-img-top"
                                    src={ImageFilePath}
                                    alt={ImageFileName}
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
                                        maxHeight: '480px',
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
                                        <div className="body-text mb-3">
                                            {project.Fabrication_Process}
                                        </div>

                                        <div className="sub-title">
                                            Material:
                                        </div>
                                        <div className="material-title mb-3">
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
                                        <span id="readmore">{'Read More'}</span>
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
        <div style={{ minHeight: '95vh' }}>
            <div
                className="style"
                style={{
                    paddingLeft: '50px',
                    backgroundColor: 'lightgray',
                    overflowX: 'hidden',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    minHeight: '95vh'
                }}
            >
                <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <div id="searchbar">
                        <input
                            className="form-control"
                            type="text"
                            title="Search"
                            placeholder="Search by date, manufacturing process, material"
                            onChange={(e) => searchSpace(e)}
                            style={{ paddingRight: '60px' }}
                        />{' '}
                        <i id="search" className="fa fa-search"></i>
                    </div>
                </div>
                <div className="row pl-4 pt-2">{list}</div>
            </div>
        </div>
    );
}

export default FeatureProjectList;
