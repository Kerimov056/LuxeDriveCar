import React from 'react'
import './ByTrip.scss'
import Maps from "../Map/Maps";
import Navbar from "../Navbar/Navbar";
import { Button } from '@chakra-ui/react';
import { RiUserShared2Line } from "react-icons/ri";

const ByTrip = () => {
    return (
        <>
            <div style={{ marginTop: "70px" }}>
                <Navbar />
            </div>
            <div id='ByTrip'>
                <div className='ByTrip_Text'>
                    <div>
                        <div className='ByTrip_Text_Main'>
                            <div className='ByTrip_Text_Main_1'>
                                <div><Button>{"<"} Your Trips</Button></div>
                                <div className='ByTrip_Text_Main_1_Bt2'>
                                    <Button><RiUserShared2Line />Share</Button>
                                    <Button>...</Button>
                                </div>
                            </div>
                            <div className='ByTrip_Text_Main_2'>
                                <div className='ByTrip_Text_Main_2_img'>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmM5MIeMxFn6wQ7OWmBG7jFAK0zW3G2bgVcg&usqp=CAU' />
                                </div>
                                <div className='ByTrip_Text_Main_2_text'>
                                    <h1>Los Angles Trip</h1>
                                    <h2>Sat,Sep 23 - Wed, Sep 27</h2>
                                    <h2>Los Angles, CA</h2>
                                </div>
                            </div>
                            <div className='ByTrip_Text_Main_3'>
                                <h2>Itinerary</h2>
                            </div>
                        </div>
                        <div className='ByTrip_Text_hed'>
                        </div>
                    </div>
                </div>
                <div className='ByTrip_map'>
                    <Maps />
                </div>
            </div>
        </>
    )
}

export default ByTrip