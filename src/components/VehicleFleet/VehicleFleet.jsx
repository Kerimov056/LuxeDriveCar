import React, { useState } from 'react';
import "./VehicleFleet.scss";
import Navbar from '../Navbar/Navbar'
import NavbarTwo from "../Navbar/Navbartwo";
import Car from '../Card//Car'
import { CheckboxIcon, Input, InputGroup, InputLeftElement, InputRightElement, Select, Stack } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getCar, getAllMarka, getAllModel } from "../Services/carServices";
import { getCategorie } from "../Services/categorieServices";
import { getType } from "../Services/typeServices";


const VehicleFleet = () => {

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

    const { data: allCategorie } = useQuery({
        queryKey: ["Category"],
        queryFn: getCategorie,
        staleTime: 0,
    });

    const { data: allType } = useQuery({
        queryKey: ["type"],
        queryFn: getType,
        staleTime: 0,
    });

    const [selectedMarka, setSelectedMarka] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    console.log(selectedModel);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        refetch();
    };

    const handleMarkaChange = (event) => {
        setSelectedMarka(event.target.value);
        refetch();
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
        refetch();
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
        refetch();
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
        refetch();
    };


    const minPriceQueryParam = minPrice !== undefined ? minPrice : '';
    const maxPriceQueryParam = maxPrice !== undefined ? maxPrice : '';



    const { data: cars, refetch } = useQuery({
        queryKey: ["Cars"],
        queryFn: () => getCar('', '', '', selectedModel, minPriceQueryParam, maxPriceQueryParam),
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
                            <Select variant='flushed' placeholder='All Marka' value={selectedMarka} onChange={handleMarkaChange}>
                                {allMarka?.data?.map((byMarka, index) => (
                                    <option value={byMarka} key={index}>{byMarka}</option>
                                ))}
                            </Select>
                            <Select variant='flushed' placeholder='All Model' value={selectedModel} onChange={handleModelChange}>
                                {allModel?.data?.map((byModel, index) => (
                                    <option value={byModel} key={index}>{byModel}</option>
                                ))}
                            </Select>
                            <Select variant='flushed' placeholder='All Category'>
                                {allCategorie?.data?.map((byCategory, index) => (
                                    <option key={index}>{byCategory?.category}</option>
                                ))}
                            </Select>
                            <Select variant='flushed' placeholder='All Type' value={selectedType}  onChange={handleTypeChange} >
                                {allType?.data?.map((byType, index) => (
                                    <option value={byType} key={index}>{byType?.type}</option>
                                ))}
                            </Select><br />
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                    children='$'
                                />
                                <Input value={minPrice} onChange={handleMinPriceChange} placeholder='Enter min amount' />
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
                                <Input value={maxPrice} onChange={handleMaxPriceChange} placeholder='Enter max amount' />
                                <InputRightElement>
                                </InputRightElement>
                            </InputGroup>
                        </div>
                    </div>
                    <div className='Cards'>
                        {cars?.data.map((byCar, index) => (
                            <Car key={index} Id={byCar?.id} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-04.jpg"} name={byCar.marka} desc={byCar.description.slice(0, 30)} price={byCar.price} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default VehicleFleet;
