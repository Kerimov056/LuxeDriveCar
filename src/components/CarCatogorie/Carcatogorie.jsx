import React, { useState, useEffect } from 'react'
import './carcatogorie.scss'
import { AiOutlineCheck } from 'react-icons/ai'
import  AOS from 'aos'

const Carcatogorie = (props) => {

  const [description, setDescription] = useState(props.description || []);

  useEffect(() => {
    AOS.init({
      offset: 300,
      duration: 500,
      delay: 1360,
    });
    AOS.refresh();
  }, [])


  return (
    <>
      <div className='CarCatagorieE'>
        <p></p>
        <div style={{ borderBottom: "1px solid rgb(63, 63, 63)" }}>

          <div className='Car'>
            <img data-aos="fade-right" src={props.img} />
            <div>
              <h1>{props.catagorie}</h1>
              <span>from<span>$<b>{props.price}</b>/h</span></span>
            </div>
          </div>

          <div className='Car2'>
            {description.map((value, index) => (
              <p key={index}><span><AiOutlineCheck /></span>{value}</p>
            ))}
          </div>

          <div className='Car3'>
            <button>+ BOOK NOW</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Carcatogorie