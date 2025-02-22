import React from 'react'
import { useNavigate } from 'react-router-dom'

function Recovery_NewPass() {
  const navigate = useNavigate();

  return (
    <div className='password-reset-container'>
      <form className='form-newpass-box'>
        <div onClick={() => navigate('/')}>recovery-newpass</div>
      </form>
    </div>
  )
}

export default Recovery_NewPass