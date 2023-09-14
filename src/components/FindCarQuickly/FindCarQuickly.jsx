import React from 'react'
import "./FindCarQuickly.scss";
import { Link } from 'react-router-dom';
import CategoryCarCard from './CategoryCarCard';
import { Select } from '@chakra-ui/react';
import AllCarMap from '../VehicleFleet/AllCarMap';
import RespnseCars from "./RespnseCars";

const FindCarQuickly = () => {
    return (
        <>
            <div id='FindCarQuickly'>
                <div className='FilterFindACar'>
                    <div className='CityFindACarSearch'>
                        <div class="input-wrapperFilterACar">
                            <button class="iconFindCar">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#fff" d="M22 22L20 20"></path>
                                </svg>
                            </button>
                            <input placeholder="search.." class="inputCarS" name="text" type="text" />
                        </div>
                    </div>
                    <div className='ACArFilter'>
                        <div className='ACArFilterLeft'>
                            <CategoryCarCard img={"https://content.r9cdn.net/rimg/carimages/generic/05_suv-small_white.png?width=108&height=72"} category={"Small"} />
                            <CategoryCarCard img={"https://content.r9cdn.net/rimg/carimages/generic/02_economy_white.png?width=108&height=72"} category={"Medium"} />
                            <CategoryCarCard img={"https://content.r9cdn.net/rimg/carimages/generic/05_suv-small_white.png?width=108&height=72"} category={"Suv"} />
                            <CategoryCarCard img={"https://content.r9cdn.net/rimg/carimages/generic/03_standard_white.png?width=108&height=72"} category={"Large"} />
                            <div>
                                <div class="input-containerFindMinPRice">
                                    <input placeholder="Min Price" class="input-field" type="number" />
                                    <label for="input-field" class="input-labelEL">Enter Price</label>
                                    <span class="input-highlightTT"></span>
                                </div>
                            </div>
                            <div>
                                <div class="input-containerFindMinPRice">
                                    <input placeholder="Max Price" class="input-field" type="number" />
                                    <label for="input-field" class="input-labelEL">Enter Price</label>
                                    <span class="input-highlightTT"></span>
                                </div>
                            </div>
                        </div>
                        <div className='ACArFilterRight'>
                            <div>
                                <Select variant='flushed' placeholder='All Marka' >
                                    {/* {allMarka?.data?.map((byMarka, index) => (
                                    <option value={byMarka} key={index}>{byMarka}</option>
                                ))} */}
                                    <option>Salam</option>
                                </Select>
                            </div>
                            <div>
                                <Select variant='flushed' placeholder='All Model' >
                                    {/* {allMarka?.data?.map((byMarka, index) => (
                                    <option value={byMarka} key={index}>{byMarka}</option>
                                ))} */}
                                    <option>Salam</option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ResponseACar'>
                    <div className='ResponseAllCars'>
                        <div>
                            <RespnseCars />
                            <RespnseCars />
                            <RespnseCars />
                            <RespnseCars />
                            <RespnseCars />
                            <RespnseCars />
                        </div>
                    </div>
                    <div className='ResponseMapAllCar'>
                        <AllCarMap />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FindCarQuickly