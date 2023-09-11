import React from 'react'
import './Communication.scss'
import { Button, Container } from '@chakra-ui/react'
import { useFormik } from "formik";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Communication = () => {


    const formik = useFormik({
        initialValues: {
            Name: "",
            SurName: "",
            Email: "",
            Phone: "",
            Note: "",
        },
        onSubmit: async (values) => {

            const formData = new FormData();
            console.log(values);

            formData.append("Name", values.Name);
            formData.append("SurName", values.SurName);
            formData.append("Email", values.Email);
            formData.append("Phone", values.Phone);
            formData.append("Note", values.Note);

            try {
                const response = await axios.post('https://localhost:7152/api/Communications', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (response.status === 201) {
                    toast.success('We accepted your e-mail', { position: toast.POSITION.TOP_RIGHT });
                }

            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <>
            <Container id='Communication'>
                <form onSubmit={formik.handleSubmit}>
                    <label>Name</label>
                    <input value={formik.Name} onChange={formik.handleChange} name='Name' type='text' />
                    <label>Surname</label>
                    <input value={formik.SurName} onChange={formik.handleChange} name='SurName' type='text' />
                    <label>Email</label>
                    <input value={formik.Email} onChange={formik.handleChange} name='Email' type='email' />
                    <label>Phone</label>
                    <input value={formik.Phone} onChange={formik.handleChange} name='Phone'  />
                    <label>Note</label>
                    <input value={formik.Note} onChange={formik.handleChange} name='Note' type='text' />
                    <Button type='submit' >Send</Button>
                </form>
            </Container>
        </>
    )
}

export default Communication