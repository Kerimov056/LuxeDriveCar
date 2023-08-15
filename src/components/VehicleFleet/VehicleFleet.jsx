import React from 'react';
import "./VehicleFleet.scss";
import Navbar from '../Navbar/Navbar'
import Car from '../Card//Car'
import { Select, Stack } from '@chakra-ui/react'


const VehicleFleet = () => {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div id="Fleet">
                <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/vehicle-list-title-img.jpg' />
                <div>
                    <h1>Fleet Standard</h1>
                </div>
            </div>

            <div className='Carsss'>
                <div>
                    <div className='CarTitle'>
                        <h1>Browse Your Cars</h1>
                        <div id='Stack'>
                            <Select variant='flushed' placeholder='Flushed'>
                                <option>Salam</option>
                                <option>Necesen</option>
                                <option>Sagol</option>
                            </Select>
                            <Select variant='flushed' placeholder='Flushed'>
                                <option>Salam</option>
                                <option>Necesen</option>
                                <option>Sagol</option>
                            </Select>
                            <Select variant='flushed' placeholder='Flushed'>
                                <option>Salam</option>
                                <option>Necesen</option>
                                <option>Sagol</option>
                            </Select>
                        </div>
                    </div>
                    <div className='Cards'>
                        <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-04.jpg"} name={"Ferrari 365 Daytona"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={180} />
                        <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-03.jpg"} name={"Range Rover Evoque"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={190} />
                        <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-01.jpg"} name={"Roll Royce Ghots 3"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={220} />
                        <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-02.jpg"} name={"Porce Taycan Sport"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={110} />
                        <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-04.jpg"} name={"Ferrari 365 Daytona"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={180} />
                        <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-03.jpg"} name={"Range Rover Evoque"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={190} />
                        <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-01.jpg"} name={"Roll Royce Ghots 3"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={220} />
                        <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-02.jpg"} name={"Porce Taycan Sport"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={110} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default VehicleFleet;
