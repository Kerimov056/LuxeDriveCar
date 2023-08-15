import React from 'react';
import "./shop.scss";
import Strutur from '../BlogShopSturuktur/Strutur';
import Navbar from '../Navbar/Navbar';


const Shop = () => {
    return (
        <>
            <Navbar />
            <div>
                <Strutur blog={false} />
            </div>
        </>
    );
}

export default Shop;
