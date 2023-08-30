import React from 'react';
import "./VehicleFleet.scss";
import Navbar from '../Navbar/Navbar'
import NavbarTwo from "../Navbar/Navbartwo";
import Car from '../Card//Car'
import { CheckboxIcon, Input, InputGroup, InputLeftElement, InputRightElement, Select, Stack } from '@chakra-ui/react'
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
        queryFn: getAllModel,
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
                    <h1>Browse Your Cars</h1>
                    <div className='CarTitle'>
                        <div id='Stack'>
                            <Select variant='flushed' placeholder='All Marka'>
                                {allMarka?.data?.map((byMarka, index) => (
                                    <option key={index}>{byMarka}</option>
                                ))}
                            </Select>
                            <Select variant='flushed' placeholder='All Model'>
                                {allModel?.data?.map((byModel, index) => (
                                    <option key={index}>{byModel}</option>
                                ))}
                            </Select>
                            <Select variant='flushed' placeholder='All Category'>
                                <option>Salam</option>
                                <option>Necesen</option>
                                <option>Sagol</option>
                            </Select>
                            <Select variant='flushed' placeholder='All Type'>
                                <option>Salam</option>
                                <option>Necesen</option>
                                <option>Sagol</option>
                            </Select><br/>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                    children='$'
                                />
                                <Input placeholder='Enter min amount' />
                                <InputRightElement>
                                </InputRightElement>
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                    children='$'
                                />
                                <Input placeholder='Enter max amount' />
                                <InputRightElement>
                                </InputRightElement>
                            </InputGroup>
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
