import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './CarDetail.scss'
import CursorZoom from 'react-cursor-zoom';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure, Input, Text,
    Button, FormLabel, FormControl
} from '@chakra-ui/react'
import Accardion from './Accardion';
import ShopCarCard from '../Shop/ShopCarCard';
import 'leaflet/dist/leaflet.css'
import { getByCar, getCar, IsCampaigns } from "../Services/carServices";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CarComment from './CarComment'
import { postComments } from "../Services/commentServices";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Map from '../Map/Map';
import { PostCar } from "../Services/basketServices";
import ChauffeursCard from '../Chauffeurs/ChauffeursCard';
import { getChauffeurs } from "../Services/chauffeursServices";
import Modal from 'react-modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//---LeafLet
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import '../Map/map.scss'
import reservationScheme from "../Validators/ReservationScheme";



const CountdownTimer = ({ targetDate }) => {
    const [countdown, setCountdown] = useState('');

    const [days, setDays] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                setCountdown('Discounts Have Started');
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setCountdown(`${days} day ${hours} hour ${minutes} minute ${seconds} second`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return <div>{countdown}</div>;
};




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



const CarDetail = () => {
    const currentDateTime = new Date().toISOString().slice(0, 16);

    // const today = new Date();
    // const tomorrow = new Date(today);
    // tomorrow.setDate(today.getDate() + 1);

    // const tomorrowDateString = tomorrow.toISOString().slice(0, 10);
    // console.log(tomorrowDateString);
    //---------leaflet

    const [center, setCenter] = useState({ lat: 40.4093, lng: 49.8671 });
    const mapRef = useRef();

    const [userLocation, setUserLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setUserLocation(userLocation)
    }, [useLocation]);

    const openModalL = () => {
        setShowModal(true);
    };

    const closeModalL = () => {
        setShowModal(false);
        setUserLocation(null);
    };

    const handleMapClick = () => {
        openModalL();
    };

    const shareLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("location not found: ", error);
                }
            );
        } else {
            alert("Your browser does not support the location service.");
        }
        closeModalL();
    };

    const [data, setData] = useState('Veri A');

    const updateData = (newData) => {
        setData(newData);
    };

    const [pickUpLocationMap, setPickUpLocationMap] = useState({ lat: null, lng: null });

    const updatePickUpLocation = (lat, lng) => {
        setPickUpLocationMap({ lat, lng });
        openModal(true);
    };

    const handleDrawPickUpCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'marker') {
            const latlng = layer.getLatLng();
            const lat = latlng.lat;
            const lng = latlng.lng;
            updatePickUpLocation(lat, lng);
        }
    };



    const [returnUpLocationMap, setReturnLocationMap] = useState({ lat: null, lng: null });

    const updatReturnpLocation = (lat, lng) => {
        setReturnLocationMap({ lat, lng });
        closeModal(false);
    };


    const handleDrawReturnCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'marker') {
            const latlng = layer.getLatLng();
            const lat = latlng.lat;
            const lng = latlng.lng;
            updatReturnpLocation(lat, lng);
        }
    };


    //---------leaflet


    //-----------------PopUpLeaflet
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    //-----------------PopUpLeaflet
    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: byCars } = useQuery(["Car", id], () =>
        getByCar(id)
    );


    const { data: cars } = useQuery({
        queryKey: ["Cars"],
        queryFn: getCar,
        staleTime: 0,
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate1, setSelectedDate1] = useState(null);

    useEffect(() => {
        reservFormik.setValues({
            ...reservFormik.values,
            PickupDate: selectedDate ? selectedDate : "",
            ReturnDate: selectedDate1 ? selectedDate1 : "",
        });
    }, [selectedDate, selectedDate1]);

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


    const { data: chaurffers } = useQuery({
        queryKey: ["chauffers"],
        queryFn: getChauffeurs,
        staleTime: 0,

    });


    const [img, setImg] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const Imgaetrasfer = (imageUrl) => {
        setImg(imageUrl)
        onOpen()
    }

    const commentCount = byCars?.data?.carCommentGetDTO.length;


    const mutation = useMutation(postComments, {
        onSuccess: () => {
            queryClient.invalidateQueries("Comments");
            navigate("/");
        },
    });

    const formik = useFormik({
        initialValues: {
            comment: "",
            carid: byCars?.data?.id != null && byCars?.data?.id,
            appuserid: appuserid,
            UserName: username ? username : "",
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append('comment', values.comment);
            formData.append("carid", byCars?.data?.id ? byCars?.data?.id : "");
            formData.append("appuserid", appuserid);
            formData.append("UserName", username);

            const response = await axios.post('https://localhost:7152/api/CarCommets/commentPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                queryClient.invalidateQueries('Car');
            }
        },
    });


    ///////////////////////////////////////////     CarQRCode

    // const [qrCode, setQrCode] = useState(null);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get(`https://localhost:7152/api/Car/qrcode?id=${byCars?.data?.id}`);
    //       setQrCode(response);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
  
    //   fetchData();
    // }, []);
    // console.log("Buuuu",qrCode?.data?.imageSrc);
    ///////////////////////////////////////////


    const { mutate, isLoading, isError, error } = useMutation(() => PostCar(byCars?.data?.id, appuserid), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(["basketsCountT"]);
        },
        onError: (error) => {
            console.error("Error adding car to order", error);
        }
    });

    const handleAddToOrder = () => {
        mutate({ carId: byCars?.data?.id, AppUserId: appuserid });
    }

    const [image, setImage] = useState(null);
    const CarID = byCars?.data?.id;

    const fileUploadHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    const reservFormik = useFormik({
        initialValues: {
            Image: null,
            FullName: "",
            Email: "",
            Number: "",
            Notes: "",
            CarId: CarID || '',
            AppUserId: appuserid,
            ChauffeursId: "",
            PickupDate: selectedDate ? selectedDate : "",
            ReturnDate: selectedDate1 ? selectedDate1 : "",
            PickupLocation: { Latitude: null, Longitude: null },
            ReturnLocation: { Latitude: null, Longitude: null },
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            console.log(values);

            formData.append('Image', image);
            formData.append("FullName", values.FullName);
            formData.append("Email", values.Email);
            formData.append("Number", values.Number);
            formData.append("Notes", values.Notes);
            formData.append("CarId", CarID ? CarID : '');
            formData.append("AppUserId", values.AppUserId);
            formData.append("ChauffeursId", values.ChauffeursId);
            formData.append("PickupDate", values.PickupDate);
            formData.append("ReturnDate", values.ReturnDate);
            formData.append("PickupLocation.Latitude", pickUpLocationMap.lat ? pickUpLocationMap.lat : '');
            formData.append("PickupLocation.Longitude", pickUpLocationMap.lng ? pickUpLocationMap.lng : '');
            formData.append("ReturnLocation.Latitude", returnUpLocationMap.lat ? returnUpLocationMap.lat : '');
            formData.append("ReturnLocation.Longitude", returnUpLocationMap.lng ? returnUpLocationMap.lng : '');


            try {
                const response = await axios.post('https://localhost:7152/api/CarReservations', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (response.status === 201) {
                    queryClient.invalidateQueries('getReservation');
                    navigate('/MyProfile');
                }

            } catch (error) {
                console.log(error);
            }
        },
        validationSchema: reservationScheme,
    });



    const { data: Compn } = useQuery({
        queryKey: ["IsCampaignss"],
        queryFn: IsCampaigns,
        staleTime: 0,
    });


    const [compaignData, setCompaignData] = useState(null);

    useEffect(() => {
        const fetchAllCompaign = async () => {
            try {
                const response = await fetch('https://localhost:7152/api/Car/GetAll-CompaignAsync');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCompaignData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllCompaign();
    }, []);


    if (byCars) {

        return (
            <>
                <div className='CarDeatilsNavbar'>
                    <Navbar />
                </div>
                {Compn?.data === true &&
                    <div id='Compahins'>
                        {compaignData !== null &&

                            <div class="container" >
                                <h1 id="headline">Now up to {compaignData[0]?.campaignsInterest ? compaignData[0]?.campaignsInterest : ''}% discounts at LuxeDrive</h1>
                                <div id="countdown">
                                    <ul>
                                        <li><span id="days"><CountdownTimer targetDate={new Date(compaignData[0]?.returnCampaigns ? compaignData[0]?.returnCampaigns : '')} /></span></li>
                                    </ul>
                                </div>
                                <div id="content" class="emoji">
                                </div>
                            </div>

                        }
                        <div class="cloader">
                            <div class="clface">
                                <div class="clsface">
                                    <div id="h2" class="hand"></div>
                                </div>
                                <div class="top"></div>
                                <div class="bottom"></div>
                                <div class="left"></div>
                                <div class="right"></div>
                                <div id="sub" class="pin"></div>
                                <div id="h1" class="hand"></div>
                                <div id="main" class="pin"></div>
                            </div>
                        </div>
                    </div>
                }


                <div id='CarDetail'>
                    <div>
                        <div className='CarD'>
                            <div className='CarImg'>
                                <div className='mainImg'>
                                    <CursorZoom
                                        image={{
                                            src: `data:image/png;base64,${byCars?.data?.carImages[0]?.imagePath}`,
                                            width: 600,
                                            height: 750
                                        }}
                                        zoomImage={{
                                            src: `data:image/png;base64,${byCars?.data?.carImages[0]?.imagePath}`,
                                            width: 1300,
                                            height: 1000
                                        }}
                                        cursorOffset={{ x: 180, y: 0 }}
                                    />
                                </div>
                                <div className='SecImg'>
                                    <AlertDialog
                                        isOpen={isOpen}
                                        leastDestructiveRef={cancelRef.current}
                                        onClose={onClose}
                                    >
                                        <AlertDialogOverlay>
                                            <AlertDialogContent>
                                                <AlertDialogCloseButton />
                                                <AlertDialogBody>
                                                    <div>
                                                        <img src={img} alt="Zoomed Image" />
                                                    </div>
                                                </AlertDialogBody>
                                                <AlertDialogFooter>
                                                    <Button ref={cancelRef} onClick={onClose}>
                                                        Close
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialogOverlay>
                                    </AlertDialog>
                                    {byCars.data?.carImages?.map(byImage => (
                                        <div><img style={{ width: "300px", marginTop: "20px" }} onClick={() => Imgaetrasfer(`data:image/jpeg;base64,${byImage?.imagePath}`)} src={`data:image/jpeg;base64,${byImage?.imagePath}`} alt="Image 1" /></div>
                                    ))}
                                </div>


                                <div className='PickUpDescription'>
                                    <div>
                                        By choosing the Pickup Location, you can pick up your car from the location you have chosen.<br /><br />
                                        After selecting the Pickup Location, a popup will appear asking you to choose a return location, and you can choose the return location if you want.
                                        <Button onClick={openModal}>Change Return Location</Button>
                                    </div>
                                </div>
                                <div className='ReactLeafLet'>
                                    <div id='myLocation'>
                                        <div>
                                            <span style={{ fontSize: "20px", color: "#ff7700", fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>Pick-up Location</span>
                                            <Button style={{ marginLeft: "10px" }} onClick={openModalL}>View Location</Button>
                                        </div>
                                        {showModal && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <p>Want to share your location?</p>
                                                    <div>
                                                        <Button backgroundColor={"green"} onClick={shareLocation}>Yes</Button>
                                                        <Button backgroundColor={"red.700"} onClick={closeModalL}>No</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='ss'>
                                        <MapContainer center={userLocation === null ? [40.3798, 49.8486] : userLocation} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                                            />
                                            <FeatureGroup>
                                                <EditControl position='topright' onCreated={handleDrawPickUpCreated} draw={{ rectangle: false, circlemarker: false, polygon: false, marker: true, }} />
                                            </FeatureGroup>
                                            {userLocation && (
                                                <Marker
                                                    position={userLocation}
                                                    icon={markerIcon}
                                                >
                                                    <Popup>My Location</Popup>
                                                </Marker>
                                            )}
                                        </MapContainer>
                                    </div>
                                    <div className='ChauferrsShop'>
                                        {chaurffers?.data?.slice(0, 2).map((chauf, index) => (
                                            <ChauffeursCard imgUrl={`data:image/jpeg;base64,${chauf?.imagePath}`} key={index} Id={chauf?.id} name={chauf?.name} price={chauf?.price} />
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className='CarText'>
                                <h1>{byCars.data.marka}   {byCars.data.model}</h1><br />
                                <h2>${byCars.data.campaignsPrice === null ? byCars.data.price : byCars.data.campaignsPrice} /Hour</h2>
                                <span style={byCars.data.campaignsPrice!==null ? {} : {display:"none"}} id='OldPrice'>${byCars.data.price} /Hour</span>
                                <div className='addCart'>
                                    <button onClick={handleAddToOrder} >+ ADD TO ORDER</button>
                                </div>
                                <div className='Det'>
                                    <div><span>Catagory:</span><span className='Answer Category'>{byCars.data.carCategory.category ? byCars.data.carCategory.category : "No Category"}</span></div>
                                    <div><span>Tags:</span><span className='Answer'>

                                        <button>#Car</button>
                                        <button>#{byCars.data.carCategory.category ? byCars.data.carCategory.category : "No Category"}</button>
                                    </span></div>
                                </div>
                                <p id='ByCarDecs'>{byCars.data.description}</p>

                                <div className='ByReservACar'>

                                    <form className='login_form' onSubmit={reservFormik.handleSubmit} >
                                        <FormControl>
                                            <h3>Reservation A Car</h3>
                                            <label htmlFor="password">Full Name</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                                {reservFormik.touched.FullName && reservFormik.errors.FullName}
                                            </Text>
                                            <Input
                                                isInvalid={reservFormik.errors.FullName && reservFormik.touched.FullName}
                                                name='FullName'
                                                value={reservFormik.values.FullName}
                                                onChange={reservFormik.handleChange}
                                                placeholder='Here is a sample placeholder'
                                                size='sm'
                                            />

                                            <label htmlFor="Image">Email</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                                {reservFormik.touched.Email && reservFormik.errors.Email}
                                            </Text>
                                            <Input
                                                isInvalid={reservFormik.errors.Email && reservFormik.touched.Email}
                                                type='email'
                                                name='Email'
                                                value={reservFormik.values.Email}
                                                onChange={reservFormik.handleChange}
                                                placeholder='Here is a sample placeholder'
                                                size='sm'
                                            />

                                            <label htmlFor="password">Number</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                                {reservFormik.touched.Number && reservFormik.errors.Number}
                                            </Text>
                                            <Input
                                                isInvalid={reservFormik.errors.Number && reservFormik.touched.Number}
                                                name='Number'
                                                type='number'
                                                value={reservFormik.values.Number}
                                                onChange={reservFormik.handleChange}
                                                placeholder='Here is a sample placeholder'
                                                size='sm'
                                            />

                                            <label htmlFor="password">Suruculuk Vesiqesi</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                                {reservFormik.touched.Image && reservFormik.errors.Image}
                                            </Text>
                                            <Input
                                                isInvalid={reservFormik.errors.Image && reservFormik.touched.Image}
                                                type='file'
                                                id='Cfile'
                                                name='Image'
                                                accept="image/*"
                                                onChange={(e) => fileUploadHandler(e)}
                                                placeholder='Here is a sample placeholder'
                                                size='sm'
                                            />

                                            <label htmlFor="password">Pickup Date</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                                {reservFormik.touched.PickupDate && reservFormik.errors.PickupDate}
                                            </Text>
                                            <Input
                                                isInvalid={reservFormik.errors.PickupDate && reservFormik.touched.PickupDate}
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

                                            <label htmlFor="password">Retur nDate</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                                {reservFormik.touched.ReturnDate && reservFormik.errors.ReturnDate}
                                            </Text>
                                            <Input
                                                isInvalid={reservFormik.errors.ReturnDate && reservFormik.touched.ReturnDate}
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

                                            <label htmlFor="password">Notes</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                            </Text>
                                            <Input
                                                type='text'
                                                name='Notes'
                                                value={reservFormik.values.Notes}
                                                onChange={reservFormik.handleChange}
                                                placeholder='Here is a sample placeholder'
                                                size='sm'
                                            />
                                            {token !== null &&
                                                <Button type='submit'>Order</Button>
                                            }
                                            {token === null &&
                                                <Link to={'/Login'} ><Button>Order</Button></Link>
                                            }
                                        </FormControl>
                                    </form>

                                </div>
                            </div>
                        </div>

                        <div className='CDA'></div>

                        <div className='EndCar'>
                            <h1>Related products</h1>
                            <div>
                                {cars?.data?.slice(0, 3).map((byCar, index) => (
                                    <ShopCarCard key={index} Id={byCar.id} img={`data:image/jpeg;base64,${byCar?.carImages[0]?.imagePath}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div id='PopUpLocationR'>
                        <span>Return Location</span>
                        <button onClick={closeModal}>X</button>
                    </div>
                    <MapContainer style={{ width: "1000px", height: "600px" }} center={userLocation === null ? [40.3798, 49.8486] : userLocation} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=S3UF58mBkVoHt2UkKpEL"
                        />
                        <FeatureGroup>
                            <EditControl position='topright' onCreated={handleDrawReturnCreated} draw={{ rectangle: false, circlemarker: false, polygon: false, marker: true, }} />
                        </FeatureGroup>
                        {userLocation && (
                            <Marker
                                position={userLocation}
                                icon={markerIcon}
                            >
                                <Popup>My Location</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </Modal>
                <div id='carDetailsComment'>
                    <div>
                        <div>
                            <h1>{commentCount} Comments</h1>
                            <div className='CommentCreate'>
                                <form onSubmit={formik.handleSubmit}>
                                    <FormControl>
                                        <FormLabel>Comment</FormLabel>
                                        <Input
                                            name="comment"
                                            value={formik.values.comment}
                                            onChange={formik.handleChange}
                                            trype="text"
                                        ></Input>
                                    </FormControl>
                                    {token == null &&
                                        <Link to={'/Login'}><Button type="submit" >
                                            Submit
                                        </Button></Link>
                                    }
                                    {token != null &&
                                        <Button type="submit" onClick={formik.handleSubmit}>
                                            Submit
                                        </Button>
                                    }
                                </form>
                            </div>
                            {byCars?.data?.carCommentGetDTO?.map((comment, index) => (
                                <CarComment key={index} username={comment.userName} commentId={comment?.id} comment={comment.comment} likeSum={comment.likeSum} />
                            ))}
                            <h6></h6>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CarDetail;