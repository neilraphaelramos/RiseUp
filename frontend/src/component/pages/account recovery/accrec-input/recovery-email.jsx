import React, { useState } from 'react'
import { TfiEmail } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5';
import { authUser } from '../../../../../backend/config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';


function Recovery_Email() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleResetPassword = (event) => {
    event.preventDefault();

    sendPasswordResetEmail(authUser, email)
      .then(() => {
        navigate('/forget-password/verification-message');
      })
      .catch((err) => {
        console.error("Reset Password Error: ", err.message);
      });
  }

  return (
    <div className='password-reset-container'>
      <form className='form-email-box' onSubmit={handleResetPassword}>
        <div className='accrec-tab'>
          <IoChevronBack className='btn-back' onClick={() => navigate('/')} />
          <h2>
            ACCOUNT RECOVERY
          </h2>
        </div>
        <h1>
          We'll send a link for reset password
          to your email. Enter here below,
          if an account is connected to it.
        </h1>
        <div className='formgroup-input'>
          <TfiEmail className='groupicon' />
          <input
            className='txt-input'
            placeholder='Email'
            type='text'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='formbutton'>
          <button
            className='btn-input'
            type='submit'
          >
            Send
          </button>
        </div>
      </form>
    </div>

  )
}

export default Recovery_Email