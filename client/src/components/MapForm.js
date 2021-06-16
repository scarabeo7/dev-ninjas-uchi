import { MapContainer, TileLayer } from "react-leaflet";
//import "leaflet/dist/leaflet.css";
import "./MapForm.css";
import LeafletControlGeocoder from "./LeafletControlGeocoder"

const MapForm = () => {
  const position = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletControlGeocoder />
    </MapContainer>
  );
};

export default MapForm;
