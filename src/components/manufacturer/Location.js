import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useRef, useEffect } from 'react';
import Search from 'react-leaflet-search';

export default function Location(props) {
    const [position, setPosition] = useState();

    const mapRef = useRef(null);
    const [map, setMap] = useState();
    useEffect(() => {
        const mapInfo = mapRef.current;
        setMap(mapInfo.leafletElement);
    });

    useEffect(() => {
        props.getLatLng(position);
    }, [position]);

    const onMapClick = (e) => {
        setPosition(e.latlng);
    };

    const onMapDblClick = () => {
        map.locate();
        map.on('locationfound', locationFound);
    };

    const locationFound = (e) => {
        map.flyTo([e.latlng.lat, e.latlng.lng], 17);
        setPosition(e.latlng);
    };
    return (
        <div>
            <div className="mb-2">
                Click to add marker and drag to adjust to your location.
            </div>
            <div className="mb-2">
                <Map
                    ref={mapRef}
                    style={{ height: '350px', width: '100%' }}
                    center={[27.68, 85.32]}
                    scrollWheelZoom={true}
                    zoom={5}
                    maxZoom={19}
                    onclick={onMapClick}
                    ondblclick={onMapDblClick}
                >
                    <TileLayer
                        noWrap={true}
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                        position={position}
                        setPosition={setPosition}
                    />
                    <Search
                        openSearchOnLoad={true}
                        closeResultsOnClick={true}
                        showMarker={false}
                        zoom={15}
                        onChange={(e) => {
                            setPosition(e.latLng);
                        }}
                    />
                </Map>
            </div>

            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-lg-4 d-flex align-items-center">
                            <span className="font-weight-bold">Latitude :</span>
                        </div>
                        <div className="col-lg">
                            <input
                                type="text"
                                className="form-control"
                                name="latitude"
                                defaultValue={position ? position.lat : ''}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col-lg-4 d-flex align-items-center">
                            <span className="font-weight-bold">
                                Longitude :
                            </span>
                        </div>
                        <div className="col-lg">
                            <input
                                type="text"
                                className="form-control"
                                name="longitude"
                                defaultValue={position ? position.lng : ''}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LocationMarker(props) {
    const onDragEnd = (e) => {
        if (e != null) {
            props.setPosition(e.target._latlng);
        }
    };

    return (
        <div>
            {props.position && (
                <Marker
                    position={[props.position.lat, props.position.lng]}
                    draggable={true}
                    ondragend={onDragEnd}
                >
                    <Popup>
                        You are Here{' '}
                        <div>{`${props.position.lat}, ${props.position.lng}`}</div>
                    </Popup>
                </Marker>
            )}
        </div>
    );
}
