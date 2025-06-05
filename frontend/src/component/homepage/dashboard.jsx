import React, { useRef, useState, useEffect } from 'react';
import crosslogo from '../../assets/images/icons/cross.png';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { authUser } from '../../../backend/config/firebase';
import {
    MdDashboard,
    MdNotifications,
    MdHistory,
    MdVideoLibrary
} from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../backend/config/firebase';

function DashboardPage() {
    const sidebarRef = useRef(null);
    const coverSidebarRef = useRef(null);
    const profileRef = useRef(null);
    const coverProfileRef = useRef(null);
    const settingsRef = useRef(null);
    const coverSettingsRef = useRef(null);
    const navigate = useNavigate();
    const [authinfo, setAuthInfo] = useState('');
    const [fullName, setFullName] = useState('');
    const [verseReference, setVerseReference] = useState('');
    const [verseText, setVerseText] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authUser, async (user) => {
            if (user) {
                setAuthInfo(user.email);
                const docRef = doc(db, 'users_info', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setFullName(userData.fullname);
                }
            } else {
                setAuthInfo('');
                setFullName('');
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchVerseOfTheDay = async () => {
            try {
                const response = await fetch(
                    'https://api.scripture.api.bible/v1/bible/verses-of-the-day?language=en',
                    {
                        headers: {
                            'api-key': 'YOUR_API_KEY_HERE'
                        }
                    }
                );
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if (data.data && data.data.length > 0) {
                    const todayVerse = data.data[0];
                    setVerseReference(todayVerse.reference);
                    setVerseText(todayVerse.content);
                }
            } catch (err) {
                console.error('Failed to fetch verse of the day:', err);
            }
        };
        fetchVerseOfTheDay();
    }, []);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const togglesidebar = () => {
        if (sidebarRef.current && coverSidebarRef.current) {
            sidebarRef.current.classList.toggle('active');
            coverSidebarRef.current.classList.toggle('visible');
        }
    };

    const closeSidebar = () => {
        if (sidebarRef.current && coverSidebarRef.current) {
            sidebarRef.current.classList.remove('active');
            coverSidebarRef.current.classList.remove('visible');
        }
    };

    const closeProfile = () => {
        if (coverProfileRef.current && profileRef.current) {
            profileRef.current.classList.remove('active');
            coverProfileRef.current.classList.remove('visible');
        }
    };

    const closeSettings = () => {
        if (settingsRef.current && coverSettingsRef.current) {
            settingsRef.current.classList.remove('active');
            coverSettingsRef.current.classList.remove('visible');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(authUser);
            navigate('/');
        } catch (err) {
            console.error('Logout Error: ', err.message);
        }
    };

    const handleNotificationClick = () => {
        navigate('/notifications');
    };

    return (
        <div className="container-dashboard">
            <div className="overlay-design">
                <div className="grid-container">
                    <nav className="navbar-container">
                        <div className="logo-title-container">
                            <h2>
                                Rise <img src={crosslogo} className="logo-img" alt="logo" /> Up
                            </h2>
                            <p>- PATHWAY OF ENLIGHTENMENT -</p>
                            <div className="btn-group">
                                <button className="sidebar-toggle" onClick={togglesidebar}>
                                    <IoMenu className="icon" />
                                </button>
                            </div>

                        </div>

                        <button
                            className="notification-btn"
                            onClick={handleNotificationClick}
                        >
                            <MdNotifications className="notif-icon" />
                        </button>

                        <div className="welcome-date-bar">
                            <div className="welcome-message">
                                {fullName ? `Welcome, ${fullName}` : 'Welcome, Guest'}
                            </div>
                            <div className="current-date">{currentDate}</div>
                        </div>

                    </nav>

                    <div className="content-container">
                        {verseReference && verseText && (
                            <div className="verse-of-the-day">
                                <div className="verse-ref">{verseReference}</div>
                                <div className="verse-text">{verseText}</div>
                            </div>
                        )}

                        <Outlet />
                    </div>
                </div>

                <div className="sidebar-container">
                    <div className="Sidebar" ref={sidebarRef}>
                        <div className="sidebar-header">
                            <div className="information-container">
                                <div className="user-details">
                                    <FaUserCircle className="pp-icon" />
                                    <div className="text-info">
                                        <p className="fullname-display">
                                            <strong>{fullName || 'Guest'}</strong>
                                        </p>
                                        <p className="account-display">
                                            {authinfo || 'No user logged in'}
                                        </p>
                                    </div>
                                </div>
                                <button className="logout-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div className="menu-sidebar">
                            <div>
                                <div className="group-btn-selection">
                                    <button
                                        type="button"
                                        className="btn-selection-input"
                                        onClick={() => {
                                            navigate('/dashboard');
                                            closeSidebar();
                                        }}
                                    >
                                        <MdDashboard className="icon-group" />
                                        Dashboard
                                    </button>
                                </div>
                                <div className="group-btn-selection">
                                    <button
                                        type="button"
                                        className="btn-selection-input"
                                        onClick={closeSidebar}
                                    >
                                        <MdVideoLibrary className="icon-group" />
                                        Recorded Mass
                                    </button>
                                </div>
                                <div className="group-btn-selection">
                                    <button
                                        type="button"
                                        className="btn-selection-input"
                                        onClick={() => {
                                            navigate('/dashboard/reflection-for-today');
                                            closeSidebar();
                                        }}
                                    >
                                        <MdDashboard className="icon-group" />
                                        Reflection
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="cover-sidebar"
                        ref={coverSidebarRef}
                        onClick={closeSidebar}
                    ></div>












                </div>

                <div className="profile-container" ref={profileRef}>
                    <div className="profile-subcontainer-infoform">
                        <div className="profile-details">
                            <h2 className="title-profile">Profile Management</h2>
                        </div>
                    </div>
                    <div
                        className="cover-profile"
                        ref={coverProfileRef}
                        onClick={closeProfile}
                    ></div>
                </div>

                <div className="settings-container" ref={settingsRef}>
                    <div className="settings-subcontainer">{/* Settings content here */}</div>
                    <div
                        className="cover-settings"
                        ref={coverSettingsRef}
                        onClick={closeSettings}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
