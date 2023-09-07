import { Container, Input } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from "formik";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from 'axios';



const ResertPassword = () => {

  const location = useLocation();
  const params = location.pathname.split('/').filter(param => param !== '');

  const markaLocation = params[1] || '';

  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const reservFormik = useFormik({
    initialValues: {
      UserId: markaLocation ? markaLocation : "",
      Password: "",
      Email: "",
      ConfiremPassword: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      console.log(values);

      formData.append('UserId', markaLocation ? markaLocation : "");
      formData.append("Password", values.FullName);
      formData.append("ConfiremPassword", values.Email);

      try {
        const response = await axios.post('https://localhost:7152/api/CarReservations', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (response.status === 201) {
          queryClient.invalidateQueries('getReservation');

        }

      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <>
        
    </>
  )
}

export default ResertPassword