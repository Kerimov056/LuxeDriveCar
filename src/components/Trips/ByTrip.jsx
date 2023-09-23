import React from 'react'
import './ByTrip.scss'
import Maps from "../Map/Maps";

const ByTrip = () => {
    return (
        <>
            <div id='ByTrip'>
                <div className='ByTrip_Text'>
                    <div>
                        <div className='ByTrip_Text_Main'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className='ByTrip_Text_hed'>

                        </div>
                    </div>
                </div>
                <div className='ByTrip_map'>
                    <Maps />
                </div>
            </div>
        </>
    )
}

export default ByTrip