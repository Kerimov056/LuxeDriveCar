import React, {useState} from 'react'
import './RespnseCars.scss'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Google_Maps_Api_Key } from "../utils/ExportFile";


const RespnseCars = (props) => {



    
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

    reverseGeocode(props.carLat, props.carLng)
        .then(address => setCarAddress(address))
        .catch(error => console.error(error));



        const processAddress = (fullAddress) => {
            const parts = fullAddress.split(', ');
            return parts.slice(1).join(', ');
        };
    
        const processedAddress = processAddress(carAddress);


    return (
        <>
            <div className='RespnseCarsCard'>
                <div className='RespnseCarsCard_Img'>
                    <img src={props.img} />
                </div>
                <div className='RespnseCarsCard_Desc'>
                    <div className='RespnseCarsCard_Desc1'>
                        <h1>{props.marka} {props.model}</h1>
                        <h2>{props.category}</h2>
                        <h2>Address: {processedAddress}</h2>

                    </div>
                    </div>
                <div className='RespnseCarsCard_Price'>
                    <div className='BossPrs'></div>
                    <div className='RespnseCarsCard_PriceCenter'>
                        <div>
                            <p>LuxeDrive.com</p>
                            <h2>${props.price}</h2>
                            <p>Total</p>
                            <Button><Link to={`/CarDetail/${props.Id}`}>View Deal</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RespnseCars