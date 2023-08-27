import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss'
// import {  } from "react-leaflet-loca";

function MapComponent({ onLocationSelect }) {
    const mapRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    
    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                center: [51.505, -0.09], // Varsayılan merkez koordinatları
                zoom: 13, // Varsayılan zoom seviyesi
            });
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
    
            mapRef.current.on('click', handleMapClick);
        }
    }, []);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ latitude: lat, longitude: lng });
        onLocationSelect({ latitude: lat, longitude: lng }); // Seçilen konumu dışarıya iletiyoruz
    };

    return (
        <>
            <div id="map" style={{ width: '100%', height: '400px' }} />
        </>
    );
}

export default MapComponent;
