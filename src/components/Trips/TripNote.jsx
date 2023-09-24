import React, { useState } from 'react';
import './byTripNote.scss'
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { RemoveTripNotes } from "../Services/tripNoteServices";

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

    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };



    const { mutate } = useMutation(() => RemoveTripNotes(props.tripNoteId), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['tripNotes']);
            queryClient.invalidateQueries(['trip']);
        },
        onError: (error) => {
        }
    });


    const removeTripNote = async () => {
        mutate({ tripNoteId: props.tripNoteId });
    }

    return (
        <>
            <div id='byTripNote'>
                <div>
                    <div>
                        <h1></h1>
                        <button onClick={toggleDropdown}>...</button>
                        {isOpen && appuserid === props.AppUserId && (
                            <div className="dropdown-content">
                                <button onClick={removeTripNote}>Remove</button>
                                <p>Seçenek 2</p>
                            </div>
                        )}
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