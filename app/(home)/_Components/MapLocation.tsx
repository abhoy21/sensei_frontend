import { useState } from "react";
import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const Map = () => (
  <div className="w-[90%] container">
    <MapContainer
      style={{ height: "18em", width: "100vw" }}
      center={[22.610769, 88.419022]}
      zoom={15}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" /> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  </div>
);

export default Map;
