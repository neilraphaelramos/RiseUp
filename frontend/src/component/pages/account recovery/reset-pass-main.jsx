import React from 'react'
import { Outlet } from 'react-router-dom'

function Reset_Pass_Main() {
  return (
    <div className='main-password-reset'>
        <div className='overlay'>
          <Outlet />
        </div>
    </div>
  )
}

export default Reset_Pass_Main