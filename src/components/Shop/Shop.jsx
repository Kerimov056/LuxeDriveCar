import React from 'react';
import "./shop.scss";
import Strutur from '../BlogShopSturuktur/Strutur';
import Navbar from '../Navbar/Navbar';


const Shop = () => {
    return (
        <>
            <Navbar />
            <div>
                <Strutur details={false} blog={false} />
                <h1 className='Arale'></h1>
            </div>
        </>
    );
}

export default Shop;
