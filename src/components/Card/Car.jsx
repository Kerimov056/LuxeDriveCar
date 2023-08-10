import React from 'react'
import './car.scss'
import { AiOutlineStar } from 'react-icons/ai';


const Car = () => {
  return (
    <>
        <div className='CarCard'>
            <div>
                <div className='CarUp'>
                    <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-02.jpg' />
                    <h2>Porce Taycan Sport</h2>
                    <span><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></span>
                </div>
                <div className='CarLow'>
                    <p>Lorem ipsum dolor sit do amet, elit sed, adipiscing </p>
                    <span>$<b>120</b>/hour</span>
                    <button>+ MORE DETAILS</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Car