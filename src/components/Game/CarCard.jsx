import React from 'react'
import './CarCard.scss'

const CarCard = (props) => {
    return (
        <>
            <div class="flip-cardGame">
                <div class="flip-card-innerGame">
                    <div class="flip-card-frontGame">
                        <img style={{width:"100%", height:"100%", objectFit:"contain"}} src={`data:image/jpeg;base64,${props.img}`} />
                    </div>
                    <div class="flip-card-backGamne">
                        <p id='GameCarDesc' class="title">{props.marka}</p>
                        <p id='GameCarDesc'>{props.model}</p>
                        <p id='GameCarDesc'>{props.year}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarCard