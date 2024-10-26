// src/components/Sidebar.js
import React from 'react';
import '../styles/sidebar.css';

const Sidebar = ({ spot }) => {
    if (!spot) return null;  // Only display if a spot is selected

    return (
        <div className="sidebar">
            <h2>{spot.title}</h2>
            <p>{spot.description}</p>
            {spot.bookingLink ? (
                <a href={spot.bookingLink} target="_blank" rel="noopener noreferrer">
                    Book Now
                </a>
            ) : (
                <p style={{ color: 'yellow' }}>{spot.warning}</p>
            )}
        </div>
    );
};

export default Sidebar;
