import React from 'react'
import './basket.scss'
import Navbar from "../Navbar/Navbar";
import BasketCard from "./BasketCard";
import { useQuery } from "react-query";
import { getBasketCars } from "../Services/basketServices";
import { Link } from 'react-router-dom';


const Basket = () => {


    const { data: basketCars } = useQuery({
        queryKey: ["Cars"],
        queryFn: getBasketCars,
        staleTime: 0,
    });


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
                            <span>X</span>
                            <span>Order</span>
                        </div>
                        <div>
                            {basketCars?.data.map((bycars, index) => (
                                <BasketCard
                                    key={index}
                                    img={'https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Main-home-vehicle-list-img-01.jpg'}
                                    Id={bycars?.carGetDTO?.id}
                                    Marka={bycars?.carGetDTO?.marka}
                                    model={bycars?.carGetDTO?.model}
                                    desc={bycars?.carGetDTO?.description.slice(0, 150)}
                                    category={bycars?.carGetDTO?.carCategory ? bycars?.carGetDTO?.carCategory?.category : "No Category"}
                                    price={bycars?.carGetDTO?.price}
                                />
                            ))}
                            {
                                basketCars?.data.lenght == null &&
                                <div Id='emptyBasket'>
                                    <h1>You have never ordered a car</h1>
                                    <div>
                                    <Link to={'/Shop'}><button class="Btn"></button></Link>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                    {
                        basketCars.data.lenght != null &&
                        <div className='paypal'>Paypal</div>
                    }
                </div>
            </div>
        </>
    )
}

export default Basket