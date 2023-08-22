import React from 'react'
import './basket.scss'
import Navbar from "../Navbar/Navbar";
import BasketCard from "./BasketCard";


const Basket = () => {
    return (
        <>
            <Navbar />
            <div className='basket'>
                <div>
                    <div className='Productss'>
                        <div>
                           <BasketCard />
                           <BasketCard />
                           <BasketCard />
                           <BasketCard />
                           <BasketCard />
                        </div>
                    </div>
                    <div className='paypal'>Paypal</div>
                </div>
            </div>
        </>
    )
}

export default Basket