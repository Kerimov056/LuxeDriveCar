import React from 'react'
import './car.scss'
import { AiOutlineStar } from 'react-icons/ai';


const Car = (props) => {
  return (
    <>
        <div className='CarCard'>
            <div>
                <div className='CarUp'>
                    <img src={props.img} />
                    <h2>{props.name}</h2>
                    <span><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></span>
                </div>
                <div className='CarLow'>
                    <p>{props.desc}</p>
                    <span>$<b>{props.price}</b>/hour</span>
                    <button>+ MORE DETAILS</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Car