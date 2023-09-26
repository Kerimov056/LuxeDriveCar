import { BsSearch } from 'react-icons/bs'
import './navbartwo.scss'
import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const Navbartwo = () => {
    
    const { appuserid } = useSelector((x) => x.authReducer);

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
                    <ul class="menu-items" id='nd'>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/AboutUs'>About Us</a></li>
                        <li><a href='VehicleFleet'>VEHICLE FLEET</a></li>
                        <li><a href='/Blogs'>BLOG</a></li>
                        <li><a href='/Shop'>SHOP</a></li>
                        <li><a href='/Communication'>Contact</a></li>
                        <li><a href={`/Trips/${appuserid ? appuserid : ''}`}>Trips</a></li>
                    </ul>
                    {/* <h1 class="logo"><BsSearch /></h1> */}
                </div>
            </nav>
        </>
    )
}

export default Navbartwo