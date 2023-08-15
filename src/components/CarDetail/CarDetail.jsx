import React from 'react';
import Navbar from '../Navbar/Navbar';
import './CarDetail.scss'

const CarDetail = () => {
    return (
        <>
            <Navbar />
            <div id='CarDetail'>
                <div>
                    <div className='CarD'>
                        <div className='CarImg'>
                            <div className='mainImg'><img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg' /></div>
                            <div className='SecImg'>
                                <div><img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-02.jpg' /></div>
                                <div><img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-01.jpg' /></div>
                            </div>
                        </div>
                        <div className='CarText'>
                            <h1>Mercedes 4x4</h1><br />
                            <h2>$22.00</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non id est laborum ultrices tellus, in suscipit massa vehicula eu.</p>
                            <div className='addCart'>
                                <div>
                                    <div>8</div>
                                    <div>
                                        <div>+</div>
                                        <div>-</div>
                                    </div>
                                </div>
                                <button>+ADD TO CART</button>
                            </div>

                            <div className='Det'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarDetail;
