import React, { useState, useEffect, useRef } from 'react'
import './map.scss'
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import { ImLocation } from "react-icons/im";
import { Button } from '@chakra-ui/react';


const markerIcon = new L.Icon({
    iconUrl: require("./download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});


const Map = () => {
    const [center, setCenter] = useState({ lat: 40.4093, lng: 49.8671 });
    const mapRef = useRef();

    const [userLocation, setUserLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setUserLocation(null);  
    };

    const handleMapClick = () => {
        openModal();
    };

    const shareLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Konum alınamadı: ", error);
                }
            );
        } else {
            alert("Tarayıcınız konum hizmetini desteklemiyor.");
        }
        closeModal();
    };

    const [data, setData] = useState('Veri A');

    const updateData = (newData) => {
        setData(newData);
      };

    const handleShapeCreated = (e) => {
        const type = e.layerType;
        if (type === 'marker') {
            const latlng = e.layer.getLatLng();
            //console.log('Marker Lat:', latlng.lat);
           // console.log('Marker Lng:', latlng.lng);
        }
    };
     //console.log("userLoacation lat", userLocation !== null ? userLocation.lat : "not lat");
     //console.log("userLoacation lng", userLocation !== null ? userLocation.lng : "not lng");


    return (
        <>
            <div id='myLocation'>
                <Button onClick={openModal}>View Location</Button>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Want to share your location?</p>
                            <div>
                                <Button backgroundColor={"green"} onClick={shareLocation}>Yes</Button>
                                <Button backgroundColor={"red.700"} onClick={closeModal}>No</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='ss'>
                <MapContainer center={userLocation===null ? [40.3798, 49.8486] : userLocation} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                    />
                    <FeatureGroup>
                        <EditControl position='topright' onCreated={handleShapeCreated} draw={{ rectangle: false, circlemarker: false, polygon: false }} />
                    </FeatureGroup>
                    {userLocation && (
                        <Marker
                            position={userLocation}
                            icon={markerIcon}
                        >
                            <Popup>My Location</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </>
    )
}

export default Map















