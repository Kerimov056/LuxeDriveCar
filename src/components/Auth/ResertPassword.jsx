import { Container, Input } from '@chakra-ui/react'
import './Resretpassword.scss'
import React from 'react'
import { useFormik } from "formik";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResertPassword = () => {

  const location = useLocation();
  const params = location.pathname.split('/').filter(param => param !== '');

  const markaLocation = params[1] || '';

  const userId = markaLocation.replace(/^%0D+|%0D+$/g, '');

  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      UserId: userId ? userId : "",
      Password: "",
      ConfiremPassword: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      console.log(values);

      formData.append('UserId', userId ? userId : "");
      formData.append("Password", values.Password);
      formData.append("ConfiremPassword", values.ConfiremPassword);

      try {
        const response = await axios.post('https://localhost:7152/api/Auth/ConfiremPassword', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (response.status === 200) {
          toast.success('Your password has been changed', { position: toast.POSITION.TOP_RIGHT });
          navigate('/Login');
        }

      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <>
      <Container id="PrivatePage">
        <form class="formResetpasswordD" onSubmit={formik.handleSubmit}>
          <p>Reset Password</p>
          <div class="groupRS">
            <input required="true"  name='Password' value={formik.values.Password} onChange={formik.handleChange} class="main-input" type="password" />
            <span class="highlight-span"></span>
            <label class="lebal-email">Password</label>
          </div>
          <div class="container-1RR">
            <div class="groupRS">
              <input required="true" name='ConfiremPassword' value={formik.values.ConfiremPassword} onChange={formik.handleChange} class="main-input" type="password" />
              <span class="highlight-span"></span>
              <label class="lebal-email">Confirem Password</label>
            </div>
          </div>
          <button type='submit' class="submitRes">Send</button>
        </form>
      </Container>
    </>
  )
}

export default ResertPassword