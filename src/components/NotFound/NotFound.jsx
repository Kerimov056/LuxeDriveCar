import React from 'react'
import './NotFound.scss'

const NotFound = () => {
    return (
        <>
            <div className='NotFound'>
                <div className='NotFound_image'>
                    <img src={"https://i.etsystatic.com/6210335/r/il/ba56c9/1679635882/il_1080xN.1679635882_sm9d.jpg"} />
                    <div className='NotFound_Text'>
                        <h1>404</h1>
                        <h2>We are sorry, the page you requested cannot be found.</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound