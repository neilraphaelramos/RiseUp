import React from 'react';
import './ReflectionForToday.css'; // Link to your CSS
import { useNavigate } from 'react-router-dom';

function ReflectionForToday() {
    const navigate = useNavigate();

    return (
        <div className="rft-container">
            <form className="rft-form">
                <h2 className="rft-heading">📝 Daily Reflection</h2>

                {/* Title */}
                <div className="rft-group">
                    <label htmlFor="rft-title">Title:</label>
                    <input
                        id="rft-title"
                        type="text"
                        placeholder='e.g., "God’s Presence in My Daily Life"'
                        className="rft-input"
                    />
                </div>

                {/* Date & Grade */}
                <div className="rft-group rft-row">
                    <div className="rft-half">
                        <label htmlFor="rft-date">📆 Date:</label>
                        <input
                            id="rft-date"
                            type="date"
                            className="rft-input"
                        />
                    </div>
                    <div className="rft-half">
                        <label htmlFor="rft-grade">🔢 Year & Section:</label>
                        <input
                            id="rft-grade"
                            type="text"
                            className="rft-input"
                        />
                    </div>
                </div>

                {/* Reflection */}
                <div className="rft-group">
                    <label htmlFor="rft-reflection">✍️ Your Reflection:</label>
                    <textarea
                        id="rft-reflection"
                        rows="5"
                        placeholder="Write about how the app helped you spiritually, your realizations, or how it impacted your day..."
                        className="rft-textarea"
                    ></textarea>
                </div>

                {/* Checklist */}
                <div className="rft-group rft-checklist">
                    <label className="rft-check">
                        <input type="checkbox" /> ✅ I used the app today
                    </label>
                    <label className="rft-check">
                        <input type="checkbox" /> ✅ I read the Gospel reflection
                    </label>
                    <label className="rft-check">
                        <input type="checkbox" /> ✅ I prayed using the daily prayer
                    </label>
                    <label className="rft-check">
                        <input type="checkbox" /> ✅ I shared a verse with a friend
                    </label>
                </div>

                <div className="rft-buttons">
                    <button type="button" className="rft-btn rft-back" onClick={() => navigate('/dashboard')}>⬅ Back</button>
                    <button type="submit" className="rft-btn rft-submit">✅ Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ReflectionForToday;
