import { BsSearch } from 'react-icons/bs'
import { AiOutlineCar } from 'react-icons/ai'
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './navbarr.scss'
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from '../Redux/Slices/authSlice'
import { Button, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getBasketItemCount } from "../Services/basketServices";


const Navbar = () => {

    const { token, username } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { data: basketCount } = useQuery({
        queryKey: ["basketsCountT"],
        queryFn: getBasketItemCount,
        staleTime: 0,
    });

    return (
        <>
            <nav class="navbar">
                <div class="navbar-container container" >
                    <input type="checkbox" name="" id="" />
                    <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>
                    <ul style={{ order: 1 }} class="menu-items">
                        <li><a href='/'>LUXEDRIVE</a></li>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/AboutUs'>About Us</a></li>
                        <li><a href='VehicleFleet'>VEHICLE FLEET</a></li>
                        <li><a href='/Blogs'>BLOG</a></li>
                        <li><a href='/Shop'>SHOP</a></li>
                    </ul>
                    <ul style={{ order: 2 }}>
                        <li><Link to={'/Basket'} className='BasketCar'><AiOutlineCar id='SumCar' /><span className='SumC'>                                        {basketCount && basketCount.data !== 0 ? basketCount.data : ""}</span></Link></li>
                    </ul>
                    <Text fontSize={"2xl"}>
                        {username}
                    </Text>
                    <h1 class="logo"><BsSearch /></h1>
                    {!token &&
                     <Link to={'/Login'}><Button backgroundColor={"white"}>LogIn</Button></Link>   
                    }
                    {token &&
                        <Link to={'/Login'}><Button onClick={() => dispatch(logoutAction())}>Log out</Button></Link>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar