import React, { useState } from 'react'
import { SendEmailAuth } from "../Services/authServices";
import { useQuery, useMutation, useQueryClient } from "react-query";
import './ResetEmail.scss'
import { Container } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const ResetPassword = () => {
  
  const notify = () => toast("We accepted your e-mail");

  const [sEmail, setSemail] = useState('');

  const SendEmail = (event) => {
    event.preventDefault();
    setSemail(event.target.value);
  };

  const mutation = useMutation(() => SendEmailAuth(sEmail), {
    onSuccess: () => {

    },
  });

  const EmailSended = async () => {
    await mutation.mutateAsync(sEmail);
  };

  return (
    <>
      <Container id='SendEmailContainer'>
        <div>
          <div class="popupResetEmail">
            <form class="formReset">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" height="34" width="34">
                  <path stroke-linejoin="round" stroke-width="2.5" stroke="#115DFC" d="M7.08385 9.91666L5.3572 11.0677C4.11945 11.8929 3.50056 12.3055 3.16517 12.9347C2.82977 13.564 2.83226 14.3035 2.83722 15.7825C2.84322 17.5631 2.85976 19.3774 2.90559 21.2133C3.01431 25.569 3.06868 27.7468 4.67008 29.3482C6.27148 30.9498 8.47873 31.0049 12.8932 31.1152C15.6396 31.1838 18.3616 31.1838 21.1078 31.1152C25.5224 31.0049 27.7296 30.9498 29.331 29.3482C30.9324 27.7468 30.9868 25.569 31.0954 21.2133C31.1413 19.3774 31.1578 17.5631 31.1639 15.7825C31.1688 14.3035 31.1712 13.564 30.8359 12.9347C30.5004 12.3055 29.8816 11.8929 28.6437 11.0677L26.9171 9.91666"></path>
                  <path stroke-linejoin="round" stroke-width="2.5" stroke="#115DFC" d="M2.83331 14.1667L12.6268 20.0427C14.7574 21.3211 15.8227 21.9603 17 21.9603C18.1772 21.9603 19.2426 21.3211 21.3732 20.0427L31.1666 14.1667"></path>
                  <path stroke-width="2.5" stroke="#115DFC" d="M7.08331 17V8.50001C7.08331 5.82872 7.08331 4.49307 7.91318 3.66321C8.74304 2.83334 10.0787 2.83334 12.75 2.83334H21.25C23.9212 2.83334 25.2569 2.83334 26.0868 3.66321C26.9166 4.49307 26.9166 5.82872 26.9166 8.50001V17"></path>
                  <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#115DFC" d="M14.1667 14.1667H19.8334M14.1667 8.5H19.8334"></path>
                </svg>
              </div>
              <div class="note">
                <label class="title">Reset Your Password</label>
                <span class="subtitle">Lost your password? Please enter your email address. You will receive a link to create a new password via email.</span>
              </div>
              <input placeholder="Enter your e-mail" title="Enter your e-mail" name="email" value={sEmail} onChange={SendEmail} type="email" class="input_field" />
              <button onClick={EmailSended} type='button' class="submit">Submit</button>
            </form>
          </div>
          <div className='GoToHome'>
            <button onClick={notify} type='submit' class="carbuttonHomeGoTo">
              <Link to={'/'}><div style={{ marginTop: "20px", fontSize: "18px", color: "white", borderBottom: "1px solid white" }} class="captionHomeS">LuxeDrive</div>
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="carSSS"><path d="M355.975 292.25a24.82 24.82 0 1 0 24.82-24.81 24.84 24.84 0 0 0-24.82 24.81zm-253-24.81a24.81 24.81 0 1 1-24.82 24.81 24.84 24.84 0 0 1 24.81-24.81zm-76.67-71.52h67.25l-13.61 49.28 92-50.28h57.36l1.26 34.68 32 14.76 11.74-14.44h15.62l3.16 16c137.56-13 192.61 29.17 192.61 29.17s-7.52 5-25.93 8.39c-3.88 3.31-3.66 14.44-3.66 14.44h24.2v16h-52v-27.48c-1.84.07-4.45.41-7.06.47a40.81 40.81 0 1 0-77.25 23h-204.24a40.81 40.81 0 1 0-77.61-17.67c0 1.24.06 2.46.17 3.67h-36z"></path></svg></Link>
            </button>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              style={{ width: "500px", textAlign: "center" }}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
      </Container>
    </>
  )
}

export default ResetPassword