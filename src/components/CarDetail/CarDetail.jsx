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
                    // toast.success('🦄 Wow so easy!', {
                    //     position: "top-center",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // });
                }

            } catch (error) {
                console.log(error);
            }
        },
    });



    const { data: Compn } = useQuery({
        queryKey: ["IsCampaignss"],
        queryFn: IsCampaigns,
        staleTime: 0,
    });


    if (byCars) {

        return (
            <>
                <div className='CarDeatilsNavbar'>
                    <Navbar />
                </div>

                {Compn?.data === true &&
                    <div id='Compahins'>
                        <span>Now up to {cars?.data[0]?.campaignsInterest}% discounts at LuxeDrive</span>
                        <div id='LuxeDriveComp'>
                            <div class="spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
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
                                        <div><img onClick={() => Imgaetrasfer(`data:image/jpeg;base64,${byImage?.imagePath}`)} src={`data:image/jpeg;base64,${byImage?.imagePath}`} alt="Image 1" /></div>
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
                                <h2>${byCars.data.campaignsPrice===null && byCars.data.price} /Hour</h2> <span style={byCars.data.campaignsPrice===null && {display:"none"}} id='OldPrice'>${byCars.data.price} /Hour</span>
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
                                            </Text>
                                            <Input
                                                name='FullName'
                                                value={reservFormik.values.FullName}
                                                onChange={reservFormik.handleChange}
                                                placeholder='Here is a sample placeholder'
                                                size='sm'
                                            />

                                            <label htmlFor="Image">Email</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                            </Text>
                                            <Input
                                                type='email'
                                                name='Email'
                                                value={reservFormik.values.Email}
                                                onChange={reservFormik.handleChange}
                                                placeholder='Here is a sample placeholder'
                                                size='sm'
                                            />

                                            <label htmlFor="password">Number</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                            </Text>
                                            <Input
                                                name='Number'
                                                value={reservFormik.values.Number}
                                                onChange={reservFormik.handleChange}
                                                placeholder='Here is a sample placeholder'
                                                size='sm'
                                            />

                                            <label htmlFor="password">Suruculuk Vesiqesi</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                            </Text>
                                            <Input
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
                                            </Text>
                                            <Input
                                                placeholder="Select Date and Time"
                                                size="2md"
                                                type="datetime-local"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                style={{
                                                    borderTop: "none",
                                                    borderRight: "none",
                                                    borderLeft: "none",
                                                    borderBottom: "1px solid white",
                                                }}
                                            />

                                            <label htmlFor="password">Retur nDate</label>
                                            <Text fontSize={"15px"} color={"red"} mb="8px">
                                            </Text>
                                            <Input
                                                placeholder="Select Date and Time"
                                                size="2md"
                                                type="datetime-local"
                                                value={selectedDate1}
                                                onChange={handleDateChange1}
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

                                            <Button type='submit'>Order</Button>
                                        </FormControl>
                                    </form>

                                </div>
                            </div>
                        </div>

                        <div className='CDA'>
                            <Accardion name={"Salam"} body={"Salam jsnand adjna djaind ai da dinad an daid ai daid ia dai dai dadadada"} />
                            <Accardion name={"Salam"} body={"Salam jsnand adjna djaind aiSajsnandjsnandlam jsnand djaind aiSajsnandjsnandlam jsnand adjna dja djaind aiSajsnandjsnandlam jsnand adjna dja djaind aiSajsnandjsnandlam jsnand adjna dja adjna djaind ai da dinaSalam jsnand adjna djaind ai da dina da dinad an daid ai daid ia dai dai dadadada"} />
                            <Accardion name={"Salam"} body={"Salam jsnand adjna djaind ai da dinad an daid ai daid ia dai dai dadadada"} />
                        </div>

                        <div className='EndCar'>
                            <h1>Related products</h1>
                            <div>
                                {cars?.data?.slice(0,3).map((byCar, index) => (
                                    <ShopCarCard key={index} Id={byCar.id} img={`data:image/jpeg;base64,${byCar?.carImages[0]?.imagePath}`}/>
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