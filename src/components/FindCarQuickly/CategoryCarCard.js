import React from 'react'
import "./CategoryCarCard.scss";

const CategoryCarCard = (props) => {
  return (
    <div className='CategoryCarCard'>
        <div>
            <div className='CategoryCarCard_Img'>
                <img src={props.img} />
            </div>
            <div className='CategoryCarCard_Name'>
                {props.category}
            </div>
        </div>
    </div>
  )
}

export default CategoryCarCard