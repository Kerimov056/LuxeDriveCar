import { BsSearch } from 'react-icons/bs'
import './navbar.scss'
import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@chakra-ui/react';
import { logoutAction } from '../Redux/Slices/authSlice'



const Nav = () => {

    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    return (
        <>
            <nav class="navbar" id='ResponsivePhone' style={{ backgroundColor: "black" }}>
                <div id='responNav' class="navbar-container container" >
                    <input type="checkbox" name="" id="" />
                    <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>
                    <div><a id="Luxxx" href="#"><Link to={'./'} id='Linkkk'>LUXEDRIVE</Link></a></div>
                    <ul id='CllassResponsive' class="menu-items">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/AboutUs'>About Us</a></li>
                        <li><a href='VehicleFleet'>VEHICLE FLEET</a></li>
                        <li><a href='/Blogs'>BLOG</a></li>
                        <li><a href='/Shop'>SHOP</a></li>
                        <li><a href='/Communication'>Contact</a></li>
                        <li><a href={`/Trips/${appuserid ? appuserid : ''}`}>Trips</a></li>
                    </ul>
                    <h1 class="logo"><BsSearch /></h1>
                    {!token &&
                        <Link style={{ order: 1 }} to={'/Login'}><Button style={{ backgroundColor: "transparent" }}>LogIn</Button></Link>
                    }
                    {token &&
                        <Link style={{ order: 1 }} to={'/Login'}><Button style={{ backgroundColor: "transparent",marginRight:"-100px" }} onClick={() => dispatch(logoutAction())}>Log out</Button></Link>
                    }
                </div>
            </nav>
        </>
    )
}

export default Nav