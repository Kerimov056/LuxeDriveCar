import './basket.scss'
import Navbar from "../Navbar/Navbar";
import BasketCard from "./BasketCard";
import { getBasketCars } from "../Services/basketServices";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";
import {
    Input, Text,
    Button, FormControl
} from '@chakra-ui/react'
import reservationScheme from "../Validators/ReservationScheme";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Basket = () => {

    const { appuserid } = useSelector((x) => x.authReducer);
    const dispatch = useDispatch();

    const { data: basketCars } = useQuery({
        queryKey: ["Cars", appuserid],
        queryFn: () => getBasketCars(appuserid),
        staleTime: 0,
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate1, setSelectedDate1] = useState(null);

    useEffect(() => {
        reservFormik.setValues({
            ...reservFormik.values,
            PickupDate: selectedDate ? selectedDate : "",
            ReturnDate: selectedDate1 ? selectedDate1 : "",
        });
    }, [selectedDate, selectedDate1]);

    const handleDateChange = (e) => {
        const selected = new Date(e.target.value);
        const now = new Date();

        if (selected < now) {
            return;
        }
        setSelectedDate(e.target.value);
    };

    const handleDateChange1 = (e) => {
        const selected = new Date(e.target.value);
        if (selectedDate === null) {
            return;
        }
        if (selected < selectedDate) {
            return;
        }
        setSelectedDate1(e.target.value);
    };

    const [image, setImage] = useState(null);


    const fileUploadHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const reservFormik = useFormik({
        initialValues: {
            Image: null,
            FullName: "",
            Email: "",
            Number: "",
            Notes: "",
            AppUserId: appuserid,
            PickupDate: selectedDate ? selectedDate : "",
            ReturnDate: selectedDate1 ? selectedDate1 : "",
            PickupLocation: { Latitude: null, Longitude: null },
            ReturnLocation: { Latitude: null, Longitude: null },
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            console.log(values);

            formData.append('Image', image);
            formData.append("FullName", values.FullName);
            formData.append("Email", values.Email);
            formData.append("Number", values.Number);
            formData.append("Notes", values.Notes);
            formData.append("AppUserId", values.AppUserId);
            formData.append("PickupDate", values.PickupDate);
            formData.append("ReturnDate", values.ReturnDate);
            formData.append("PickupLocation.Latitude", '');
            formData.append("PickupLocation.Longitude", '');
            formData.append("ReturnLocation.Latitude", '');
            formData.append("ReturnLocation.Longitude", '');

            try {
                const response = await axios.post('https://localhost:7152/api/CarReservations/AllResev', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (response.status === 201) {
                    queryClient.invalidateQueries('getReservation');
                    toast.success("New Cars Reservation Success");
                    navigate('/MyProfile');
                }

            } catch (error) {
            }
        },
        validationSchema: reservationScheme
    });

    const currentDateTime = new Date().toISOString().slice(0, 16);

    return (
        <>
            <Navbar />
            <div className='basket'>
                <div>
                    <div className='Productss'>
                        <div className='TableStructur'>
                            <span>Car</span>
                            <span>Category</span>
                            <span>Price</span>
                            <span>X</span>
                            <span>Order</span>
                        </div>
                        <div>
                            {basketCars?.data !== null && basketCars?.data.map((bycars, index) => (
                                <BasketCard
                                    key={index}
                                    img={`data:image/jpeg;base64,${bycars?.carGetDTO?.carImages[0]?.imagePath}`}
                                    CommpainPrice={bycars?.carGetDTO?.campaignsPrice}
                                    Id={bycars?.carGetDTO?.id}
                                    Marka={bycars?.carGetDTO?.marka}
                                    model={bycars?.carGetDTO?.model}
                                    desc={bycars?.carGetDTO?.description.slice(0, 150)}
                                    category={bycars?.carGetDTO?.carCategory ? bycars?.carGetDTO?.carCategory?.category : "No Category"}
                                    price={bycars?.carGetDTO?.price}
                                />
                            ))}
                            {
                                basketCars?.data?.lenght === null || basketCars?.data.length === 0 && (
                                    <div Id='emptyBasket'>
                                        <h1>You have never ordered a car</h1>
                                        <div>
                                            <Link to={'/Shop'}><button class="Btn"></button></Link>
                                        </div>
                                    </div>
                                )}  {basketCars?.data?.length !== 0 && (
                                    <div className="paypal">
                                        {/* <div className='PaypalCarReserv'>Paypal</div> */}
                                        <div style={{marginLeft:"230px"}} className='BasketReservationCar'>
                                            <div className='ByReservACar'>

                                                <form className='login_form' onSubmit={reservFormik.handleSubmit} >
                                                    <FormControl>
                                                        <h3>Reservation A Car</h3>


                                                        <label htmlFor="password">Full Name</label>
                                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                                            {reservFormik.touched.FullName && reservFormik.errors.FullName}
                                                        </Text>
                                                        <Input
                                                            isInvalid={reservFormik.errors.FullName && reservFormik.touched.FullName}
                                                            name='FullName'
                                                            value={reservFormik.values.FullName}
                                                            onChange={reservFormik.handleChange}
                                                            placeholder='Here is a sample placeholder'
                                                            size='sm'
                                                        />

                                                        <label htmlFor="Image">Email</label>
                                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                                            {reservFormik.touched.Email && reservFormik.errors.Email}
                                                        </Text>
                                                        <Input
                                                            isInvalid={reservFormik.errors.Email && reservFormik.touched.Email}
                                                            type='email'
                                                            name='Email'
                                                            value={reservFormik.values.Email}
                                                            onChange={reservFormik.handleChange}
                                                            placeholder='Here is a sample placeholder'
                                                            size='sm'
                                                        />

                                                        <label htmlFor="password">Number</label>
                                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                                            {reservFormik.touched.Number && reservFormik.errors.Number}
                                                        </Text>
                                                        <Input
                                                            name='Number'
                                                            isInvalid={reservFormik.errors.Number && reservFormik.touched.Number}
                                                            value={reservFormik.values.Number}
                                                            onChange={reservFormik.handleChange}
                                                            placeholder='Here is a sample placeholder'
                                                            size='sm'
                                                        />

                                                        <label htmlFor="password">Suruculuk Vesiqesi</label>
                                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                                            {reservFormik.touched.Image && reservFormik.errors.Image}
                                                        </Text>
                                                        <Input
                                                            isInvalid={reservFormik.errors.Image && reservFormik.touched.Image}
                                                            type='file'
                                                            id='Cfile'
                                                            name='Image'
                                                            accept="image/*"
                                                            onChange={(e) => fileUploadHandler(e)}
                                                            placeholder='Here is a sample placeholder'
                                                            size='sm'
                                                        />

                                                        <label htmlFor="password">Pickup Date</label>
                                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                                            {reservFormik.touched.PickupDate && reservFormik.errors.PickupDate}
                                                        </Text>
                                                        <Input
                                                            placeholder="Select Date and Time"
                                                            size="2md"
                                                            isInvalid={reservFormik.errors.PickupDate && reservFormik.touched.PickupDate}
                                                            type="datetime-local"
                                                            value={selectedDate}
                                                            onChange={handleDateChange}
                                                            min={currentDateTime}
                                                            style={{
                                                                borderTop: "none",
                                                                borderRight: "none",
                                                                borderLeft: "none",
                                                                borderBottom: "1px solid white",
                                                            }}
                                                        />

                                                        <label htmlFor="password">Retur nDate</label>
                                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                                            {reservFormik.touched.ReturnDate && reservFormik.errors.ReturnDate}
                                                        </Text>
                                                        <Input
                                                            isInvalid={reservFormik.errors.ReturnDate && reservFormik.touched.ReturnDate}
                                                            placeholder="Select Date and Time"
                                                            size="2md"
                                                            type="datetime-local"
                                                            value={selectedDate1}
                                                            onChange={handleDateChange1}
                                                            min={currentDateTime}
                                                            style={{
                                                                borderTop: "none",
                                                                borderRight: "none",
                                                                borderLeft: "none",
                                                                borderBottom: "1px solid white",
                                                            }}
                                                        />

                                                        <label htmlFor="password">Notes</label>
                                                        <Text fontSize={"15px"} color={"red"} mb="8px">
                                                        </Text>
                                                        <Input
                                                            type='text'
                                                            name='Notes'
                                                            value={reservFormik.values.Notes}
                                                            onChange={reservFormik.handleChange}
                                                            placeholder='Here is a sample placeholder'
                                                            size='sm'
                                                        />

                                                        <Button type='submit'>Order</Button>
                                                    </FormControl>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Basket