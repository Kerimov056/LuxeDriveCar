import React from 'react'
import "./filterpage.scss";
import Nav from "../Navbar/Nav";
import Navbartwo from "../Navbar/Navbartwo";
import { Input } from '@chakra-ui/react';

const FilterPage = () => {
    return (
        <>
            <div>
                <Nav />
            </div>
            <div className='SearchCar'>
                <div>
                    <div className='SearchResult'>
                        <h1></h1>
                        <h3>Home/ / Search result for "BMW"</h3>
                    </div>
                    <div className='NewSearch'>
                        <h1>New search:</h1>
                        <div>
                            <Input type='text' />
                            <button class="buttonSearcCar">
                                <span>
                                    <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
                                </span>
                            </button>
                        </div>
                        <p>If you are not happy with the results below please do another search</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterPage