import React, { useState } from 'react';
import './card.scss';
import { AiOutlineStar } from 'react-icons/ai';

const Aboutcard = (props) => {
    const [localStar, setLocalStar] = useState(3);

    const star = props.star || 0;
    return (
        <div className='Aboutcard'>
            <div>
                <h1 style={{ marginLeft: "0px" }}>{props.name}</h1>
                <div className="stars">
                    {[...Array(5)].map((_, index) => (
                        <AiOutlineStar
                            key={index}
                            style={{ color: localStar >= index && index < star ? "#bfa37c" : "gray" }}
                        />
                    ))}
                </div>
                <p>{props.description}</p>
                <h3>{props.catgorie}</h3>
            </div>
        </div>
    );
}

export default Aboutcard;
