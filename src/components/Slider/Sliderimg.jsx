import React from 'react'
import './slider.scss'

const Sliderimg = (props) => {
  return (
    <>
      <div class="slider-container">
        <img src={props.img} alt="Slider Image" />
        <div id='FontFamliyChange' class="caption">
         {props.name} <br/>
          <br/>
          <button id='resBut'> + VIEW MORE </button>
        </div>
      </div>

    </>
  )
}

export default Sliderimg