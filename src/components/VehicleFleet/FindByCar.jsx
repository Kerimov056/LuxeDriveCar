import React from 'react'
import './FindCar.scss'
import { Link } from 'react-router-dom';


const FindByCar = (props) => {

    const processAddress = (fullAddress) => {
        const parts = fullAddress.split(', ');
        return parts.slice(1).join(', ');
    };

    const processedAddress = processAddress(props.Address);


    return (
        <>
            <div className='FindBYCar'>
                <div>
                    <div className='FindBYCar_Image'>
                        <img src={props.img} />
                    </div>
                    <div className='FindBYCar_Info'>
                        <div>
                            <h2>Marka: <span>{props.marka}</span></h2>
                            <h2>Model: <span>{props.model}</span></h2>
                            <h2>Year: <span>{props.year}</span></h2>
                            <h2>Price: <span style={props.campaignsPrice === null ? { display: "none" } : {}}>${props.campaignsPrice}/Day</span>   <span style={props.campaignsPrice !== null ? { textDecoration: "line-through", marginLeft: '190px' } : {}}>${props.price}/Day</span></h2>
                            <h2>Car Address: <span>{processedAddress}</span></h2>
                            <button><Link to={`/CarDetail/${props.Id}`} >Show Car {">"}</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FindByCar