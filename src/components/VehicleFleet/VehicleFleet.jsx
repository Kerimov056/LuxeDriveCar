import React, { useState, useEffect } from 'react';
import "./VehicleFleet.scss";
import Navbar from '../Navbar/Navbar'
import NavbarTwo from "../Navbar/Navbartwo";
import Car from '../Card//Car'
import { Input, InputGroup, InputLeftElement, InputRightElement, Select } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getCar, getAllMarka, getAllModel, IsCampaigns } from "../Services/carServices";
import { getCategorie } from "../Services/categorieServices";
import { getType } from "../Services/typeServices";
import AllCarMap from './AllCarMap';





const CountdownTimer = ({ targetDate }) => {
    const [countdown, setCountdown] = useState('');

    const [days, setDays] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                setCountdown('Discounts Have Started');
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setCountdown(`${days} day ${hours} hour ${minutes} minute ${seconds} second`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return <div>{countdown}</div>;
};



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


    const { data: Compn } = useQuery({
        queryKey: ["IsCampaignss"],
        queryFn: IsCampaigns,
        staleTime: 0,
    });


    const [selectedMarka, setSelectedMarka] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        refetch();
    };

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

    const handleFilterSearch = () => {
        refetch();
    };


    const minPriceQueryParam = minPrice !== undefined ? minPrice : '';
    const maxPriceQueryParam = maxPrice !== undefined ? maxPrice : '';



    const { data: cars, refetch } = useQuery({
        queryKey: ["Cars"],
        queryFn: () => getCar(selectedCategory, selectedType, selectedMarka, selectedModel, minPriceQueryParam, maxPriceQueryParam),
        staleTime: 0,
    });


    const [compaignData, setCompaignData] = useState(null);

    useEffect(() => {
        const fetchAllCompaign = async () => {
            try {
                const response = await fetch('https://localhost:7152/api/Car/GetAll-CompaignAsync');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCompaignData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllCompaign();
    }, []);

    return (
        <>
            <div className='ReponsiveNav'>
                <Navbar />
            </div>
            <div className='DisplayNavbar'>
                <NavbarTwo />
            </div>

            {Compn?.data === true &&
                <div id='Compahins'>
                    {compaignData !== null &&

                        <div class="container" >
                            <h1 id="headline">Now up to {compaignData[0]?.campaignsInterest ? compaignData[0]?.campaignsInterest : ''}% discounts at LuxeDrive</h1>
                            <div id="countdown">
                                <ul>
                                    <li><span id="days"><CountdownTimer targetDate={new Date(compaignData[0]?.returnCampaigns ? compaignData[0]?.returnCampaigns : '')} /></span></li>
                                </ul>
                            </div>
                            <div id="content" class="emoji">
                            </div>
                        </div>
                    }
                    <div class="cloader">
                        <div class="clface">
                            <div class="clsface">
                                <div id="h2" class="hand"></div>
                            </div>
                            <div class="top"></div>
                            <div class="bottom"></div>
                            <div class="left"></div>
                            <div class="right"></div>
                            <div id="sub" class="pin"></div>
                            <div id="h1" class="hand"></div>
                            <div id="main" class="pin"></div>
                        </div>
                    </div>
                </div>
            }

            <div id="Fleet">
                <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/vehicle-list-title-img.jpg' />
                <div id='responePhone'>
                    <h1>Fleet Standard</h1>
                </div>
            </div>

            <div id='SppedCarReserv'>
                <h1>Find the car you want to reserve on Google map and book it</h1>
                <AllCarMap />
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
                            <Select variant='flushed' placeholder='All Category' value={selectedCategory} onChange={handleCategoryChange}>
                                {allCategorie?.data?.map((byCategory, index) => (
                                    <option value={byCategory?.category} key={index}>{byCategory?.category}</option>
                                ))}
                            </Select>
                            <Select variant='flushed' placeholder='All Type' value={selectedType} onChange={handleTypeChange} >
                                {allType?.data?.map((byType, index) => (
                                    <option value={byType?.type} key={index}>{byType?.type}</option>
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
                            <button style={{ marginTop: "20px" }} onClick={handleFilterSearch} className="buttonSearchVFilter">
                                <span class="span">\ō͡≡o˞̶ </span>
                            </button>
                        </div>
                    </div>
                    <div className='Cards'>
                        {cars?.data.map((byCar, index) => (
                            <Car key={index} img={`data:image/jpeg;base64,${byCar?.carImages[0]?.imagePath ? byCar?.carImages[0]?.imagePath : ''}`} campaignsInterest={byCar?.campaignsInterest} campaignsPrice={byCar?.campaignsPrice} Id={byCar?.id} name={byCar.marka} desc={byCar.description.slice(0, 30)} price={byCar.price} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default VehicleFleet;
