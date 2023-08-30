import React, { useState } from 'react'
import "./filterpage.scss";
import { Input } from '@chakra-ui/react';
import { MdYoutubeSearchedFor } from "react-icons/md";
import FilterCar from "./FilterCar";
import Navbar from '../Navbar/Navbar';
import { useQuery } from "react-query";
import { getNameCar } from "../Services/carServices";


const FilterPage = () => {
    const [deyer, setDeyer] = useState('');

    const handleInputChange = (event) => {
        setDeyer(event.target.value);
    };

    const { data: searchResult, isLoading, isError } = useQuery(
        ['searchCar', deyer],
        () => getNameCar(deyer),
        {
            enabled: deyer !== '',
        }
    );

    const handleSearchClick = () => {
        if (deyer !== '') {

        }
    };
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
                            <Input value={deyer} onChange={handleInputChange} placeholder='Search for...' type='text' />
                            <button onClick={handleSearchClick} class="buttonSearcCar">
                                <MdYoutubeSearchedFor />
                            </button>
                        </div>
                        <p>If you are not happy with the results below please do another search</p>
                    </div>

                    <div className='FilterResultCars'>
                        {searchResult?.data?.length > 0 ? (
                            searchResult.data.map((byCar, index) => (
                                <FilterCar key={index} marka={byCar?.marka} model={byCar.model} desc={byCar?.description} />
                            ))
                        ) : deyer !== '' && (
                            <div className='NotFindACar'>
                                <img src='https://www.kar-men.com/assets/images/no_cars_search.png' alt='No cars found' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterPage