import React from 'react'
import "./MyReserv.scss";

const MyReserv = () => {
    return (
        <>
            <div class="cardMyReserv">
                <a class="card1" style={{backgroundColor:"white"}} href="#">
                    <p>{props.status}</ p>
                    <p class="small">{props.marka} {props.model} {props.remainingTime}</p>
                    <div class="go-corner" href="#">
                        <div class="go-arrow">
                            →
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}

export default MyReserv