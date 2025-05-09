
import React from 'react'
import bgimgae from '../../../../assets/images/backgrounds/HomePage BG.jpg'
import { useNavigate } from 'react-router-dom'

function Content_Dashboard() {
    const navigate = useNavigate();
    const scriptures = [
        { day: "Sunday", text: "Scripture for Sunday" },
        { day: "Monday", text: "Scripture for Monday" },
        { day: "Tuesday", text: "Scripture for Tuesday" },
        { day: "Wednesday", text: "Scripture for Wednesday" },
        { day: "Thursday", text: "Scripture for Thursday" },
        { day: "Friday", text: "Scripture for Friday" },
        { day: "Saturday", text: "Scripture for Saturday" },
    ];

    const getDayIndex = () => new Date().getDay();

    const currentDayIndex = getDayIndex();
    const featuredScripture = scriptures[currentDayIndex];

    const weekScriptures = [
        scriptures[(currentDayIndex + 1) % 7],
        scriptures[(currentDayIndex + 2) % 7],
        scriptures[(currentDayIndex + 3) % 7]
    ];

    return (
        <div className='content-container'>
            <div className='sub-container'>
                <div className='scroll-container'>
                    
                </div>

            </div>
        </div>
    )
}

export default Content_Dashboard
