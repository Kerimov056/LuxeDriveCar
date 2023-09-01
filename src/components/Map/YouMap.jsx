import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";



const MyMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  console.log(selectedLocation);

  useEffect(() => {
    const map = L.DomUtil.get('map-container'); // Harita konteynerinin DOM öğesini al
    map.addEventListener('contextmenu', handleMapRightClick); // Sağ tıklama olayını dinle
    return () => {
      map.removeEventListener('contextmenu', handleMapRightClick); // Komponent temizlenirken olayı kaldır
    };
  }, []);

  const handleMapRightClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation({ lat, lng });
  };

  return (
    <div className="App">
      <MapContainer id="map-container" center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedLocation && (
          <Marker
            position={selectedLocation}
          >
            <Popup>
              Konumunuz: <br /> Latitude: {selectedLocation.lat}, Longitude: {selectedLocation.lng}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MyMap;
