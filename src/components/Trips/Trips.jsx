import React, { useState } from 'react'
import './Trips.scss'
import { Button } from '@chakra-ui/react'
import TripsCard from "./TripsCard";
import Modal from 'react-modal';
import { AiFillCloseCircle } from "react-icons/ai";
import Search from "./Search";



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
    const searchData = (data) => {
        setCity(data);
        console.log(data);
    }

    const [showModal, setShowModal] = useState(false);
    function closeModal() {
        setShowModal(!showModal);
    }

    return (
        <>

            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='TrueAccess'>
                    <div className='onCloceSuc'>
                        <h1><AiFillCloseCircle onClick={closeModal} /></h1>
                    </div>
                    <div className='GameToTrueAccesS'>
                        <h1>Create a Trip</h1>
                        <form>
                            <div>
                                <label>Destination</label>
                                <Search searchCountry={searchData} />
                            </div>
                            <div>
                                
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