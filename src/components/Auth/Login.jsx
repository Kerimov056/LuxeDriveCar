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
      history('/');
      history.push('/');
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
              type='password' 
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





