import React from 'react'
import "./MyProfile.scss";
import Navbar from "../Navbar/Navbar";
import MyReserv from './MyReserv';
import { getReservation } from "../Services/reservationService";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

const MyProfile = () => {
    
    const { appuserid ,username } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { data: Reservation } = useQuery({
        queryKey: ["getReservation", appuserid], 
        queryFn: () => getReservation(appuserid), 
        staleTime: 0,
    });


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='MyFrofile'>
                <div>
                    <div className='ProfileDetails'>
                        <div>
                            <div className='BackIamge'>
                                <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/04/Limo_open_graph.png' />
                            </div>
                            <div className='DeatilsProfil'>
                                <div className='DeatilsProfilUP'>
                                    <p><img src='https://cdn.dribbble.com/userupload/4095498/file/original-9d1e3625c6f08df5980d01ac7386590e.png?resize=1200x900' /></p>
                                    <p className='ttt'>...</p>
                                </div>
                                <div className='Detailsss'>
                                    <div>
                                        <h1>{username}</h1>
                                        <h1>{Reservation?.data[0].email}</h1>
                                        <h1>+994 51 324 43 43</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='PReserrvationsCars'>
                        <div>
                            <h1>Your Reservations</h1>
                            <hr />
                            <div>
                                {Reservation?.data?.map((reserv, index) => (
                                    <MyReserv key={index} status={reserv.status} marka={reserv?.reservCar?.marka} model={reserv?.reservCar?.model} remainingTime={reserv?.pickupDate} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile








// import React, { useState, useEffect } from 'react';
// import "./MyReserv.scss";

// const MyReserv = (props) => {
    // const [statusColor, setStatusColor] = useState();
    // const [status, setStatus] = useState();
//     const [pickupDate, setPickupDate] = useState(props.remainingTime);
//     const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

//     useEffect(() => {

//         const interval = setInterval(() => {
//             const pickupDateObject = new Date(pickupDate);

//             const currentDate = new Date();

//             const timeDifference = pickupDateObject - currentDate;

//             const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//             const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//             const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//             const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

//             setTimeLeft({ days, hours, minutes, seconds });

//             if (timeDifference < 0) {
//                 clearInterval(interval);
//                 setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//             }
//         }, 1000);


//         return () => clearInterval(interval);
//     }, [pickupDate]);

//     if (props.status === 0) {
//         setStatusColor("#fcad00");
//         setStatus("Pending")
//     } else if (props.status === 1) {
//         setStatusColor("#0dfc00");
//         setStatus("green")
//     } else if (props.status === 3) {
//         setStatusColor();
//         setStatus("#0dfc00")
//     }


//     return (
//         <>
//             <div  class="cardMyReserv">
//                 <a class="card1" style={{ backgroundColor: "white" }} href="#">
//                     <p>{status}</ p>
//                     <p class="small">{props.marka} {props.model} </p>
//                     <p>
//                         {timeLeft.days > 0 && (
//                             <p>Kalan süre: {timeLeft.days} gün {timeLeft.hours} saat {timeLeft.minutes} dakika {timeLeft.seconds} saniye</p>
//                         )}
//                         {timeLeft.days === 0 && (
//                             <p>Kalan süre: {timeLeft.hours} saat {timeLeft.minutes} dakika {timeLeft.seconds} saniye</p>
//                         )}
//                     </p>
//                     <div class="go-corner" href="#">
//                         <div class="go-arrow">
//                             →
//                         </div>
//                     </div>
//                 </a>
//             </div>
//         </>
//     )
// }

// export default MyReserv