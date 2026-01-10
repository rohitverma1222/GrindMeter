import React from 'react';
import './TopicFilters.css';

const TopicFilters = () => {
    const topics = [
        'All Topics', 'Algorithms', 'Database', 'Shell', 'Concurrency', 'JavaScript', 'pandas'
    ];

    return (
        <section className="topics-section" style={{ display: "none" }}>
            <div className="topic-tags">
                {topics.map((topic, index) => (
                    <span key={topic} className={`tag ${index === 0 ? 'active' : ''}`}>
                        {topic}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default TopicFilters;
