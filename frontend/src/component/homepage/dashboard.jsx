import React, { useRef, useState, useEffect } from 'react'
import crosslogo from '../../assets/images/icons/cross.png'
import { Outlet, useNavigate } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { authUser } from '../../../backend/config/firebase';
import { MdDashboard, MdNotifications, MdHistory, MdEdit, MdVideoLibrary, MdSettings } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../backend/config/firebase';

function DashboardPage() {
    const sidebarRef = useRef(null);
    const coverSidebarRef = useRef(null);
    const profileRef = useRef(null);
    const coverProfileRef = useRef(null);
    const navigate = useNavigate();
    const [authinfo, setAuthInfo] = useState("");
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authUser, async (user) => {
            if (user) {
                setAuthInfo(user.email);

                const docRef = doc(db, "users_info", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setFullName(userData.fullname);
                    console.log(userData.fullname);
                }
            } else {
                setAuthInfo("");
                setFullName("");
            }
        });

        return () => unsubscribe();
    }, []);

    const togglesidebar = () => {
        if (sidebarRef.current && coverSidebarRef.current) {
            sidebarRef.current.classList.toggle('active');
            coverSidebarRef.current.classList.toggle('visible');
        }
    }

    const toggleprofile = () => {
        if (coverProfileRef.current && profileRef.current) {
            profileRef.current?.classList.toggle("active");
            coverProfileRef.current?.classList.toggle("visible");

        }
    }

    const closeSidebar = () => {
        if (sidebarRef.current && coverSidebarRef.current) {
            sidebarRef.current.classList.toggle('active');
            coverSidebarRef.current.classList.toggle('visible');
        }
    }

    const closeProfile = () => {
        if (coverProfileRef.current && profileRef.current) {
            profileRef.current?.classList.toggle("active");
            coverProfileRef.current?.classList.toggle("visible");
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(authUser);
            navigate("/");
        } catch (err) {
            console.error("Logout Error: ", err.message);
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
                                    <IoMenu className='icon' />
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
                                <div className='user-details'>
                                    <FaUserCircle className='pp-icon' />
                                    <div className='text-info'>
                                        <p className='fullname-display'><strong>{fullName || "Guest"}</strong></p>
                                        <p className='account-display'>{authinfo || "No user logged in"}</p>
                                    </div>
                                </div>
                                <button className='logout-btn' onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div className='menu-sidebar'>
                            <div>
                                <div className='group-btn-selection'>
                                    <button type='button' className='btn-selection-input'> <MdDashboard className='icon-group' />Dashboard </button>
                                </div>
                                <div className='group-btn-selection'>
                                    <button type='button' className='btn-selection-input'> <MdNotifications className='icon-group' />Notification </button>
                                </div>
                                <div className='group-btn-selection'>
                                    <button type='button' className='btn-selection-input'> <MdHistory className='icon-group' />Activity Logs </button>
                                </div>
                                <div className='group-btn-selection'>
                                    <button type='button' className='btn-selection-input' onClick={() => {toggleprofile(); closeSidebar();}}> <MdEdit className='icon-group' />Profile </button>
                                </div>
                                <div className='group-btn-selection'>
                                    <button type='button' className='btn-selection-input'> <MdVideoLibrary className='icon-group' />Recorded Mass </button>
                                </div>
                                <div className='group-btn-selection'>
                                    <button type='button' className='btn-selection-input'> <MdSettings className='icon-group' />Settings </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cover-sidebar' ref={coverSidebarRef} onClick={closeSidebar}></div>
                </div>
                <div className='profile-container' ref={profileRef}>
                    <div className='profile-subcontainer-infoform'>

                    </div>
                    <div className='cover-profile' ref={coverProfileRef} onClick={closeProfile}></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage