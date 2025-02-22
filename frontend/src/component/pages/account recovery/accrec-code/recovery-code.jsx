import React from 'react'
import { useNavigate } from 'react-router-dom'

function Recovery_Code() {
  const navigate = useNavigate();

  return (
    <div className='password-reset-container'>
      <form className='form-code-box'>
        <div onClick={() => navigate('/forget-password/set-new-password')}>recovery-code</div>
      </form>
    </div>
  )
}

export default Recovery_Code