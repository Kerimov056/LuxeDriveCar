import React, { useEffect } from 'react'
import './aboutus.scss'
import Navbar from '../Navbar/Navbar'
import ImageCom from '../Imagecompanents/ImageCom'
import Destinations from '../Destinations/Destinations'
import Imagecompanents from '../Imagecompanents/Imagecompanents'
import Aboutcard from '../Card/Aboutcard'
import Car from '../Card/Car'
import AOS from "aos";
import "aos/dist/aos.css";
import Questions from '../Questions/Questions'
import Premiumcars from '../PremiumCars/Premiumcars'
import { useQuery } from 'react-query'
import { getCar } from "../Services/carServices";


const AboutUs = () => {


  const { data: cars } = useQuery({
    queryKey: ["Cars"],
    queryFn: getCar,
    staleTime: 0,
  });


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
                  {cars?.data.map((byCar, index) => (
                    <Car key={index} img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Vihecle-list-image-04.jpg"} name={byCar.marka} desc={byCar.description.slice(0,30)} price={byCar.price} />
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
              <h1>We Care About Your Comfort And Safety</h1>
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
                <h1>Frequently Asked Questions</h1>
                <h3>LIST OF ANSWERS</h3>
              </div>
            </div>

            <div style={{ marginTop: "-100px" }} className='ByQuestions'>
              <p></p>
              <div>

                <Questions />

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