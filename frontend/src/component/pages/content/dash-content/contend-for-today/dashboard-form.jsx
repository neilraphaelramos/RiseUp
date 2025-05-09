import React from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard_Form() {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('/dashboard')}>dashboard-form</div>
    )
}

export default Dashboard_Form