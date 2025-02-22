import React from 'react'
import { TfiEmail } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5';

function Recovery_Email() {
  const navigate = useNavigate();

  return (
    <div className='password-reset-container'>
      <form className='form-email-box'>
        <div className='accrec-tab'>
          <IoChevronBack className='btn-back' onClick={() => navigate('/')} />
          <h2>
            ACCOUNT RECOVERY
          </h2>
        </div>
        <h1>
          We'll send a verification code
          to the email entered below
          if an account is connected to it.
        </h1>
        <div className='formgroup-input'>
          <TfiEmail className='groupicon' />
          <input className='txt-input' placeholder='Email' type='text' />
        </div>
        <div className='formbutton'>
          <button
            className='btn-input'
            type='button'
            onClick={() => navigate('/forget-password/verification-code')}>
            Send
          </button>
        </div>
      </form>
    </div>

  )
}

export default Recovery_Email