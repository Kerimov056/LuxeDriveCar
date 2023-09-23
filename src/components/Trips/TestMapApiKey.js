import React, { useState } from 'react';
import { Container } from '@chakra-ui/react';

const TestMapApiKey = () => {
    const [placeName, setPlaceName] = useState("");
    const [placeDetails, setPlaceDetails] = useState(null);

    const handleChange = async (e) => {
        const name = e.target.value;
        setPlaceName(name);

        if (name) {
            const response = await fetch(`http://localhost:5000/api/proxy/googlemaps?placeId=${name}`);
            const data = await response.json();
            setPlaceDetails(data);
        } else {
            setPlaceDetails(null);
        }
    };

    return (
        <>
            <Container>
                <div>
                    <input
                        type="text"
                        value={placeName}
                        onChange={handleChange}
                        placeholder="Şehir veya Ülke Adi"
                    />
                    {placeDetails && (
                        <div>
                            <h2>{placeDetails.result.name}</h2>
                            <img src={placeDetails.result.photos[0].photo_reference} alt={placeDetails.result.name} />
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default TestMapApiKey;
