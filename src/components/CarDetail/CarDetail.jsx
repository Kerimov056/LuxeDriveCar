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
    Button
} from '@chakra-ui/react'
import Accardion from './Accardion';
import { Map } from "leaflet";
import ShopCarCard from '../Shop/ShopCarCard';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import osm from "./osm-providers";
import { getByCar, getCar } from "../Services/carServices";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

const CarDetail = () => {

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
    };




    const [img, setImg] = useState(null);
    const [sum, setSum] = useState(1);


    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const Imgaetrasfer = (imageUrl) => {
        setImg(imageUrl)
        onOpen()
    }

    const AddCar = () => {
        setSum(sum + 1);
    }

    const RemoveCar = () => {
        if (sum > 1) {
            setSum(sum - 1);
        }
    }
    if (byCars) {

        return (
            <>
                <Navbar />
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
                                    <div><img onClick={() => Imgaetrasfer("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-02.jpg")} src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-02.jpg' alt="Image 1" /></div>
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
                                    <div><img onClick={() => Imgaetrasfer("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-01.jpg")} src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-01.jpg' alt="Image 2" /></div>
                                </div>

                                <div className='ReactLeafLet'>



                                    <MapContainer
                                        center={center}
                                        zoom={ZOOM_LEVEL}
                                        ref={mapRef}
                                    >
                                        <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                                    </MapContainer>



                                </div>

                            </div>
                            <div className='CarText'>
                                <h1>{byCars.data.marka}</h1><br />
                                <h2>{byCars.data.price}</h2>
                                <p>{byCars.data.description}</p>
                                <div className='addCart'>
                                    <div>
                                        <div className='Sum'>{sum}</div>
                                        <div className='hesab'>
                                            <div onClick={AddCar}>+</div>
                                            <div onClick={RemoveCar}>-</div>
                                        </div>
                                    </div>
                                    <button>+ ADD TO ORDER</button>
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
                                        <h3>Reservation A Car</h3>
                                        <label htmlFor="email">Email</label>
                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                        </Text>
                                        <Input
                                            type='email'
                                            placeholder='Here is a sample placeholder'
                                            size='sm'
                                        />

                                        <label htmlFor="password">Number</label>
                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                        </Text>
                                        <Input
                                            placeholder='Here is a sample placeholder'
                                            size='sm'
                                        />

                                        <label htmlFor="password">Number</label>
                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                        </Text>
                                        <Input
                                            placeholder='Here is a sample placeholder'
                                            size='sm'
                                        />

                                        <label htmlFor="password">Suruculuk Vesiqesi</label>
                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                        </Text>
                                        <Input type='file' id='Cfile'
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
                                            placeholder='Here is a sample placeholder'
                                            size='sm'
                                        />

                                        <Button type='submit'>Order</Button>
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

            </>
        );
    }
}

export default CarDetail;