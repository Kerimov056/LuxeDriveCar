import React, { useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import { Input, Text, Button, FormControl } from '@chakra-ui/react'
import { useFormik } from 'formik'
import loginSchema from '../Validators/loginSchema';
import { useMutation } from 'react-query'
import { login } from "../Services/authServices";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from "../Redux/Slices/authSlice";
import Navbar from '../Navbar/Navbar';
import { GrNext } from "react-icons/gr";

const Login = () => {
  const history = useNavigate();

  const dispatch = useDispatch();
  const { token } = useSelector(x => x.authReducer)
  console.log(token);

  const { mutate, isLoading } = useMutation((values) => login(values), {
    onSuccess: (resp) => {
      dispatch(loginAction(resp.data));
    },
  });

  const formik = useFormik({
    initialValues: {
      UsernameOrEmail: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
      mutate(values);
    }
    // validationSchema: 
  });



  return (
    <>
      <div className='login_section'>
        {/* <div class="container">
          <div class="circle circle1"></div>
          <div class="circle circle2"></div>
          <div class="circle circle3"></div>
          <div class="circle circle4"></div>
        </div> */}

        <form className='login_form' onSubmit={formik.handleSubmit}>
          <FormControl>
            <h3>Login Here</h3>
            <label htmlFor="email">Email</label>
            <Text fontSize={"15px"} color={"red"} mb="8px">
              {formik.touched.UsernameOrEmail && formik.errors.UsernameOrEmail}
            </Text>
            <Input
              isInvalid={formik.errors.UsernameOrEmail && formik.touched.UsernameOrEmail}
              name='UsernameOrEmail'
              value={formik.values.UsernameOrEmail}
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
            <Button isLoading={isLoading} type='submit' onClick={formik.handleSubmit}>Log In</Button>
            <Link to={"/Register"}><Button id='regGo'>Register <GrNext /></Button></Link>
          </FormControl>
        </form>

        <div className='Samaxi'>
          <Button style={{ backgroundColor: "white" }}>Samaxi</Button>
        </div>

      </div>
    </>
  )
}

export default Login





// try {
//   const response = await axios.post(
//     `${process.env.REACT_APP_API_HOST}/api/Auth/Login`,
//     {
//       UsernameOrEmail: values.email,
//       password: values.password,
//     }
//   );

//   if (response.status === 200) {
//     localStorage.setItem("token", JSON.stringify(response.data));
//     Swal.fire({
//       position: "top-center",
//       icon: "success",
//       title: "Signed in successfully!",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//     history.push('/Home');
//   } else {
//     Swal.fire({
//       position: "top-center",
//       icon: "error",
//       title: "Email or password is wrong!",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   }
//   console.log(response);
// } catch (error) {
//   // Handle errors here if needed
//   console.error(error);
// }