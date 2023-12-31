import React, { useEffect, useRef } from 'react';
import './FindAllCarMap.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Google_Maps_Api_Key } from '../utils/ExportFile';

const markerIcon = new L.Icon({
    iconUrl: require('./download.png'),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const FindAllCarMap = (props) => {
    // console.log(props.locationLat, props.locationLng);
    const mapRef = useRef(null);


    return (
        <div className='ss'>
            <MapContainer center={[props.locationLat, props.locationLng] ? [props.locationLat, props.locationLng] : [40.4093, 49.8671]} ref={mapRef} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                />
                {props.data?.data?.map((car, index) => (
                        <Marker
                            position={[car?.latitude, car?.longitude]}
                            key={index}
                            icon={markerIcon}
                        >
                            <Popup>
                                <p> Price: $ {car?.price}</p>
                            </Popup>
                        </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default FindAllCarMap;
