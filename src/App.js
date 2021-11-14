import logo from "./logo.svg";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { latLngBounds, Icon } from "leaflet";

import "./App.css";

function App() {
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  // const bounds = latLngBounds([40.0341, -74.2727], [41.2919, -71.9101]);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://gbfs.citibikenyc.com/gbfs/en/station_information.json")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    // Generate a world map centered on NYC
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={11}
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
                iconSize: [10, 10],
              })
            }
          >
            <Popup>{station.name}</Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
}
export default App;
