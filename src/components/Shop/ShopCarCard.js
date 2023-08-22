import React from 'react';
import './ShopCarCard.scss'
import { Link } from 'react-router-dom';
import { PostCar } from "../Services/basketServices";


const ShopCarCard = (props) => {

    const handleAddToOrder = () => {
        PostCar(props.Id)
            .then(response => {
                console.log("Car added to order", response.data);
            })
            .catch(error => {
                console.error("Error adding car to order", error);
            });
    }

    return (
        <>
            <div class="cardDDD">
                <div class="card-details">
                    <img src={props.img} />
                </div>
                <button class="card-button"><Link to={`/CarDetail/${props.Id}`}>More Info</Link></button>
                <button onClick={handleAddToOrder} class="AddToCard">+ ADD TO ORDER</button>
            </div>
        </>
    );
}

export default ShopCarCard;
