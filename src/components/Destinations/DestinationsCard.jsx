import React from 'react'
import './destinations.scss'


const DestinationsCard = (props) => {

  const Color = props.color;

  return (
    <>
      <div id='DestinationsCard'>
        <div>
          <h3 style={{ color: Color }}>{props.name}</h3>
          <p>{props.descrption}</p>
        </div>
      </div>
    </>
  )
}

export default DestinationsCard