import React, { useState } from 'react'
import "./MyProfile.scss";
import Navbar from "../Navbar/Navbar";
import MyReserv from './MyReserv';
import { getReservation } from "../Services/reservationService";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from 'axios';

const MyProfile = () => {

    const queryClient = useQueryClient();

    const { appuserid, username, email, ProfileImage } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { data: Reservation } = useQuery({
        queryKey: ["getReservation", appuserid],
        queryFn: () => getReservation(appuserid),
        staleTime: 0,
    });


    // const [Useremail, setEmail] = useState(""); // Eğer email'i başka bir yerden alıyorsanız, başlangıç değerini ayarlamalısınız.
    const [image, setImage] = useState(null);

    const fileUploadHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const formik = useFormik({
        initialValues: {
            Email: email ? email : '',
            ImageFile: "",
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('Email', email ? email : '');
            formData.append('ImageFile', image);

            try {
                const response = await axios.post('https://localhost:7152/api/Auth/profile-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                }
            } catch (error) {
                console.error(error);
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
                                <form onSubmit={formik.handleSubmit}>
                                    <input
                                        type='file'
                                        onChange={(e) => fileUploadHandler(e)}
                                    />
                                    <button id='EditImage' type='submit'>Profil Resmini Güncelle</button>
                                </form>
                            </div>
                            <div className='DeatilsProfil'>
                                <div className='DeatilsProfilUP'>
                                    <p>   {ProfileImage !== null &&
                                        <img src={`data:image/png;base64,${ProfileImage}`} />
                                    }
                                        {ProfileImage === null &&
                                            <img src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/04/Limo_open_graph.png' />
                                        }
                                    </p>
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



