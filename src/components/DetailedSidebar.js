// src/components/DetailedSidebar.js
import React from 'react';
import '../styles/detailedSidebar.css';

const DetailedSidebar = ({ spot, onClose }) => {
    return (
        <div className="detailed-sidebar">
            <button className="back-button" onClick={onClose}>← Back</button>
            <h2>{spot.title}</h2>
            <p>{spot.description}</p>
            {spot.bookingLink ? (
                <a href={spot.bookingLink} target="_blank" rel="noopener noreferrer">
                    Book Now
                </a>
            ) : (
                <p className="warning">{spot.warning}</p>
            )}
        </div>
    );
};

export default DetailedSidebar;
