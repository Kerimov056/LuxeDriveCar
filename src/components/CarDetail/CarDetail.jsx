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
import { getByCar, getCar } from "../Services/carServices";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CarComment from './CarComment'
import { postComments } from "../Services/commentServices";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Map from '../Map/Map';
import { PostCar } from "../Services/basketServices";
import ChauffeursCard from '../Chauffeurs/ChauffeursCard';
import { getChauffeurs } from "../Services/chauffeursServices";
import axios from 'axios';
//---LeafLet
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import '../Map/map.scss'


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

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setUserLocation(null);
    };

    const handleMapClick = () => {
        openModal();
    };

    const shareLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Konum alınamadı: ", error);
                }
            );
        } else {
            alert("Tarayıcınız konum hizmetini desteklemiyor.");
        }
        closeModal();
    };

    const [data, setData] = useState('Veri A');

    const updateData = (newData) => {
        setData(newData);
    };

    const handleShapeCreated = (e) => {
        const type = e.layerType;
        if (type === 'marker') {
            const latlng = e.layer.getLatLng();
            //console.log('Marker Lat:', latlng.lat);
            // console.log('Marker Lng:', latlng.lng);
        }
    };
    //console.log("userLoacation lat", userLocation !== null ? userLocation.lat : "not lat");
    //console.log("userLoacation lng", userLocation !== null ? userLocation.lng : "not lng");


    //---------leaflet


    const { token, username, appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const [pickupLocation, setPickupLocation] = useState(null);
    const [returnLocation, setReturnLocation] = useState(null);

    const handlePickupLocationSelect = (location) => {
        setPickupLocation(location);
    };

    const handleReturnLocationSelect = (location) => {
        setReturnLocation(location);
    };

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
        },
        onSubmit: async (values) => {
            try {
                await mutation.mutateAsync(values);
            } catch (error) {
                console.log(error);
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
    const [CarId, setCarId] = useState(byCars?.data?.id ? byCars?.data?.id : "");

    useEffect(() => {
        setCarId(byCars?.data?.id ? byCars?.data?.id : "");
    }, [CarId]);

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
            CarId: CarId,
            AppUserId: appuserid,
            ChauffeursId: "",
            PickupDate: selectedDate ? selectedDate : "",
            ReturnDate: selectedDate1 ? selectedDate1 : "",
            PickupLocation: { Latitude: 12.3, Longitude: 12.3 },
            ReturnLocation: { Latitude: 12.3, Longitude: 12.3 },
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            console.log(values);

            formData.append('Image', image);
            formData.append("FullName", values.FullName);
            formData.append("Email", values.Email);
            formData.append("Number", values.Number);
            formData.append("Notes", values.Notes);
            formData.append("CarId", values.CarId);
            formData.append("AppUserId", values.AppUserId);
            formData.append("ChauffeursId", values.ChauffeursId);
            formData.append("PickupDate", values.PickupDate);
            formData.append("ReturnDate", values.ReturnDate);
            formData.append("PickupLocation.Latitude", values.PickupLocation.Latitude);
            formData.append("PickupLocation.Longitude", values.PickupLocation.Longitude);
            formData.append("ReturnLocation.Latitude", values.ReturnLocation.Latitude);
            formData.append("ReturnLocation.Longitude", values.ReturnLocation.Longitude);
            //////////////////////////////////
            // console.log("Image-------" + formData.getAll("Image"));
            // console.log("FullName-------" + formData.getAll("FullName"));
            // console.log("Email-------" + formData.getAll("Email"));
            // console.log("Number-------" + formData.getAll("Number"));
            // console.log("Notes-------" + formData.getAll("Notes"));
            // console.log("CarId-------" + formData.getAll("CarId"));
            // console.log("AppUserId-------" + formData.getAll("AppUserId"));
            // console.log("ChauffeursId-------" + formData.getAll("ChauffeursId"));
            // console.log("PickupDate-------" + formData.getAll("PickupDate"));
            // console.log("ReturnDate-------" + formData.getAll("ReturnDate"));
            // console.log("PickupLocation.Latitude-------" + formData.getAll("PickupLocation.Latitude"));
            // console.log("PickupLocation.Longitude-------" + formData.getAll("PickupLocation.Longitude"));
            // console.log("ReturnLocation.Latitude-------" + formData.getAll("ReturnLocation.Latitude"));
            // console.log("ReturnLocation.Longitude-------" + formData.getAll("ReturnLocation.Longitude"));
            //////////////////////////////////

            try {
                const response = await axios.post('https://localhost:7152/api/CarReservations', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
            } catch (error) {
                console.log(error);
            }
        },
    });






    if (byCars) {

        return (
            <>
                <div className='CarDeatilsNavbar'>
                    <Navbar />
                </div>
                <div id='CarDetail'>
                    <div>
                        <div className='CarD'>
                            <div className='CarImg'>
                                <div className='mainImg'>
                                    <CursorZoom
                                        image={{
                                            src: "https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg",
                                            width: 600,
                                            height: 750
                                        }}
                                        zoomImage={{
                                            src: "https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg",
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
                                        <div><img onClick={() => Imgaetrasfer("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-02.jpg")} src={`data:image/jpeg;base64,${byImage?.imagePath}`} alt="Image 1" /></div>
                                    ))}
                                </div>

                                <div className='ReactLeafLet'>
                                    <div id='myLocation'>
                                        <Button onClick={openModal}>View Location</Button>
                                        {showModal && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <p>Want to share your location?</p>
                                                    <div>
                                                        <Button backgroundColor={"green"} onClick={shareLocation}>Yes</Button>
                                                        <Button backgroundColor={"red.700"} onClick={closeModal}>No</Button>
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
                                                <EditControl position='topright' onCreated={handleShapeCreated} draw={{ rectangle: false, circlemarker: false, polygon: false }} />
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
                                            <ChauffeursCard key={index} Id={chauf?.id} name={chauf?.name} price={chauf?.price} />
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className='CarText'>
                                <h1>{byCars.data.marka}</h1><br />
                                <h2>{byCars.data.price}</h2>
                                <p>{byCars.data.description}</p>
                                <div className='addCart'>
                                    <button onClick={handleAddToOrder} >+ ADD TO ORDER</button>
                                </div>

                                <div className='Det'>
                                    <div><span>Catagory:</span><span className='Answer Category'>{byCars.data.carCategory.category ? byCars.data.carCategory.category : "No Category"}</span></div>
                                    <div><span>Tags:</span><span className='Answer'>
                                        {/* {byCars.data.carTags.forEach(element => {
                                            <button>{element.data.Tag.tag}</button>
                                        })} */}
                                        <button>#Car</button>
                                        <button>#{byCars.data.carCategory.category ? byCars.data.carCategory.category : "No Category"}</button>
                                    </span></div>
                                </div>
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
                                {cars?.data.slice(-3).map((byCar, index) => (
                                    <ShopCarCard Id={byCar.id} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg"} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
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
                                <CarComment key={index} commentId={comment?.id} comment={comment.comment} likeSum={comment.likeSum} />
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