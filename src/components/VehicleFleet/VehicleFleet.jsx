import React from 'react';
import "./VehicleFleet.scss";
import Navbar from '../Navbar/Navbar'
import NavbarTwo from "../Navbar/Navbartwo";
import Car from '../Card//Car'
import { Select, Stack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getCar, getAllMarka, getAllModel } from "../Services/carServices";


const VehicleFleet = () => {

    const { data: cars } = useQuery({
        queryKey: ["Cars"],
        queryFn: getCar,
        staleTime: 0,
    });

    const { data: allMarka } = useQuery({
        queryKey: ["Marka"],
        queryFn: getAllMarka,
        staleTime: 0,
    });

    const { data: allModel } = useQuery({
        queryKey: ["Model"],
        queryFn: getAllMarka,
        staleTime: 0,
    });




    return (
        <>
            <div className='ReponsiveNav'>
                <Navbar />
            </div>
            <div className='DisplayNavbar'>
                <NavbarTwo />
            </div>

            <div id="Fleet">
                <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/vehicle-list-title-img.jpg' />
                <div id='responePhone'>
                    <h1>Fleet Standard</h1>
                </div>
            </div>

            <div className='Carsss'>
                <div>
                    <div className='CarTitle'>
                        <h1>Browse Your Cars</h1>
                        <div id='Stack'>
                            <Select variant='flushed' placeholder='All'>
                                {allMarka?.data?.map((byMarka, index) => (
                                    <option key={index}>{byMarka}</option>
                                ))}
                            </Select>
                            <Select variant='flushed' placeholder='All'>
                                <option>Salam</option>
                                <option>Necesen</option>
                                <option>Sagol</option>
                            </Select>
                            <Select variant='flushed' placeholder='All'>
                                <option>Salam</option>
                                <option>Necesen</option>
                                <option>Sagol</option>
                            </Select>
                        </div>
                    </div>
                    <div className='Cards'>
                        {cars?.data.map((byCar, index) => (
                            <Car key={index} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-04.jpg"} name={byCar.marka} desc={byCar.description.slice(0, 30)} price={byCar.price} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default VehicleFleet;
