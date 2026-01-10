import React from 'react';
import './FeaturedCards.css';

const FeaturedCards = () => {
    return (
        <section className="featured-section" style={{ display: "none" }}>
            <div className="featured-card quest">
                <div className="card-info">
                    <span className="badge">NEW</span>
                    <h3>Quest</h3>
                    <p>Turn coding practice into an epic adventure</p>
                    <button className="begin-btn">Begin Now</button>
                </div>
                <div className="card-img">📦</div>
            </div>
            <div className="featured-card javascript">
                <div className="card-info">
                    <h3>JavaScript</h3>
                    <p>30 Days Challenge</p>
                    <span className="sub-text">Beginner Friendly</span>
                    <button className="learn-btn">Start Learning</button>
                </div>
                <div className="card-img">JS</div>
            </div>
            <div className="featured-card interview">
                <div className="card-info">
                    <h3>Top Interview Questions</h3>
                    <button className="get-started-btn">Get Started</button>
                </div>
                <div className="card-img">💬</div>
            </div>
        </section>
    );
};

export default FeaturedCards;
