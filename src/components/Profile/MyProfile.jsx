import React, { useState } from 'react'
import "./MyProfile.scss";
import Navbar from "../Navbar/Navbar";
import MyReserv from './MyReserv';
import { getReservation } from "../Services/reservationService";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from 'axios';

const MyProfile = () => {
    
    const queryClient = useQueryClient();

    const { appuserid ,username, email } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { data: Reservation } = useQuery({
        queryKey: ["getReservation", appuserid], 
        queryFn: () => getReservation(appuserid), 
        staleTime: 0,
    });

    const [image, setImage] = useState(null);


    const fileUploadHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };


    const formik = useFormik({
        initialValues: {
            Email: email ? email : "",
            ImageFile: "",
      
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append('Email', email ? email : "");
            formData.append("ImageFile", image);
           

            const response = await axios.post('https://localhost:7152/api/Auth/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                queryClient.invalidateQueries('getReservation');
            }
        },
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
                                <form>
                                    <input type='file' onChange={(e) => fileUploadHandler(e)} />
                                    <button id='EditImage'>Edit Image</button>
                                </form>
                            </div>
                            <div className='DeatilsProfil'>
                                <div className='DeatilsProfilUP'>
                                    <p><img src='data:image/png;base64,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' /></p>
                                    <p className='ttt'>...</p>
                                </div>
                                <div className='Detailsss'>
                                    <div>
                                        <h1>{username}</h1>
                                        <h1>{email}</h1>
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
                                    <MyReserv key={index} Id={reserv?.reservCar?.id} status={reserv.status} marka={reserv?.reservCar?.marka} model={reserv?.reservCar?.model} remainingTime={reserv?.pickupDate} />
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



