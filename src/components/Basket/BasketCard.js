import React, { useState, useEffect } from 'react'
import './basketCard.scss'
import { Button } from '@chakra-ui/react';
import { removeByCar } from "../Services/basketServices";
import { useMutation, useQueryClient } from 'react-query';


const BasketCard = (props) => {

    const queryClient = useQueryClient();

    const removeMutation = useMutation(removeByCar, {
        onSuccess: () => {
            queryClient.invalidateQueries(['Cars']);
            queryClient.invalidateQueries(['basketsCountT']);
        },
    });

    const handleRemove = () => {
        removeMutation.mutate(props.Id);
    };


    const sport = "SPORT";
    const Premium = "Premium";
    const Luxury = "Luxury";
    const Business = "Business";

    const [imgUrl, setImgUrl] = useState('');

    useEffect(() => {
        if (props.category.toUpperCase() === sport.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-9.png");
        } else if (props.category.toUpperCase() === Premium.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-10.png");
        } else if (props.category.toUpperCase() === Luxury.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/Vihecle-single-corner-img-.png");
        } else if (props.category.toUpperCase() === Business.toUpperCase()) {
            setImgUrl("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-12.png");
        } else {
            setImgUrl('');
        }
    }, [props.category]);
    return (
        <>
            <div className='BasketCard'>
                <div class="card">
                    <img src={props.img} />
                    <div class="card__content">
                        <h4 class="card__title">{props.Marka} {props.model}</h4>
                        <p class="card__description">{props.desc}</p>
                    </div>
                </div>

                <div>
                    <img src={imgUrl} />
                </div>

                <div className='Price'>
                    <button>
                        ${props.price}
                    </button>
                </div>

                <div>
                    <Button onClick={handleRemove}>X</Button>
                </div>

                <div className='Getorder'>
                    <button class="cssbuttons-io-button"> Get order
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default BasketCard