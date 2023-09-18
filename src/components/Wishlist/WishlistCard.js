import React from 'react'
import "./WishlistCard.scss";
import { Button } from '@chakra-ui/react';

const WishlistCard = () => {
    return (
        <>
            <div className='WishlistCardMain'>
                <div class="WishlistCardBox">
                    <span></span>
                    <div class="WishlistCardContent">
                        <img src='https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/brands/einstiegsseite/1280x854_P90351044_highRes_the-new-bmw-8-series.jpg' />
                    </div>
                </div>
                <div className='WishlistCarDetails'>
                    <h1>Marka: <span>BMW</span></h1>
                    <h1>Model: <span>m3</span></h1>
                </div>
                <div className='WishlistCardX'>
                    <Button>X</Button>
                </div>
                <div className='WishlistCardSohowCar'>
                    <button class="cta">
                        <span class="hover-underline-animation"> Shop now </span>
                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default WishlistCard