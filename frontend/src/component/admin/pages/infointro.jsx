//import React from 'react'
import { useEffect, useState } from 'react';
import './info-design.css';
import { db } from '../../../../backend/config/firebase';
import { collection, onSnapshot, query, where, limit, orderBy} from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { LuActivity } from "react-icons/lu";

function InfoStatus() {
    const navigate = useNavigate();

    const [reflections, setReflections] = useState([]);
    const [dailyActivityData, setDailyActivityData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [tSubmitReflection, setTSubmitReflection] = useState(0);

    useEffect(() => {
        const usersRef = collection(db, 'users_info');
        const reflectionRef = collection(db, 'reflection_content');
        const activityRef = collection(db, 'daily_activities');

        const unsubscribeAll = onSnapshot(usersRef, (snapshot) => {
            setTotalUsers(snapshot.size);
        });

        const unsubscribeTotalReflectionSubmitted = onSnapshot(reflectionRef, (snapshot) => {
            setTSubmitReflection(snapshot.size);
        })

        const activeQuery = query(usersRef, where('isOnline', '==', true));
        const unsubscribeActive = onSnapshot(activeQuery, (snapshot) => {
            setActiveUsers(snapshot.size);
        });

        const recentReflectionsQuery = query(reflectionRef, orderBy('date', 'desc'), limit(5));
        const unsubscribeRecentReflections = onSnapshot(recentReflectionsQuery, (snapshot) => {
            const fetchedReflections = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReflections(fetchedReflections);
        });

        const recentActivitiesQuery = query(activityRef, orderBy('date', 'asc'));
        const unsubscribeActivities = onSnapshot(recentActivitiesQuery, (snapshot) => {
            const activities = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    date: data.date || '',          // e.g. '2025-06-01'
                    activities: data.activities || 0,  // e.g. 12
                };
            });
            setDailyActivityData(activities);
        });

        return () => {
            unsubscribeAll();
            unsubscribeActive();
            unsubscribeTotalReflectionSubmitted();
            unsubscribeRecentReflections();
            unsubscribeActivities();
        };
    }, []);

    return (
        <>
            <div className="adn-status-container">
                <div className="adn-head-subcontainer">
                    <div className="adn-group-status">
                        <div className="adn-box-data" onClick={() => navigate('/admin-dashboard/user-manager')}>
                            <div className="adn-icon-container">
                                <FaUsers />
                            </div>
                            <div className="adn-text-container">
                                <p className="adn-title-info">Total Users</p>
                                <p className="adn-number-info">{totalUsers}</p>
                            </div>
                        </div>
                        <div className="adn-box-data" onClick={() => navigate('/admin-dashboard/reflection-manager')}>
                            <div className="adn-icon-container">
                                <RiFilePaper2Fill />
                            </div>
                            <div className="adn-text-container">
                                <p className="adn-title-info">Reflection Submitted Today</p>
                                <p className="adn-number-info">{tSubmitReflection}</p>
                            </div>
                        </div>
                        <div className="adn-box-data">
                            <div className="adn-icon-container">
                                <FaUserCheck />
                            </div>
                            <div className="adn-text-container">
                                <p className="adn-title-info">Total Active Users</p>
                                <p className="adn-number-info">{activeUsers}</p>
                            </div>
                        </div>
                        <div className="adn-box-data">
                            <div className="adn-icon-container">
                                <LuActivity />
                            </div>
                            <div className="adn-text-container">
                                <p className="adn-title-info">Activities Today</p>
                                <p className="adn-number-info">350</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='adn-status-report-data'>
                    <p className='adn-title-text'>Recent Reflection</p>
                    <table className='adm-table-reflection' onClick={() => navigate('/admin-dashboard/reflection-manager')}>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>Student Name</th>
                                <th>Year & Section</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reflections.length > 0 ? (
                                reflections.map((ref, index) => (
                                    <tr key={ref.id}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>{ref.title || '-'}</td>
                                        <td>{ref.name || '-'}</td>
                                        <td>{ref.year_section || '-'}</td>
                                        <td>{ref.date ? new Date(ref.date.seconds * 1000).toLocaleDateString() : '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>No reflections found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className='adn-graph-report-DA' style={{ width: '100%', height: 300, marginTop: 40 }}>
                        <ResponsiveContainer>
                            <LineChart data={dailyActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="activities" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoStatus