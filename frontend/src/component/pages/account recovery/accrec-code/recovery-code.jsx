import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TbMailCode } from "react-icons/tb";
import { IoChevronBack } from 'react-icons/io5';

function Recovery_Code() {
  const navigate = useNavigate();

  return (
    <div className='password-reset-container'>
      <form className='form-code-box'>
        <div className='accrec-tab'>
          <IoChevronBack className='btn-back' onClick={() => navigate('/')} />
          <h2>
            ACCOUNT RECOVERY
          </h2>
        </div>
        <h1>
          The verification code has 
          sended to your email. 
          Enter the code.
        </h1>
        <div className='formgroup-input'>
          <TbMailCode  className='groupicon' />
          <input className='txt-input' placeholder='Code' type='text' />
        </div>
        <div className='formbutton'>
          <button
            className='btn-input'
            type='button'
            onClick={() => navigate('/forget-password/set-new-password')}>
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default Recovery_Code