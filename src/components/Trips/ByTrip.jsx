import React, { useState, useEffect } from 'react'
import './ByTrip.scss'
import Maps from "../Map/Maps";
import Navbar from "../Navbar/Navbar";
import {
    Button, Input, Select, Textarea, Text,
    FormLabel, FormControl
} from '@chakra-ui/react';
import { RiUserShared2Line } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { getByTrip, RemoveTrip } from "../Services/tripServices";
import TripNote from "./TripNote";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from 'axios';
import { getAllTripNotes } from "../Services/tripNoteServices";
import Modal from 'react-modal';
import { AiFillCloseCircle, AiOutlineLink } from "react-icons/ai";
import { getAllShareContirbuter } from "../Services/shareTripServices";
import Search from "./Search";
import Unsplash from './Unsplash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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

const currentDateTime = new Date().toISOString().slice(0, 16);

const ByTrip = (props) => {

    const { appuserid, username, email } = useSelector((x) => x.authReducer);

    const [mapEnter, setMapEnter] = useState(false);
    function mapOpen() {
        setMapEnter(!mapEnter);
    }


    const [copying, setCopying] = useState(false);


    const copyLink = () => {
        setCopying(true);
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL)
            .then(() => {
                setCopying(true);
            })
            .catch((error) => {
                setCopying(false);
            });
    };


    const locationUrl = useLocation();
    const params = locationUrl.pathname.split('/').filter(param => param !== '');
    const markaLocation = params[1] || '';

    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const [showDropdown, setShowDropdown] = useState(false);

    const handleButtonClick = () => {
        setShowDropdown(!showDropdown);
    };


    const [showModal, setShowModal] = useState(false);
    function closeModal() {
        setShowModal(!showModal);
        setCopying(false)
    }

    const [editModal, setEditModal] = useState(false);
    function editClose() {
        setEditModal(!editModal);
        setShowDropdown(false)
    }



    const { data: byTrip } = useQuery(["trip", markaLocation], () =>
        getByTrip(markaLocation)
    );


    //-------- TripNotes
    const { data: tripsNote } = useQuery('tripNotes', () => getAllTripNotes(markaLocation ? markaLocation : ''));
    //--------

    //-------- getAllShareContirbuter
    const { data: getAllSContirbuter } = useQuery('getAllShareTrContirbuter', () => getAllShareContirbuter(markaLocation ? markaLocation : ''));
    //--------
    const showHtml = getAllSContirbuter?.data?.some(item => item.email === email);
    const myTrip = appuserid === byTrip?.data?.appUserId;



    const formik = useFormik({
        initialValues: {
            Comment: '',
            TripId: byTrip?.data?.id ? byTrip?.data?.id : '',
            UserName: username ? username : '',
            AppUserId: appuserid ? appuserid : ''
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append('Comment', values.Comment);
            formData.append('TripId', byTrip?.data?.id ? byTrip?.data?.id : '');
            formData.append('UserName', username ? username : '');
            formData.append('AppUserId', appuserid ? appuserid : '');

            const response = await axios.post('https://localhost:7152/api/TripNotes/TripPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                queryClient.invalidateQueries('tripNotes');
            }
        },
    });


    const [tripRole, setTripRole] = useState(0);

    const shareFormik = useFormik({
        initialValues: {
            Email: '',
            Message: '',
            TripRole: tripRole ? tripRole : '',
            TripId: byTrip?.data?.id ? byTrip?.data?.id : '',
            AppUserId: appuserid ? appuserid : ''
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append('Email', values.Email);
            formData.append('Message', values.Message);
            formData.append('TripRole', tripRole === 0 ? 0 : 1);
            formData.append('TripId', byTrip?.data?.id ? byTrip?.data?.id : '');
            formData.append('AppUserId', appuserid ? appuserid : '');

            const response = await axios.post('https://localhost:7152/api/ShareTrips', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                queryClient.invalidateQueries('trip');
            }
        },
    });


    //------------Edit By Trip------------------------



    const [location, setLocation] = useState('');
    const [locationMap, setLocationMap] = useState({ lat: null, lng: null });

    useEffect(() => {
        const [lat, lng] = location.split(' ');
        setLocationMap({ lat, lng });
    }, [location]);


    const destination = `${byTrip?.data?.destination} , US`

    const [city, setCity] = useState(destination ? destination : '');
    const cities = city.split(",");
    const filteredCities = cities.filter((item, index) => index % 2 === 0);

    const searchData = (data) => {
        setCity(data.label);
        setLocation(data.value);
    }


    const [images, setImages] = useState([]);

    const handleImagesChange = (images) => {
        setImages(images);
    };


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate1, setSelectedDate1] = useState(null);

    // useEffect(() => {
    // }, [selectedDate1])

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


    useEffect(() => {
        editTripFormik.setFieldValue('Name', byTrip?.data?.name);
    }, [byTrip?.data?.name]);


    const editTripFormik = useFormik({
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


            const response = await axios.put(`https://localhost:7152/api/Trips/Update/${byTrip?.data?.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                queryClient.invalidateQueries('trips');
                queryClient.invalidateQueries('trip');
                toast.success(`Create new ${filteredCities} Trip`, { position: toast.POSITION.TOP_RIGHT });
                setEditModal(false)
            }
        },
    });


    //-------------------------------------------------
    //---------------Remove---------------------------

    const By_TRIP_Id = byTrip?.data?.id;

    const handleRemove = async () => {
        try {
            await RemoveTrip({ By_TRIP_Id, AppUserId: appuserid });
            queryClient.invalidateQueries('trips');
            queryClient.invalidateQueries('trip');
        } catch (error) {
        }
    };

    //------------------------------------------------

    return (
        <>

            <Modal
                isOpen={editModal}
                onRequestClose={editClose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{ height: "auto" }} className='TrueAccess'>
                    <div className='onCloceSuc'>
                        <h1 style={{ marginLeft: "570px" }}><AiFillCloseCircle onClick={editClose} /></h1>
                    </div>
                    <div className='GameToTrueAccesS'>
                        <h1>Create a Trip</h1>
                        <div>
                            <Unsplash query={filteredCities} onImagesChange={handleImagesChange} />
                        </div>
                        <form onSubmit={editTripFormik.handleSubmit}>
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
                                    value={editTripFormik.values.Name}
                                    onChange={editTripFormik.handleChange}
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


            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div id='ShareByTrip'>
                    <h1><p></p><p><AiFillCloseCircle onClick={closeModal} /></p></h1>
                    <div className='ShareByTrip_1'>
                        <h1>Share Trip</h1>
                        <div>
                            <span>You can share your trip with your friends by clicking Copy Link.</span>
                            <Button onClick={copyLink} style={{ backgroundColor: copying ? '#07FC00' : '' }} ><AiOutlineLink /> Copy link</Button>
                        </div>

                    </div>
                    <div className='ShareByTrip_2'>
                        <form onSubmit={shareFormik.handleSubmit}>
                            <div className='ShareByTrip_2_1'>
                                <div><label>Add people</label></div>
                                <div>
                                    <div className='InputEmailTrip' >
                                        <Input name='Email'
                                            onChange={shareFormik.handleChange}
                                            value={shareFormik.values.Email}
                                            placeholder='Separate multiple email addresses with commas or spaces' />
                                    </div>
                                    <div className='SelectTypeSend'>
                                        <Select
                                            placeholder='Select option'
                                            onChange={(e) => {
                                                setTripRole(Number(e.target.value));
                                            }}
                                            defaultValue='0'
                                        >
                                            <option value='0'>Option 1</option>
                                            <option value='1'>Option 2</option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className='ShareByTrip_2_2'>
                                <label>Note</label>
                                <Textarea name='Message'
                                    onChange={shareFormik.handleChange}
                                    value={shareFormik.values.Message} />
                            </div>
                            <div className='ShareByTrip_2_3'>
                                <Button type='submit' >Invite</Button>
                            </div>
                        </form>
                    </div>
                    <div className='ShareByTrip_3'>
                        <h1><p></p><p>Owner</p></h1>
                        <div>
                            <div><Button>ME</Button> <span>meimeiiemiem439 (you)</span></div>
                            <Select id='UpdatDegreeTrip' placeholder='Select option'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                            </Select>
                        </div>
                    </div>
                </div>
            </Modal>


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
                                    {(showHtml || myTrip) && (
                                        <Button onClick={closeModal}><RiUserShared2Line />Share</Button>
                                    )}
                                    <Button style={mapEnter === true ? {} : { display: "none" }} onClick={mapOpen}>Show map</Button>
                                    <Button onClick={handleButtonClick}>...</Button>
                                    {showDropdown && (
                                        <div className="dropdownByTrip">
                                            <ul>
                                                <li onClick={editClose} className='EditByTrip'>Edit</li>
                                                <li onClick={handleRemove} className='RemoveByTrip'>Remove</li>
                                                {/* Diğer seçenekleri ekleyin */}
                                            </ul>
                                        </div>
                                    )}
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
                                {tripsNote?.data?.map((tripsNote) => (
                                    <TripNote tripNote={tripsNote?.comment}
                                        username={tripsNote.userName}
                                        createTripNote={tripsNote.createTripNote}
                                        AppUserId={tripsNote.appUserId}
                                        tripNoteId={tripsNote.id}
                                        tripId={byTrip?.data?.id} />
                                ))}
                                <div className='AddNote'>
                                    {(showHtml || myTrip) && (
                                        <div className='AddNote_Not'>
                                            <form onSubmit={formik.handleSubmit}>
                                                <input name='Comment'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.Comment}
                                                    placeholder='  Where will you eat ? What will you see? Type + to add places' />
                                                <Button style={{ marginTop: "10px" }} type='submit'>Add note</Button>
                                            </form>
                                        </div>
                                    )}
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