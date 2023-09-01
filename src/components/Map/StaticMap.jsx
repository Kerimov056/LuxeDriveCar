import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./static.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const marker = { lat: 24.4539, lng: 54.3773 };

const interactionOptions = {
    zoomControl: false,
    doubleClickZoom: false,
    closePopupOnClick: false,
    dragging: false,
    zoomSnap: false,
    zoomDelta: false,
    trackResize: false,
    touchZoom: false,
    scrollWheelZoom: false,
};

const StaticMap = () => {


    return (
        <>

            <div className="row">
                <div className="col text-center">
                    <h2>React-leaflet - Showing static map with marker</h2>

                    <div className="col">
                        <MapContainer
                            center={marker}
                            zoom={12}
                            className="static-map"
                            {...interactionOptions}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                            />
                            <Marker position={[marker.lat, marker.lng]}></Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaticMap;