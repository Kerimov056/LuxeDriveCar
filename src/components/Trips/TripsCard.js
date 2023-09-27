import React, { useEffect } from 'react';
import './TripsCard.scss';
import { IoCarSportSharp } from "react-icons/io5";
import axios from 'axios';
import { useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import AOS from 'aos'
import "aos/dist/aos.css";
import { RemoveTrip } from "../Services/tripServices";

const TripsCard = (props) => {
    const { appuserid } = useSelector((x) => x.authReducer);
    const queryClient = useQueryClient();

    useEffect(() => {
        AOS.init({
            offset: 300,
            duration: 500,
            delay: 1360,
        });
        AOS.refresh();
    }, [])


    const Trip_ID = props.Id;

    const { mutate } = useMutation(() => RemoveTrip(Trip_ID, appuserid), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['trips']);
            queryClient.invalidateQueries(['trip']);
            queryClient.invalidateQueries(['myTripCount']);
        },
        onError: (error) => {
        }
    });


    const tripRemove = async () => {
        mutate({ TripId: Trip_ID, AppUserId: appuserid });
    }

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

    function isBeforeNow(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        return date < now;
    }

    const isDateBeforeNow = isBeforeNow(props.endDate);
    console.log(isDateBeforeNow);


    return (
        <div data-aos="fade-right" id='TripsCard'>
            <div className='TripsCard_img'>
                <img src={props.img} alt="Trip" />
            </div>
            <div className='TripsCard_text'>
                <div>
                    <div className='DeleteByTrip'>
                        <h1></h1>
                        <button type="button" onClick={tripRemove}>Delete this Trip</button>
                    </div>
                    <h1><Link to={`/ByTrip/${props.Id}`} >{props.Destination} Trip</Link></h1>
                    <h3>{formatDate(props.startDate)} - {formatDate(props.endDate)}</h3>
                    <h4><IoCarSportSharp /><span>0</span></h4>
                    <span>
                        {isDateBeforeNow === true ? (
                            <label style={{marginTop:"20px"}} className="containerCampletTrip">
                                <input type="checkbox" checked={true} />
                                <div className="checkmark"></div>
                            </label>
                        ) : (
                            ''
                        )}
                    </span>

                </div>
            </div>
        </div>
    );
}

export default TripsCard;
