import React, { useState } from 'react'
import './ByTrip.scss'
import Maps from "../Map/Maps";
import Navbar from "../Navbar/Navbar";
import { Button, Input, Select, Textarea } from '@chakra-ui/react';
import { RiUserShared2Line } from "react-icons/ri";
import { ImLocation } from "react-icons/im";
import { getByTrip } from "../Services/tripServices";
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


    const location = useLocation();
    const params = location.pathname.split('/').filter(param => param !== '');
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


    return (
        <>
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
                                                <li className='EditByTrip'>Edit</li>
                                                <li className='RemoveByTrip'>Remove</li>
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