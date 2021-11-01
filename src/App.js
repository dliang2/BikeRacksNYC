import logo from "./logo.svg";
import React, { useState, useEffect, useContext } from "react";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

//import BikeRackData from "./data/BicycleParking.json";
import BikeRackData from "./data/dummyData.json"; // Using smaller data because main data takes too long to load

import "./App.css";

function App() {
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);

  return (
    // Generate a world map centered on NYC
    <MapContainer center={[40.7128, -74.006]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy;
     <a href="http://osm.org/copyright">OpenStreetMap</a> 
     contributors'
      />

      {BikeRackData.data.map(
        (
          bikerack // Read through the data in the JSON file
        ) => (
          <Marker // Display every Bike Rack in the data
            key={bikerack.id}
            position={[
              bikerack[8].split(" ")[2].slice(0, -1), // get LATITUDE
              bikerack[8].split(" ")[1].slice(1), // get LONGITUDE
            ]}
            icon={
              // Set image of the marker icon
              new Icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                iconSize: [25, 41],
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
