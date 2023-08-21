import React from 'react'
import './destinations.scss'
import DestinationsCard from './DestinationsCard'
import Chauffeurs from '../Chauffeurs/Chauffeurs'
import { getFaqs } from '../Services/faqsServices'
import { useQuery } from "react-query";




const Destinations = (props) => {

    const Color = props.color;

    const { data } = useQuery({
        queryKey: ["faqs"],
        queryFn: getFaqs,
        staleTime: 0,
    });

    return (
        <div id='Destinations' style={{ backgroundColor: Color }}>
            <div>
                <div className='Basliq'>
                    <p></p>
                    <h1 style={{ color: Color === "white" ? "black" : "white" }}>{props.name}</h1>
                    <h3>{props.topic}</h3>
                </div>
                <div className='DestinationsCardIn'>
                    <div className='bossss'></div>
                    <div className='griddd'>
                        {props.isAnswer && data?.data.map((faqs) => ((
                            [
                                <DestinationsCard color={Color === "white" ? "black" : "white"} key="1" descrption={faqs.descrption} name={faqs.title} />,
                            ]
                        )))}
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
