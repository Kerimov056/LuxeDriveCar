import React from 'react'
import './footer.scss'
import { CiLocationOn } from "react-icons/ci"
import { SlEarphonesAlt } from "react-icons/sl"
import { SiSpeedtest } from "react-icons/si"
import LargeWithLogoLeft from './LargeWithLogoLeft'

const Footer = () => {
  return (
    <>
      <div className='footer' >
        <div>

          <div>
            <span><CiLocationOn /></span>
            <div>
              <h2>11 Rue de la Mutualité</h2>
              <h2>92400 Paris</h2>
            </div>
          </div>

          <div>
            <span><SlEarphonesAlt /></span>
            <div>
              <h2>Phone: (012) 364 324 34 43</h2>
              <h2>Email: luxe@gmail.com</h2>
            </div>
          </div>

          <div>
            <span><SiSpeedtest /></span>
            <div>
              <h2>Mon-Sat 09:00-23:00;</h2>
              <h2>Sunday is closed.</h2>
            </div>
          </div>

        </div>
      </div>

      <div className='Footertwo'>
        <LargeWithLogoLeft />
      </div>

      <div id='FE'>
        <div>
          <p>© 2023 Qode Interactive, All Rights Reserved</p>
        </div>
      </div>
    </>
  )
}

export default Footer