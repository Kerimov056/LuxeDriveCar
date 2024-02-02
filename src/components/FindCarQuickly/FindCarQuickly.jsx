import React, { useState, useEffect, useRef } from 'react';
import "./FindCarQuickly.scss";
import { Link, useParams } from 'react-router-dom';
import CategoryCarCard from './CategoryCarCard';
import { Select } from '@chakra-ui/react';
import FindAllCarMap from "./FindAllCarMap";
import RespnseCars from "./RespnseCars";
import { getCar, getAllMarka, getAllModel } from "../Services/carServices";
import { useQuery } from 'react-query'
import { getCategorie } from "../Services/categorieServices";
import { getType } from "../Services/typeServices";
import { Google_Maps_Api_Key } from "../utils/ExportFile";

const FindCarQuickly = () => {

    const { city } = useParams();

    const [searchCity, setSearchCity] = useState(city ? city : '');
    const [cityBounds, setCityBounds] = useState(null);
    const mapRef = useRef(null);

    const handleInputChange = (e) => {
        setSearchCity(e.target.value);
    };

    const handleButtonClick = () => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity ? searchCity : ''}&key=${Google_Maps_Api_Key ? Google_Maps_Api_Key : ''}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results[0]) {
                    setSearchCity(data.results[0].geometry.location);
                    setCityBounds(data.results[0].geometry.bounds);
                } else {
                }
            })
            .catch(error => {
            });
    };


    useEffect(() => {
        handleButtonClick()
    }, [searchCity]);

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

    // const { data: allType } = useQuery({
    //     queryKey: ["type"],
    //     queryFn: getType,
    //     staleTime: 0,
    // });

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

    const handleCategoryChange = (selectedCategory) => {
        setSelectedCategory(selectedCategory);
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
                                // value={searchCity}
                                className="inputCarS"
                                name="text"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className='ACArFilter'>
                        <div className='ACArFilterLeft'>
                            {allCategorie?.data?.slice(0, 4).map((category, index) => (
                                <CategoryCarCard
                                    key={index}
                                    value={category?.category} // This is the value for the select option
                                    onChange={handleCategoryChange} // This is the change event handler
                                    category={category?.category}
                                />
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
                                <Select style={{color:'white', marginLeft:'-20px'}} variant='flushed' placeholder='All Marka' value={selectedMarka} onChange={handleMarkaChange}>
                                    {allMarka?.data?.map((byMarka, index) => (
                                        <option style={{color:'black'}} value={byMarka} key={index}>{byMarka}</option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Select style={{color:'white', marginLeft:'10px'}} variant='flushed' placeholder='All Model' value={selectedModel} onChange={handleModelChange}>
                                    {allModel?.data?.map((byModel, index) => (
                                        <option style={{color:'black'}} value={byModel} key={index}>{byModel}</option>
                                    ))}
                                </Select>
                            </div>
                            <div style={{ marginLeft: "30px", marginTop: "-30px" }}>
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
                            {cityBounds && cars?.data.map((byCar, index) => {
                                const carLatitude = byCar.latitude;
                                const carLongitude = byCar.longitude;

                                if (
                                    cityBounds &&
                                    carLatitude >= cityBounds.southwest.lat &&
                                    carLatitude <= cityBounds.northeast.lat &&
                                    carLongitude >= cityBounds.southwest.lng &&
                                    carLongitude <= cityBounds.northeast.lng
                                ) {
                                    return (
                                        <RespnseCars
                                            key={index}
                                            Id={byCar?.id}
                                            marka={byCar?.marka}
                                            model={byCar?.model}
                                            img={`data:image/jpeg;base64,${byCar.carImages[0]?.imagePath}`}
                                            category={byCar?.carCategory?.category ? byCar?.carCategory?.category : "No Category"}
                                            price={byCar?.price}
                                            campaignsPrice={byCar?.campaignsPrice}
                                            carLat={byCar?.latitude}
                                            carLng={byCar?.longitude}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>

                    </div>
                    <div className='ResponseMapAllCar'>
                        {
                            cityBounds && cars?.data &&
                            (() => {
                                const elements = [];
                                for (let index = 0; index < cars.data.length; index++) {
                                    const byCar = cars.data[index];
                                    const carLatitude = byCar.latitude;
                                    const carLongitude = byCar.longitude;

                                    if (
                                        cityBounds &&
                                        carLatitude >= cityBounds.southwest.lat &&
                                        carLatitude <= cityBounds.northeast.lat &&
                                        carLongitude >= cityBounds.southwest.lng &&
                                        carLongitude <= cityBounds.northeast.lng
                                    ) {
                                        elements.push(
                                            <FindAllCarMap
                                                key={index}
                                                ref={mapRef}
                                                locationLat={searchCity?.lat ? searchCity?.lat : ''}
                                                locationLng={searchCity?.lng ? searchCity?.lng : ''}
                                                data={cars ? cars : ''}
                                                cityBounds={cityBounds ? cityBounds : ''}
                                                setSelectedMarker={setSelectedMarker}
                                                setReturnLocation={setReturnLocation}
                                                setCarAddress={setCarAddress}
                                            />
                                        );
                                        break;
                                    }
                                }
                                return elements;
                            })()
                        }
                    </div>

                </div>
            </div>
        </>
    )
}
export default FindCarQuickly;