import React, { Fragment, useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { Input, Text, Button } from '@chakra-ui/react'
import registerSchema from '../Validators/registerSchema'

const Register = () => {




    const formik = useFormik({
        initialValues: {
            fullName: '',
            userName: '',
            email: '',
            password: ''
        },
        validationSchema: registerSchema,

        onSubmit: async (values) => {
                const url = `${process.env.REACT_APP_API_HOST}/api/Auth/register`;
                 axios.post(url, values).then((result) => {
                    alert(result.values)
                }).catch((error) => {
                    alert(error)
                })
            
        }
    })





    return (
        <>
            <div className='login_section'>
                <div class="container">
                    <div class="circle circle1"></div>
                    <div class="circle circle2"></div>
                    <div class="circle circle3"></div>
                    <div class="circle circle4"></div>
                </div>



                <div>
                    <div className="background">
                    </div>
                    <form className='login_form' onSubmit={formik.handleSubmit} style={{ marginTop: "10px", height: "700px" }}>
                        <Fragment>
                            <h3>Sign Up</h3>
                            <label htmlFor='fullName'>Your Full Name</label><br />
                            <Text>
                                {formik.touched.fullName && formik.errors.fullName}
                            </Text>
                            <Input
                                isInvalid={formik.errors.fullName && formik.touched.fullName}
                                name='fullName'
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />

                            <label htmlFor='userName'>UserName</label><br />
                            <Text>
                                {formik.touched.userName && formik.errors.userName}
                            </Text>
                            <Input
                                isInvalid={formik.errors.userName && formik.touched.userName}
                                name='userName'
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />

                            <label htmlFor="email">Email</label>
                            <Text>
                                {formik.touched.email && formik.errors.email}
                            </Text>
                            <Input
                                isInvalid={formik.errors.email && formik.touched.email}
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />

                            <label htmlFor="password">Password</label>
                            <Text>
                                {formik.touched.email && formik.errors.email}
                            </Text>
                            <Input
                                isInvalid={formik.errors.password && formik.touched.password}
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />

                            <Button type='submit' onClick={formik.handleSubmit}>Log In</Button>
                        </Fragment>
                    </form>
                </div>

                <div className='Socialllll'>
                    <section>
                        <div class="content">
                            <Link to='/'><h2>SocialV</h2></Link>
                            <h2>SocialV</h2>
                        </div>
                    </section>
                    <Link to='/Login'><div class="txt" id="txt">
                        <b>L</b><b>O</b><b>G</b><b>I</b><b>N</b>
                    </div>
                    </Link>
                </div>
            </div>




            {/* <div id="Register">
                <div className="Left"></div>
                <div className="Medium">
                    <div>
                        <div>
                            <h1 style={{ color: "gray", marginBottom: "10px", fontWeight: "500" }}>Sign Up</h1>
                            <p>Enter your email address and password to access admin panel.</p>
                        </div>
                        <div className='form'>
                            <Fragment>
                                <div>
                                    <label>Your Full Name</label><br />
                                    <input type='text' placeholder=' Full Name' onChange={(e) => handleFullNameChange(e.target.value)} />
                                </div>

                                <div>
                                    <label>UserName</label><br />
                                    <input type='text' placeholder=' User Name' onChange={(e) => handleUserChange(e.target.value)} />
                                </div>

                                <div>
                                    <label>Email address</label><br />
                                    <input type='text' placeholder=' Email' onChange={(e) => handleEmailChange(e.target.value)} />
                                </div>

                                <div>
                                    <label>Password</label><br />
                                    <input type='text' placeholder=' Password' onChange={(e) => handlePasswordChange(e.target.value)} />
                                </div>
                                <br /><br />
                                <button onClick={() => handleSave()}>Sign Up</button>
                                <hr style={{ marginTop: "20px", backgroundColor: "gray" }} />
                                <p>
                                    <p>Already Have Account ?<Link to='/Login' style={{ color: "gray" }}>Log In</Link>    </p>
                                    <p>
                                        <span><BsFacebook /></span>
                                        <span><BsTwitter /></span>
                                        <span><BsInstagram /></span>
                                    </p>
                                </p>
                            </Fragment>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="Right"></div>
            </div> */}
        </>
    );
};

export default Register;



