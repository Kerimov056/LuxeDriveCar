import React, { useEffect } from 'react';
import './car.scss'
import { Link } from 'react-router-dom';
import AOS from 'aos'
import "aos/dist/aos.css";


const Car = (props) => {


    useEffect(() => {
        AOS.init({
            offset: 300,
            duration: 500,
            delay: 1360,
        });
        AOS.refresh();
    }, [])


    return (
        <>
            <Link to={`/CarDetail/${props.Id}`} style={{ marginTop: "45px" }}>
                <div data-aos="fade-up"
                    data-aos-duration="3000" className='CarCard'>
                    <div>
                        <div className='CarUp'>
                            <img src={props.img} />
                            <h2>{props.name}</h2>
                        </div>
                        <div className='CarLow'>
                            <p>{props.desc}</p>
                            <span>$<b>{props.campaignsPrice === null ? props.price : props.campaignsPrice}</b>/hour</span><br />
                            {props.campaignsPrice !== null &&
                                <span id='oldPrice'>${props.price} /Hour</span>
                            }
                            <button>+ MORE DETAILS</button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Car