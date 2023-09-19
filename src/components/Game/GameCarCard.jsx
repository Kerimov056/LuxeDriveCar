import React from 'react'
import './GameCarCard.scss'
import CarCard from "./CarCard";

const GameCarCard = () => {
    return (
        <>
            <div id='GameCarCard'>
                <div>
                    <div className='GameText'>
                        <h1>CarQuest</h1>
                        <div>
                            <h2>1{")"} Welcome! Take the first step to start our car booking game. 10 different vehicle cards are waiting for you!</h2>
                            <h2>2{")"} Vehicle cards we selected specially for you! Which one will be your favorite?</h2>
                            <h2>3{")"} We chose 10 different vehicles for you. Now it's your turn! Choose which vehicle suits you best!</h2>
                            <h2>4{")"} Choose one of these 10 vehicles. Which one will be your companion?</h2>
                        </div>
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