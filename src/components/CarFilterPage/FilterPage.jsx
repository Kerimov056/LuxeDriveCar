import React from 'react'
import "./filterpage.scss";
import Nav from "../Navbar/Nav";
import Navbartwo from "../Navbar/Navbartwo";

const FilterPage = () => {
    return (
        <>
            <div>
                <Nav />
            </div>
            <div className='DropMenu'>
                <Navbartwo />
            </div>
        </>
    )
}

export default FilterPage