import React, { useState, useEffect } from 'react'
import './aboutus.scss'
import Navbar from '../Navbar/Navbar'
import ImageCom from '../Imagecompanents/ImageCom'
import Destinations from '../Destinations/Destinations'
import Imagecompanents from '../Imagecompanents/Imagecompanents'
import Aboutcard from '../Card/Aboutcard'
import Car from '../Card/Car'
import AOS from "aos";
import "aos/dist/aos.css";
import Premiumcars from '../PremiumCars/Premiumcars'
import Navbartwo from '../Navbar/Navbartwo'


const AboutUs = () => {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7152/api/Car')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error:', error));
  }, []);


  useEffect(() => {
    AOS.init({
      offset: 630,
      duration: 800,
      delay: 260,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <div>
        <div className='ReponsiveNav'>
          <Navbar />
        </div>
        <div className='DisplayNavbar'>
          <Navbartwo />
        </div>

        <ImageCom img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/inner-ab-img-1.jpg"} />
        <Destinations name={"We Value Our Clients And  Want Them To Have A Nice Experience"} topic={"FINEST TRANSPORT"} isAnswer={true} isHuman={false} color={"white"} />
        <Imagecompanents img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-8.jpg"} />
        <div className='CarCards'>
          <div>
            <div className='CatalogName'>
              <h1 style={{fontFamily:"'Times New Roman', Times, serif"}} >Luxury Limousine for Maximum Satisfaction. Enjoy.</h1>
              <h3>ENJOY THE RIDE</h3>
            </div>

            <div id='HomeAbout'>
              <div class="container">
                <div id='feaderss' class="faders">
                  <div id='feaderss' class="left"></div>
                  <div id='feaderss' class="right"></div>
                </div>

                <div id='itemRes' class="items">
                  {cars?.map((byCar, index) => (
                    <Car
                      Id={byCar?.id}
                      key={index}
                      img={`data:image/jpeg;base64,${byCar?.carImages[0]?.imagePath}`}
                      name={byCar?.marka}
                      desc={byCar?.description.slice(0, 30)}
                      price={byCar?.price}
                      campaignsPrice={byCar?.campaignsPrice}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='Safety'>
          <div><img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/inner-ab-img-2.jpg' /></div>
          <div className='left'>
            <div>
              <h1 id='FontFamliyChange' >We Care About Your Comfort And Safety</h1>
              <h3>BEST DRIVERS</h3>
              <p>Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Netus et sed malesuada fames ac turpis. Netus et sed males ada fames ac turpis egesta doi tempus urna. Amet nulla facilisi morbi temp do.</p>
              <button>+ VIEW MORE</button>
            </div>
          </div>
        </div>


        <div id='Accordions'>
          <div>

            <div style={{ marginBottom: "1px solid gray" }} className='Questions'>
              <div>
                <h1 id='FontFamliyChange'>Frequently Asked Questions</h1>
                <h3>LIST OF ANSWERS</h3>
              </div>
            </div>

          </div>
        </div>

        <div className='ThreeImg'>
          <div>
            <img className='oneImg' src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/inner-faq-img-1.2.jpg' />
            <img className='TwoImg' src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/inner-faq-img-2.jpg' />
            <img className='TrhreImg' src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/inner-faq-img-3.jpg' />
          </div>
        </div>


        <div className='PC'>
          <Premiumcars about={true} backColor={"white"} one={2} two={1} NumColor={"black"} imgUrl={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/inner-ab-img-3.jpg"} />
        </div>

      </div>
    </>
  )
}

export default AboutUs