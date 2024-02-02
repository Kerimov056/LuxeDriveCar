import React, { useState, useEffect, useRef } from 'react'
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
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from 'axios';
import { getAllTripNotes } from "../Services/tripNoteServices";
import Modal from 'react-modal';
import { AiFillCloseCircle, AiOutlineLink } from "react-icons/ai";
import { getAllShareContirbuter, getAllShareTrip, updateShareTrip } from "../Services/shareTripServices";
import Search from "./Search";
import Unsplash from './Unsplash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import tripImage from "./Trips.avif";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import { PiCar } from "react-icons/pi";
import { myTripCars } from "../Services/tripServices";
import ByTripCars from "./ByTripCars";



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
        height: 'auto'
    },
};

const markerIcon = new L.Icon({
    iconUrl: require("./download.png"),
    iconSize: [45, 35],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});



const currentDateTime = new Date().toISOString().slice(0, 16);

const ByTrip = (props) => {
    const notify = () => toast("We accepted your e-mail");

    //-----------------------------------
    const mapRef = useRef();
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


    const [sharedUserModal, setSharedUserModal] = useState(false);
    function sharedModalClose() {
        setSharedUserModal(!sharedUserModal);
    }

    const [tripCar, setTripCar] = useState(false);
    function TripCars() {
        setTripCar(!tripCar);
    }

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

    const [removeModal, setRemoveModal] = useState(false);
    function removeClose() {
        setRemoveModal(!removeModal);
        setShowDropdown(false)
    }



    const { data: byTrip } = useQuery(["trip", markaLocation], () =>
        getByTrip(markaLocation)
    );

    //-------- shareTripCars
    const { data: shareTripCars } = useQuery('getAllCarTrip', () => myTripCars(markaLocation ? markaLocation : ''));
    // --------
    console.log("shareTripCars", shareTripCars);

    //-------- shareTripAll
    const { data: shareTripAll } = useQuery('getAllShareTrip', () => getAllShareTrip(markaLocation ? markaLocation : ''));
    //--------

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


            // console.log(formData.getAll("Email"));
            // console.log(formData.getAll("Message"));
            // console.log(formData.getAll("TripRole"));
            // console.log(formData.getAll("TripId"));
            // console.log(formData.getAll("AppUserId"));


            const response = await axios.post('https://localhost:7152/api/ShareTrips', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                queryClient.invalidateQueries('trip');
                setShowModal(false);
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
            if (response.status === 200) {
                queryClient.invalidateQueries('trips');
                queryClient.invalidateQueries('trip');
                toast.success(`Create new ${filteredCities} Trip`, { position: toast.POSITION.TOP_RIGHT });
                setEditModal(!editModal)
            }
        },
    });           ////Burda modal baglanmali ve reflesh atmalidi 


    //-------------------------------------------------
    //---------------Remove---------------------------

    const Trip_ID = byTrip?.data?.id;

    const { mutate } = useMutation(() => RemoveTrip(Trip_ID, appuserid), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['trips']);
            queryClient.invalidateQueries(['trip']);
            queryClient.invalidateQueries(['myTripCount']);
            navigate(`/Trips/${appuserid}`)
        },
        onError: (error) => {
        }
    });


    const tripRemove = async () => {
        mutate({ TripId: Trip_ID, AppUserId: appuserid });
    }
    //------------------------------------------------


    //-------------------Update Share Trip-------------------


    // const updateFormik = useFormik({
    //     initialValues: {
    //         Email: '',
    //         TripRole: tripRole ? tripRole : '',
    //         TripId: byTrip?.data?.id ? byTrip?.data?.id : '',
    //         AppUserId: appuserid ? appuserid : ''
    //     },
    //     onSubmit: async (values) => {
    //         const formData = new FormData();

    //         formData.append('Email', values.Email);
    //         formData.append('TripRole', tripRole === 0 ? 0 : 1);
    //         formData.append('TripId', byTrip?.data?.id ? byTrip?.data?.id : '');
    //         formData.append('AppUserId', appuserid ? appuserid : '');

    //         const response = await axios.put(`https://localhost:7152/api/ShareTrips/${"ShareTrip.id"}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //         if (response.status === 201) {
    //             queryClient.invalidateQueries('getAllShareTrip');
    //             queryClient.invalidateQueries('trip');
    //             // setShowModal(false);
    //         }
    //     },
    // });

    //------------------------------------------------
    const [center, setCenter] = useState({ lat: byTrip?.data?.tripLatitude, lng: byTrip?.data?.tripLatitude });

    const getFirstCharacter = (email) => {
        return email.charAt(0).toUpperCase();
    }

    return (
        <>


            <Modal
                isOpen={tripCar}
                onRequestClose={TripCars}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div>
                    <ByTripCars
                        img={`data:image/jpeg;base64,${shareTripCars?.data?.carImages[0]?.imagePath}`}
                        marka={shareTripCars?.data?.marka}
                        model={shareTripCars?.data?.model}
                        Id={shareTripCars?.data?.id} />
                </div>
            </Modal>


            <Modal
                isOpen={removeModal}
                onRequestClose={removeClose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div id='deletingYourTrip'>
                    <div className='deletingYourTrip_img'>
                        <img src={tripImage} />
                    </div>
                    <div className='deletingYourTrip_text'>
                        <h1>Are you sure about deleting your Trip?</h1>
                        <button id='tripRemove' onClick={tripRemove}><span></span>Yes</button>
                    </div>
                </div>
            </Modal>


            <Modal
                isOpen={editModal}
                onRequestClose={editClose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{ height: "auto", zIndex: 999 }} className='TrueAccess'>
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
                                            <option value='0'>Can Edit</option>
                                            <option value='1'>View Only</option>
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
                                <Button onClick={notify} type='submit' >Invite</Button>
                            </div>
                        </form>
                    </div>
                    <div className='ShareByTrip_3'>
                        <h1><p></p><p>Owner</p></h1>
                        <Button onClick={sharedModalClose} >People with whom the trip was shared</Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={sharedUserModal}
                onRequestClose={sharedModalClose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='sharedModalClose'>
                    <h1><p></p><p><AiFillCloseCircle onClick={sharedModalClose} /></p></h1>
                    {shareTripAll?.data?.map((byShare) => (
                        <div id='setSharedUser'>
                            <div><Button>{getFirstCharacter(byShare?.email)}</Button> <span>{byShare?.email} </span></div>
                            <div>
                                <Select id='UpdatDegreeTrip'>
                                    <option value='option1'>{byShare?.tripRole === 0 ? "Can Edit" : "View Only"}</option>
                                    <option value='option2'>{byShare?.tripRole !== 0 ? "Can Edit" : "View Only"}</option>
                                </Select>
                            </div>
                        </div>
                    ))}
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
                                    <Button onClick={TripCars} id='PiCar'><PiCar /></Button>
                                    {(showHtml || myTrip) && (
                                        <Button onClick={closeModal}><RiUserShared2Line />Share</Button>
                                    )}
                                    <Button style={mapEnter === true ? {} : { display: "none" }} onClick={mapOpen}>Show map</Button>
                                    <Button onClick={handleButtonClick}>...</Button>
                                    {showDropdown && (
                                        <div className="dropdownByTrip">
                                            <ul>
                                                {(showHtml || myTrip) && (
                                                    <li onClick={editClose} className='EditByTrip'>Edit</li>
                                                )}
                                                {myTrip && (
                                                    <li onClick={removeClose} className='RemoveByTrip'>Remove</li>
                                                )}
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
                                                <Button style={{ marginTop: "10px", backgroundColor: 'rgb(26, 204, 254)' }} type='submit'>Add note</Button>
                                            </form>
                                        </div>
                                    )}
                                    <div className='AddNote_LocationB'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={mapEnter === true ? { display: "none" } : {}} className='ByTrip_map'>
                    <Button onClick={mapOpen}>Colse map</Button>
                    <MapContainer style={{ width: "100%", height: "100%" }} center={[byTrip?.data?.tripLatitude ? byTrip?.data?.tripLatitude : 40.3798, byTrip?.data?.tripLongitude ? byTrip?.data?.tripLongitude : 49.8486]} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                        />
                        <FeatureGroup>
                            <EditControl position='topright' draw={{ rectangle: false, circlemarker: false, polygon: false, marker: true, }} />
                        </FeatureGroup>
                        <Marker
                            position={[byTrip?.data?.tripLatitude ? byTrip?.data?.tripLatitude : 40.3798, byTrip?.data?.tripLongitude ? byTrip?.data?.tripLongitude : 49.8486]}
                            icon={markerIcon}
                        >
                            <Popup>My Location</Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    style={{ width: "500px", textAlign: "center" }}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </>
    )
}

export default ByTrip