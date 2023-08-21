import React, { useState, useEffect, useRef } from 'react'
import './home.scss'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsTelephoneX } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'
import { RxVideo } from 'react-icons/rx'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { Button, Input, useDisclosure, AspectRatio } from '@chakra-ui/react';
import Card from '../Card/Card'
import Aboutcard from '../Card/Aboutcard'
import Sliderimg from '../Slider/Sliderimg';
import Destinations from '../Destinations/Destinations'
import Premiumcars from '../PremiumCars/Premiumcars'
import Imagecompanents from '../Imagecompanents/Imagecompanents';
import Navbartwo from '../Navbar/Navbartwo';
import Navbar from '../Navbar/Navbar';
import Nav from '../Navbar/Nav'


import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import Carcatogorie from '../CarCatogorie/Carcatogorie';
import { useQuery } from "react-query";
import { getSlider } from "../Services/sliderServices";
import { getCar } from "../Services/carServices";


const Home = ({ color, onNavStateChange }) => {


  const { data: cars } = useQuery({
    queryKey: ["Cars"],
    queryFn: getCar,
    staleTime: 0,
  });

  const bcolor = () => {
    const BColor = "black";
    color = BColor;
    onNavStateChange(BColor);
  }


  const [isVisible, setIsVisible] = useState(true);

  const [star, setStar] = useState(3);

  const currentDate = new Date().toISOString().slice(0, 16);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  // Geçmiş tarihleri seçmeyi engellemek için işlev
  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    const now = new Date();

    // Seçilen tarih geçmişte ise güncelleme yapma
    if (selected < now) {
      return;
    }

    setSelectedDate(e.target.value);
  };


  const handleScroll = () => {
    const scrolled = window.scrollY;
    if (scrolled > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1,
    fade: true,
  };


  const { sliders } = useQuery({
    queryKey: ["Faqs"],
    queryFn: getSlider,
    staleTime: 0,
  });


  return (
    <>
      <div className={isVisible ? 'navbar' : 'navbar hidden'}>
        <Nav />
      </div>

      <div className='home'>
        <Slider {...settings} className='sliderrr'>
          {sliders?.data.map((carImages, index) => (
            <div key={index}>
              <div>
                <img src="https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/04/h1-rev-img-1b.jpg" alt="Slide 1" />
              </div>
              <div>
                <img src="https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/04/h1-rev-img-2b.jpg" alt="Slide 2" />
              </div>
              <div>
                <img src="https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/04/h1-rev-img-3b.jpg" alt="Slide 3" />
              </div>
              <div>
                <img src="https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/04/h1-rev-img-4b.jpg" alt="Slide 4" />
              </div>
              <div>
                <img style={{ width: "100%", height: "99vh", objectFit: 'cover' }} src="https://i.ytimg.com/vi/D6B6A1SF14o/maxresdefault.jpg" alt="Slide 5" />
              </div>
            </div>
          ))}
        </Slider>

        <div className="fixed-div">
          <div className='Navbar'>
            <div>
              <div className='first'>
                <div id='LUXEDRIVE'>LUXEDRIVE</div>
                <div className='right'>

                  <div className='telefon'>
                    <div><BsTelephoneX /></div>
                    <div>
                      +994 051 385 07 07 <br />
                      +994 077 332 43 18
                    </div>
                  </div>

                  <div className='line'></div>

                  <div className='location'>
                    <div><MdLocationPin /></div>
                    <div>
                      +994 051 385 07 07 <br />
                      +994 077 332 43 18
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className='DropMenu'>
            <Navbartwo />
          </div>

          <div className='LuxCar'>
            <div>
              <div className='Luxury'>
                <h1>Need to Rent a Luxury Car? <br /> Send A Request</h1>
                <h6>Complete the form below and we'll contact you as soon as possible</h6>
              </div>
              <div className='ReservationForm'>
                <input placeholder='Choose location' />
                <Input
                  placeholder="Select Date and Time"
                  size="2md"
                  type="datetime-local"
                  value={selectedDate}
                  onChange={handleDateChange}
                  style={{
                    borderTop: "none",
                    borderRight: "none",
                    borderLeft: "none",
                    borderBottom: "1px solid white",
                  }}
                />
                <input placeholder='Drop off location' />
                <button type='submit'>+ SEND</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className='Experience'>
        <div className='Description'>
          <div>
            <div>
              <h1>
                What We Provide Is The Luxury Transport And Most Comfortable Experience
              </h1>
            </div>
            <div>
              <p>Vivamus arcu felis bibendum ut tristique et egestas. Ultricies leo intege in malesuada nunc vel risus commodo. Sapien nec sagittis aliquam male bibendum arcu vitae. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Fringilla est ullamcorper eget nulla facilisi nul.</p>
              <div>
                <span id='Center'><TfiHeadphoneAlt /></span>
                <span>CALL CENTER: +994 51 385 07 07</span>
              </div>
            </div>
          </div>
        </div>
        <div className='cards'>
          {cars?.data.map((byCar, index) => (
            <Card key={index} img='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/Main-home-vehicle-list-img-01.jpg' catagorie={byCar.category} name={byCar.model} price={byCar.price} description={byCar.description} />
          ))}
        </div>
      </div>


      <div id='DestinationsS'>
        <p id='hrrrr'></p>
        <Destinations name={"Ride To Destinations With Maximum Comfort"} topic={"FINEST TRANSPORT"} isAnswer={true} isHuman={false} />

        <div className='FotoVideo'>
          <div>
            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-2.jpg' />
            <div className='text-Foto'>
              <button class="btn">
                <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" class="sparkle">
                  <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                </svg>
                <span class="text">Video</span>
                <Button onClick={onOpen}><RxVideo /></Button>
                <AlertDialog
                  motionPreset='slideInBottom'
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                  isOpen={isOpen}
                  isCentered>
                  <AlertDialogOverlay />
                  <AlertDialogContent>
                    <AlertDialogHeader>LuxeDrive Video</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>

                      <AspectRatio width={"400px"} ratio={1}>
                        <iframe
                          title='naruto'
                          src='https://player.vimeo.com/video/369339680?_ga=2.44487716.1074102575.1691437737-1187568908.1689721767?autoplay=1'
                          allowFullScreen
                        />
                      </AspectRatio>

                    </AlertDialogBody>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id='Convenience'>
        <div>
          <div className='ConvenienceLeft'>
            <h1>We Care Of Your Safety <br /> And Convenience</h1>
            <h4>PREMIUM DRIVERS</h4>
            <p>Facilisi cras fermentum odio eu feugiat. In fermentum et sollicitudin ac ori accumsan sit amet nulla facilisi morbi tempus iaculis urna id. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae dipiscing</p>
            <button> + BOOK NOW </button>
          </div>
          <div className='ConvenienceRight'>
            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-3.jpg' />
            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-4.jpg' />
          </div>
        </div>
      </div>


      <div className='SLIDER'>
        <Sliderimg img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-5.jpg"} name={'Do You Need To Rent A Car? See Our Offers'} />
      </div>

      <div id='Chauffeurs'>
        <Destinations name={"Our Proffesional Chauffeurs"} topic={"MEET OUR TEAM"} isAnswer={false} isHuman={true} />
      </div>

      <div className='Premium '>
        <Premiumcars about={false} backColor={"black"} one={1} two={2} NumColor={"white"} imgUrl={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-6.jpg"} />
      </div>

      <div id='HomeAbout'>
        <div className='opinions'>
          <h1>We trive to meet the needs <br />
            of our clients and we value their <br />
            opinions about our work</h1>
        </div>
        <div class="container">
          <div class="faders">
            <div class="left"></div>
            <div class="right"></div>
          </div>

          <div class="items">
            <Aboutcard name={"Clean & Comfortable"} setStar={setStar} description={"In hac habitasse platea dictu imst vesti ulumon rhoncus est pellentesqu ini ultriceso in iaculis nunc sed augue lac imperdiet dui accumsan sit a. "} catgorie={"Eloin Malone	"} />
            <Aboutcard name={"Smooth Car Transport"} setStar={setStar} description={"In hac habitasse platea dictu imst vesti ulumon rhoncus est pellentesqu ini ultriceso in iaculis nunc sed augue lac imperdiet dui accumsan sit a. "} catgorie={"Eloin Malone	"} />
            <Aboutcard name={"Smooth Car Transport"} setStar={setStar} description={"In hac habitasse platea dictu imst vesti ulumon rhoncus est pellentesqu ini ultriceso in iaculis nunc sed augue lac imperdiet dui accumsan sit a. "} catgorie={"Eloin Malone	"} />
          </div>
        </div>
      </div>


      <div className='ImageComPonents'>
        <Imagecompanents img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-8.jpg"} />
      </div>

      <div className='CarCatagoria'>
        <div>

          <div className='CarOptons'>
            <div>
              <h1>A High Variety Of Options</h1>
              <h3>BEST POSSIBILITIES</h3>
            </div>
          </div>

          <div>
            <Carcatogorie img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-9.png"} catagorie={"Premium"} price={100} description={["Leo urna molestie at elem ", "Quisque non tellu si ", " Pretium lectus quam id li"]} />
            <Carcatogorie img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-10.png"} catagorie={"Super"} price={110} description={["Leo urna molestie at elem ", "Quisque non tellu si ", " Pretium lectus quam id li"]} />
            <Carcatogorie img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-11.png"} catagorie={"Luxury"} price={220} description={["Leo urna molestie at elem ", "Quisque non tellu si ", " Pretium lectus quam id li"]} />
            <Carcatogorie img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-12.png"} catagorie={"Business"} price={330} description={["Leo urna molestie at elem ", "Quisque non tellu si ", " Pretium lectus quam id li"]} />
          </div>

          <div id='asdad'></div>
        </div>
      </div>

      <div id='carimagP'>
        <img src='https://scontent.fgyd18-1.fna.fbcdn.net/v/t39.30808-6/364685152_180820611680325_467963882875698557_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=xSkq4rXXrN8AX-Wz9Qn&_nc_ht=scontent.fgyd18-1.fna&oh=00_AfAwgnZQr296oFrMFZvVBvnSJ3WBUzKQXEk6lLZ9JEQ88Q&oe=64E7E96B' />
      </div>
    </>
  )
}

export default Home