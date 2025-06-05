//import React from 'react'
import './admindash.css';
import crosslogo from '../../assets/images/icons/cross.png';
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";
import { Outlet, useNavigate } from 'react-router-dom';

function DashboardAdmin() {
    return (
        <>
            <div className="adn-container">
                <header>
                    <div className='sub-header-container'>
                        <h1 className='adn-text'>
                            RISE<img src={crosslogo} className="logo-img" alt="logo" />UP
                        </h1>
                    </div>
                </header>
                <aside>
                    <div className='adn-selector-container'>
                        <div className='adn-gp-btn-select'>
                            <div className='btn-select'>
                                <MdDashboard className='adn-icon-btn'/> Dashboard
                            </div>
                        </div>
                        <div className='adn-gp-btn-select'>
                            <div className='btn-select'>
                                <FaUsers className='adn-icon-btn'/> User Management
                            </div>
                        </div>
                        <div className='adn-gp-btn-select'>
                            <div className='btn-select'>
                                <IoNewspaperSharp className='adn-icon-btn'/> Reflection Management
                            </div>
                        </div>
                        <div className='adn-gp-btn-select'>
                            <div className='btn-select'>
                                <FiActivity className='adn-icon-btn'/> Actvity Management
                            </div>
                        </div>
                    </div>
                </aside>
                <article>
                    info
                </article>
            </div>
        </>
    )
}

export default DashboardAdmin