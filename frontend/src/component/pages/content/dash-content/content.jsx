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
                    <div className='featured-container'>
                        <div className='title-container'>
                            <h1>Featured</h1>
                        </div>
                        <div className='featured-click-content' onClick={() => navigate('/')}>
                            <img src={bgimgae}/>
                            <p>{featuredScripture.text}</p>
                        </div>
                    </div>
                    <div className='week-container'>
                        <h1>Scriptures for the week</h1>
                        <div className='ftweek-content'>
                            {weekScriptures.map((scriptures, index) => (
                                <div key={index} className='week-item' onClick={() => navigate('/')}>
                                    <img src={bgimgae}/>
                                    <h2>{scriptures.day}</h2>
                                    <p>{scriptures.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Content_Dashboard