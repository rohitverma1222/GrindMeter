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

    useEffect(() => {
        if (show) {
            setMeme(memes[Math.floor(Math.random() * memes.length)]);
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="meme-overlay" onClick={onClose}>
            <div className="meme-popup" onClick={(e) => e.stopPropagation()}>
                <button className="meme-close" onClick={onClose}>×</button>
                <img src={meme.image} alt={meme.text} className="meme-image" />
                <div className="meme-footer">
                    <p className="solved-text">Problem Solved! 🎉</p>
                    <p className="problem-name">{problemTitle}</p>
                </div>
            </div>
        </div>
    );
};

export default SolvedToast;
