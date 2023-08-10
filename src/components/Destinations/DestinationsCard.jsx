import React from 'react'
import './destinations.scss'

const DestinationsCard = (props) => {
  return (
    <>
        <div id='DestinationsCard'>
            <h3>{props.name}</h3>
            <p>{props.descrption}</p>
        </div>
    </>
  )
}

export default DestinationsCard