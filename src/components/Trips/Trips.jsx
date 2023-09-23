import React, { useState } from 'react'
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

    const [city, setCity] = useState('');
    const cities = city.split(",");
    const filteredCities = cities.filter((item, index) => index % 2 === 0);

    const searchData = (data) => {
        setCity(data.label);
        console.log(data.label);
    }

    const [showModal, setShowModal] = useState(false);
    function closeModal() {
        setShowModal(!showModal);
    }

    const [images, setImages] = useState([]); 

    const handleImagesChange = (images) => {
        setImages(images); 
    };

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
                        <form>
                            <div>
                                <label>Destination</label>
                                <Search searchCountry={searchData} />
                            </div>
                            <div>
                                <label htmlFor="password">Full Name</label>
                                <Text fontSize={"15px"} color={"red"} mb="8px">
                                    {/* {reservFormik.touched.FullName && reservFormik.errors.FullName} */}
                                </Text>
                                <Input
                                    // isInvalid={reservFormik.errors.FullName && reservFormik.touched.FullName}
                                    name='FullName'
                                    // value={reservFormik.values.FullName}
                                    // onChange={reservFormik.handleChange}
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
                                        // value={selectedDate}
                                        // onChange={handleDateChange}
                                        // min={currentDateTime}
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
                                        // value={selectedDate1}
                                        // onChange={handleDateChange1}
                                        // min={currentDateTime}
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
                                <button class="btnTripeCreate">
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
                            <h2>Upcoming {"("}4{")"}</h2>
                        </div>
                    </div>

                    <div className='YouTrips'>
                        <TripsCard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trips