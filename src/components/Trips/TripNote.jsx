import React from 'react'
import './byTripNote.scss'
import { BsFillPersonFill } from "react-icons/bs";

function formatDate(inputDate) {

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = new Date(inputDate);
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day}, ${month}`;
}


const TripNote = (props) => {
    return (
        <>
            <div id='byTripNote'>
                <div>
                    <div>
                        <h1></h1>
                        <button>...</button>
                    </div>
                    <p>{props.tripNote}
                    </p>
                    <h1><BsFillPersonFill />{props.username}<span>{formatDate(props.createTripNote)}</span></h1>
                </div>
            </div>
        </>
    )
}

export default TripNote