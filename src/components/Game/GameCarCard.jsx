import React from 'react'
import './GameCarCard.scss'
import CarCard from "./CarCard";

const GameCarCard = () => {
    return (
        <>
            <div id='GameCarCard'>
                <div>
                    <div className='GameText'>
                        Game
                    </div>
                    <div className='GameCarCards'>
                        <div className='GameCarCard_Card4'>
                            <CarCard />
                            <CarCard />
                            <CarCard />
                            <CarCard />
                        </div>
                        <div className='GameCarCard_Card3'>
                            <CarCard />
                            <CarCard />
                            <CarCard />
                        </div>
                        <div className='GameCarCard_Card2'>
                            <CarCard />
                            <CarCard />
                        </div>
                        <div className='GameCarCard_Card1'>
                            <CarCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameCarCard