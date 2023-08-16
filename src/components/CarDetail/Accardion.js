import React from 'react';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import './Accardion.scss'

const Accardion = (props) => {
    return (
        <div>
            <Accordion id='Ac'>
                <AccordionItem >
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <h2 className='saul'>{props.name}</h2>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className='panel'>
                            <div className='panel_left'>
                                <h4 className='answerr'>{props.body}</h4>
                            </div>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default Accardion;
