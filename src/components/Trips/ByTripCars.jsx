import React from 'react'
import "./TripCars.scss";
import { Link } from 'react-router-dom';

const ByTripCars = (props) => {

    return (
        <>
            <div className='WishlistCardMainTrp'>
                <div class="WishlistCardBox">
                    <span></span>
                    <div class="WishlistCardContent">
                      <Link to={`/CarDetail/${props.Id}`}><img src={props.img} /></Link>  
                    </div>
                </div>
                <div className='WishlistCarDetails'>
                    <h1>Marka: <span>{props.marka}</span></h1>
                    <h1>Model: <span>{props.model}</span></h1>
                </div>
            </div>
        </>
    )
}

export default ByTripCars