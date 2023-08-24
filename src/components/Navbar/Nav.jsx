import { BsSearch } from 'react-icons/bs'
import './navbar.scss'
import React from 'react'
import { Link } from "react-router-dom";



const Nav = () => {


    return (
        <>
            <nav class="navbar" style={{ backgroundColor: "black" }}>
                <div class="navbar-container container" >
                    <input type="checkbox" name="" id="" />
                    <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>
                    <div><a id="Luxxx" href="#"><Link to={'./'} id='Linkkk'>LUXEDRIVE</Link></a></div>
                    <ul class="menu-items">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/AboutUs'>About Us</a></li>
                        <li><a href='VehicleFleet'>VEHICLE FLEET</a></li>
                        <li><a href='/Blogs'>BLOG</a></li>
                        <li><a href='/Shop'>SHOP</a></li>
                    </ul>
                    <h1 class="logo"><BsSearch /></h1>
                </div>
            </nav>
        </>
    )
}

export default Nav