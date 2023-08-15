import React from 'react';
import './ShopCarCard.scss'


const ShopCarCard = () => {
    return (
        <>
            <div class="card">
                <div class="card-details">
                    <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg' />
                    <p class="text-body">Here are the details of the card</p>
                </div>
                <button class="card-button">More info</button>
            </div>
        </>
    );
}

export default ShopCarCard;
