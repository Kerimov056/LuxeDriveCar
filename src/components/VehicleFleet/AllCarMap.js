import { getCarAll } from "../Services/carServices";
import React, { useState } from 'react'
import './AllCarMap.scss'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "react-query";
import 'leaflet/dist/leaflet.css';
import { useQueryClient } from "react-query";
import L from "leaflet";
import { Google_Maps_Api_Key } from "../utils/ExportFile";
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


    const [carAddress, setCarAddress] = useState('');

    const reverseGeocode = async (lat, lng) => {
        const apiKey = Google_Maps_Api_Key;

        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const address = data.results[0].formatted_address;
                return address;
            } else {
                return 'Adres bulunamadi.';
            }
        } catch (error) {
            console.error('Ters jeokodlama hatasi:', error);
            return 'Ters jeokodlama hatasi.';
        }
    };

    reverseGeocode(selectedMarker?.latitude, selectedMarker?.longitude)
        .then(address => setCarAddress(address))
        .catch(error => console.error(error));

    return (
        <>
            <div id="VehicleFleetFindCarMap" className='ss'>

                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                    />

                    {AllCar?.data?.map((car, index) => (
                        console.log("lat:", car.latitude), console.log("lnh:", car.longitude),
                        <Marker
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
            {selectedMarker !== null &&
                <div className="FindByCar">
                    <div>
                        <FindByCar img={`data:image/jpeg;base64,${selectedMarker?.carImages[0]?.imagePath}`}
                            Id={selectedMarker?.id}
                            marka={selectedMarker?.marka}
                            model={selectedMarker?.model}
                            year={selectedMarker?.year}
                            price={selectedMarker?.price}
                            campaignsPrice={selectedMarker?.campaignsPrice}
                            Address={carAddress}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default AllCarMap;