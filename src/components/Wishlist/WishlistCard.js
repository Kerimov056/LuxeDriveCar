import React from 'react'
import "./WishlistCard.scss";
import { Button } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { removeByCar } from "../Services/wishlistServices";

const WishlistCard = (props) => {

    const { appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { mutate, isLoading, isError, error } = useMutation(() => removeByCar(props.Id, appuserid), {
        onSuccess: (data) => {
            // queryClient.invalidateQueries(['Cars']);
            // queryClient.invalidateQueries(['basketsCountT']);
        },
        onError: (error) => {
            console.error("Error adding car to order", error);
        } 
    });

    const handleRemove = () => {
        mutate({ carId: props.Id, AppUserId: appuserid });
    };


    return (
        <>
            <div className='WishlistCardMain'>
                <div class="WishlistCardBox">
                    <span></span>
                    <div class="WishlistCardContent">
                        <img src={props.img} />
                    </div>
                </div>
                <div className='WishlistCarDetails'>
                    <h1>Marka: <span>{props.marka}</span></h1>
                    <h1>Model: <span>{props.model}</span></h1>
                </div>
                <div className='WishlistCardX'>
                    <Button onClick={handleRemove}>X</Button>
                </div>
                <div className='WishlistCardSohowCar'>
                <Link to={`/CarDetail/${props.Id}`}>   <button class="cta">
                        <span class="hover-underline-animation"> Shop now </span>
                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                        </svg>
                    </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default WishlistCard