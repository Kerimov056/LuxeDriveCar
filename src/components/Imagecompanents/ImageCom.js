import React from 'react'
import './imagecompanents.scss'



const ImageCom = (props) => {
  return (
    <>
        <div id='merc'>
            <img src={props.img} />
        </div>
    </>
  )
}

export default ImageCom