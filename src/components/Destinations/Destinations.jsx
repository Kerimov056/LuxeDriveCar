import React from 'react'
import './destinations.scss'
import DestinationsCard from './DestinationsCard'
import Chauffeurs from '../Chauffeurs/Chauffeurs'

const Destinations = (props) => {
    return (
        <div id='Destinations'>
            <div>
                <div className='Basliq'>
                    <p></p>
                    <h1>{props.name}</h1>
                    <h3>{props.topic}</h3>
                </div>
                <div className='DestinationsCardIn'>
                    <div className='bossss'></div>
                    <div className='griddd'>
                        {props.isAnswer && (
                            [
                                <DestinationsCard key="1" descrption={"Tortor condimentum lacinia quis vel eros donec odio. Feugiat fermentum in posuere urna. Faucibus turpis in eun mi bibendum."} name={"No Delays"} />,
                                <DestinationsCard key="2" descrption={"Tortor condimentum lacinia quis vel eros donec odio. Feugiat fermentum in posuere urna. Faucibus turpis in eun mi bibendum."} name={"High Quality"} />,
                                <DestinationsCard key="3" descrption={"Tortor condimentum lacinia quis vel eros donec odio. Feugiat fermentum in posuere urna. Faucibus turpis in eun mi bibendum."} name={"Premium Support"} />,
                                <DestinationsCard key="4" descrption={"Tortor condimentum lacinia quis vel eros donec odio. Feugiat fermentum in posuere urna. Faucibus turpis in eun mi bibendum."} name={"A Diverse Selection"} />,
                            ]
                        )}
                        {props.isHuman && (
                            [
                                <Chauffeurs img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-team-img-1.jpg"} name={"Marco Watkivi"} number={"+123 234 43 23"} />,
                                <Chauffeurs img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-team-img-2.jpg"} name={"Marily Sulli"} number={"+123 234 24 23"} />,
                                <Chauffeurs img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-team-img-3.jpg"} name={"Zakary Tapun"} number={"+123 333 22 11"} />
                            ]
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Destinations
