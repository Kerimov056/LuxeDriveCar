import React from 'react'
import './filtercar.scss'

const FilterCar = (props) => {
    return (
        <>
            <div className='SearchCarCard'>
                <div className='SearchCarCardImg'>
                    <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/Vihecle-single-featured-img-150x150.jpg' />
                </div>
                <div className='SearchCarCardText'>
                    <h3>{props.marka} {props.model}</h3>
                    <p>{props.desc} […]</p>
                </div>
            </div>
        </>
    )
}

export default FilterCar