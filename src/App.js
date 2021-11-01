import logo from "./logo.svg";
import React, { useState, useEffect, useContext } from "react";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

//import BikeRackData from "./data/BicycleParking.json";
import BikeRackData from "./data/dummyData.json";

import "./App.css";

function App() {
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);

  return (
    <MapContainer center={[40.7128, -74.006]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy;
     <a href="http://osm.org/copyright">OpenStreetMap</a> 
     contributors'
      />
      {BikeRackData.data.map((bikerack) => (
        <Marker
          key={bikerack.id}
          position={[
            bikerack[8].split(" ")[2].slice(0, -1), // LATITUDE
            bikerack[8].split(" ")[1].slice(1), // LONGITUDE
          ]}
          icon={
            new Icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        ></Marker>
      ))}
    </MapContainer>
  );
}
export default App;
