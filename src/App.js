import logo from "./logo.svg";
import react from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";

function App() {
  return (
    <MapContainer center={[40.7128, -74.006]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy;
     <a href="http://osm.org/copyright">OpenStreetMap</a> 
     contributors'
      />
    </MapContainer>
  );
}
export default App;
