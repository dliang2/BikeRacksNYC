import logo from "./logo.svg";
import React, { useState, useEffect, useContext } from "react";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { latLngBounds, Icon } from "leaflet";

//import BikeRackData from "./data/BicycleParking.json";
import BikeRackData from "./data/dummyData.json"; // Using smaller data because main data takes too long to load

import "./App.css";
// var baseLayer = L.tileLayer('https://maps{s}.nyc.gov/xyz/1.0.0/carto/basemap/{z}/{x}/{y}.jpg', {

function App() {
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  // const bounds = latLngBounds([40.0341, -74.2727], [41.2919, -71.9101]);
  return (
    // Generate a world map centered on NYC
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={10}
      maxZoom={18}
      style={{ width: "100%", height: "900px" }}
      fillColor="grey"
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='&copy;
     <a href="http://osm.org/copyright">OpenStreetMap</a> 
     contributors'
        // bounds={bounds}
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
                  "https://www.freeiconspng.com/uploads/circle-png-4.png",
                iconSize: [10, 10],
                // iconAnchor: [10, 10],
              })
            }
          ></Marker>
        )
      )}
    </MapContainer>
  );
}
export default App;
