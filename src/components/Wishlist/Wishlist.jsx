import React from 'react'
import Navbar from "../Navbar/Navbar";
import WishlistCard from "./WishlistCard";
import "./Wishlist.scss";
import { BsFillBalloonHeartFill } from "react-icons/bs";


const Wishlist = () => {
    return (
        <>
            <div style={{ marginTop: "78px" }}>
                <Navbar />
            </div>
            {/* <div className='WishlistContenet'>
                <div>
                    <BsFillBalloonHeartFill />
                    <h1>Your Favorites List is Still Empty</h1>
                    <h2>No product found in the favorites list. You can add the products you want to your favorites by clicking the "Start Shopping" button.</h2>
                    <button>Rent a Car</button>
                </div>
            </div> */}
            <div id='Wishlist'>
                <div>
                    <WishlistCard />
                </div>
            </div>
        </>
    )
}

export default Wishlist