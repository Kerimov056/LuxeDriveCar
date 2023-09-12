import React from 'react'
import './car.scss'
import { Link } from 'react-router-dom';


const Car = (props) => {
    return (
        <>
            <Link to={`/CarDetail/${props.Id}`} style={{ marginTop: "45px" }}>
                <div className='CarCard'>
                    <div>
                        <div className='CarUp'>
                            <img src={props.img} />
                            <h2>{props.name}</h2>
                        </div>
                        <div className='CarLow'>
                            <p>{props.desc}</p>
                            <span>$<b>{props.campaignsPrice === null ? props.price : props.campaignsPrice }</b>/hour</span><br />
                            {props.campaignsPrice !== null &&
                                <span id='oldPrice'>${props.price} /Hour</span>
                            }
                            <button>+ MORE DETAILS</button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Car