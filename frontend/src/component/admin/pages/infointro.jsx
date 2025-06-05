//import React from 'react'
import { useEffect, useState } from 'react';
import './info-design.css';
import { db } from '../../../../backend/config/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const dummyData = [
    { id: 1, title: 'Reflection 1', studentName: 'Alice', year: '2024', section: 'A' },
    { id: 2, title: 'Reflection 2', studentName: 'Bob', year: '2024', section: 'B' },
    { id: 3, title: 'Reflection 3', studentName: 'Charlie', year: '2023', section: 'A' },
    { id: 4, title: 'Reflection 4', studentName: 'Diana', year: '2023', section: 'B' },
    { id: 5, title: 'Reflection 5', studentName: 'Ethan', year: '2024', section: 'C' },
    { id: 6, title: 'Reflection 6', studentName: 'Fiona', year: '2023', section: 'A' }, // Will not show because limit is 5
];

// Example daily activity data for the graph
const dailyActivityData = [
    { date: '2025-06-01', activities: 12 },
    { date: '2025-06-02', activities: 18 },
    { date: '2025-06-03', activities: 10 },
    { date: '2025-06-04', activities: 25 },
    { date: '2025-06-05', activities: 22 },
];

function InfoStatus() {
    const navigate = useNavigate();
    const displayRows = dummyData.slice(0, 5);

    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);

    useEffect(() => {
        const usersRef = collection(db, 'users_info');

        const unsubscribeAll = onSnapshot(usersRef, (snapshot) => {
            setTotalUsers(snapshot.size);
        });

        const activeQuery = query(usersRef, where('isOnline', '==', true));
        const unsubscribeActive = onSnapshot(activeQuery, (snapshot) => {
            setActiveUsers(snapshot.size);
        });

        return () => {
            unsubscribeAll();
            unsubscribeActive();
        };
    }, []);

    return (
        <>
            <div className="adn-status-container">
                <div className="adn-head-subcontainer">
                    <div className="adn-group-status">
                        <div className="adn-box-data">
                            <p className="adn-title-info">Total Users</p>
                            <p className="adn-number-info">{totalUsers}</p>
                        </div>
                        <div className="adn-box-data">
                            <p className="adn-title-info">Reflection Submitted Today</p>
                            <p className="adn-number-info">128</p>
                        </div>
                        <div className="adn-box-data">
                            <p className="adn-title-info">Total Active Users</p>
                            <p className="adn-number-info">{activeUsers}</p>
                        </div>
                        <div className="adn-box-data">
                            <p className="adn-title-info">Activities Today</p>
                            <p className="adn-number-info">350</p>
                        </div>
                    </div>
                </div>
                <div className='adn-status-report-data'>
                    <p className='adn-title-text'>Recent Reflection</p>
                    <table className='adm-table-reflection' onClick={() => navigate('/admin-dashboard/reflection-manager')}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Student Name</th>
                                <th>Year</th>
                                <th>Section</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayRows.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.title}</td>
                                    <td>{row.studentName}</td>
                                    <td>{row.year}</td>
                                    <td>{row.section}</td>
                                </tr>
                            ))}
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