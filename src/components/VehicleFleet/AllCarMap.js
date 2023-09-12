import { getCarAll } from "../Services/carServices";
import React, { useState } from 'react'
import './AllCarMap.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "react-query";
import 'leaflet/dist/leaflet.css';
import { useQueryClient } from "react-query";
import L from "leaflet";
import { Container } from "@chakra-ui/react";
import FindByCar from "./FindByCar";


const markerIcon = new L.Icon({
    iconUrl: require("./download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const AllCarMap = () => {

    const position = [40.4093, 49.8671]
    const queryClient = useQueryClient();


    const { data: AllCar } = useQuery({
        queryKey: ["AllGetCarssS"],
        queryFn: getCarAll,
        staleTime: 0,
    });
    queryClient.invalidateQueries(["ReservMap"]);

    const formatDateTime = (inputDate) => {
        const date = new Date(inputDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('de-DE', options);
    };

    const [returnLocation, setReturnLocation] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);

    return (
        <>
            <div className='ss'>

                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                    />

                    {AllCar?.data?.map((car, index) => (
                        console.log("lat:", car.latitude), console.log("lnh:", car.longitude), <Marker
                            position={[car?.latitude, car?.longitude]}
                            key={index}
                            icon={markerIcon}
                            eventHandlers={{
                                click: () => {
                                    setSelectedMarker(car);
                                    setReturnLocation(false);
                                },
                            }}
                        >
                            <Popup >
                                <p> Marka: {car?.marka}</p>
                                <p> Model: {car?.model}</p>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="FindByCar">
                <div>
                    <FindByCar />
                </div>
            </div>
        </>
    );
};

export default AllCarMap;