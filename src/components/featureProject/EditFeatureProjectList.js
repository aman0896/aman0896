import React from 'react';
import '../main/style.css';
import { useState, useEffect } from 'react';
import './feature.css';
import { useHistory, useLocation } from 'react-router-dom';
import '../form/registrationPage.css';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import { GetCookiesInfo } from '../global/GlobalFunction';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalDelete from './ModalDelete';

const localIpUrl = require('local-ip-url');
const ipAddress = localIpUrl('public');

const cookies = new Cookies();

function EditFeatureProjectList(props) {
    const [featureProject, setfeatureProject] = useState([]);
    const [search, setsearch] = useState();
    const [flag, setflag] = useState(false);
    const [path, setpath] = useState();
    const location = useLocation();
    const history = useHistory();
    var cookieData = cookies.get('userInfo');
    const { customerID } = GetCookiesInfo();
    console.log(customerID);
    const [showModal, setShowModal] = useState(false);
    const [ProjectID, setProjectID] = useState();

    var dateObj;
    var dateString;
    var projectList;
    var files;

    var filterProjectList;
    useEffect(() => {
        axios.get(`${window.host}/feature-project`).then((response) => {
            if (response.data) {
                console.log(response.data);
                projectList = response.data;
                console.log(projectList);
                filterProjectList = projectList.filter(
                    (data) => data.Customer_ID == customerID
                );
                console.log(filterProjectList);
                setfeatureProject(filterProjectList);
            }
        });
    });
    const onClickReadMore = (ID, title) => {
        const { match } = props;
        const name = title;
        const id = ID;
        console.log(name, id, match);
        window.location.href = `edit-projectlist/${id}/${name}`;
    };

    const searchSpace = (event) => {
        let keyword = event.target.value;
        setsearch(keyword);
    };

    const onClickDelete = (Project_ID) => {
        console.log('delete');
        setShowModal(true);
        setProjectID(Project_ID);
    };
    const handleDelete = () => {
        axios
            .post(`${window.host}/delete-project`, {
                id: ProjectID,
            })
            .then((response) => {
                console.log('data');
                //setShowModal(false);
                window.location.href = '/edit-projectlist';
            });
    };

    const onClickEdit = (Project_ID) => {
        console.log('edit');
        history.push({
            pathname: '/edit-project',
            state: Project_ID,
        });

        window.location.href = '/edit-project';
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
                files = JSON.parse(project.Image);
                console.log(files);
            }

            return (
                <div className="col-xs p-2" key={project.Project_ID}>
                    <div
                        className="card "
                        style={{
                            width: '300px',

                            height: '450px',

                            borderRadius: '10px',
                            boxShadow: '2px 2px 2px	#A9A9A9',
                        }}
                    >
                        <div>
                            <div>
                                <img
                                    className="card-img-top"
                                    src={files.filePath}
                                    alt={files.fileName}
                                    style={{
                                        width: '100%',
                                        height: '180px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
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
                                    <div className="row m-auto">
                                        <div className="col-10 p-0 m-0 card-title">
                                            {project.Title}
                                        </div>
                                        <div
                                            className="col-2 p-0 m-0"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <span
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Edit"
                                                onClick={() =>
                                                    onClickEdit(
                                                        project.Project_ID
                                                    )
                                                }
                                            >
                                                {' '}
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    size="sm"
                                                />
                                            </span>
                                            <span
                                                className="ml-2 text-danger"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Delete"
                                                onClick={() =>
                                                    onClickDelete(
                                                        project.Project_ID
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    size="sm"
                                                />
                                            </span>
                                        </div>
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
                <div
                    style={{ flex: 1, marginBottom: '20px', marginTop: '20px' }}
                >
                    <div id="searchbar">
                        <input
                            className="form-control"
                            type="text"
                            title="Search"
                            placeholder="Search by date, manufacturing process, material"
                            style={{ paddingRight: '60px' }}
                            onChange={(e) => searchSpace(e)}
                        />{' '}
                        <i id="search" className="fa fa-search"></i>
                    </div>
                </div>
                <div className="row pl-4 pt-2">{list}</div>
            </div>
            <ModalDelete
                showModal={showModal}
                handleClose={() => {
                    setShowModal(false);
                }}
                Project_ID={ProjectID}
            />
        </div>
    );
}

export default EditFeatureProjectList;
