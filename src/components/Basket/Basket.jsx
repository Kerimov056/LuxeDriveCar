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
                        <div className='TableStructur'>
                            <span>Car</span>
                            <span>Category</span>
                            <span>Price</span>
                            <span>Order</span>
                        </div>
                        <div>

                            <BasketCard img={""} marka={""} model={""} desc={""} categori={""} price={""} />

                        </div>
                    </div>
                    <div className='paypal'>Paypal</div>
                </div>
            </div>
        </>
    )
}

export default Basket