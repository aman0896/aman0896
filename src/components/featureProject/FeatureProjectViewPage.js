import React, { Component } from 'react';
import './feature.css';
import Carousel from 'react-bootstrap/Carousel';
import { map } from 'jquery';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageZoom from 'react-medium-image-zoom';
import { ModalTitle } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

function FeatureProjectView(props) {
    const [data, setdata] = useState([]);
    const [filelist, setfilelist] = useState([]);
    const [Image, setImage] = useState();
    const [title, setTitle] = useState();

    var dateObj;
    var dateString;

    useEffect(() => {
        const { id } = props.match.params;
        console.log(id);
        axios.post(`${window.host}/project/${id}`).then((response) => {
            if (response.data) {
                console.log(response.data);
                const project = response.data;
                setTitle(project[0].Title.toUpperCase());
                setdata(project[0]);
                var files = JSON.parse(project[0].Files);
                setfilelist(files);
                var FileImage = JSON.parse(project[0].Image);
                console.log(FileImage, title);
                setImage(FileImage);
            }
        });
    }, []);

    const styles = {
        width: '300px',
        height: '200px',
        borderWidth: '2px',
        borderRadius: '5px',
        objectFit: 'cover',
    };

    return (
        <div
            style={{
                paddingTop: '50px',
                paddingBottom: '50px',
            }}
        >
            <div
                className="container card card-body"
                style={{ paddingLeft: '60px', paddingRight: '60px' }}
            >
                <div className="">
                    {' '}
                    <div className="d-flex justify-content-center">
                        {Image && (
                            <img
                                src={Image.filePath}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    border: '5px',
                                    borderRadius: '5px',
                                    objectFit: 'cover',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                alt=""
                            />
                        )}
                    </div>
                    <div>
                        <h6 className="float-right text-dark mt-3">
                            {' '}
                            Uploaded by : {data.Email}
                        </h6>
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    >
                        <h3 className="text-dark pl-2 pt-3 mt-1">{title}</h3>
                        <p
                            className="pl-3 pr-3 pb-3"
                            style={{
                                fontSize: 16,
                                textAlign: 'justify',
                            }}
                        >
                            {ReactHtmlParser(data.Description)}
                        </p>
                    </div>
                    <div className="row pl-3 d-flex justify-content-center align-item-middle">
                        {filelist.map((file, index) => (
                            <div className="col" key={index}>
                                {' '}
                                <img
                                    src={file.filePath}
                                    alt="First slide"
                                    style={styles}
                                />
                                {/* <ImageZoom
                                image={{
                                    src: file.filePath,
                                    alt: 'Golden Gate Bridge',
                                    className: 'img',
                                    style: { styles },
                                }}
                                zoomImage={{
                                    src: file.filePath,
                                    alt: 'Golden Gate Bridge',
                                    //style: { marginTop: '20em' },
                                }}
                            /> */}
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 pl-3">
                        <h4 className="">Fabrication Services Used</h4>
                        <div
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        >
                            <div className="row">
                                <div className="col-sm-100 pl-4 mt-2 font-weight-bold">
                                    <p>Process: </p>
                                    <p>Material: </p>
                                </div>
                                <div className="col-sm mt-2">
                                    <p>{data.Fabrication_Process}</p>
                                    <p>{data.Material}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeatureProjectView;

// import React from "react";

// const localIpUrl = require("local-ip-url");
// const ipAddress = localIpUrl("public");

// class FeatureDetail extends React.Component {
//   state = {
//     data: "",
//     serviceList: "",
//   };

//   componentDidMount() {
//     const info = localStorage.getItem("projectinfo");
//     const projectInfo = JSON.parse(info);
//     console.log(projectInfo);

//     this.setState({ data: projectInfo });
//   }

//   render() {
//     const { data, serviceList } = this.state;
//     var src = "";

//     return (
//       <div style={{ backgroundColor: "lightgray" }}>
//         <div
//           className="pt-3 mt-3 d-flex justify-content-center"
//           style={{
//             backgroundColor: "white",
//             boxShadow: "1px 2px 2px	#A9A9A9",
//           }}
//         >
//           <div
//             className="d-flex align-items-end pb-3"
//             style={{
//               backgroundImage: "url(/coverpic.png)",
//               height: "400px",
//               width: "70rem",
//               backgroundPosition: "center",
//             }}
//           >
//             <div
//               className="container"
//               style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
//             >
//               <div className="container">
//                 <div className="row">
//                   <div
//                     style={{
//                       width: "150px",
//                       height: "130px",
//                     }}
//                   >
//                     <img
//                       src={data.FileURL}
//                       style={{
//                         width: "150px",
//                         height: "130px",
//                       }}
//                       alt={data.FileName}
//                     />
//                   </div>
//                   <div className="col-sm text-white d-flex align-items-center">
//                     <h1>{data.userinfo}</h1>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container">
//           <div className="row">
//             <div className="col-sm-4">
//               <h3 className="text-dark mt-5 pl-3">Fabrication Services</h3>
//               <div
//                 className="d-flex justify-content-center"
//                 style={{
//                   width: "100%",
//                   height: "auto",
//                   backgroundColor: "white",
//                   borderRadius: "5px",
//                   boxShadow: "1px 2px 2px	#A9A9A9",
//                 }}
//               >
//                 <div className="row">
//                   <div className="m-auto">
//                     <div className="col-sm d-flex justify-content-center">
//                       <span className="mt-2 text-light">
//                         <img
//                           src="/Service/CNCCarving.jpg"
//                           style={{
//                             width: "160px",
//                             height: "140px",
//                             borderStyle: "solid",
//                             borderColor: "lightblue",
//                             borderWidth: "2px",
//                             borderRadius: "5px",
//                             backgroundColor: "#9999ff",
//                           }}
//                           //alt={data.FileName}
//                         />
//                         <div className="pb-2"></div>
//                         <h6
//                           className="p-2"
//                           style={{
//                             width: "160px",
//                             textAlign: "center",
//                             backgroundColor: "#9999ff",
//                             borderRadius: "5px",

//                             textAlign: "center",
//                             color: "black",
//                           }}
//                         >
//                           {data.process}
//                         </h6>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-sm">
//               <h3 className="text-dark mt-5 pl-3">ABOUT {data.title}</h3>
//               <div
//                 style={{
//                   width: "100%",
//                   height: "auto",
//                   backgroundColor: "white",
//                   borderRadius: "10px",
//                   boxShadow: "1px 2px 2px	#A9A9A9",
//                 }}
//               >
//                 <p
//                   className="p-3"
//                   style={{ fontSize: 14, textAlign: "justify" }}
//                 >
//                   Password must contain one capital letter, one number, and one
//                   special characte Sint enim aute sunt voluptate proident
//                   aliquip ullamco ea. Adipisicing excepteur adipisicing
//                   excepteur deserunt cupidatat culpa in incididunt ex
//                   adipisicing et anim. Aute esse dolore laboris exercitation
//                   quis aliquip dolore cillum ut consequat. Laboris mollit fugiat
//                   voluptate sint est ipsum deserunt aliqua. Nisi excepteur
//                   excepteur consectetur irure ad nisi pariatur deserunt. Et nisi
//                   cupidatat ex minim fugiat aute labore. Officia fugiat et aute
//                   minim commodo excepteur anim commodo voluptate fugiat
//                   non.Deserunt sit ea in labore non eiusmod laboris est
//                   consectetur dolor consectetur labore culpa.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className=" col-sm-4 mt-5">
//               <h3 className="pl-3">Contact Information</h3>
//               <div
//                 style={{
//                   width: "100%",
//                   height: "auto",
//                   backgroundColor: "white",
//                   borderRadius: "5px",
//                   boxShadow: "1px 2px 2px	#A9A9A9",
//                 }}
//               >
//                 <div className="row">
//                   <div className="col-sm-3 ml-3 mt-2 font-weight-bold">
//                     <p>Phone: </p>
//                     <p>Email: </p>
//                   </div>
//                   <div className="col-sm mt-2 mr-3 text-primary">
//                     <p>9849826008</p>
//                     <p>ashmita.promech@gmail.com</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="p-4"></div>
//       </div>
//     );
//   }
// }

// export default FeatureDetail;
