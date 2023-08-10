import React, { useState, useEffect } from 'react'
import './aboutus.scss'
import Navbar from '../Navbar/Navbar'
import UpNov from '../Navbar/UpNov'
import ImageCom from '../Imagecompanents/ImageCom'


const AboutUs = () => {

  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    const scrolled = window.screenY;
    if (scrolled > 70) {
      setIsVisible(true)
    }
    else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <>
      <div>
        <Navbar />
          <ImageCom img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/inner-ab-img-1.jpg"} />

      </div>
    </>
  )
}

export default AboutUs