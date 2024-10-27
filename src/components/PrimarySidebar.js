// src/components/PrimarySidebar.js
import React from 'react';
import '../styles/primarySidebar.css';

const PrimarySidebar = ({ spots, onSpotClick, highlightedSpotId }) => {
    return (
        <div className="primary-sidebar">
            <h2>Recommended Study Spots</h2>
            <ul>
                {spots.map((spot) => (
                    <li
                        key={spot.id}
                        className={highlightedSpotId === spot.id ? 'highlighted' : ''}
                        onClick={() => onSpotClick(spot)}
                    >
                        <h3>{spot.title}</h3>
                        <p>{spot.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrimarySidebar;
