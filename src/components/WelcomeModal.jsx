import React, { useState, useEffect } from 'react';
import './WelcomeModal.css';

const WelcomeModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const hasVisited = localStorage.getItem('grindmeter_visited');
        if (!hasVisited) {
            setIsVisible(true);
        }
    }, []);

    const handleGetStarted = () => {
        if (name.trim()) {
            localStorage.setItem('grindmeter_user', name);
        }
        localStorage.setItem('grindmeter_visited', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="welcome-modal">
                <div className="animated-bars">
                    <div className="bar bar-easy"></div>
                    <div className="bar bar-medium"></div>
                    <div className="bar bar-hard"></div>
                </div>
                <h1>Welcome to GrindMeter</h1>
                <p className="modal-subtitle">Your LeetCode Progress Tracker</p>

                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">🎯</span>
                        <div className="feature-text">
                            <h4>Filter by Rating</h4>
                            <p>Find problems in your skill range</p>
                        </div>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">📊</span>
                        <div className="feature-text">
                            <h4>Track Progress</h4>
                            <p>Visual stats by difficulty tier</p>
                        </div>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">✅</span>
                        <div className="feature-text">
                            <h4>Mark Solved</h4>
                            <p>Keep track of completed problems</p>
                        </div>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">💾</span>
                        <div className="feature-text">
                            <h4>Auto Save</h4>
                            <p>Progress saved locally</p>
                        </div>
                    </div>
                </div>

                <div className="input-section">
                    <input
                        type="text"
                        placeholder="Enter your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="name-input"
                    />
                </div>

                <button className="get-started-btn" onClick={handleGetStarted}>
                    Start Grinding 🔥
                </button>
            </div>
        </div>
    );
};

export default WelcomeModal;
