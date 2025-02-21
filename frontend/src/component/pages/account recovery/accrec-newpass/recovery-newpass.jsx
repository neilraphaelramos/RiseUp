import React from 'react'
import { useNavigate } from 'react-router-dom'

function Recovery_NewPass() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')}>recovery-newpass</div>
  )
}

export default Recovery_NewPass