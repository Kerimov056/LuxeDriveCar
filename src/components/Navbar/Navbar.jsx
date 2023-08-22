import { BsSearch } from 'react-icons/bs'
import { AiOutlineCar } from 'react-icons/ai'
import React from 'react'
import { Link } from "react-router-dom";
import './navbarr.scss'
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from '../Redux/Slices/authSlice'
import { Button, Text } from "@chakra-ui/react";



const Navbar = () => {


    const { name, surname, token } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();



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
                    <ul style={{order: 1}} class="menu-items">
                        <li><a href='/'>LUXEDRIVE</a></li>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/AboutUs'>About Us</a></li>
                        <li><a href='VehicleFleet'>VEHICLE FLEET</a></li>
                        <li><a href='/Blogs'>BLOG</a></li>
                        <li><a href='Shop'>SHOP</a></li>
                    </ul>
                    <ul style={{order: 2}}>
                        <li><Link><AiOutlineCar id='SumCar'/></Link></li>
                    </ul>
                    {/* <Text fontSize={"5xl"}>
                        Welcome, {name} {surname}
                    </Text>
                    <h1 class="logo"><BsSearch /></h1>
                    <Button onClick={() => dispatch(logoutAction())}>Log out</Button> */}
                </div>
            </nav>
        </>
    )
}

export default Navbar