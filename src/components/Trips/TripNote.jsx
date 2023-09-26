import React, { useState, useEffect } from 'react';
import './byTripNote.scss'
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { RemoveTripNotes, myTripNote } from "../Services/tripNoteServices";
import { Button, Input } from '@chakra-ui/react';
import { useFormik } from "formik";
import axios from 'axios';



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

    // const TRIP_ID = props.tripId
    // const mutation = useMutation(myTripNote);

    // useEffect(() => {

    //     const fetchData = async () => {
    //         try {
    //             const response = await mutation.mutateAsync({ appuserid, TRIP_ID });
    //             console.log(">>>>>>", response);
    //         } catch (error) {
    //             // console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const editTripNote = () => {
        setEdit(prevEdit => !prevEdit);
        setIsOpen(true);
    };



    const { mutate } = useMutation(() => RemoveTripNotes(props.tripNoteId, appuserid), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['tripNotes']);
            queryClient.invalidateQueries(['trip']);
        },
        onError: (error) => {
        }
    });


    const removeTripNote = async () => {
        mutate({ tripNoteId: props.tripNoteId, appUserId: appuserid });
    }

    const formik = useFormik({
        initialValues: {
            Comment: '',
            TripId: props.tripId ? props.tripId : '',
            UserName: username ? username : '',
            AppUserId: appuserid ? appuserid : ''
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append('Comment', values.Comment);
            formData.append('TripId', props.tripId ? props.tripId : '');
            formData.append('UserName', username ? username : '');
            formData.append('AppUserId', appuserid ? appuserid : '');

            try {
                const response = await axios.put(`https://localhost:7152/api/TripNotes/Edit/${props.tripNoteId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (response.status === 200) {
                    setEdit(!edit)
                    queryClient.invalidateQueries('tripNotes');
                    queryClient.invalidateQueries('trip');
                }
            } catch (error) {
            }

        },
    });

    useEffect(() => {
        formik.setFieldValue('Comment', props.tripNote);
    }, [props.tripNote]);


    return (
        <>
            <div id='byTripNote'>
                <div>
                    <div>
                        <h1></h1>
                        <button style={isOpen === true ? { marginRight: "-100%", marginBottom: "-60px" } : {}} id='TripSers' onClick={toggleDropdown}>...</button>
                        {isOpen && appuserid === props.AppUserId && (
                            <div className="dropdown-content">
                                <button id='tripNoteRemove' onClick={removeTripNote}>Remove</button>
                                <button style={edit === true ? { display: "none" } : {}} id='tripNoteEdit' onClick={editTripNote}>Edit</button>
                            </div>
                        )}
                    </div>
                    <p style={edit === true ? { display: "none" } : {}}>{props.tripNote}</p>
                    {edit && (
                        <div className='EditTripNoteA'>
                            <form onSubmit={formik.handleSubmit}>
                                <Input
                                    name='Comment'
                                    value={formik.values.Comment}
                                    onChange={formik.handleChange}
                                    className='editThisTripNote'
                                />
                                <Button
                                    type='submit'
                                    id='editButtun'>Save</Button>
                            </form>
                        </div>
                    )}
                    <h1>
                        <BsFillPersonFill />{props.username}
                        <span>
                            {formatDate(props.createTripNote)}
                        </span>
                    </h1>
                </div>
            </div>
        </>
    )
}

export default TripNote