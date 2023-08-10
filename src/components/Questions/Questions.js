import React, { useEffect, useState } from 'react'
import './questions.scss'
import AOS from "aos";
import "aos/dist/aos.css";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import axios from 'axios';


const Questions = () => {


    useEffect(() => {
        AOS.init({
            offset: 630,
            duration: 800,
            delay: 260,
        });
        AOS.refresh();
    }, []);

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(response => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <div id='ques' style={{ marginBottom: "1px solid gray" }}>

                <div className=''>
                    <Accordion>
                        {data.splice(0, 5).map((item, id) => (
                            <AccordionItem key={id}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <div className='on_esas' data-aos="fade-up"
                                            data-aos-anchor-placement="center-bottom">
                                            <h2 className='saul'>{item.name}</h2>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className='panel'>
                                        <div className='panel_left'>
                                            <h4 className='answerr'>{item.body}</h4>
                                        </div>
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default Questions