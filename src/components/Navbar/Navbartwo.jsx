import { BsSearch } from 'react-icons/bs'
import './navbartwo.scss'
import React from 'react'
import { Link } from "react-router-dom";



const Navbartwo = () => {

    return (
        <>
            <nav class="navbar" style={{background:"transparent"}}>
                <div class="navbar-container container" >
                    <input type="checkbox" name="" id="" />
                    <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>
                    <ul class="menu-items" id='nd'>
                        <li><a href='http://localhost:3000/'>Home</a></li>
                        <li><a><Link to={'./AboutUs'} id='Linkkk'>About Us</Link></a></li>
                        <li><a><Link to={'./VehicleFleet'}>VEHICLE FLEET</Link></a></li>
                        <li><a><Link to={'./Blogs'}>BLOG</Link></a></li>
                        <li><a><Link to={'./Shop'}>SHOP</Link></a></li>
                    </ul>
                    <h1 class="logo"><BsSearch/></h1>
                </div>
            </nav>
        </>
    )
}

export default Navbartwo