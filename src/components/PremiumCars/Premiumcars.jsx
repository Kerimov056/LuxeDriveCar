import React from 'react'
import './premiumcars.scss'
import { useSpring, animated } from "react-spring"

function Number({ n }) {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 800,
        config: { mass: 1, tension: 20, friction: 10 },
    });

    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}


function Number1({ n }) {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 1000,
        config: { mass: 1, tension: 20, friction: 10 },
    });

    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}


const Premiumcars = (props) => {
    return (
        <>
            <div style={{backgroundColor:props.backColor}} id='Premiumcarssss'>
                <div>
                    <div style={{order:props.one}} className='PremiumcarsImg'>
                        <img style={props.about===false ? {} : {width:"750px",objectFit:"cover"}} className='PremiumcarsImgOne' src={props.imgUrl} />
                        {props.about===false ? 
                        <img className='PremiumcarsImgTwo' src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-7.jpg' />
                       : <h1></h1> }
                    </div>
                    <div style={{order:props.two}} className='PremiumcarsText'>
                        <div>
                            <h1 style={{color: props.NumColor}}>Premium Cars Rental</h1>
                            <h3 style={{color: props.NumColor}}>ONLY THE BEST</h3>
                            <p>Praesent elementum facilisis leo vel fringilla est. Vest bulum lectus a urise ultrices eros in cursus turpi uto.</p>
                            <div id='responsive'>
                                <div>
                                    <span style={{color: props.NumColor}}><Number n={21} /><span>+</span></span>
                                    <p>Years of experience</p>
                                </div>
                                <div>
                                    <span style={{color: props.NumColor}}><Number n={157} /><b>k</b></span>
                                    <p>Satisfied clients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Premiumcars








