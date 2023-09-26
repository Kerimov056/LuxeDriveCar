import React, { useState } from 'react';
import './communicatioon.scss'
import { Button, Container } from '@chakra-ui/react'
import { useFormik } from "formik";
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';



const Communication = () => {

    const notify = () => toast("We accepted your e-mail");

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
                    // toast.success('We accepted your e-mail', { position: toast.POSITION.TOP_RIGHT });
                }

            } catch (error) {
            }
        },
    });

    const [token, setToken] = useState('');

    const onCaptchaLoad = () => {
    }
    const onCaptchaVerify = (recaptchaToken) => {
        setToken(recaptchaToken);
    }

    return (
        <>
            <div className='CommunStyle'>
                <div class="loader">
                    <div class="box box-1">
                        <div class="side-left"></div>
                        <div class="side-right"></div>
                        <div class="side-top"></div>
                    </div>
                    <div class="box box-2">
                        <div class="side-left"></div>
                        <div class="side-right"></div>
                        <div class="side-top"></div>
                    </div>
                    <div class="box box-3">
                        <div class="side-left"></div>
                        <div class="side-right"></div>
                        <div class="side-top"></div>
                    </div>
                    <div class="box box-4">
                        <div class="side-left"></div>
                        <div class="side-right"></div>
                        <div class="side-top"></div>
                    </div>
                </div>
            </div>
            <div id='CommunicationNavbar'>
                <Navbar />
            </div>
            <div id='Communication'>
                <div>
                    <div className='Conntact'>
                        <h1>Communication</h1>
                        <h4>For your requests and complaints: <span>LuxeDrive@gmail.com</span></h4>
                        <h4>Call Center and Whatsapp Line: <span>+1 1123 232 23</span></h4>
                        <h4>Baku (Yasamal) Branch  tel. : <span>+90 544 765 59 82 </span></h4>
                        <h4>İstanbul (Anadolu) Branch  tel. : <span>+90 544 765 59 82 </span></h4>
                        <h4>İzmir Branch  tel. : <span> +90 552 219 34 36</span></h4>
                        <h4>Antalya Branch  tel. : <span> +90 544 765 59 72</span></h4>
                        <h4>Ankara Branch  tel. :<span>  +90 546 577 88 57 </span></h4>
                        <h4>Kayseri Branch  tel. : <span> +90 546 903 14 38 </span></h4>
                    </div>
                    <div id='#FormCommunication'>

                        <form className='jjjjj' onSubmit={formik.handleSubmit}>
                            <div>
                                <div>
                                    <label >Name</label><br />
                                    <input value={formik.Name} onChange={formik.handleChange} name='Name' type='text' /><br />
                                </div>
                                <div>
                                    <label >Surname</label><br />
                                    <input value={formik.SurName} onChange={formik.handleChange} name='SurName' type='text' /><br />

                                </div>
                                <div>
                                    <label >Email</label><br />
                                    <input value={formik.Email} onChange={formik.handleChange} name='Email' type='email' /><br />
                                </div>
                                <div>
                                    <label >Phone</label><br />
                                    <input value={formik.Phone} onChange={formik.handleChange} name='Phone' /><br />
                                </div>
                                <div>
                                    <label >Note</label><br />
                                    <input value={formik.Note} onChange={formik.handleChange} name='Note' type='text' /><br />
                                </div>
                                <ReCAPTCHA
                                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                    render="explicit"
                                    onloadCallback={onCaptchaLoad}
                                    verifyCallback={onCaptchaVerify}
                                    data-theme="dark light"
                                />
                                {/* <Button type='submit' >Send</Button> */}
                                <button type='submit' onClick={notify} class="continue-application">
                                    <div>
                                        <div class="pencil"></div>
                                        <div class="folder">
                                            <div class="top">
                                                <svg viewBox="0 0 24 27">
                                                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                                                </svg>
                                            </div>
                                            <div class="paper"></div>
                                        </div>
                                    </div>
                                    Send
                                </button>
                                <ToastContainer
                                    position="bottom-center"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    style={{width:"500px",textAlign:"center"}}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light"
                                />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Communication


