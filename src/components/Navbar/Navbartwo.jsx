import { BsSearch } from 'react-icons/bs'
import './navbartwo.scss'
import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@chakra-ui/react';
import { logoutAction } from '../Redux/Slices/authSlice'



const Navbartwo = () => {

    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();


    return (
        <>
            <nav class="navbar" id='ResponsivePhone' style={{ background: "transparent" }}>
                <div class="navbar-container container" >
                    <input type="checkbox" name="" id="" />
                    <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>
                    <ul style={{order:1}} class="menu-items" id='nd'>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/AboutUs'>About Us</a></li>
                        <li><a href='VehicleFleet'>VEHICLE FLEET</a></li>
                        <li><a href='/Blogs'>BLOG</a></li>
                        <li><a href='/Shop'>SHOP</a></li>
                        <li><a href='/Communication'>Contact</a></li>
                        <li><a href={`/Trips/${appuserid ? appuserid : ''}`}>Trips</a></li>
                    </ul>
                    {!token &&
                        <Link style={{order:2}} to={'/Login'}><Button style={{backgroundColor:"transparent"}}>LogIn</Button></Link>
                    }
                    {token &&
                        <Link style={{order:2}} to={'/Login'}><Button style={{backgroundColor:"transparent"}} onClick={() => dispatch(logoutAction())}>Log out</Button></Link>
                    } 
                </div>
            </nav>
        </>
    )
}

export default Navbartwo