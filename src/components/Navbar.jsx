import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-left">
                    <div className="logo">
                        <img src="/favicon.svg" alt="GrindMeter" className="logo-icon" />
                        <span className="logo-text">GrindMeter</span>
                    </div>
                    <div className="nav-links">
                        <a href="#" className="active">Problems</a>
                        {/* <a href="#">Problems</a> */}
                        {/* <a href="#">Contest</a>
                        <a href="#">Discuss</a>
                        <a href="#">Interview</a>
                        <a href="#" className="store">Store</a> */}
                    </div>
                </div>
                <div className="nav-right">
                    <div className="nav-icons">
                        <span className="icon">🔔</span>
                        <span className="icon fire">🔥 10</span>
                        <span className="profile-img">R</span>
                        <button className="premium-btn">Premium</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
