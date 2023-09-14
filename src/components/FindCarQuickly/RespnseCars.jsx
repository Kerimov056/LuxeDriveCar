import React from 'react'
import './RespnseCars.scss'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const RespnseCars = (props) => {
    return (
        <>
            <div className='RespnseCarsCard'>
                <div className='RespnseCarsCard_Img'>
                    <img src={props.img} />
                </div>
                <div className='RespnseCarsCard_Desc'>
                    <div className='RespnseCarsCard_Desc1'>
                        <h1>{props.marka} {props.model}</h1>
                        <h2>{props.category}</h2>

                    </div>
                    <div className='RespnseCarsCard_Desc2'>
                        <h1>Yasamal</h1>
                    </div>
                </div>
                <div className='RespnseCarsCard_Price'>
                    <div className='BossPrs'></div>
                    <div className='RespnseCarsCard_PriceCenter'>
                        <div>
                            <p>LuxeDrive.com</p>
                            <h2>${props.price}</h2>
                            <p>Total</p>
                            <Button><Link to={`/CarDetail/${props.Id}`}>View Deal</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RespnseCars