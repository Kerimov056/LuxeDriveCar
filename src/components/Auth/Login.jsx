import React, { useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import { Input, Text, Button } from '@chakra-ui/react'
import { useFormik } from 'formik'
import loginSchema from '../Validators/loginSchema';



const Login = () => {

  const history = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_HOST}/api/Auth/Login`,
          {
            UsernameOrEmail: values.email,
            password: values.password,
          }
        );

        if (response.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data));
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Signed in successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          history.push('/Home');
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Email or password is wrong!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(response);
      } catch (error) {
        // Handle errors here if needed
        console.error(error);
      }
    }
  });



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
          <form className='login_form' onSubmit={formik.handleSubmit}>
            <h3>Login Here</h3>
            <label htmlFor="email">Email</label>
            <Text fontSize={"15px"} color={"red"} mb="8px">
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
            <Text fontSize={"15px"} color={"red"} mb="8px">
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
            <Button type='submit' onClick={formik.handleSubmit}>Log In</Button>
          </form>
        </div>

        <div className='Socialllll'>
          <section>
            <div class="content">
              <Link to='/'><h2>SocialV</h2></Link>
              <h2>SocialV</h2>
            </div>
          </section>
          <Link to='/Register'><div class="txt" id="txt" style={{ marginLeft: "-60px" }}>
            <b>R</b><b>E</b><b>G</b><b>I</b><b>S</b><b>T</b><b>E</b><b>R</b>
          </div>
          </Link>
        </div>
      </div>

    </>
  )
}

export default Login





