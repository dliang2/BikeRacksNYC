import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

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

export const Map = () => {
  const { BaseLayer } = LayersControl;

  // function to updated color of marker based on field femafld_t
  function detIconUrl(femafld_t) {
    if (femafld_t != "AREA OF MINIMAL FLOOD HAZARD") {
      return "https://www.freeiconspng.com/uploads/red-circle-png-transparent-2.png"; // show red if not minmal hazard
    }
    return "https://www.freeiconspng.com/uploads/purple-circle-icon-5.png"; // otherwise show blue/purple
  }

  const [bikeRacks, setBikeRacks] = useState([]); // Store data in here
  const [select, setSelect] = useState("All Boroughs");

  const handleChange = (e) => {
    setSelect(e.target.value);
    console.log(select);
  };

  useEffect(() => {
    axios
      .get("https://data.cityofnewyork.us/resource/au7q-njtk.json") // Pull the data
      .then((res) => setBikeRacks(res.data)) // Set the data
      .catch((err) => console.log(err));
  }, []);

  return (
    // Generate a world map centered on NYC
    <>
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={11}
        maxZoom={18}
        style={{ width: "85%", height: "900px", float: "left" }}
      >
        <LayersControl>
          <BaseLayer checked name="OpenStreet.Grey">
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" // Grey Basemap color
              attribution='
          &copy; <a href="https://stadiamaps.com/">Stadia Maps</a> 
          &copy; <a href="https://openmaptiles.org/">Open Map Tiles</a> 
          &copy; <a href="https://www.openstreetmap.org/about/">OpenStreetMap contributors</a> |
          <a href="/InfoPage"> Info</a>
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

        {bikeRacks
          .filter(
            (bikeRack) =>
              bikeRack.boro_name == select || select == "All Boroughs"
          )
          ?.map(
            (
              bikeRack // Read through the data in the JSON file
            ) => (
              // while bikeRack.boro_name = one of the borroghs passed through the drop down select: {<Marker> </Marker>}

              <Marker // Display every Bike Rack in the data
                key={bikeRack.id}
                position={[
                  bikeRack.the_geom.coordinates[1], // get LATITUDE
                  bikeRack.the_geom.coordinates[0], // get LONGITUDE
                ]}
                icon={
                  // Set image of the marker icon
                  new Icon({
                    iconUrl: detIconUrl(bikeRack.femafld_t),
                    iconSize: [7, 7],
                    iconAnchor: [10, 10],
                  })
                }
              >
                <Popup>
                  Program:{" "}
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
      <InputGroup>
        {/* make an onChange function that sets the selected option as a variable.  Then put it in the comment where I talk about the while loop}*/}
        <FormControl
          as="select"
          defaultValue="All Boroughs"
          name="borough"
          onChange={handleChange}
        >
          <option value="All Boroughs">All Boroughs</option>
          <option value="Manhattan">Manhattan</option>
          <option value="Bronx">Bronx</option>
          <option value="Brooklyn">Brooklyn</option>
          <option value="Queens">Queens</option>
          <option value="Staten Island">Staten Island</option>
        </FormControl>
      </InputGroup>
    </>
  );
};
