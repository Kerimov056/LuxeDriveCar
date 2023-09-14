import React, { useState, useEffect, useRef } from 'react';
import "./FindCarQuickly.scss";
import { Link } from 'react-router-dom';
import CategoryCarCard from './CategoryCarCard';
import { Select } from '@chakra-ui/react';
import FindAllCarMap from "./FindAllCarMap";
import RespnseCars from "./RespnseCars";
import { getCar, getAllMarka, getAllModel, IsCampaigns } from "../Services/carServices";
import { useQuery } from 'react-query'
import { getCategorie } from "../Services/categorieServices";
import { getType } from "../Services/typeServices";
import { Google_Maps_Api_Key } from "../utils/ExportFile";
import isLocationInCityBounds from "./FindAllCarMap";

const FindCarQuickly = () => {
    const [searchCity, setSearchCity] = useState('');
    const [cityBounds, setCityBounds] = useState(null);
    const [filteredCars, setFilteredCars] = useState(null);
    const mapRef = useRef(null);

    const handleInputChange = (e) => {
        setSearchCity(e.target.value);
    };

    const handleButtonClick = () => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity}&key=${Google_Maps_Api_Key}`)
            .then(response => response.json())
            .then(data => {
                setSearchCity(data.results[0].geometry.location);
                setCityBounds(data.results[0].geometry.bounds);
            })
            .catch(error => console.error('Hata:', error));
    };


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

    const { data: allType } = useQuery({
        queryKey: ["type"],
        queryFn: getType,
        staleTime: 0,
    });

    const { data: allCategorie } = useQuery({
        queryKey: ["Category"],
        queryFn: getCategorie,
        staleTime: 0,
    });

    const [selectedMarka, setSelectedMarka] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleMarkaChange = (event) => {
        setSelectedMarka(event.target.value);
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleFilterSearch = () => {
        refetch();
    };

    const minPriceQueryParam = minPrice !== undefined ? minPrice : '';
    const maxPriceQueryParam = maxPrice !== undefined ? maxPrice : '';

    const { data: cars, refetch } = useQuery({
        queryKey: ["FindCarss"],
        queryFn: () => getCar(selectedCategory, selectedType, selectedMarka, selectedModel, minPriceQueryParam, maxPriceQueryParam),
        staleTime: 0,
    });

    const [carAddress, setCarAddress] = useState('');

    const setSelectedMarker = (marker) => {
        setSelectedMarker(marker);
    };

    const setReturnLocation = (location) => {
        setReturnLocation(location);
    };

    

    return (
        <>
            <div id='FindCarQuickly'>
                <div className='FilterFindACar'>
                    <div className='CityFindACarSearch'>
                        <div className="input-wrapperFilterACar">
                            <button className="iconFindCar" onClick={handleButtonClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M22 22L20 20"></path>
                                </svg>
                            </button>
                            <input
                                placeholder="search.."
                                onChange={handleInputChange}
                                value={searchCity}
                                className="inputCarS"
                                name="text"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className='ACArFilter'>
                        <div className='ACArFilterLeft'>
                            {allCategorie?.data?.slice(0, 4).map((category, index) => (
                                <CategoryCarCard img={"https://content.r9cdn.net/rimg/carimages/generic/05_suv-small_white.png?width=108&height=72"} category={category?.category} />
                            ))}
                            <div>
                                <div class="input-containerFindMinPRice">
                                    <input value={minPrice} onChange={handleMinPriceChange} placeholder="Min Price" class="input-field" type="number" />
                                    <label for="input-field" class="input-labelEL">Enter Price</label>
                                    <span class="input-highlightTT"></span>
                                </div>
                            </div>
                            <div>
                                <div class="input-containerFindMinPRice">
                                    <input value={maxPrice} onChange={handleMaxPriceChange} placeholder="Max Price" class="input-field" type="number" />
                                    <label for="input-field" class="input-labelEL">Enter Price</label>
                                    <span class="input-highlightTT"></span>
                                </div>
                            </div>
                        </div>
                        <div className='ACArFilterRight'>
                            <div>
                                <Select variant='flushed' placeholder='All Marka' value={selectedMarka} onChange={handleMarkaChange}>
                                    {allMarka?.data?.map((byMarka, index) => (
                                        <option value={byMarka} key={index}>{byMarka}</option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Select variant='flushed' placeholder='All Model' value={selectedModel} onChange={handleModelChange}>
                                    {allModel?.data?.map((byModel, index) => (
                                        <option value={byModel} key={index}>{byModel}</option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <button style={{ marginTop: "20px" }} onClick={handleFilterSearch} className="buttonSearchVFilter">
                                    <span class="span">\ō͡≡o˞̶ </span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='ResponseACar'>
                    <div className='ResponseAllCars'>
                        <div>
                            {cars?.data.map((byCar, index) => (
                                <RespnseCars
                                    key={index}
                                    Id={byCar?.id}
                                    marka={byCar?.marka}
                                    model={byCar.model}
                                    img={`data:image/jpeg;base64,${byCar?.carImages[0]?.imagePath}`}
                                    catagorie={byCar?.carCategory ? byCar.carCategory.category : "No Category"}
                                    price={byCar?.price}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='ResponseMapAllCar'>
                        <FindAllCarMap
                            ref={mapRef}
                            locationLat={searchCity?.lat ? searchCity?.lat : ''}
                            locationLng={searchCity?.lng ? searchCity?.lng : ''}
                            data={cars ? cars : ''}
                            cityBounds={cityBounds ? cityBounds : ''}
                            setSelectedMarker={setSelectedMarker}
                            setReturnLocation={setReturnLocation}
                            setCarAddress={setCarAddress}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default FindCarQuickly;
