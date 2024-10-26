// src/components/SidebarContainer.js
import React, { useState } from 'react';
import PrimarySidebar from './PrimarySidebar';
import DetailedSidebar from './DetailedSidebar';

const SidebarContainer = ({ spots, onSelectSpot, highlightedSpotId, onCloseDetailView }) => {
    const [selectedSpot, setSelectedSpot] = useState(null);

    const handleSpotClick = (spot) => {
        setSelectedSpot(spot);
        onSelectSpot(spot.id); // Highlight the marker
    };

    const handleCloseDetailView = () => {
        setSelectedSpot(null);
        onCloseDetailView(); // Unhighlight the marker
    };

    return (
        <div className="sidebar-container">
            {selectedSpot ? (
                <DetailedSidebar spot={selectedSpot} onClose={handleCloseDetailView} />
            ) : (
                <PrimarySidebar spots={spots} onSpotClick={handleSpotClick} highlightedSpotId={highlightedSpotId} />
            )}
        </div>
    );
};

export default SidebarContainer;
