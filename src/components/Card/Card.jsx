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
                    {props.isCampaigns === false &&
                        <div class="second-content">
                            <span style={{ marginLeft: "-100x", color: "black" }}>{props.catagorie}</span>
                            <span>{props.name}</span> <br />
                            <span style={{ marginTop: "-30px" }}>from <sapn id="price" >${props.price} / hour</sapn></span>
                            <span style={{ marginTop: "20px" }}>{props.description.slice(0, 30)}</span>
                        </div>
                    }
                    {props.isCampaigns === true &&
                        <div class="second-content">
                            <span style={{ marginLeft: "-100x", color: "black" }}>Categorie: {props.catagorie}</span>
                            <span style={{ marginLeft: "-100x", color: "black" }}>Marka: {props.name}</span>
                            <span id='CarCompPrice' style={{ marginLeft: "-100x", color: "black",marginTop:"29px" }}>
                                <p id='newPrice'>Price: ${props.campaignsPrice}/Hour</p>
                                    <p id='OldPrice'>${props.price}/Hour</p>
                                <p id='CompaginsFai'>{props.campaignsInterest}% Compagins</p>
                            </span>
                        </div>
                    }
                </Link>
            </div>
        </>
    )
}

export default Card