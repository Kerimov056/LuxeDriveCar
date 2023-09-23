import React from 'react'
import './Trips.scss'
import { Button } from '@chakra-ui/react'

const Trips = () => {
    return (
        <>
            <div id='Trips'>
                <div>
                    <div className='Trips_Main'>
                        <div className='Trips_Main_one'>
                            <h1>Trips</h1>
                            <Button>Create Trip</Button>
                        </div>
                        <div className='Trips_Main_two'>
                            <div>
                                <h1>0</h1>
                                <h3>Days on the road</h3>
                            </div>
                            <div>
                                <h1>0</h1>
                                <h3>Miles flown</h3>
                            </div>
                            <div>
                                <h1>0</h1>
                                <h3>Cities visited</h3>
                            </div>
                            <div className='nextAllTripDesc'>{">"}</div>
                        </div>
                        <div className='Trips_Main_three'>
                            <h2>Upcoming {"("}4{")"}</h2>
                        </div>
                    </div>

                    <div className='YouTrips'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Trips