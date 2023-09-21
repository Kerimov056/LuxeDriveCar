import React, { useState, useEffect } from 'react'
import './destinations.scss'
import DestinationsCard from './DestinationsCard'
import Chauffeurs from '../Chauffeurs/Chauffeurs'
import { getFaqs } from '../Services/faqsServices'
import { getChauffeurs } from "../Services/chauffeursServices";
import { useQuery } from "react-query";
import axios from "axios";

const Destinations = (props) => {

    const Color = props.color;

    const { data } = useQuery({
        queryKey: ["Faqs"],
        queryFn: getFaqs,
        staleTime: 0,
    });
    
    const { data: chaurffers } = useQuery({
        queryKey: ["chauffers"],
        queryFn: getChauffeurs,
        staleTime: 0,

    });
    // useEffect(() => {
    // const [faqss, setFaqss] = useState([])
    // const [chauff, setChauff] = useState([])
    //     // axios.get('https://localhost:7152/api/Faqs')
    //     //     .then(response => {
    //     //         setFaqss(response.data)
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error);
    //     //     });

    //     axios.get('https://localhost:7152/api/Chauffeurss')
    //         .then(response => {
    //             setChauff(response.data)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, []);



    return (
        <div id='Destinations' style={{ backgroundColor: Color }}>
            <div>
                <div className='Basliq'>
                    <p></p>
                    <h1 style={{ color: Color === "white" ? "black" : "white", fontFamily:"'Times New Roman', Times, serif" }}>{props.name}</h1>
                    <h3>{props.topic}</h3>
                </div>
                <div className='DestinationsCardIn'>
                    <div className='bossss'></div>
                    <div className={props.isHuman ? "griddd" : "gridddD"}>
                        {props.isAnswer && data?.data.slice(-4).map((faqs, index) => ((
                            [
                                <DestinationsCard key={index} color={Color === "white" ? "black" : "white"} descrption={faqs.descrption.slice(0, 130)} name={faqs.title} />
                            ]
                        )))}
                        {props.isHuman && chaurffers?.data.slice(-3).map((chauff) => ((
                            [
                                <Chauffeurs img={`data:image/jpeg;base64,${chauff.imagePath}`} name={chauff.name} number={chauff.number} />
                            ]
                        )))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Destinations
