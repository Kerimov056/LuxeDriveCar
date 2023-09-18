import React from 'react'
import Navbar from "../Navbar/Navbar";
import WishlistCard from "./WishlistCard";
import "./Wishlist.scss";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getWishlistCars } from "../Services/wishlistServices";

const Wishlist = () => {

    const { appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { data: wishlistCars } = useQuery({
        queryKey: ["CarWishlist", appuserid],
        queryFn: () => getWishlistCars(appuserid),
        staleTime: 0,
    });

    console.log(wishlistCars);
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
                    {wishlistCars?.data !== null && wishlistCars?.data.map((bycars, index) => (
                        <WishlistCard
                            key={index}
                            img={`data:image/jpeg;base64,${bycars?.carGetDTO?.carImages[0]?.imagePath}`}
                            Id={bycars?.carGetDTO?.id}
                            marka={bycars?.carGetDTO?.marka}
                            model={bycars?.carGetDTO?.model}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Wishlist