import React from 'react'
import Navbar from "../Navbar/Navbar";
import WishlistCard from "./WishlistCard";
import "./Wishlist.scss";

const Wishlist = () => {
  return (
    <>
        <div style={{marginTop:"78px"}}>
            <Navbar/>
        </div>
        <div id='Wishlist'>
            <div>
                <WishlistCard />
            </div>
        </div>
    </>
  )
}

export default Wishlist