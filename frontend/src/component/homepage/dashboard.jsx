import React, { useRef, useState } from 'react'
import crosslogo from '../../assets/images/icons/cross.png'
import { Outlet } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";

function DashboardPage() {
    const sidebarRef = useRef(null);
    const coverSidebarRef = useRef(null);

    const togglesidebar = () => {
        if (sidebarRef.current && coverSidebarRef.current) {
            sidebarRef.current.classList.toggle('active');
            coverSidebarRef.current.classList.toggle('visible');
        }
    }

    const closeSidebar = () => {
        if (sidebarRef.current && coverSidebarRef.current) {
            sidebarRef.current.classList.toggle('active');
            coverSidebarRef.current.classList.toggle('visible');
        }
    }

    return (
        <div className='container-dashboard'>
            <div className='overlay-design'>
                <div className='grid-container'>
                    <nav className='navbar-container'>
                        <div className='logo-title-container'>
                            <h2>
                                Rise <img src={crosslogo} className='logo-img' /> Up
                            </h2>
                            <p>
                                - PATHWAY OF ENLIGTENHMENT -
                            </p>
                            <div className='btn-group'>
                                <button className='sidebar-toggle' onClick={togglesidebar}>
                                    <IoMenu className='icon'/>
                                </button>
                            </div>
                        </div>
                    </nav>
                    <div className='content-container'>
                        <Outlet />
                    </div>
                </div>
                <div className='sidebar-container'>
                    <div className='Sidebar' ref={sidebarRef}>
                        <div className='sidebar-header'>
                            <div className='information-container'>
                                <p>Information User</p>
                            </div>
                        </div>
                        <div className='menu-sidebar'>
                            Menu Selection
                        </div>
                    </div>
                    <div className='cover-sidebar' ref={coverSidebarRef} onClick={closeSidebar}></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage