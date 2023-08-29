import React, { Fragment, useState } from 'react';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { Input, Text, Button, FormControl } from '@chakra-ui/react'
import registerSchema from '../Validators/registerSchema'
import { GrPrevious } from "react-icons/gr";

const Register = () => {

    const history = useNavigate();

    const formik = useFormik({
        initialValues: {
            Fullname: '',
            Username: '',
            Email: '',
            password: ''
        },
        // validationSchema: registerSchema,

        onSubmit: async (values) => {
            const url = `https://localhost:7152/api/Auth/register`;
            axios.post(url, values).then((result) => {
                alert(result.values)
                history('/Login');
                history.push('/Login');
            }).catch((error) => {
                alert(error)
            })

        }
    })


    return (
        <>
            <div className='login_sectionN'>

                <div>
                    <form className='login_form' onSubmit={formik.handleSubmit} style={{ marginTop: "10px", height: "700px" }}>
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
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />

                            <Button type='submit' onClick={formik.handleSubmit}>Register</Button>
                            <Link to={"/Login"}><Button><GrPrevious />Login</Button></Link>
                        </FormControl>
                    </form>
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



