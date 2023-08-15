import React from 'react';
import Navbar from '../Navbar/Navbar';
import './CarDetail.scss'
import CursorZoom from 'react-cursor-zoom';


const CarDetail = () => {
    return (
        <>
            <Navbar />
            <div id='CarDetail'>
                <div>
                    <div className='CarD'>
                        <div className='CarImg'>
                            <div className='mainImg'>
                                <CursorZoom
                                    image={{
                                        src: "https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg",
                                        width: 600,
                                        height: 750
                                    }}
                                    zoomImage={{
                                        src: "https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg",
                                        width: 1300,
                                        height: 1000
                                    }}
                                    cursorOffset={{ x: 180, y: 0 }}
                                    
                                />
                                {/* <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg' /> */}
                            </div>
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
                                    <div className='Sum'>8</div>
                                    <div className='hesab'>
                                        <div>+</div>
                                        <div>-</div>
                                    </div>
                                </div>
                                <button>+ ADD TO CART</button>
                            </div>

                            <div className='Det'>
                                <div><span>SKU:</span><span className='Answer'>0058</span></div>
                                <div><span>Catagory:</span><span className='Answer Category'>EXPENSIVE</span></div>
                                <div><span>Tags:</span><span className='Answer'><button>#Car</button></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarDetail;
