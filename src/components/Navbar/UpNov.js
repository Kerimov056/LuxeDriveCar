import React from 'react'
import './navbarr.scss'
import { BsTelephoneX } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'

const UpNov = () => {
    return (
        <>
            <div className='AddNav'>
                <div style={{ width: "4px", height: "10px" }}></div>
                <div>
                    <span><BsTelephoneX />+ 1234 5678 901</span>
                    <p></p>
                    <span><MdLocationPin /> 48 RUE DE VALMY</span>
                </div>
            </div>
        </>
    )
}

export default UpNov