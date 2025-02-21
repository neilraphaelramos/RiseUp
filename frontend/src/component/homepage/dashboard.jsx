import React from 'react'
import crosslogo from '../../assets/images/icons/cross.png'

function DashboardPage() {
  return (
    <div className='container-dashboard'>
        <div className='overlay-design'>
            <nav className='navbar-container'>
                <div className='logo-title-container'>
                    <h2>
                        Rise <img src={crosslogo} className='logo-img'/> Up
                    </h2>
                    <p>
                        - PATHWAY OF ENLIGTENHMENT -
                    </p>
                </div>
            </nav>
        </div>
    </div>
  )
}

export default DashboardPage