import React from 'react'
import "./filterpage.scss";
import Nav from "../Navbar/Nav";
import Navbartwo from "../Navbar/Navbartwo";
import { Input } from '@chakra-ui/react';
import {MdYoutubeSearchedFor} from "react-icons/md";
import FilterCar from "./FilterCar";
import Navbar from '../Navbar/Navbar';

const FilterPage = () => {



    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='SearchCar'>
                <div>
                    <div className='SearchResult'>
                        <h1></h1>
                        <h3>Home / Search result for "BMW"</h3>
                    </div>
                    <div className='NewSearch'>
                        <h1>New search:</h1>
                        <div>
                            <Input type='text' />
                            <button class="buttonSearcCar">
                                <MdYoutubeSearchedFor />
                            </button>
                        </div>
                        <p>If you are not happy with the results below please do another search</p>
                    </div>

                    <div className='FilterResultCars'>
                        <FilterCar />
                        <FilterCar />
                        <FilterCar />
                        <FilterCar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterPage