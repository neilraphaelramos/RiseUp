import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CiLock } from "react-icons/ci";
import { IoChevronBack } from 'react-icons/io5';

function Recovery_NewPass() {
  const navigate = useNavigate();

  return (
    <div className='password-reset-container'>
      <form className='form-newpass-box'>
      <div className='accrec-tab'>
        <IoChevronBack className='btn-back' onClick={() => navigate('/')} />
          <h2>
            ACCOUNT RECOVERY
          </h2>
        </div>
        <h1>
          Please type your
          new password.
        </h1>
        <div className='formgroup-input'>
          <CiLock className='groupicon' />
          <input className='txt-input' placeholder='New Password' type='password' />
        </div>
        <div className='formbutton'>
          <button
            className='btn-input'
            type='button'
            onClick={() => navigate('/')}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Recovery_NewPass