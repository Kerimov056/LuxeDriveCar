import React from 'react'
import './chauffeurs.scss'
import { BsTelephoneX } from 'react-icons/bs'

const Chauffeurs = (props) => {
    return (
        <>
            <div id="ChauffeursS">
                <p>
                    <img src={props.img} />
                </p>
                <div>
                    <h2>{props.name}</h2>
                    <p><span><BsTelephoneX/></span>{props.number}</p>
                </div>
            </div>
        </>
    )
}

export default Chauffeurs