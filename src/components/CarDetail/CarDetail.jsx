import React, { useRef, useState } from 'react';
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




const CarDetail = () => {

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

    const [center, setCenter] = useState({ lat: 42.0970, lng: 79.2353 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef()

    const currentDate = new Date().toISOString().slice(0, 16);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const handleDateChange = (e) => {
        const selected = new Date(e.target.value);
        const now = new Date();

        if (selected < now) {
            return;
        }

        setSelectedDate(e.target.value);
        // reservFormik.handleChange();
    };

    const currentDate1 = new Date().toISOString().slice(0, 16);
    const [selectedDate1, setSelectedDate1] = useState(currentDate1);
    const handleDateChange1 = (e) => {
        const selected = new Date(e.target.value);
        const now = new Date();

        if (selected < now) {
            return;
        }

        setSelectedDate1(e.target.value);
        // reservFormik.handleChange();
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
            PickupDate: "",
            ReturnDate: "",
            Notes: "",
            AppUserId: "",
            CarId: "",
            ChauffeursId: "",
            PickupLocation: { Latitude: '', Longitude: '' },
            CarCategory: { Latitude: '', Longitude: '' },
        },
        onSubmit: async (values) => {
            // const formData = new FormData();

            // formData.append("Marka", values.Marka);
            // formData.append("Model", values.Model);
            // formData.append("Price", values.Price);
            // formData.append("Year", values.Year);
            // formData.append("Description", values.Description);
            // formData.append("CarType.type", values.CarType.type);
            // formData.append("CarCategory.Category", values.CarCategory.Category);
            // formData.append("tags", values.tags);

            // for (let i = 0; i < values.CarImages.length; i++) {
            //     formData.append('CarImages', values.CarImages[i]);
            // }

            // try {
            //     const response = await axios.post('https://localhost:7152/api/Car/postCar', formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     });

            //     if (response.status === 201) {
            //         queryClient.invalidateQueries('newCar');
            //         navigate.push('/AllCar');
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
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
                                    <Map />
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

                                    <form className='login_form'>
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
                                            <Input type='text'
                                                name='Notes'
                                                value={reservFormik.values.Notes}
                                                onChange={reservFormik.handleChange}
                                                placeholder='Here is a sample placeholder'
                                                size='sm'
                                            />

                                            <Button onClick={reservFormik.handleSubmit} type='submit'>Order</Button>
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