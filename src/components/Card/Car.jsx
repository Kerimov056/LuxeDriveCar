import React from 'react'
import './car.scss'
import { AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';


const Car = (props) => {
    return (
        <>
            <Link to={`/CarDetail/${props.Id}`} style={{marginTop:"45px"}}>
                <div className='CarCard'>
                    <div>
                        <div className='CarUp'>
                            <img src={props.img} />
                            <h2>{props.name}</h2>
                            <span><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></span>
                        </div>
                        <div className='CarLow'>
                            <p>{props.desc}</p>
                            <span>$<b>{props.price}</b>/hour</span>
                            <button>+ MORE DETAILS</button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Car