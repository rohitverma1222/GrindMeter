import React from 'react';
import './FilterBar.css';

const FilterBar = ({ searchQuery, setSearchQuery, minRating, setMinRating, maxRating, setMaxRating }) => {
    return (
        <section className="filter-section">
            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search questions"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="rating-range">
                <div className="range-input">
                    <label>Min</label>
                    <input
                        type="number"
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                    />
                </div>
                <span className="range-separator">-</span>
                <div className="range-input">
                    <label>Max</label>
                    <input
                        type="number"
                        value={maxRating}
                        onChange={(e) => setMaxRating(e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
};

export default FilterBar;
