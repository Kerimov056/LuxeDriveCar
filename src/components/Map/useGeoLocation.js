import React, { useEffect, useState } from 'react'

const useGeoLocation = () => {

    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const onSuccess = location => {
        setLocation({
            loaded: true,
            error, 
        });
    };

    const onError = error => {
        onError({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }


    useEffect(() => {
        if(!("geolocation" in navigator)){
            setLocation((state) => ({
                ...state,
                loaded: true,
                error: {
                    code: 0,
                    message : "Geoloaction not supported",
                },
            }));
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },[])

  return location
}

export default useGeoLocation