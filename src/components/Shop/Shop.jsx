import React from 'react';
import "./shop.scss";
import Strutur from '../BlogShopSturuktur/Strutur';
import Navbar from '../Navbar/Navbar';
import Navbartwo from '../Navbar/Navbartwo';


const Shop = () => {
    return (
        <>
            <div className='ReponsiveNav'>
                <Navbar />
            </div>
            <div className='DisplayNavbar'>
                <Navbartwo />
            </div>

            <div>
                <Strutur details={false} blog={false} />
                <h1 className='Arale'></h1>
            </div>
        </>
    );
}

export default Shop;
