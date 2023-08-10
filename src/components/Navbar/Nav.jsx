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
                        <li><a href="#"><Link to={'./'} id='Linkkk'>Home</Link></a></li>
                        <li><a href="#"><Link to={'./AboutUs'} id='Linkkk'>About Us</Link></a></li>
                        <li><a href="#">VEHICLE FLEET</a></li>
                        <li><a href="#">BLOG</a></li>
                        <li><a href="#">SHOP</a></li>
                    </ul>
                    <h1 class="logo"><BsSearch /></h1>
                </div>
            </nav>
        </>
    )
}

export default Nav