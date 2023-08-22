import React from 'react'
import './basket.scss'
import Navbar from "../Navbar/Navbar";


const Basket = () => {
    return (
        <>
            <Navbar />
            <div className='basket'>
                <div>
                    <div className='Productss'>
                        <div>
                            Dalams
                        </div>
                    </div>
                    <div className='paypal'>Paypal</div>
                </div>
            </div>
        </>
    )
}

export default Basket