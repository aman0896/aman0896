// import React, { Component } from 'react';
// import logo from './assests/demo.png';
// import demoVideo from './assests/demo.mp4';
// //import Search from "./main/Map";
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import './leaflet.css';

// function DraggableMarker() {
//     const [draggable, setDraggable] = useState(true);
//     const [position, setPosition] = useState(center);
//     const markerRef = useRef(null);
//     const eventHandlers = useMemo(
//         () => ({
//             dragend() {
//                 const marker = markerRef.current;
//                 if (marker != null) {
//                     setPosition(marker.getLatLng());
//                 }
//             },
//         }),
//         []
//     );
//     const toggleDraggable = useCallback(() => {
//         setDraggable((d) => !d);
//     }, []);

//     return (
//         <Marker
//             draggable={draggable}
//             eventHandlers={eventHandlers}
//             position={position}
//             ref={markerRef}
//         >
//             <Popup minWidth={90}>
//                 <span onClick={toggleDraggable}>
//                     {draggable
//                         ? 'Marker is draggable'
//                         : 'Click here to make marker draggable'}
//                 </span>
//             </Popup>
//         </Marker>
//     );
// }

// class demo extends Component {
//     state = {};

//     render() {
//         return (
//             <div>
//                 <Map
//                     id="map"
//                     center={[27.2046, 77.4977]}
//                     zoom={13}
                  
//                 >
//                     <TileLayer
//                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     <Marker position={[27.2046, 77.4977]}>
//                         <Popup>
//                             A pretty CSS3 popup. <br /> Easily customizable.
//                         </Popup>
//                     </Marker>
//                     <DraggableMarker />
//                 </Map>
//             </div>
//         );
//     }
// }

// export default demo;
