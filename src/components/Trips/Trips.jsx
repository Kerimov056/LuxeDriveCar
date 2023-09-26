import React, { useState, useEffect } from 'react'
import './Trips.scss'
import TripsCard from "./TripsCard";
import Modal from 'react-modal';
import { AiFillCloseCircle } from "react-icons/ai";
import Search from "./Search";
import {
    Input, Text,
    Button, FormLabel, FormControl
} from '@chakra-ui/react'
import Unsplash from './Unsplash';
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { getAllTrip, myTripCount } from "../Services/tripServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStyles = {
    content: {
        top: '52%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



const Trips = () => {

    const { appuserid } = useSelector((x) => x.authReducer);
    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const currentDateTime = new Date().toISOString().slice(0, 16);


    const { data: trips } = useQuery('trips', () => getAllTrip(appuserid ? appuserid : ''));

    const [location, setLocation] = useState('');
    const [locationMap, setLocationMap] = useState({ lat: null, lng: null });

    //-----TripCount--------
    const { data: byTripCount } = useQuery('myTripCount', () => myTripCount(appuserid ? appuserid : ''));
    //-----TripCount--------


    useEffect(() => {
        const [lat, lng] = location.split(' ');
        setLocationMap({ lat, lng });
    }, [location]);


    const [city, setCity] = useState('');
    const cities = city.split(",");
    const filteredCities = cities.filter((item, index) => index % 2 === 0);

    const searchData = (data) => {
        setCity(data.label);
        setLocation(data.value);
    }

    const [showModal, setShowModal] = useState(false);
    function closeModal() {
        setShowModal(!showModal);
    }

    const [images, setImages] = useState([]);

    const handleImagesChange = (images) => {
        setImages(images);
    };



    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate1, setSelectedDate1] = useState(null);

    const handleDateChange = (e) => {
        const selected = new Date(e.target.value);
        const now = new Date();

        if (selected < now) {
            return;
        }
        setSelectedDate(e.target.value);
    };

    const handleDateChange1 = (e) => {
        const selected = new Date(e.target.value);
        if (selectedDate === null) {
            return;
        }
        if (selected < selectedDate) {
            return;
        }
        setSelectedDate1(e.target.value);
    };


    const formik = useFormik({
        initialValues: {
            Image: images ? images : '',
            Destination: filteredCities ? filteredCities : '',
            Name: "",
            StartDate: selectedDate ? selectedDate : '',
            EndDate: selectedDate1 ? selectedDate1 : '',
            TripLatitude: null,
            TripLongitude: null,
            AppUserId: appuserid ? appuserid : ''
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append('Image', images ? images : '');
            formData.append('Destination', filteredCities ? filteredCities : '');
            formData.append('Name', values.Name);
            formData.append('StartDate', selectedDate ? selectedDate : '');
            formData.append('EndDate', selectedDate1 ? selectedDate1 : '');
            formData.append('TripLatitude', locationMap.lat ? locationMap.lat : '');
            formData.append('TripLongitude', locationMap.lng ? locationMap.lng : '');
            formData.append('AppUserId', values.AppUserId);

            const response = await axios.post('https://localhost:7152/api/Trips', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                queryClient.invalidateQueries('trips');
                queryClient.invalidateQueries('myTripCount');
                toast.success(`Create new ${filteredCities} Trip`, { position: toast.POSITION.TOP_RIGHT });
                setShowModal(false)
            }
        },
    });


    return (
        <>

            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{ height: "auto" }} className='TrueAccess'>
                    <div className='onCloceSuc'>
                        <h1 style={{ marginLeft: "570px" }}><AiFillCloseCircle onClick={closeModal} /></h1>
                    </div>
                    <div className='GameToTrueAccesS'>
                        <h1>Create a Trip</h1>
                        <div>
                            <Unsplash query={filteredCities} onImagesChange={handleImagesChange} />
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <label>Destination</label>
                                <Search searchCountry={searchData} />
                            </div>
                            <div>
                                <label htmlFor="password">Trip Name</label>
                                <Text fontSize={"15px"} color={"red"} mb="8px">
                                    {/* {reservFormik.touched.FullName && reservFormik.errors.FullName} */}
                                </Text>
                                <Input
                                    // isInvalid={reservFormik.errors.FullName && reservFormik.touched.FullName}
                                    name='Name'
                                    value={formik.values.Name}
                                    onChange={formik.handleChange}
                                    placeholder='Here is a sample placeholder'
                                    size='sm'
                                />
                            </div>
                            <div className='pickReturnDate'>
                                <div>
                                    <label htmlFor="password">Start date</label>
                                    <Text fontSize={"15px"} color={"red"} mb="8px">
                                        {/* {reservFormik.touched.PickupDate && reservFormik.errors.PickupDate} */}
                                    </Text>
                                    <Input
                                        // isInvalid={reservFormik.errors.PickupDate && reservFormik.touched.PickupDate}
                                        placeholder="Select Date and Time"
                                        size="2md"
                                        type="datetime-local"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        min={currentDateTime}
                                        style={{
                                            borderTop: "none",
                                            borderRight: "none",
                                            borderLeft: "none",
                                            borderBottom: "1px solid white",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">End date</label>
                                    <Text fontSize={"15px"} color={"red"} mb="8px">
                                        {/* {reservFormik.touched.ReturnDate && reservFormik.errors.ReturnDate} */}
                                    </Text>
                                    <Input
                                        // isInvalid={reservFormik.errors.ReturnDate && reservFormik.touched.ReturnDate}
                                        placeholder="Select Date and Time"
                                        size="2md"
                                        type="datetime-local"
                                        value={selectedDate1}
                                        onChange={handleDateChange1}
                                        min={currentDateTime}
                                        style={{
                                            borderTop: "none",
                                            borderRight: "none",
                                            borderLeft: "none",
                                            borderBottom: "1px solid white",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='TripCreateButton'>
                                <button type='submit' class="btnTripeCreate">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>


            <div id='Trips'>
                <div>
                    <div className='Trips_Main'>
                        <div className='Trips_Main_one'>
                            <h1>Trips</h1>
                            <Button onClick={closeModal}>Create Trip</Button>
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
                            <h2>Upcoming {"("}{byTripCount?.data ? byTripCount?.data : ''}{")"}</h2>
                        </div>
                    </div>

                    <div className='YouTrips'>
                        {trips?.data?.map((trip) => (
                            <TripsCard key={trip.id}
                                Id={trip.id}
                                img={trip.image}
                                Destination={trip.destination}
                                startDate={trip.startDate}
                                endDate={trip.endDate} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trips