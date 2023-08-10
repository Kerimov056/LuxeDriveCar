import React from 'react'
import './imagecompanents.scss'

const Imagecompanents = (props) => {
  return (
    <>
        <div id='ImageC'>
            <img src={props.img} />
        </div>
    </>
  )
}

export default Imagecompanents