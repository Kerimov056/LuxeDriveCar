import React from 'react';
import './ShopCarCard.scss'
import { Link } from 'react-router-dom';
import { PostCar } from "../Services/basketServices";
import { useMutation, useQueryClient } from 'react-query';


const ShopCarCard = (props) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isError, error } = useMutation(PostCar, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["basketsCountT"]);
        },
        onError: (error) => {
            console.error("Error adding car to order", error);
        }
    });

    const handleAddToOrder = () => {
        mutate(props.Id);
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
