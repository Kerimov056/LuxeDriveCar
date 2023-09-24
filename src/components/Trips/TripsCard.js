import React from 'react';
import './TripsCard.scss';
import { IoCarSportSharp } from "react-icons/io5";
import axios from 'axios';
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TripsCard = (props) => {
    const { appuserid } = useSelector((x) => x.authReducer);
    const queryClient = useQueryClient();

    const formik = useFormik({
        initialValues: {
            tripId: props.Id || null,
            AppUserId: appuserid ? appuserid : '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.delete('https://localhost:7152/api/Trips/RemoveTrip', {
                    data: values,
                });

                if (response.status === 200) {
                    queryClient.invalidateQueries('trips');
                    toast.success(`Remove ${props.Destination} Trip`, { position: toast.POSITION.TOP_RIGHT });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    });

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

    return (
        <div id='TripsCard'>
            <div className='TripsCard_img'>
                <img src={props.img} alt="Trip" />
            </div>
            <div className='TripsCard_text'>
                <div>
                    <div className='DeleteByTrip'>
                        <h1></h1>
                        <button type="button" onClick={formik.handleSubmit}>Delete this Trip</button>
                    </div>
                    <h1>{props.Destination} Trip</h1>
                    <h3>{formatDate(props.startDate)} - {formatDate(props.endDate)}</h3>
                    <h4><IoCarSportSharp /><span>0</span></h4>
                </div>
            </div>
        </div>
    );
}

export default TripsCard;
