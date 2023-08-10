import React from 'react'
import './slider.scss'

const Sliderimg = (props) => {
  return (
    <>
      <div class="slider-container">
        <img src={props.img} alt="Slider Image" />
        <div class="caption">
         {props.name} <br/>
          <br/>
          <button> + VIEW MORE </button>
        </div>
      </div>

    </>
  )
}

export default Sliderimg