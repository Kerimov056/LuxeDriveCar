import React from 'react'
import './chauf.css'

const ChauffeursCard = (props) => {

    // console.log(props.Id);
    return (
        <>
            <div class="cardChauff">
                <div class="card-detailsChaufff">
                    <img src={props.imgUrl} />
                    {/* <img src="https://cdn4.buysellads.net/uu/1/81016/1609783196-authentic-260x200-variation-3.jpg" alt="Car" /> */}
                    <p class="text-bodyYYY">Name: {props.name}</p>
                    <p class="text-bodyYYY">Price: {props.price}</p>
                </div>
                <button class="card-buttonNNN">Add</button>
            </div>
        </>
    )
}

export default ChauffeursCard