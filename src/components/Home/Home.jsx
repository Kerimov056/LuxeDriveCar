import React, { useState, useEffect } from 'react'
import './home.scss'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsTelephoneX } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { MdLocationPin } from 'react-icons/md'
import { RxVideo } from 'react-icons/rx'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { FiSearch } from 'react-icons/fi'
import Card from '../Card/Card'
import Aboutcard from '../Card/Aboutcard'
import Sliderimg from '../Slider/Sliderimg';
import Destinations from '../Destinations/Destinations'
import Premiumcars from '../PremiumCars/Premiumcars'
import Imagecompanents from '../Imagecompanents/Imagecompanents';
import Navbartwo from '../Navbar/Navbartwo';
import Nav from '../Navbar/Nav'
import { useSelector } from "react-redux";
import axios from 'axios';
import Modal from 'react-modal';
import { AiFillCloseCircle } from "react-icons/ai";


import {
  Button,
  Input,
  useDisclosure,
  AspectRatio,
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
import { getCarAll, IsCampaigns } from "../Services/carServices";
import img from "./CongratulationsCar.jpg";

const customStyles = {
  content: {
    top: '52%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const CountdownTimer = ({ targetDate }) => {
  const [countdown, setCountdown] = useState('');

  const [days, setDays] = useState('');


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setCountdown('Discounts Have Started');
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown(`${days} day ${hours} hour ${minutes} minute ${seconds} second`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <div>{countdown}</div>;
};



const Home = ({ color, onNavStateChange }) => {


  const { data: cars } = useQuery({
    queryKey: ["Cars"],
    queryFn: getCarAll,
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


  const { data: Compn } = useQuery({
    queryKey: ["IsCampaignss"],
    queryFn: IsCampaigns,
    staleTime: 0,
  });

  const [compaignData, setCompaignData] = useState(null);

  useEffect(() => {
    const fetchAllCompaign = async () => {
      try {
        const response = await fetch('https://localhost:7152/api/Car/GetAll-CompaignAsync');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCompaignData(data);
      } catch (error) {
      }
    };

    fetchAllCompaign();
  }, []);


  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7152/api/Sliders')
      .then(response => response.json())
      .then(data => setSliders(data))
      .catch(error => console.error('Error:', error));
  }, []);



  const [searchCity, setSearchCity] = useState('');
  // const [cityBounds, setCityBounds] = useState(null);

  const handleInputChange = (e) => {
    setSearchCity(e.target.value);
  };

  // const handleButtonClick = () => {
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity}&key=${Google_Maps_Api_Key}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setSearchCity(data.results[0].geometry.location);
  //       setCityBounds(data.results[0].geometry.bounds);
  //       console.log(data);
  //     })
  //     .catch(error => console.error('Hata:', error));
  // };



  const { appuserid } = useSelector((x) => x.authReducer);


  const [oneUsing, setOneUsing] = useState(false);
  const [carGameAccess, setCarGameAccess] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    axios.get(`https://localhost:7152/api/GameCars/GetByGameAccess?AppUserId=${appuserid}`)
      .then(response => {
        setCarGameAccess(response?.data);
        if (response?.data === false) {
          setOneUsing(true);
        }
      })
      .catch(error => {
      })
      .finally(() => {
        axios.get(`https://localhost:7152/api/CarReservations/CarFindGameUserAccess?AppUserId=${appuserid}`)
          .then(response => {
            setCarGameAccess(response?.data);
            if (response?.data === true) {
              if (oneUsing === true) {
                setShowModal(true);
              }
            }
          })
          .catch(error => {
          });
      });
  }, [appuserid, oneUsing]); 


  const [gameEnter, setGameEnter] = useState(false);

  function closeModal() {
    setShowModal(false);
    setGameEnter(true);
  }
  function gameEnterAccess() {
    setGameEnter(true);
    setShowModal(false)
  }

  return (
    <>

      {showModal === true &&
        <Modal
          isOpen={showModal}
          // onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className='TrueAccess'>
            <div className='onCloceSuc'>
              <h1><AiFillCloseCircle onClick={closeModal} /></h1>
            </div>
            <div className='GameToTrueAcces'>
              <h1>Congratulations</h1>
              <h2>Since you have successfully booked a car with us 3 times, we offer you the chance to win a 60% discount.</h2>
              <h2>To get a chance to win 60% off, click on the image below and go to the page.</h2>
              <Link to={`/GameCarCard/${appuserid}`}>
                <img onClick={gameEnterAccess} style={{ width: "400px", height: "300px", objectFit: "contain" }} src={img} />
              </Link>
            </div>
          </div>
        </Modal>
      }


      <div className={isVisible ? 'navbar' : 'navbar hidden'}>
        <Nav />
      </div>
      {Compn?.data === true &&
        <div id='Compahins'>
          {compaignData !== null &&

            <div class="container" >
              <h1 id="headline">Now up to {compaignData[0]?.campaignsInterest ? compaignData[0]?.campaignsInterest : ''}% discounts at LuxeDrive</h1>
              <div id="countdown">
                <ul>
                  <li><span id="days"><CountdownTimer targetDate={new Date(compaignData[0]?.returnCampaigns ? compaignData[0]?.returnCampaigns : '')} /></span></li>
                </ul>
              </div>
              <div id="content" class="emoji">
              </div>
            </div>

          }
          <div class="cloader">
            <div class="clface">
              <div class="clsface">
                <div id="h2" class="hand"></div>
              </div>
              <div class="top"></div>
              <div class="bottom"></div>
              <div class="left"></div>
              <div class="right"></div>
              <div id="sub" class="pin"></div>
              <div id="h1" class="hand"></div>
              <div id="main" class="pin"></div>
            </div>
          </div>
        </div>
      }

      <div className='home'>
        <Slider {...settings} className='sliderrr'>
          {sliders?.map((sliderimg, index) => (
            <div key={index}>
              <div>
                <img style={{ width: "100%", height: "99vh", objectFit: 'cover' }} src={`data:image/jpeg;base64,${sliderimg?.imagePath}`} alt="Slide 1" />
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
              <div id='ReseNu' className='ReservationForm'>
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
      </div >

      <div className='Experience'>
        <div className='Description'>
          <div className='resPhone'>
            <div>
              <h1 style={{ fontFamily: "'Times New Roman', Times, serif" }} className='ExIntoG'>
                What We Provide Is The Luxury Transport And Most Comfortable Experience
              </h1>
            </div>
            <div>
              <p className='ExInto'>Vivamus arcu felis bibendum ut tristique et egestas. Ultricies leo intege in malesuada nunc vel risus commodo. Sapien nec sagittis aliquam male bibendum arcu vitae. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Fringilla est ullamcorper eget nulla facilisi nul.</p>
              <div>
                <span id='Center'><TfiHeadphoneAlt /></span>
                <span className='CallRes'>CALL CENTER: +994 51 385 07 07</span>
              </div>
            </div>
          </div>
        </div>
        <div className='cards' id='CardsRes'>
          {cars?.data?.slice(0, 6).map((byCar, index) => (
            <Card
              key={index}
              isCampaigns={byCar?.isCampaigns}
              campaignsInterest={byCar?.campaignsInterest}
              campaignsPrice={byCar?.campaignsPrice}
              Id={byCar?.id}
              img={`data:image/jpeg;base64,${byCar.carImages[0]?.imagePath}`}
              catagorie={byCar.carCategory ? byCar.carCategory.category : "No Category"}
              name={byCar.model}
              price={byCar.price}
              description={byCar.description.slice(0, 60)} />
          ))}
        </div>
        <div className='FindCityCar'>
          <div><h1 style={{color:'white'}}>Find your car by country</h1></div>
          <div className='inputCountryHome'>
            <Input style={{color:'white'}} onChange={handleInputChange} placeholder='search...'></Input>
            <Button>
              <Link to={`/FindCarQuickly/${searchCity}`}>
                <FiSearch />
              </Link>
            </Button>
          </div>
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
            <h1 id='ConvenReserv'>We Care Of Your Safety <br /> And Convenience</h1>
            <h4>PREMIUM DRIVERS</h4>
            <p>Facilisi cras fermentum odio eu feugiat. In fermentum et sollicitudin ac ori accumsan sit amet nulla facilisi morbi tempus iaculis urna id. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae dipiscing</p>
            <button className='ReserButton'> + BOOK NOW </button>
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
          <h1 style={{ fontFamily: "'Times New Roman', Times, serif" }} id="resphSone">We trive to meet the needs <br />
            of our clients and we value their <br />
            opinions about our work</h1>
        </div>
        <div id='Homrespids' class="container">
          <div id='resPhone' class="faders">
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
              <h1 id='FontFamliyChange'>A High Variety Of Options</h1>
              <h3>BEST POSSIBILITIES</h3>
            </div>
          </div>

          <div id='Repsod'>
            <Carcatogorie img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-9.png"} catagorie={"Premium"} price={100} description={["Leo urna molestie at elem ", "Quisque non tellu si ", " Pretium lectus quam id li"]} />
            <Carcatogorie img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-10.png"} catagorie={"Super"} price={110} description={["Leo urna molestie at elem ", "Quisque non tellu si ", " Pretium lectus quam id li"]} />
            <Carcatogorie img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-11.png"} catagorie={"Luxury"} price={220} description={["Leo urna molestie at elem ", "Quisque non tellu si ", " Pretium lectus quam id li"]} />
            <Carcatogorie img={"https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/01/h1-img-12.png"} catagorie={"Business"} price={330} description={["Leo urna molestie at elem ", "Quisque non tellu si ", " Pretium lectus quam id li"]} />
          </div>

          <div id='asdad'></div>
        </div>
      </div>

      <div id='carimagP'>
        <img src='https://c4.wallpaperflare.com/wallpaper/493/256/10/2014-4-series-bmw-coupe-wallpaper-preview.jpg' />
      </div>
    </>
  )
}

export default Home