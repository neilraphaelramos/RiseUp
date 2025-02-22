import React from 'react'
import { useNavigate } from 'react-router-dom'

function Recovery_Email() {
  const navigate = useNavigate();

  return (
    <div className='password-reset-container'>
      <form className='form-email-box'>
        <div onClick={() => navigate('/forget-password/verification-code')}>recovery-email
        </div>
      </form>
      {/*<div onClick={() => navigate('/forget-password/verification-code')}>recovery-email
      </div>*/}
    </div>

  )
}

export default Recovery_Email