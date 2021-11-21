import logo from "./logo.svg";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { latLngBounds, Icon, tileLayer } from "leaflet";

import "./App.css";

const { BaseLayer } = LayersControl;

function detIconUrl(femafld_t){
  if(femafld_t == "AREA OF MINIMAL FLOOD HAZARD"){
      return "https://www.freeiconspng.com/uploads/red-circle-png-transparent-2.png";
  }
  return "https://www.freeiconspng.com/uploads/circle-png-4.png";
}

function App() {
  const [bikeRacks, setBikeRacks] = useState([]); // Store data in here

  useEffect(() => {
    axios
      .get("https://data.cityofnewyork.us/resource/au7q-njtk.json") // Pull the data
      .then((res) => setBikeRacks(res.data)) // Set the data
      .catch((err) => console.log(err));
  }, []);
  console.log(bikeRacks);

  return (
    // Generate a world map centered on NYC
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={11}
      maxZoom={18}
      style={{ width: "100%", height: "900px" }}
    >
      <LayersControl>
        <BaseLayer checked name="OpenStreet.Grey">
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" // Grey Basemap color
            attribution='
          &copy; <a href="https://stadiamaps.com/">Stadia Maps</a> 
          &copy; <a href="https://openmaptiles.org/">Open Map Tiles</a> 
          &copy; <a href="https://www.openstreetmap.org/about/">OpenStreetMap contributors</a> 
          '
          />
        </BaseLayer>
        <BaseLayer name="OpenStreet.Street">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy;
            <a href="http://osm.org/copyright">OpenStreetMap</a> 
            contributors'
          />
        </BaseLayer>
      </LayersControl>

      {bikeRacks?.map(
        (
          bikeRack // Read through the data in the JSON file
        ) => (
          <Marker // Display every Bike Rack in the data
            key={bikeRack.id}
            position={[
              bikeRack.the_geom.coordinates[1], // get LATITUDE
              bikeRack.the_geom.coordinates[0], // get LONGITUDE
            ]}
            icon={
              // Set image of the marker icon
              new Icon({
                iconUrl:
                detIconUrl(bikeRack.femafld_t),
                iconSize: [7, 7],
                iconAnchor: [10, 10],
              })
            }
          >
            <Popup>
              Program: {" "}
              {
                bikeRack.program // Display program
              }
              {<br />}
              Asset:{" "}
              {
                bikeRack.assetsubty // Display type of rack
              }
              {<br />}
              Boro:{" "}
              {
                bikeRack.boro_name // Display boro name
              }
              {<br />}
              Date Installed:{" "}
              {
                bikeRack.date_inst // Display date of installation
              }
              {<br />}
              Risk:{" "}
              {
                bikeRack.femafld_t // Display level of flood risk hazard
              }
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
}
export default App;