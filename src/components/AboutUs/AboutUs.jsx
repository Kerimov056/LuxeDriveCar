import React from 'react'
import './aboutus.scss'
import Navbar from '../Navbar/Navbar'
import ImageCom from '../Imagecompanents/ImageCom'
import Destinations from '../Destinations/Destinations'


const AboutUs = () => {

  return (
    <>
      <div>
        <Navbar />
        <ImageCom img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/inner-ab-img-1.jpg"} />
        <Destinations name={"We Value Our Clients And  Want Them To Have A Nice Experience"} topic={"FINEST TRANSPORT"} isAnswer={true} isHuman={false} color={"white"} />

      </div>
    </>
  )
}

export default AboutUs