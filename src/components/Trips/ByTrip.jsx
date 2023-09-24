import React, { useState } from 'react'
import './ByTrip.scss'
import Maps from "../Map/Maps";
import Navbar from "../Navbar/Navbar";
import { Button } from '@chakra-ui/react';
import { RiUserShared2Line } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { getByTrip } from "../Services/tripServices";
import TripNote from "./TripNote";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
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


const ByTrip = (props) => {

    const { appuserid, username } = useSelector((x) => x.authReducer);


    const [mapEnter, setMapEnter] = useState(false);
    function mapOpen() {
        setMapEnter(!mapEnter);
    }

    const location = useLocation();
    const params = location.pathname.split('/').filter(param => param !== '');
    const markaLocation = params[1] || '';

    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const { data: byTrip } = useQuery(["trip", markaLocation], () =>
        getByTrip(markaLocation)
    );

    const formik = useFormik({
        initialValues: {
            Comment: '',
            TripId: byTrip?.data?.id ? byTrip?.data?.id : '',
            UserName: username ? username : '',
            AppUserId: appuserid ? appuserid : ''
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            console.log(values.Comment);
            formData.append('Comment', values.Comment);
            formData.append('TripId', byTrip?.data?.id ? byTrip?.data?.id : '');
            formData.append('UserName', username ? username : '');
            formData.append('AppUserId', appuserid ? appuserid : '');

            console.log("Comment", formData.getAll("Comment"));
            console.log("TripId", formData.getAll("TripId"));
            console.log("UserName", formData.getAll("UserName"));
            console.log("AppUserId", formData.getAll("AppUserId"));

            const response = await axios.post('https://localhost:7152/api/TripNotes/TripPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                queryClient.invalidateQueries('trip');
            }
        },
    });

    // console.log(formik.valuses);

    return (
        <>
            <div style={{ marginTop: "70px" }}>
                <Navbar />
            </div>
            <div style={mapEnter === true ? { width: "100%" } : {}} id='ByTrip'>
                <div className='ByTrip_Text'>
                    <div>
                        <div className='ByTrip_Text_Main'>
                            <div className='ByTrip_Text_Main_1'>
                                <div><Button>{"<"} Your Trips</Button></div>
                                <div className='ByTrip_Text_Main_1_Bt2'>
                                    <Button><RiUserShared2Line />Share</Button>
                                    <Button style={mapEnter === true ? {} : { display: "none" }} onClick={mapOpen}>Show map</Button>
                                    <Button>...</Button>
                                </div>
                            </div>
                            <div className='ByTrip_Text_Main_2'>
                                <div className='ByTrip_Text_Main_2_img'>
                                    <img src={byTrip?.data?.image} />
                                </div>
                                <div className='ByTrip_Text_Main_2_text'>
                                    <h1>{byTrip?.data?.name} Trip</h1>
                                    <h2>{formatDate(byTrip?.data?.startDate)} - {formatDate(byTrip?.data?.endDate)}</h2>
                                    <h2>{byTrip?.data?.destination}</h2>
                                </div>
                            </div>
                            <div className='ByTrip_Text_Main_3'>
                                <h2>Itinerary</h2>
                            </div>
                        </div>

                        <div className='ByTrip_Text_hed'>
                            <div className='ByTrip_Text_hed_main'>
                                <h1>{formatDate(byTrip?.data?.startDate)} – {formatDate(byTrip?.data?.endDate)}</h1>
                                <h3>No scheduled activities yet</h3>
                            </div>

                            <div className='ByTrip_Text_hed_nots'>
                                <TripNote />
                                <TripNote />
                                <TripNote />
                                <div className='AddNote'>
                                    <div className='AddNote_Not'>
                                        <form onSubmit={formik.handleSubmit}>
                                            <input name='Comment'
                                                onChange={formik.handleChange}
                                                value={formik.values.Comment}
                                                placeholder='  Where will you eat ? What will you see? Type + to add places' />
                                            <Button style={{marginTop:"10px"}} type='submit'>Add note</Button>
                                        </form>
                                    </div>
                                    <div className='AddNote_LocationB'>
                                        {/* <div><ImLocation />
                                            <input placeholder=' Add location' />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={mapEnter === true ? { display: "none" } : {}} className='ByTrip_map'>
                    <Button onClick={mapOpen}>Colse map</Button>
                    <Maps lat={byTrip?.data?.tripLatitude} lng={byTrip?.data?.tripLongitude} />
                </div>
            </div>
        </>
    )
}

export default ByTrip