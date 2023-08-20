import React from 'react';
import './ShopCarCard.scss'


const ShopCarCard = (props) => {
    return (
        <>
            <div class="cardDDD">
                <div class="card-details">
                    <img src={props.img} />
                </div>
                <button class="card-button">More info</button>
                <button class="AddToCard">+ ADD TO ORDER</button>
            </div>
        </>
    );
}

export default ShopCarCard;
