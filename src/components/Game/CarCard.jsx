import React from 'react'
import './CarCard.scss'

const CarCard = (props) => {
    return (
        <>
            <div class="flip-cardGame">
                <div class="flip-card-innerGame">
                    <div class="flip-card-frontGame">
                        <img src={`data:image/jpeg;base64,${props.img}`} />
                    </div>
                    <div class="flip-card-backGamne">
                        <p class="title">{props.marka}</p>
                        <p>{props.model}</p>
                        <p>{props.year}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarCard