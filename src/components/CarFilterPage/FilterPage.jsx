import React, { useState } from 'react'
import "./filterpage.scss";
import { Input } from '@chakra-ui/react';
import { MdYoutubeSearchedFor } from "react-icons/md";
import FilterCar from "./FilterCar";
import Navbar from '../Navbar/Navbar';
import { useQuery } from "react-query";
import { getNameCar } from "../Services/carServices";


const FilterPage = () => {
    const [marka, setMarka] = useState('');
    const [model, setModel] = useState('');

    const handleMarkaChange = (event) => {
        setMarka(event.target.value);
    };

    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    const { data: searchResult, isLoading, isError } = useQuery(
        ['searchCar', marka, model],
        () => getNameCar(marka, model),
        {
            enabled: marka !== '' || model !== '',
        }
    );

    const handleSearchClick = () => {}

        return (
            <>
                <div>
                    <Navbar />
                </div> Salam
                {/* <div className='SearchCar'>
                    <div>
                        <div className='SearchResult'>
                            <h1></h1>
                            <h3>Home / Search result for "BMW"</h3>
                        </div>
                        <div className='NewSearch'>
                            <h1>New search:</h1>
                            <div>
                                <Input value={marka} onChange={handleMarkaChange} placeholder='Search for marka...' type='text' />
                                <Input value={model} onChange={handleModelChange} placeholder='Search for model...' type='text' />                            <button onClick={handleSearchClick} class="buttonSearcCar">
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
                            ) : marka !== '' && model !== '' && (
                                <div className='NotFindACar'>
                                    <img src='https://www.kar-men.com/assets/images/no_cars_search.png' alt='No cars found' />
                                </div>
                            )}
                        </div>
                    </div>
                </div> */}
            </>
        )
    }
}
export default FilterPage