import React, { Fragment, useState } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from 'react-query'
import { useFormik } from 'formik';
import { Input, Text, Button, FormControl } from '@chakra-ui/react'
import registerSchema from '../Validators/registerSchema'
import { GrPrevious } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import ReCAPTCHA from 'react-google-recaptcha';
import { register } from "../Services/authServices";

const Register = () => {

    const [token, setToken] = useState('');

    const onCaptchaLoad = () => {
        console.log('reCAPTCHA yüklendi');
    }

    const onCaptchaVerify = (recaptchaToken) => {
        console.log('reCAPTCHA doğrulandi:', recaptchaToken);
        setToken(recaptchaToken);
    }



    const history = useNavigate();

    const [selectedDate, setSelectedDate] = useState('')

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const { mutate, isLoading } = useMutation((values) => register(values), {
        onSuccess: (resp) => {
          history('/Login');
          history.push('/Login');
        },
      });
    


    const formik = useFormik({
        initialValues: {
            Fullname: '',
            Username: '',
            Email: '',
            password: '',
        },
        onSubmit: async (values) => {
            mutate(values);
        },
        validationSchema: registerSchema,
    })


    return (
        <>
            <div className='login_sectionN'>

                <div>
                    <form id='RegResponPhone' className='login_form' onSubmit={formik.handleSubmit} style={{ marginTop: "10px", height: "700px" }}>
                        <FormControl>
                            <h3>Sign Up</h3>
                            <label htmlFor='Fullname'>Your Full Name</label><br />
                            <Text>
                                {formik.touched.Fullname && formik.errors.Fullname}
                            </Text>
                            <Input
                                isInvalid={formik.errors.Fullname && formik.touched.Fullname}
                                name='Fullname'
                                value={formik.values.Fullname}
                                onChange={formik.handleChange}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />

                            <label htmlFor='Username'>UserName</label><br />
                            <Text>
                                {formik.touched.Username && formik.errors.Username}
                            </Text>
                            <Input
                                isInvalid={formik.errors.Username && formik.touched.Username}
                                name='Username'
                                value={formik.values.Username}
                                onChange={formik.handleChange}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />
                            <label htmlFor="Email">Email</label>
                            <Text>
                                {formik.touched.Email && formik.errors.Email}
                            </Text>
                            <Input
                                isInvalid={formik.errors.Email && formik.touched.Email}
                                name='Email'
                                value={formik.values.Email}
                                onChange={formik.handleChange}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />

                            <label htmlFor="password">Password</label>
                            <Text>
                                {formik.touched.password && formik.errors.password}
                            </Text>
                            <Input
                                isInvalid={formik.errors.password && formik.touched.password}
                                name='password'
                                type='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />
                            <label>Date of birth</label>
                            {/* <Input
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
                            /> */}
                            {/* <ReCAPTCHA
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                render="explicit"
                                onloadCallback={onCaptchaLoad}
                                verifyCallback={onCaptchaVerify}
                                data-theme="dark light"
                                style={{marginLeft:"40px",marginTop:"14px"}}
                            /> */}
                            <Button type='submit' onClick={formik.handleSubmit}>Register</Button>
                            <div className='GoogleAndAppleRegister'>
                                <button className='GoogleRegister'><FcGoogle /> Google</button>
                                <button className='AppleRegister'><BsApple />Apple</button>
                            </div>
                            <Link to={"/Login"}><Button><GrPrevious />Login</Button></Link>
                        </FormControl>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;



