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