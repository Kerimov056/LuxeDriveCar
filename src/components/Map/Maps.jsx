import React, { useState } from 'react'
import './map.scss'
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";




delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const markerIcon = new L.Icon({
    iconUrl: require("./download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});


const Maps = (props) => {
 
    const [center, setCenter] = useState({ lat: props.lat ? props.lat : '', lng: props.lng ? props.lng : '' });


    const [pickUpLocationMap, setPickUpLocationMap] = useState({ lat: null, lng: null });
    const [returnUpLocationMap, setReturnUpLocationMap] = useState({ lat: null, lng: null })
    const [returnUpLocationMap2, setReturnUpLocationMap2] = useState({ lat: null, lng: null })
    const updatePickUpLocation = (lat, lng) => {
        setPickUpLocationMap({ lat, lng });
    }
    const updateReturnUpLocation = (lat, lng) => {
        // if (pickUpLocationMap.lat !== null) {
        setReturnUpLocationMap({ lat, lng });
        setReturnUpLocationMap2(returnUpLocationMap2.lat == null && { lat, lng });
        // }    
    }
    const handleDrawCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'marker') {
            const latlng = layer.getLatLng();
            const lat = latlng.lat;
            const lng = latlng.lng;
            updatePickUpLocation(lat, lng);
            updateReturnUpLocation(lat, lng);
        }
    }
    //https://api.maptiler.com/maps/jp-mierune-streets/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL

    return (
        <>
            <div className='ss'>
                <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                    />
                    <FeatureGroup>
                        <EditControl position='topright' onCreated={handleDrawCreated} draw={{ rectangle: false, circlemarker: false, polygon: false }} />
                    </FeatureGroup>
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




