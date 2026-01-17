import React, { useState, useEffect } from 'react';
import './SolvedToast.css';

const memes = [
    { image: '/majnu bhai.gif', text: 'बहुत Hard!' },
    { image: '/mirzapur-kaleen.gif', text: 'क्या बात है!' },
    { image: '/sabbash-dangal-aamir-khan-meme-templates.jpeg', text: 'शानदार!' },
    { image: '/shabaash-titu-mama.gif', text: 'शानदार!' },
    { image: '/wah-bhaai-wah-akhandanand-tripathi.gif', text: 'बहुत khub!' },
];

const SolvedToast = ({ show, problemTitle, onClose }) => {
    const [meme, setMeme] = useState(memes[0]);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (show) {
            setMeme(memes[Math.floor(Math.random() * memes.length)]);
            setIsExiting(false);
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(onClose, 300);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className={`snackbar ${isExiting ? 'snackbar-exit' : ''}`}>
            <img src={meme.image} alt={meme.text} className="snackbar-image" />
            <div className="snackbar-content">
                <p className="snackbar-title">Problem Solved! 🎉</p>
                <p className="snackbar-problem">{problemTitle}</p>
            </div>
            <button className="snackbar-close" onClick={onClose}>×</button>
        </div>
    );
};

export default SolvedToast;
