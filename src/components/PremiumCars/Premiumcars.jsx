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


const Premiumcars = () => {
    return (
        <>
            <div id='Premiumcarssss'>
                <div>
                    <div className='PremiumcarsImg'>
                        <img className='PremiumcarsImgOne' src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-6.jpg' />
                        <img className='PremiumcarsImgTwo' src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-7.jpg' />
                    </div>
                    <div className='PremiumcarsText'>
                        <div>
                            <h1>Premium Cars Rental</h1>
                            <h3>ONLY THE BEST</h3>
                            <p>Praesent elementum facilisis leo vel fringilla est. Vest bulum lectus a urise ultrices eros in cursus turpi uto.</p>
                            <div>
                                <div>
                                    <span><Number n={21} /><span>+</span></span>
                                    <p>Years of experience</p>
                                </div>
                                <div>
                                    <span><Number n={157} /><b>k</b></span>
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








