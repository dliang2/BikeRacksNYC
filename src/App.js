import logo from "./logo.svg";
import React, { useState, useEffect, useContext } from "react";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

//import BikeRackData from "./data/BicycleParking.json";
import BikeRackData from "./data/dummyData.json"; // Using smaller data because main data takes too long to load

import "./App.css";

function _load(url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script')
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  })
}

function App() {
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);

  
  //let response = fetch('https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
  //let responseJson = response.json();
  //console.log(responseJson)

  /*
  var jsonData = fetch('https://gbfs.citibikenyc.com/gbfs/en/station_information.json')
  .then(response => response.json())
  .then((jsonData) => {
    // jsonData is parsed json object received from url
    console.log(jsonData)
  })
  .catch((error) => {
    // handle your errors here
    console.error(error)
  })

  console.log(jsonData)
*/

  return (
    // Generate a world map centered on NYC
    <MapContainer center={[40.7128, -74.006]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy;
     <a href="http://osm.org/copyright">OpenStreetMap</a> 
     contributors'
      />

      {BikeRackData.data.stations.map(
        (
          bikerack // Read through the data in the JSON file
        ) => (
          <Marker // Display every Bike Rack in the data
            key={bikerack.station_id}
            position={[
              bikerack.lat, // get LATITUDE
              bikerack.lon, // get LONGITUDE
            ]}
            icon={
              // Set image of the marker icon
              new Icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                iconSize: [10, 16],
                iconAnchor: [12, 41],
              })
            }
          ></Marker>
        )
      )}
    </MapContainer>
  );
}
export default App;
