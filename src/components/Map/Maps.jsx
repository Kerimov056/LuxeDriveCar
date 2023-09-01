import React, {useState} from 'react'
import './map.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
 

const markerIcon = new L.Icon({
    iconUrl: require("./download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const Maps = () => {
    const [center, setCenter] = useState({ lat: 40.4093, lng: 49.8671});

    return (
        <>
            <div className='ss'>
                <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                    />

                    <Marker position={center} icon={markerIcon}>
                        <Popup> 
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    )
}

export default Maps




