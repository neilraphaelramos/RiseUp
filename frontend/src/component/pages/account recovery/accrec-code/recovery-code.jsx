import React from 'react'
import { useNavigate } from 'react-router-dom'

function Recovery_Code() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/forget-password/set-new-password')}>recovery-code</div>
  )
}

export default Recovery_Code