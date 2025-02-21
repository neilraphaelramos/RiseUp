import React from 'react'
import { useNavigate } from 'react-router-dom'

function Recovery_Email() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/forget-password/verification-code')}>recovery-email
    </div>
  )
}

export default Recovery_Email