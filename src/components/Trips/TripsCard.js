import React from 'react'
import './TripsCard.scss'
import { IoCarSportSharp } from "react-icons/io5";

const TripsCard = (props) => {

    const { data: trips } = useQuery('trips', () => getAllTrip(props.Id ? props.Id : ''));


    return (
        <>
            <div id='TripsCard'>
                <div className='TripsCard_img'>
                    <img src={props.img} />
                </div>
                <div className='TripsCard_text'>
                    <div>
                        <div className='DeleteByTrip'><h1></h1><button>Delete this Trip</button></div>
                        <h1>{props.Destination} Trip</h1>
                        <h3>Sat,Sep 23 - Wed, Sep 27</h3>
                        <h4><IoCarSportSharp /><span>0</span></h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TripsCard