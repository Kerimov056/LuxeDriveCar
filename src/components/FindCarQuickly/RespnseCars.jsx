import React from 'react'
import './RespnseCars.scss'
import { Button } from '@chakra-ui/react'

const RespnseCars = () => {
    return (
        <>
            <div className='RespnseCarsCard'>
                <div className='RespnseCarsCard_Img'>
                    <img src='https://content.r9cdn.net/rimg/carimages/generic/02_economy_red.png?height=174' />
                </div>
                <div className='RespnseCarsCard_Desc'>

                </div>
                <div className='RespnseCarsCard_Price'>
                    <div className='BossPrs'></div>
                    <div className='RespnseCarsCard_PriceCenter'>
                        <div>
                            <p>LuxeDrive.com</p>
                            <h2>$499</h2>
                            <p>Total</p>
                            <Button>View Deal</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RespnseCars