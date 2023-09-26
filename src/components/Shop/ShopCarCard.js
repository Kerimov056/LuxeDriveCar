import React from 'react';
import './ShopCarCard.scss';
import { Link } from 'react-router-dom';
import { PostCar } from "../Services/basketServices";
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ShopCarCard = (props) => {
    const { appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const notify = () => toast("Cart Added");


    const { mutate } = useMutation(() => PostCar(props.Id, appuserid), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["basketsCountT"]);
        },
        onError: (error) => {
        }
    });

    const handleAddToOrder = () => {
        mutate({ carId: props.Id, AppUserId: appuserid });
        notify();
    }

    return (
        <>
            <div className="cardDDD">
                <div className="card-details">
                    <img src={props.img} alt="Car" />
                </div>
                <button className="card-button"><Link to={`/CarDetail/${props.Id}`}>More Info</Link></button>
                <button onClick={handleAddToOrder} className="AddToCard">+ ADD TO ORDER</button>
                <ToastContainer
                    position="bottom-center"
                />
            </div>
        </>
    );
}

export default ShopCarCard;
