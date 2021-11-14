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

function App() {
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  // const bounds = latLngBounds([40.0341, -74.2727], [41.2919, -71.9101]);

  const [data, setData] = useState([]); // Store data in here

  useEffect(() => {
    axios
      .get("https://gbfs.citibikenyc.com/gbfs/en/station_information.json") // Pull the data
      .then((res) => setData(res.data.data)) // Set the data
      .catch((err) => console.log(err));
  }, []);

  return (
    // Generate a world map centered on NYC
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={11}
      maxZoom={18}
      style={{ width: "100%", height: "900px" }}
      // fillColor="grey"
    >
      <LayersControl>
        <BaseLayer checked name="OpenStreet.Grey">
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" // Grey Basemap color
            attribution='
          &copy; <a href="https://stadiamaps.com/">Stadia Maps</a> 
          &copy; <a href="https://openmaptiles.org/">Open Map Tiles</a> 
          &copy; <a href="https://www.openstreetmap.org/about/">OpenStreetMap contributors</a> 
          ' // copyright stuff
            // bounds={bounds}
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

      {/* <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" // Grey Basemap color
        attribution='
        &copy; <a href="https://stadiamaps.com/">Stadia Maps</a> 
        &copy; <a href="https://openmaptiles.org/">Open Map Tiles</a> 
        &copy; <a href="https://www.openstreetmap.org/about/">OpenStreetMap contributors</a> 
     '  //copyright stuff
        //bounds={bounds}
      /> */}

      {data.stations?.map(
        (
          station // Read through the data in the JSON file
        ) => (
          <Marker // Display every Bike Rack in the data
            key={station.id}
            position={[
              station.lat, // get LATITUDE
              station.lon, // get LONGITUDE
            ]}
            icon={
              // Set image of the marker icon
              new Icon({
                iconUrl:
                  "https://www.freeiconspng.com/uploads/circle-png-4.png",
                iconSize: [7, 7],
                iconAnchor: [10, 10],
              })
            }
          >
            <Popup>
              {
                station.name // Display location on popup
              }
              {" | Capacity of Dock: "}
              {
                station.capacity // Displays capacity of bike dock
              }
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
}
export default App;
