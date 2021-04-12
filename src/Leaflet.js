// import React, { Component } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "./leaflet.css";

// // var map = L.map("map").setView([0, 0], 1);
// // L.tileLayer(
// //   "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=cWOELUAepfsNdyeTLaK2",
// //   {
// //     attribution:
// //       '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
// //   }
// // ).addTo(map);

// class Leaflet extends Component {
//   state = { position: [51.505, -0.09] };

//   render() {
//     return (
//       <MapContainer
//         className="map"
//         center={[27.671, 85.42]}
//         zoom={13}
//         scrollWheelZoom={false}
//         height="500px"
//       >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[27.671, 85.42]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     );
//   }
// }

// export default Leaflet;
import React, { Component } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import { ReactLeafletSearch } from "react-leaflet-search";
import "./leaflet.css";

class CustomOpenStreetMap {
  constructor(options = { providerKey: null, searchBounds: [] }) {
    let { searchBounds } = options;
    //Bounds are expected to be a nested array of [[sw_lat, sw_lng],[ne_lat, ne_lng]].
    // We convert them into a string of 'x1,y1,x2,y2' which is the opposite way around from lat/lng - it's lng/lat
    let boundsUrlComponent = "";
    let regionUrlComponent = "";
    if (searchBounds.length) {
      const reversed = searchBounds.map((el) => {
        return el.reverse();
      });
      this.bounds = [].concat([], ...reversed).join(",");
      boundsUrlComponent = `&bounded=1&viewbox=${this.bounds}`;
    }
    if ("region" in options) {
      regionUrlComponent = `&countrycodes=${options.region}`;
    }
    this.url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&polygon_svg=1&namedetails=1${boundsUrlComponent}${regionUrlComponent}&q=`;
  }

  async search(query) {
    // console.log(this.url + query)
    const response = await fetch(this.url + query).then((res) => res.json());
    return this.formatResponse(response);
  }

  formatResponse(response) {
    const resources = response;
    const count = response.length;
    const info =
      count > 0
        ? resources.map((e) => ({
            bounds: e.boundingbox.map((bound) => Number(bound)),
            latitude: 0,
            longitude: 0,
            name: "deneme 1",
          }))
        : "Not Found";
    return {
      info: info,
      raw: response,
    };
  }
}

export default class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.provider = new CustomOpenStreetMap();
    this.state = {
      count: 0,
      maxZoom: 13,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      bounds: [
        {
          lat: 33.100745405144245,
          lng: 24.510498046875,
        },
        {
          lat: 33.100745405144245,
          lng: 46.48315429687501,
        },
        {
          lat: 44.55916341529184,
          lng: 46.48315429687501,
        },
        {
          lat: 44.55916341529184,
          lng: 24.510498046875,
        },
      ],
    };
  }

  customPopup(SearchInfo) {
    return (
      <Popup>
        <div>
          <p>I am a custom popUp</p>
          <p>
            latitude and longitude from search component:{" "}
            {SearchInfo.latLng.toString().replace(",", " , ")}
          </p>
          <p>Info from search component: {SearchInfo.info}</p>
          <p>
            {SearchInfo.raw &&
              SearchInfo.raw.place_id &&
              JSON.stringify(SearchInfo.raw.place_id)}
          </p>
        </div>
      </Popup>
    );
  }

  render() {
    //const ReactLeafletSearch = withLeaflet(ReactLeafletSearch);

    return (
      <MapContainer
        className="map"
        scrollWheelZoom={true}
        bounds={this.state.bounds}
        maxZoom={this.state.maxZoom}
        maxBounds={this.state.maxBounds}
      >
        <TileLayer
          noWrap={true}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ReactLeafletSearch
          customProvider={this.provider}
          position="topleft"
          inputPlaceholder="Custom placeholder"
          search={[33.100745405144245, 46.48315429687501]}
          showMarker={true}
          zoom={5}
          showPopup={true}
          popUp={this.customPopup}
          closeResultsOnClick={true}
          openSearchOnLoad={true}
          // // these searchbounds would limit results to only Turkey.
          searchBounds={[
            [33.100745405144245, 46.48315429687501],
            [44.55916341529184, 24.510498046875],
          ]}
          // providerOptions={{region: 'tr'}}

          // default provider OpenStreetMap
          // provider="BingMap"
          // providerKey="AhkdlcKxeOnNCJ1wRIPmrOXLxtEHDvuWUZhiT4GYfWgfxLthOYXs5lUMqWjQmc27"
        />
      </MapContainer>
    );
  }
}

