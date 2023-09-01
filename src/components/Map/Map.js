import React, { useState, useEffect, useRef } from 'react'
import './map.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { ImLocation } from "react-icons/im";
import { Button } from '@chakra-ui/react';


const markerIcon = new L.Icon({
    iconUrl: require("./download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
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

    return (
        <>
            <div className='ss'>
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                    />
                    {userLocation && (
                        <Marker
                            position={userLocation}
                            icon={markerIcon}
                        >
                            <Popup>Kullanici Konumu</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
            <div style={{ marginTop: "70px", justifyContent: "center", alignItems: "center" }}>
                <Button style={{ width: "200px", height: "80px", marginLeft: "600px" }} onClick={openModal}>Konumu Görüntüle</Button>
                {showModal && (
                    <div style={{ marginLeft: "600px" }} className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h2>Konum Paylaşımı</h2>
                            <p>Konumunuzu paylaşmak ister misiniz?</p>
                            <Button backgroundColor={"gold"} onClick={shareLocation}>Evet</Button>
                            <Button backgroundColor={"red.700"} marginLeft={"30px"} onClick={closeModal}>Hayir</Button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {userLocation ? (
                    <p>Latitude: {userLocation.lat}, Longitude: {userLocation.lng}</p>
                ) : (
                    <p>Konum alınamadı.</p>
                )}
            </div>

            {/* 
            <div>
                <Button onClick={showMyLoaction}>
                    <ImLocation />
                </Button>
            </div> */}
        </>
    )
}

export default Map















