import React from 'react'
import './aboutus.scss'
import Navbar from '../Navbar/Navbar'
import ImageCom from '../Imagecompanents/ImageCom'
import Destinations from '../Destinations/Destinations'
import Imagecompanents from '../Imagecompanents/Imagecompanents'
import Aboutcard from '../Card/Aboutcard'
import Car from '../Card/Car'


const AboutUs = () => {

  return (
    <>
      <div>
        <Navbar />
        <ImageCom img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/inner-ab-img-1.jpg"} />
        <Destinations name={"We Value Our Clients And  Want Them To Have A Nice Experience"} topic={"FINEST TRANSPORT"} isAnswer={true} isHuman={false} color={"white"} />
        <Imagecompanents img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-8.jpg"} />
        <div className='CarCards'>
          <div>
            <div className='CatalogName'>
              <h1>Luxury Limousine for Maximum Satisfaction. Enjoy.</h1>
              <h3>ENJOY THE RIDE</h3>
            </div>

            <div id='HomeAbout'>
              <div class="container">
                <div class="faders">
                  <div class="left"></div>
                  <div class="right"></div>
                </div>

                <div class="items">
                    <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-04.jpg"} name={"Ferrari 365 Daytona"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={180} />
                    <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-03.jpg"} name={"Range Rover Evoque"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={190} />
                    <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-01.jpg"} name={"Roll Royce Ghots 3"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={220} />
                    <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-02.jpg"} name={"Porce Taycan Sport"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={110} />
                    <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-04.jpg"} name={"Ferrari 365 Daytona"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={180} />
                    <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-03.jpg"} name={"Range Rover Evoque"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={190} />
                    <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-01.jpg"} name={"Roll Royce Ghots 3"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={220} />
                    <Car img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-02.jpg"} name={"Porce Taycan Sport"} desc={"Lorem ipsum dolor sit do amet, elit sed, adipiscing "} price={110} />
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>
    </>
  )
}

export default AboutUs