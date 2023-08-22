import React from 'react';
import './ShopCarCard.scss'
import { Link } from 'react-router-dom';


const ShopCarCard = (props) => {
    return (
        <>
            <div class="cardDDD">
                <div class="card-details">
                    <img src={props.img} />
                </div>
                <button class="card-button"><Link to={`/CarDetail/${props.Id}`}>More Info</Link></button>
                <button class="AddToCard">+ ADD TO ORDER</button>
            </div>
        </>
    );
}

export default ShopCarCard;
