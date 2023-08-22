import React, { useState } from 'react'
import './basketCard.scss'

const BasketCard = (props) => {

    const [Premium, setPremium] = useState("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-9.png");
    const [Super, setSuper] = useState("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-10.png");
    const [Luxury, setLuxury] = useState("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/Vihecle-single-corner-img-.png");
    const [Business, setBusiness] = useState("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-12.png");

    if (props.categori === "Premium") {
        props.categori = Premium;
    }
    if (props.categori == "Super") {
        props.categori = Super;
    }
    if (props.categori == "Luxury") {
        props.categori = Luxury;
    }
    if (props.categori == "Business") {
        props.categori = Business;
    }

    return (
        <>
            <div className='BasketCard'>
                <div class="card">
                    <img src={props.img} />
                    <div class="card__content">
                        <p class="card__title">{props.marka} {props.model}</p>
                        <p class="card__description">{props.desc}</p>
                    </div>
                </div>

                <div>
                    <img src={props.categori} />
                </div>

                <div className='Price'>
                    <button>
                        ${props.price}
                    </button>
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