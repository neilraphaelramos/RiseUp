import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5';

function Recovery_Message() {
  const navigate = useNavigate();

  return (
    <div className='password-reset-container'>
      <form className='form-message-box'>
        <div className='accrec-tab'>
          <IoChevronBack className='btn-back' onClick={() => navigate('/')} />
          <h2>
            ACCOUNT RECOVERY
          </h2>
        </div>
        <h1>
          The reset link has been
          send to your email. 
          Please check your email.
        </h1>
        <div className='formbutton'>
          <button
            className='btn-input'
            type='button'
            onClick={() => navigate('/')}>
            Confirm
          </button>
        </div>
      </form>
    </div>
  )
}

export default Recovery_Message