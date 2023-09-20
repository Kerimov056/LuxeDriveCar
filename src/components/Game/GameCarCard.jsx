import React, { useEffect, useState } from 'react';
import './GameCarCard.scss'
import CarCard from "./CarCard";
import { Button, Input } from '@chakra-ui/react';
import { IoCarSportOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GameCarCard = () => {

    const { appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const [carData, setCarData] = useState(null);
    const [carDataView, setCarDataView] = useState(null);
    const [carQrDataView, setQrCarDataView] = useState(null);
    const [viewHandler, setViewHandler] = useState(false);
    const [viewQrHandler, setViewQrHandler] = useState(false);
    const [password, setPassword] = useState('');



    const gameCarQuityPasswordError = () => {
        toast.success(`The password you entered is incorrect`, {
            position: toast.POSITION.TOP_CENTER
        });
    };
    const notifyError = () => toast.error(`Error updating`);


    useEffect(() => {
        if (password !== '') {
            setViewQrHandler(true);
            for (let i = 0; i < carData.length; i++) {
                const car = carData[i];
                const modifiedId = car.id.replace(/-/g, '');
                if (modifiedId === password) {
                    setQrCarDataView(car);
                    break;
                }
                else {
                    gameCarQuityPasswordError();
                    notifyError()
                }
            }
        }
    }, [password]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://localhost:7152/api/Car/GameGetTenAsync');
                const data = await response.json();
                setCarData(data);
                setCarDataView(data);
                setQrCarDataView(data);
            } catch (error) {
            }
        }

        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            AppUserId: appuserid,
            CarId: carDataView?.id ? carDataView?.id : '',
            Password: password != null && password,
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append('AppUserId', appuserid ? appuserid : '');
            formData.append("CarId", carDataView?.id ? carDataView?.id : '');
            formData.append("Password", password ? password : '');

            // console.log(formData.getAll("AppUserId"));
            // console.log(formData.getAll("CarId"));
            // console.log(formData.getAll("Password"));

            const response = await axios.post('https://localhost:7152/api/GameCars', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 201) {
                queryClient.invalidateQueries('Car');
            }
        },
    });


    const CarOption = (Id) => {
        for (let i = 0; i < carData.length; i++) {
            const car = carData[i];
            if (car.id === Id) {
                setCarDataView(car);
                setViewHandler(true);
                break;
            }
        }
    }

    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        formik.handleSubmit();
        setLoading(true);

        // Buraya yükleme işlemlerini ekleyebilirsiniz.

        // Örnek olarak, 2 saniye bekleyip sonra loading durumunu sıfırlıyoruz.
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    };

    return (
        <>
            <div id='GameCarCard'>
                <div>
                    <div className='GameText'>
                        <h1>CarQuest</h1>
                        <div>
                            <h2>1{")"} Welcome! Take the first step to start our car booking game. 10 different vehicle cards are waiting for you!</h2>
                            <h2>2{")"} Vehicle cards we selected specially for you! Which one will be your favorite?</h2>
                            <h2>3{")"} We chose 10 different vehicles for you. Now it's your turn! Choose which vehicle suits you best!</h2>
                            <h2>4{")"} Choose one of these 10 vehicles. Which one will be your companion?</h2>
                        </div>
                    </div>
                    {viewHandler === true &&
                        <div id='ByOptionCar'>
                            <h1>The car you choose</h1>
                            <CarCard
                                Id={carDataView?.id}
                                // img={carDataView?.carImages[0] ? carDataView?.carImages[0]?.imagePath : null}
                                marka={carDataView?.marka}
                                model={carDataView?.model}
                                year={carDataView?.year}
                                testFunction={() => CarOption(carDataView?.id)}
                            />
                        </div>
                    }
                    {viewHandler === false &&
                        <div className='GameCarCards'>
                            <div className='GameCarCard_Card4'>
                                {carDataView?.length > 1 && carDataView?.slice(0, 4).map((byCar, index) => (
                                    <CarCard
                                        key={index}
                                        Id={byCar?.id}
                                        img={byCar?.carImages[0]?.imagePath}
                                        marka={byCar?.marka}
                                        model={byCar?.model}
                                        year={byCar?.year}
                                        testFunction={() => CarOption(byCar?.id)} />
                                ))}
                            </div>
                            <div className='GameCarCard_Card3'>
                                {carDataView?.length > 1 && carDataView?.slice(4, 7).map((byCar, index) => (
                                    <CarCard
                                        key={index}
                                        Id={byCar?.id}
                                        img={byCar?.carImages[0]?.imagePath}
                                        marka={byCar?.marka}
                                        model={byCar?.model}
                                        year={byCar?.year}
                                        testFunction={() => CarOption(byCar?.id)} />
                                ))}
                            </div>
                            <div className='GameCarCard_Card2'>
                                {carDataView?.length > 1 && carDataView?.slice(7, 9).map((byCar, index) => (
                                    <CarCard
                                        key={index}
                                        Id={byCar?.id}
                                        img={byCar?.carImages[0]?.imagePath}
                                        marka={byCar?.marka}
                                        model={byCar?.model}
                                        year={byCar?.year}
                                        testFunction={() => CarOption(byCar?.id)} />
                                ))}
                            </div>
                            <div className='GameCarCard_Card1'>
                                {carDataView?.length > 1 && carDataView?.slice(9, 10).map((byCar, index) => (
                                    <CarCard
                                        key={index}
                                        Id={byCar?.id}
                                        img={byCar?.carImages[0]?.imagePath}
                                        marka={byCar?.marka}
                                        model={byCar?.model}
                                        year={byCar?.year}
                                        testFunction={() => CarOption(byCar?.id)} />
                                ))}
                            </div>
                        </div>
                    }

                    <div style={{ marginTop: "0px" }} className='FormGameCar'>
                        <label>Enter the password of the QR code you scanned here.</label>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <Input
                                    placeholder='Gr password'
                                    values={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <Button onClick={handleClick} >
                                    <IoCarSportOutline />
                                </Button>
                            </div>
                        </form>
                    </div>
                    <>
                        {loading ? 'Loading...' : 'Click Me'}
                    </>
                    <div style={{ marginTop: "-130px" }} className='GameText'>
                        <div>
                            <h2>5{")"} 10 different QR codes for the vehicle you choose are waiting for you. Find the right one and enjoy 70% discount!</h2>
                            <h2>6{")"} Let's see how well you know your luck. 10 different QR codes, only one will connect you with a discount!</h2>
                            <h2>7{")"} Now it's time to find the right path! The QR code of the vehicle we have chosen specifically for you is among these 10 cards. Are you ready?</h2>
                        </div>
                    </div>

                    {viewQrHandler === true &&
                        <div style={{ marginTop: "-130px", marginBottom: "100px" }}>
                            <img style={{ width: "250px", height: "254px", borderRadius: "1rem" }} src={carQrDataView?.imageSrc} />
                        </div>
                    }

                    {viewQrHandler === false && viewHandler === true &&
                        <div className='GameCarCards'>
                            <div style={{ marginTop: "100px" }} className='GameCarCard_Card4'>
                                {carQrDataView?.slice(0, 4).map((byCar, index) => (
                                    <img key={index} style={{ width: "250px", height: "254px", borderRadius: "1rem" }} src={byCar?.imageSrc} />
                                ))}
                            </div>
                            <div className='GameCarCard_Card3'>
                                {carQrDataView?.slice(4, 7).map((byCar, index) => (
                                    <img key={index} style={{ width: "250px", height: "254px", borderRadius: "1rem" }} src={byCar?.imageSrc} />
                                ))}
                            </div>
                            <div className='GameCarCard_Card2'>
                                {carQrDataView?.slice(7, 9).map((byCar, index) => (
                                    <img key={index} style={{ width: "250px", height: "254px", borderRadius: "1rem" }} src={byCar?.imageSrc} />
                                ))}
                            </div>
                            <div className='GameCarCard_Card1'>
                                {carQrDataView?.slice(9, 10).map((byCar, index) => (
                                    <img key={index} style={{ width: "250px", height: "254px", borderRadius: "1rem" }} src={byCar?.imageSrc} />
                                ))}
                            </div>
                        </div>}

                </div>
            </div>
        </>
    )
}

export default GameCarCard