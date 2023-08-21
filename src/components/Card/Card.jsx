import React from 'react'
import './card.scss'
import { Link } from 'react-router-dom'

const Card = (props) => {
    return (
        <>
            <div class="card">
                <div class="first-content">
                    <img src={props.img} />
                </div>
                <Link to={`/CarDetail/${props.Id}`}>
                    <div class="second-content">
                        <span style={{ marginLeft: "-100x", color: "black" }}>{props.catagorie}</span>
                        <span>{props.name}</span> <br />
                        <span style={{ marginTop: "-30px" }}>from <sapn id="price" >${props.price} / hour</sapn></span>
                        <span style={{ marginTop: "20px" }}>{props.description}</span>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Card