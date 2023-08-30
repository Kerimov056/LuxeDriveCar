import React from 'react'
import './filtercar.scss'
import { Link } from 'react-router-dom'

const FilterCar = (props) => {
    return (
        <>
            
                <div className='SearchCarCard'>
                    <div className='SearchCarCardImg'>
                        <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/Vihecle-single-featured-img-150x150.jpg' />
                    </div>
                    <div className='SearchCarCardText'>
                        <h3><Link to={`/CarDetail/${props.Id}`}>{props.marka} {props.model}</Link></h3>
                        <p>{props.desc} […]</p>
                    </div>
                </div>
        </>
    )
}

export default FilterCar