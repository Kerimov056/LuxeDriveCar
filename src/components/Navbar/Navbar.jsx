import { BsSearch } from 'react-icons/bs'
import React from 'react'
import { Link } from "react-router-dom";
import './navbarr.scss'


const Navbar = () => {


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
                    <ul class="menu-items">
                        <li><a href='/'>LUXEDRIVE</a></li>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/AboutUs'>About Us</a></li>
                        <li><a><Link to={'./VehicleFleet'}>VEHICLE FLEET</Link></a></li>
                        <li><a href='/Blogs'>BLOG</a></li>
                        <li><a><Link to={'./Shop'}>SHOP</Link></a></li>
                    </ul>
                    <h1 class="logo"><BsSearch /></h1>
                </div>
            </nav>
        </>
    )
}

export default Navbar